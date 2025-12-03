# 📱 SMS Notification System - Setup Guide

Your Blood Buddy application now has a **comprehensive SMS notification system** using Twilio to alert multiple donors and requesters.

---

## ✨ SMS Features

### 🔔 Automated Notifications:
✅ **Donor Match Alerts** - Notify donors when their blood type is needed  
✅ **Welcome Messages** - Send welcome SMS to new donors  
✅ **Emergency Alerts** - Send URGENT notifications to multiple donors  
✅ **Request Confirmations** - Confirm blood requests received  
✅ **Bulk Messaging** - Notify multiple donors simultaneously  

### 🎯 Use Cases:
1. **Blood Request** → Auto-notify all matching donors in area
2. **New Donor** → Send welcome message with details
3. **Emergency** → Send critical alerts to all donors
4. **Confirmation** → Notify requester when donors are contacted

---

## 🚀 Setup Twilio Account

### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up for a **free trial account**
3. Verify your email and phone number

### Step 2: Get Trial Credits
- ✅ **Free Trial**: $15.50 credit (enough for ~500 SMS)
- ✅ **Trial Limitations**: Can only send to verified phone numbers
- 💡 **Upgrade**: Remove limitations by adding billing

### Step 3: Get Your Credentials

1. **Go to Twilio Console**: https://console.twilio.com/
2. **Find your credentials** (Dashboard → Account Info):
   - `Account SID` (looks like: AC3xxxxxxxxxxxxx)
   - `Auth Token` (click to reveal)

3. **Get a Phone Number**:
   - Go to **Phone Numbers** → **Manage** → **Buy a number**
   - Select a number (free during trial)
   - Click **Buy** (uses $0 during trial)

### Step 4: Verify Test Numbers (Trial Only)

During trial, you can only send SMS to verified numbers:

1. Go to **Phone Numbers** → **Manage** → **Verified Caller IDs**
2. Click **Add a New Number**
3. Enter phone number with country code (e.g., +919876543210)
4. Verify via SMS code

💡 **Tip**: Add all your test users' phone numbers here!

---

## ⚙️ Configure Backend

### Update `.env` File

Add these to `/Backend/.env`:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=AC3xxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio number
```

### Install Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

This will install the `twilio` package.

---

## 📝 Using SMS in Your Code

The SMS service is already integrated! Here's how to use it:

### Example 1: Send Welcome SMS to New Donor

```python
from utils.sms_service import send_welcome_sms

# When a donor registers
send_welcome_sms(
    donor_phone="+919876543210",
    donor_name="John Doe",
    blood_type="O+"
)
```

### Example 2: Notify Donor of Match

```python
from utils.sms_service import send_donor_match_notification

# When blood is requested
send_donor_match_notification(
    donor_phone="+919876543210",
    donor_name="John Doe",
    blood_type="O+",
    requester_name="Jane Smith",
    location="City Hospital, Mumbai"
)
```

### Example 3: Emergency Alert to Multiple Donors

```python
from utils.sms_service import send_emergency_alert

# Critical blood need
donor_phones = [
    "+919876543210",
    "+919876543211",
    "+919876543212"
]

send_emergency_alert(
    recipients=donor_phones,
    blood_type="AB-",
    location="Emergency Room, Apollo Hospital"
)
```

### Example 4: Using SMS Service Directly

```python
from utils.sms_service import sms_service

# Send custom SMS
result = sms_service.send_sms(
    to="+919876543210",
    message="Custom message here"
)

if result["success"]:
    print(f"SMS sent! Message SID: {result['message_sid']}")
else:
    print(f"Failed: {result['error']}")
```

---

## 📊 SMS Message Templates

All messages are pre-formatted for you:

### 1. Welcome Message
```
🩸 Welcome to Blood Buddy!

Hi {Name},

Thank you for registering as a {BloodType} donor!

You'll receive notifications when someone needs your blood type.

Together, we save lives!

- Blood Buddy Team
```

### 2. Donor Match Alert
```
🩸 Blood Buddy Alert!

Hello {DonorName},

Your {BloodType} blood is needed!

Requester: {RequesterName}
Location: {Location}

Please respond if you can donate.
Thank you for saving lives!

- Blood Buddy Team
```

### 3. Emergency Alert
```
🚨 CRITICAL BLOOD NEEDED! 🚨

Blood Type: {BloodType}
Location: {Location}

If you can donate, please contact immediately!

Lives are at stake. Thank you!

- Blood Buddy Team
```

### 4. Request Confirmation
```
🩸 Blood Buddy

Hello {RequesterName},

Your request for {BloodType} blood has been received.

We've notified {DonorCount} potential donors in your area.

You'll be contacted soon.

- Blood Buddy Team
```

---

## 🔗 Integration with Donor Routes

### Update `routes/donor_routes.py`:

```python
from fastapi import APIRouter, Depends
from utils.firebase_auth import verify_firebase_token
from utils.sms_service import send_welcome_sms, send_donor_match_notification

router = APIRouter(prefix="/api/donors", tags=["donors"])

@router.post("/register")
async def register_donor(
    donor_data: dict,
    user = Depends(verify_firebase_token)
):
    # Save donor to database
    # ... your existing code ...
    
    # Send welcome SMS
    if donor_data.get("phone"):
        send_welcome_sms(
            donor_phone=donor_data["phone"],
            donor_name=donor_data["name"],
            blood_type=donor_data["blood_type"]
        )
    
    return {"status": "success", "message": "Donor registered and notified via SMS"}

@router.post("/request-blood")
async def request_blood(
    request_data: dict,
    user = Depends(verify_firebase_token)
):
    blood_type = request_data["blood_type"]
    location = request_data["location"]
    
    # Find matching donors from database
    matching_donors = find_donors_by_type(blood_type)
    
    # Notify all matching donors
    for donor in matching_donors:
        send_donor_match_notification(
            donor_phone=donor["phone"],
            donor_name=donor["name"],
            blood_type=blood_type,
            requester_name=user["name"],
            location=location
        )
    
    return {
        "status": "success",
        "donors_notified": len(matching_donors)
    }
```

---

## 🧪 Testing SMS

### Test Script

Create `Backend/test_sms.py`:

```python
from utils.sms_service import sms_service

# Test basic SMS
result = sms_service.send_sms(
    to="+919876543210",  # Replace with your verified number
    message="Test SMS from Blood Buddy! 🩸"
)

print(result)
```

Run it:
```bash
cd Backend
python test_sms.py
```

---

## 💰 Pricing & Limits

### Free Trial:
- **Credits**: $15.50
- **SMS Cost**: ~$0.0075 per SMS in India
- **Total Messages**: ~2000 SMS
- **Limitation**: Only verified numbers

### After Trial (Upgrade):
- **Pay as you go**: Only pay for what you use
- **India SMS**: ₹0.50 - ₹1.00 per SMS
- **No monthly fees** (unless you want a dedicated number)
- **Send to any number** worldwide

### Recommendations:
1. **Start with trial** - Test everything
2. **Verify test numbers** - Add your team's numbers
3. **Upgrade when ready** - Before launching to users
4. **Monitor usage** - Check Twilio dashboard regularly

---

## 🔒 Security Best Practices

### 1. Never Commit Credentials
✅ `.env` is in `.gitignore`  
✅ Use environment variables  
✅ For production: use secure secret management  

### 2. Rate Limiting
Consider adding rate limiting to prevent abuse:

```python
from fastapi import HTTPException
from datetime import datetime, timedelta

# Track SMS sent per user
sms_tracker = {}

def check_sms_limit(user_id: str, limit: int = 10):
    """Allow max 10 SMS per user per hour"""
    now = datetime.now()
    if user_id in sms_tracker:
        sent_times = [t for t in sms_tracker[user_id] 
                     if now - t < timedelta(hours=1)]
        if len(sent_times) >= limit:
            raise HTTPException(429, "Too many SMS requests")
        sms_tracker[user_id] = sent_times + [now]
    else:
        sms_tracker[user_id] = [now]
```

### 3. Phone Number Validation
Always validate phone numbers before sending:

```python
import re

def validate_phone(phone: str) -> bool:
    """Validate phone number format"""
    pattern = r'^\+[1-9]\d{1,14}$'  # E.164 format
    return bool(re.match(pattern, phone))
```

---

## 📱 Phone Number Format

Always use **E.164 format**:

✅ **Correct**:
- `+919876543210` (India)
- `+14155552671` (USA)
- `+442071234567` (UK)

❌ **Incorrect**:
- `9876543210` (missing country code)
- `+91 98765 43210` (spaces)
- `0091-9876543210` (wrong format)

### Convert to E.164:

```python
def format_phone_number(phone: str, country_code: str = "+91") -> str:
    """Convert phone to E.164 format"""
    # Remove all non-digits
    digits = ''.join(filter(str.isdigit, phone))
    
    # Add country code if not present
    if not phone.startswith('+'):
        return f"{country_code}{digits}"
    return f"+{digits}"

# Usage
phone = format_phone_number("9876543210")  # Returns: +919876543210
```

---

## 🚀 Production Deployment

### Railway/Heroku

Add environment variables in your deployment platform:

```bash
TWILIO_ACCOUNT_SID=AC3xxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Firebase Functions (Alternative)

If you want SMS from Firebase Functions:

```javascript
const twilio = require('twilio');

const sendSMS = (to, message) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
};
```

---

## 📊 Monitoring & Analytics

### Check SMS Status

```python
# Get message status
message_sid = "SM3xxxxxxxxxxxxxxx"
message = sms_service.client.messages(message_sid).fetch()
print(f"Status: {message.status}")
print(f"Price: {message.price}")
```

### Twilio Console
- View all sent messages
- Check delivery status
- Monitor spending
- Download reports

Dashboard: https://console.twilio.com/us1/monitor/logs/sms

---

## 🎯 Next Steps

1. ✅ **Twilio account created** - Sign up at twilio.com
2. ✅ **Credentials added** - Update `.env` file
3. ✅ **Test SMS** - Run test script
4. ✅ **Integrate with routes** - Add to donor registration
5. ✅ **Deploy** - Push to production

---

## 🆘 Troubleshooting

### Error: "Unable to create record"
**Solution**: Check that phone number is in E.164 format (+country_code + number)

### Error: "The number +X is unverified"
**Solution**: During trial, verify the number in Twilio Console → Verified Caller IDs

### Error: "Authenticate"
**Solution**: Double-check your Account SID and Auth Token in `.env`

### No SMS received
**Solution**: 
1. Check Twilio console logs
2. Verify phone number format
3. Check your trial balance
4. Ensure number is verified (trial mode)

---

## 📞 Support

- **Twilio Docs**: https://www.twilio.com/docs/sms
- **Twilio Support**: https://www.twilio.com/help/contact
- **Pricing**: https://www.twilio.com/sms/pricing

---

**Your Blood Buddy app is now ready to send SMS to multiple users! 📱🩸**

Start saving lives with instant notifications!
