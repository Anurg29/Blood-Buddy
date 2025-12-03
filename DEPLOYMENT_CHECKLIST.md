# 🚀 Deployment Checklist for Blood Buddy

Use this checklist when deploying your Blood Buddy application to production.

## 📋 Pre-Deployment Checklist

### Firebase Setup
- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled
- [ ] Authorized domains configured (add your production domain)
- [ ] Firestore database created (if using)
- [ ] Security rules set up for production
- [ ] Service account key downloaded

### Frontend Pre-Deployment
- [ ] Firebase config updated with production credentials
- [ ] Environment variables set for production API URL
- [ ] All TODO comments removed
- [ ] Console.log statements removed or disabled for production
- [ ] Error handling implemented for all API calls
- [ ] Loading states added to all forms
- [ ] Build tested locally (`npm run build`)
- [ ] HTTPS configured for custom domain (required for auth)

### Backend Pre-Deployment
- [ ] Environment variables configured
- [ ] Firebase service account credentials uploaded securely
- [ ] Database connection string updated for production
- [ ] CORS origins restricted to your domain
- [ ] Error logging configured
- [ ] Rate limiting implemented (optional but recommended)
- [ ] Health check endpoint added

## 🌐 Frontend Deployment (Firebase Hosting)

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase Hosting
```bash
cd FrontEnd
firebase init hosting
```

Configuration:
- Use an existing project: Select your Blood Buddy project
- Public directory: `build`
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: `No` (or Yes if you want CI/CD)

### Step 4: Build Your App
```bash
npm run build
```

### Step 5: Deploy
```bash
firebase deploy --only hosting
```

### Step 6: Verify Deployment
- [ ] Visit your Firebase hosting URL
- [ ] Test login functionality
- [ ] Test Google sign-in
- [ ] Test protected routes
- [ ] Check console for errors

## 🖥️ Backend Deployment (Railway)

### Option 1: Railway (Recommended)

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login to Railway
```bash
railway login
```

#### Step 3: Initialize Project
```bash
cd Backend
railway init
```

#### Step 4: Set Environment Variables
In Railway dashboard or via CLI:
```bash
# Set Firebase credentials as JSON string (minified, no line breaks)
railway variables set FIREBASE_CREDENTIALS_JSON='{"type":"service_account",...}'

# Set MongoDB URI
railway variables set MONGODB_URI='mongodb+srv://...'

# Set any other variables
railway variables set ENVIRONMENT=production
```

#### Step 5: Deploy
```bash
railway up
```

#### Step 6: Verify Backend
- [ ] Visit Railway-provided URL
- [ ] Check `/docs` endpoint
- [ ] Test an authenticated endpoint
- [ ] Monitor logs for errors

### Option 2: Heroku

#### Step 1: Create Heroku App
```bash
cd Backend
heroku create blood-buddy-api
```

#### Step 2: Set Environment Variables
```bash
# Set Firebase credentials
heroku config:set FIREBASE_CREDENTIALS_JSON='{"type":"service_account",...}'

# Set MongoDB
heroku config:set MONGODB_URI='mongodb+srv://...'
```

#### Step 3: Create Procfile
Already created! Verify it contains:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### Step 4: Deploy
```bash
git push heroku main
```

#### Step 5: Verify
```bash
heroku logs --tail
heroku open
```

## 🔧 Post-Deployment Configuration

### Update Frontend API URL
Once backend is deployed, update frontend:

**Create `.env.production` in FrontEnd:**
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

**Rebuild and redeploy frontend:**
```bash
npm run build
firebase deploy --only hosting
```

### Update CORS in Backend
Edit `Backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.web.app",
        "https://your-custom-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Update Firebase Authorized Domains
1. Go to Firebase Console
2. Authentication → Settings → Authorized domains
3. Add your production domains:
   - `your-app.web.app`
   - `your-custom-domain.com`

## 🔒 Security Checklist

### Firebase Security
- [ ] Firestore security rules updated for production
- [ ] Only necessary Firebase services enabled
- [ ] Service account permissions minimized
- [ ] API keys restricted to specific domains

### Backend Security
- [ ] Environment variables used (no hardcoded credentials)
- [ ] CORS restricted to your domains only
- [ ] HTTPS enforced
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (if using SQL)
- [ ] XSS protection headers added

### Frontend Security
- [ ] No API keys in client code
- [ ] Firebase config uses environment variables
- [ ] Content Security Policy headers set
- [ ] HTTPS enforced
- [ ] Sensitive routes protected

## 📊 Monitoring & Maintenance

### Set Up Monitoring
- [ ] Firebase Console → Analytics (track auth events)
- [ ] Railway/Heroku logs monitoring
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Uptime monitoring (UptimeRobot)

### Regular Maintenance
- [ ] Monitor Firebase quota usage
- [ ] Review Firebase authentication logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate service account keys every 90 days
- [ ] Backup database regularly
- [ ] Monitor API response times
- [ ] Review error logs

## 🧪 Testing in Production

### Post-Deployment Tests
- [ ] Create new account with email/password
- [ ] Login with email/password
- [ ] Login with Google
- [ ] Access protected route when logged out (should redirect)
- [ ] Access protected route when logged in (should work)
- [ ] Make API call to backend
- [ ] Test logout
- [ ] Test on mobile device
- [ ] Test on different browsers

### Load Testing (Optional)
```bash
# Install artillery for load testing
npm install -g artillery

# Create test script
# artillery quick --count 10 --num 50 https://your-api-url
```

## 📱 Custom Domain Setup (Optional)

### Firebase Hosting Custom Domain
1. Firebase Console → Hosting
2. Add custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

### Update Configurations
- [ ] Add domain to Firebase authorized domains
- [ ] Update CORS in backend
- [ ] Update environment variables
- [ ] Test authentication with custom domain

## 🐛 Troubleshooting Deployment Issues

### "Auth domain not authorized"
**Fix:** Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### "CORS error"
**Fix:** Update `allow_origins` in backend `main.py` to include your frontend URL

### "Firebase credentials not found" (Backend)
**Fix:** Ensure `FIREBASE_CREDENTIALS_JSON` environment variable is set correctly

### "API calls failing"
**Fix:** 
1. Check backend logs
2. Verify `REACT_APP_API_URL` is correct
3. Ensure HTTPS is used (required for secure cookies)

### "Build fails"
**Fix:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf build`
3. Check for missing dependencies

## 📈 Performance Optimization

### Frontend
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Lazy loading for routes
- [ ] Service worker for caching
- [ ] Lighthouse score > 90

### Backend
- [ ] Database indexes created
- [ ] Response caching implemented
- [ ] Gzip compression enabled
- [ ] CDN for static assets

## 🎉 Launch Checklist

Final steps before going live:
- [ ] All features tested in production
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team trained on deployment process
- [ ] Rollback plan prepared
- [ ] Monitoring dashboards set up
- [ ] Support email/system configured

## 📞 Emergency Contacts

Keep these handy:
- Firebase Console: https://console.firebase.google.com/
- Railway Dashboard: https://railway.app/dashboard
- Heroku Dashboard: https://dashboard.heroku.com/
- MongoDB Atlas: https://cloud.mongodb.com/

## 🔄 Rollback Procedure

If something goes wrong:

### Frontend Rollback
```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous version via Firebase Console
# Hosting → Release history → Rollback
```

### Backend Rollback
```bash
# Railway
railway rollback

# Heroku
heroku releases
heroku rollback v123
```

---

## ✅ Deployment Complete!

Once all items are checked:
- 🎊 Congratulations! Your app is live!
- 📣 Announce your launch
- 📊 Monitor metrics
- 🐛 Be ready for bug reports
- 🚀 Plan next features

Remember: Deployment is not the end, it's the beginning of your app's journey!

---

*Good luck with your deployment! 🩸💪*
