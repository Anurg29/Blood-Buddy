#!/bin/bash

# Blood Buddy - Render Deployment Preparation Script
# This script helps you prepare for Render deployment

set -e  # Exit on error

echo "🩸 Blood Buddy - Render Deployment Preparation"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "RENDER_DEPLOYMENT.md" ]; then
    echo "❌ Error: Please run this script from the Blood-Buddy root directory"
    exit 1
fi

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi
echo "✅ Git found"

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "⚠️  Not a Git repository. Initializing..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository found"
fi

# Check jq for JSON minification
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq is not installed (needed for Firebase JSON minification)"
    echo "   Install with: brew install jq"
    echo ""
else
    echo "✅ jq found"
fi

echo ""
echo "📝 Deployment Checklist:"
echo ""
echo "Before deploying to Render, make sure you have:"
echo ""
echo "1. Render Account"
echo "   Sign up at: https://render.com"
echo ""
echo "2. MongoDB Atlas Cluster"
echo "   Create at: https://cloud.mongodb.com"
echo "   - Create a free cluster"
echo "   - Create a database user"
echo "   - Whitelist IP: 0.0.0.0/0"
echo "   - Get connection string"
echo ""
echo "3. Firebase Service Account"
echo "   Get from: https://console.firebase.google.com"
echo "   - Go to Project Settings → Service Accounts"
echo "   - Click 'Generate new private key'"
echo "   - Download the JSON file"
echo ""
echo "4. GitHub Repository"
echo "   Push your code to GitHub"
echo ""

# Check if changes need to be committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 Uncommitted changes detected"
    echo ""
    echo "Would you like to commit and push changes now? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo ""
        echo "Enter commit message (default: 'Prepare for Render deployment'):"
        read -r commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="Prepare for Render deployment"
        fi
        
        git add .
        git commit -m "$commit_msg"
        
        # Check if remote exists
        if git remote | grep -q "origin"; then
            echo ""
            echo "Pushing to GitHub..."
            git push origin main || git push origin master
            echo "✅ Code pushed to GitHub"
        else
            echo ""
            echo "⚠️  No Git remote configured."
            echo "   Add your GitHub repository:"
            echo "   git remote add origin https://github.com/yourusername/Blood-Buddy.git"
            echo "   git push -u origin main"
        fi
    fi
else
    echo "✅ All changes committed"
fi

echo ""
echo "🔑 Firebase Credentials Minification"
echo ""
echo "Do you have your Firebase service account JSON file? (y/n)"
read -r has_firebase
if [[ "$has_firebase" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "Enter the path to your Firebase credentials JSON file:"
    read -r firebase_path
    
    if [ -f "$firebase_path" ]; then
        if command -v jq &> /dev/null; then
            echo ""
            echo "Minified JSON (copy this for Render):"
            echo "======================================"
            cat "$firebase_path" | jq -c
            echo "======================================"
            echo ""
            echo "✅ Copy the JSON above and paste it into Render's FIREBASE_CREDENTIALS_JSON environment variable"
        else
            echo "⚠️  jq not found. Install it with: brew install jq"
            echo "   Then run: cat $firebase_path | jq -c"
        fi
    else
        echo "❌ File not found: $firebase_path"
    fi
fi

echo ""
echo "📚 Next Steps:"
echo ""
echo "1. Read the deployment guide:"
echo "   cat RENDER_DEPLOYMENT.md"
echo ""
echo "2. Or use the quick workflow:"
echo "   Follow the steps in .agent/workflows/deploy.md"
echo ""
echo "3. Deploy to Render:"
echo "   a. Go to https://dashboard.render.com"
echo "   b. Create a new Web Service"
echo "   c. Connect your GitHub repository"
echo "   d. Use Root Directory: Backend"
echo "   e. Build Command: pip install -r requirements.txt"
echo "   f. Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo "   g. Add environment variables (see RENDER_DEPLOYMENT.md)"
echo ""
echo "4. Deploy Frontend to Firebase:"
echo "   cd FrontEnd"
echo "   npm run build"
echo "   firebase deploy --only hosting"
echo ""
echo "🎉 Good luck with your deployment!"
echo ""
