from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.schema import NewUser
from app.schema import Message
from app.schema import LoginRequest
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
        raise HTTPException(status_code=404, detail="User not found")

    if user["password"] != login_data.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")    
    
    return {"message": "Login successful", "username": user["username"], "role": "student"}

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