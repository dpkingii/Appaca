from pydantic import BaseModel, EmailStr, validator
from datetime import datetime

class NewUser(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return v

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return v

class Message(BaseModel):
    sender_username: str
    recipient_username: str
    content: str
    timestamp: datetime = None

class LoginRequest(BaseModel):
    username: str
    password: str

class MatchingForm(BaseModel):
    username: str           #typically the id of the user
    topics: list[str]