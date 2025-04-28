from pydantic import BaseModel
from datetime import datetime

class NewUser(BaseModel):
    username: str
    email: str
    password: str
    role: str

class Message(BaseModel):
    sender_username: str
    recipient_username: str
    content: str
    timestamp: datetime = None

class LoginRequest(BaseModel):
    username: str
    password: str