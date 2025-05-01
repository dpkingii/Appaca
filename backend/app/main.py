from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, Counter
from app.schema import NewUser
from app.schema import LoginRequest
from app.schema import MatchingForm
from app.schema import TwoTruths
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
        
matched = True

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
    
    return {"message": "Login successful", "username": user["username"], "role": user["role"], "streak": user["streak"]}

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

@app.post("/match/")
async def match_users(db = Depends(get_db)):
    global matched
    matched = True
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

@app.get("/groups/{username}")
async def get_groups(username: str, db = Depends(get_db)):
    group = await db.groups.find_one({
        "$or": [
            {"mentor": username},
            {"students": username}
        ]
    })

    if not group:
        raise HTTPException(status_code=404, detail="No matches found for this user")

    return {
        "mentor": group["mentor"],
        "students": group["students"]
    }

@app.get("/match-status/")
async def get_match_status():
    return {"matched": matched}

@app.get("/top-mentors/")
async def get_top_mentors(db=Depends(get_db)):
    # Query mentors and sort by streak descending, limit to 5
    mentors_cursor = db.users.find(
        {"role": "mentor"},
        {"_id": 0, "username": 1, "streak": 1}
    ).sort("streak", -1).limit(5)

    top_mentors = await mentors_cursor.to_list(length=5)
    return top_mentors

@app.post("/two-truths/")
async def submit_two_truths(submission: TwoTruths, db=Depends(get_db)):
    if len(submission.truths) != 2:
        raise HTTPException(status_code=400, detail="You must submit exactly two truths.")

    entry = {
        "username": submission.username,
        "truths": submission.truths,
        "bug": submission.bug
    }

    await db.games.insert_one(entry)
    return {"message": "Submission saved"}