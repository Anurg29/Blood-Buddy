#!/bin/bash

# Blood Buddy - Quick Setup Script
# This script helps you set up the Blood Buddy application

echo "🩸 Blood Buddy - Quick Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo "📋 Step 1: Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} Python installed: $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} Python not found. Please install Python 3.8+"
    exit 1
fi

# Check pip
if command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version)
    echo -e "${GREEN}✓${NC} pip installed: $PIP_VERSION"
else
    echo -e "${RED}✗${NC} pip not found. Please install pip"
    exit 1
fi

echo ""
echo "=============================="
echo ""

# Step 2: Firebase Setup Reminder
echo "🔥 Step 2: Firebase Setup"
echo ""
echo -e "${YELLOW}Important:${NC} Before continuing, you need to:"
echo "  1. Create a Firebase project at https://console.firebase.google.com/"
echo "  2. Enable Email/Password and Google authentication"
echo "  3. Download your Firebase config"
echo "  4. Download Firebase Admin Service Account JSON"
echo ""
echo "For detailed instructions, see: FIREBASE_SETUP_WALKTHROUGH.md"
echo ""
read -p "Have you completed Firebase setup? (y/n): " firebase_ready

if [ "$firebase_ready" != "y" ] && [ "$firebase_ready" != "Y" ]; then
    echo -e "${YELLOW}Please complete Firebase setup first, then run this script again.${NC}"
    exit 0
fi

echo ""
echo "=============================="
echo ""

# Step 3: Frontend Setup
echo "⚛️  Step 3: Setting up Frontend..."
echo ""

cd FrontEnd

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Frontend dependencies installed"
    else
        echo -e "${RED}✗${NC} Failed to install frontend dependencies"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
fi

# Check if Firebase config is updated
if grep -q "YOUR_API_KEY" src/firebase/config.js; then
    echo -e "${YELLOW}⚠${NC}  Firebase config not updated in src/firebase/config.js"
    echo "   Please update your Firebase credentials before running the app"
fi

cd ..

echo ""
echo "=============================="
echo ""

# Step 4: Backend Setup
echo "🐍 Step 4: Setting up Backend..."
echo ""

cd Backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Virtual environment created"
    else
        echo -e "${RED}✗${NC} Failed to create virtual environment"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt --quiet
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${RED}✗${NC} Failed to install backend dependencies"
    exit 1
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC}  .env file not found. Creating template..."
    cat > .env << EOF
# Firebase Admin SDK
FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/bloodbuddy

# Optional: Use this for production instead of file path
# FIREBASE_CREDENTIALS_JSON={"type":"service_account",...}
EOF
    echo -e "${GREEN}✓${NC} Created .env template. Please update with your values."
fi

# Check for Firebase credentials directory
if [ ! -d "secrets" ]; then
    mkdir secrets
    echo -e "${GREEN}✓${NC} Created secrets directory"
fi

# Check if Firebase credentials exist
if [ ! -f "secrets/firebase-credentials.json" ]; then
    echo -e "${YELLOW}⚠${NC}  Firebase service account not found in secrets/firebase-credentials.json"
    echo "   Please download from Firebase Console and save it there"
fi

cd ..

echo ""
echo "=============================="
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Update Firebase config in: FrontEnd/src/firebase/config.js"
echo "2. Place Firebase service account JSON in: Backend/secrets/firebase-credentials.json"
echo "3. Update .env file in Backend/ with your MongoDB URI"
echo ""
echo "To start the application:"
echo ""
echo "  Frontend (in FrontEnd directory):"
echo "  $ npm start"
echo ""
echo "  Backend (in Backend directory):"
echo "  $ source venv/bin/activate"
echo "  $ uvicorn main:app --reload"
echo ""
echo "📚 For detailed instructions, see:"
echo "  - FIREBASE_SETUP_WALKTHROUGH.md (Frontend Firebase setup)"
echo "  - Backend/FIREBASE_BACKEND_SETUP.md (Backend Firebase setup)"
echo "  - README.md (Complete documentation)"
echo ""
echo "Happy coding! 🩸"
