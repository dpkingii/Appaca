from pydantic import BaseModel

class NewUser(BaseModel):
    username: str
    email: str
    password: str
    role: str

    class Config:
        orm_mode = True