from fastapi import FastAPI
from routes.donor_routes import router as donor_router
from fastapi.middleware.cors import CORSMiddleware
from utils.firebase_auth import initialize_firebase

app = FastAPI(title="Blood Buddy API", version="1.0")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase on startup
@app.on_event("startup")
async def startup_event():
    initialize_firebase()
    print("Application started successfully!")

# Register routes
app.include_router(donor_router)

@app.get("/")
def root():
    return {"message": "Welcome to Blood Buddy API"}
