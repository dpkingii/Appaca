from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, Counter
from app.schema import NewUser
from app.schema import Message
from app.schema import LoginRequest
from app.schema import MatchingForm
from app.database import get_db
from bson import ObjectId
from datetime import datetime

# models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Specify your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
        
@app.get("/")
async def main(request: Request):
    print(f"Request headers: {request.headers}")
    return {"message": "Hello Appaca!"}

@app.post("/users/")
async def register_user(user: NewUser, db = Depends(get_db)):

    # Check for existing user
    existing = await db.users.find_one({
        "$or": [
            {"email": user.email},
            {"username": user.username}
        ]
    })

    if existing:
        raise HTTPException(status_code=400, detail="Username or email already exists.")

    # Insert new user
    user_dict = user.dict()
    print("Received user:", user.dict())
    result = await db.users.insert_one(user_dict)

    return {"id": str(result.inserted_id)}

@app.get("/users/{username}")
async def get_user(username: str, db = Depends(get_db)):
    #Find user by username
    user = await db.users.find_one({"username": username})

    if user:
        return {"username": user["username"], "email": user["email"], "role": user["role"]}
    else:
        # If the user is not found, return a 404 error
        raise HTTPException(status_code=404, detail="User not found")
    
@app.post("/login/")
async def login(login_data: LoginRequest, db = Depends(get_db)):
    user = await db.users.find_one({"username": login_data.username})

    if user is None:
        raise HTTPException(status_code=404, detail="User not found, did you put in the right username?")

    if user["password"] != login_data.password:
        raise HTTPException(status_code=400, detail="Incorrect password")    
    
    return {"message": "Login successful", "username": user["username"], "role": user["role"]}

@app.post("/messages/")
async def send_message(message: Message, db = Depends(get_db)):

    sender = await db.users.find_one({"username": message.sender_username})
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")

    recipient = await db.users.find_one({"username": message.recipient_username})
    if not recipient:
        raise HTTPException(status_code=404, detail="Sender not found")
    
    message_data = {
        "sender_id": str(sender["_id"]),
        "recipient_id": str(recipient["_id"]),
        "content": message.content,
        "timestamp": message.timestamp or datetime.now()  
    }
  
    result = await db.messages.insert_one(message_data)

    return {"message_id": str(result.inserted_id), "status": "Message sent successfully"}

@app.get("/messages/{username}")
async def get_messages(username: str, db = Depends(get_db)):
    user = await db.users.find_one({"username": username})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    sender_object_id = user["_id"]

    sent_messages = await db.messages.find({"sender_id": str(sender_object_id)}).to_list(length=100)

    if not sent_messages:
        raise HTTPException(status_code=404, detail="No sent messages found")
    
    for message in sent_messages:
        message["_id"] = str(message["_id"])  # Convert the message _id
        message["sender_id"] = str(message["sender_id"])  # Convert sender_id
        message["recipient_id"] = str(message["recipient_id"])  # Convert recipient_id
    
    return sent_messages

@app.post("/forms/")
async def submit_form(form: MatchingForm, db=Depends(get_db)):
    # Check if the user exists
    user = await db.users.find_one({"username": form.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    form_data = {
        "user_id": str(user["_id"]),
        "username": form.username,
        "role": form.role,
        "topics": form.topics
    }

    # Optional: delete existing form and overwrite
    await db.forms.delete_many({"user_id": str(user["_id"])})

    result = await db.forms.insert_one(form_data)

    return {
        "message": "Form submitted successfully",
        "form_id": str(result.inserted_id),
        "topics": form.topics
    }

@app.post("/match")
async def match_users(db = Depends(get_db)):
    forms = await db.forms.find().to_list(length=None)

    mentors = [f for f in forms if f["role"] == "mentor"]
    students = [f for f in forms if f["role"] == "student"]

    if not mentors or not students:
        raise HTTPException(status_code=400, detail="Not enough users to match")

    # Step 1: Create mentor-topic map
    mentor_topic_map = {m["username"]: set(m["topics"]) for m in mentors}
    
    # Step 2: Rank mentors for each student based on shared topics
    matches = []
    for student in students:
        best_mentors = sorted(
            mentors,
            key=lambda m: len(set(student["topics"]) & set(m["topics"])),
            reverse=True
        )
        # Pick top match for now
        if best_mentors:
            top_mentor = best_mentors[0]
            matches.append((student["username"], top_mentor["username"]))

    # Step 3: Group into clusters of 3 (1 mentor + 2 students)
    groups = defaultdict(list)
    for student, mentor in matches:
        if len(groups[mentor]) < 3:
            groups[mentor].append(student)

    # Optional: Save matches to a new collection
    matched_groups = []
    for mentor, student_list in groups.items():
        matched_groups.append({
            "mentor": mentor,
            "students": student_list
        })

    await db.groups.delete_many({})  # Clear existing matches if needed
    await db.groups.insert_many(matched_groups)

    return {"status": "success", "groups_created": len(matched_groups), "matches": [
        {
            "mentor": g["mentor"],
            "students": g["students"]
        } for g in matched_groups
    ]}