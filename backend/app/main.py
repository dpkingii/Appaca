from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.schema import NewUser
from app.database import get_db
from bson import ObjectId

# models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Specify your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup_db():
    try:
        # Try connecting to MongoDB Atlas
        db = get_db()  # You can also try client.appaca_db to be specific
        print("Connected to MongoDB Atlas")
    except Exception as e:
        print("Failed to connect to MongoDB Atlas", e)
        
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

@app.post("/test_insert/")
async def test_insert():
    # Sample data to insert into MongoDB
    test_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "role": "admin"
    }

    # Insert the data into the "users" collection
    result = await db.users.insert_one(test_data)

    # Return the ID of the inserted document
    return {"inserted_id": str(result.inserted_id)}

@app.get("/test_get/")
async def test_get():
    # Find the first user in the "users" collection
    user = await db.users.find_one({"username": "testuser"})

    if user:
        # Return the user data
        return {"username": user["username"], "email": user["email"], "role": user["role"]}
    else:
        raise HTTPException(status_code=404, detail="User not found")