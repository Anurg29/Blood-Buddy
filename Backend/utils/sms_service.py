"""
SMS Notification Service using Twilio
Sends SMS notifications to blood donors and requesters
"""

import os
from twilio.rest import Client
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)


class SMSService:
    """Service for sending SMS notifications via Twilio"""
    
    def __init__(self):
        """Initialize Twilio client with credentials from environment"""
        self.account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.phone_number = os.getenv('TWILIO_PHONE_NUMBER')
        
        if not all([self.account_sid, self.auth_token, self.phone_number]):
            logger.warning("Twilio credentials not configured. SMS service disabled.")
            self.enabled = False
            self.client = None
        else:
            try:
                self.client = Client(self.account_sid, self.auth_token)
                self.enabled = True
                logger.info("SMS service initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Twilio client: {e}")
                self.enabled = False
                self.client = None
    
    def send_sms(self, to: str, message: str) -> dict:
        """
        Send an SMS to a single recipient
        
        Args:
            to: Recipient phone number (with country code, e.g., +1234567890)
            message: SMS message content
            
        Returns:
            dict with 'success' and 'message_sid' or 'error'
        """
        if not self.enabled:
            logger.warning("SMS service is disabled")
            return {
                "success": False,
                "error": "SMS service not configured"
            }
        
        try:
            # Send message
            message_response = self.client.messages.create(
                body=message,
                from_=self.phone_number,
                to=to
            )
            
            logger.info(f"SMS sent successfully to {to}. SID: {message_response.sid}")
            return {
                "success": True,
                "message_sid": message_response.sid,
                "status": message_response.status
            }
        
        except Exception as e:
            logger.error(f"Failed to send SMS to {to}: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def send_bulk_sms(self, recipients: List[str], message: str) -> dict:
        """
        Send SMS to multiple recipients
        
        Args:
            recipients: List of phone numbers
            message: SMS message content
            
        Returns:
            dict with success count, failed count, and details
        """
        if not self.enabled:
            return {
                "success": False,
                "error": "SMS service not configured"
            }
        
        results = {
            "total": len(recipients),
            "successful": 0,
            "failed": 0,
            "details": []
        }
        
        for recipient in recipients:
            result = self.send_sms(recipient, message)
            if result["success"]:
                results["successful"] += 1
            else:
                results["failed"] += 1
            results["details"].append({
                "recipient": recipient,
                "result": result
            })
        
        return results
    
    def notify_donor_match(
        self, 
        donor_phone: str, 
        donor_name: str,
        blood_type: str,
        requester_name: str,
        location: str
    ) -> dict:
        """
        Send notification to donor about blood request match
        
        Args:
            donor_phone: Donor's phone number
            donor_name: Donor's name
            blood_type: Blood type needed
            requester_name: Name of person requesting blood
            location: Location where blood is needed
        """
        message = f"""
🩸 Blood Buddy Alert!

Hello {donor_name},

Your {blood_type} blood is needed!

Requester: {requester_name}
Location: {location}

Please respond if you can donate.
Thank you for saving lives!

- Blood Buddy Team
        """.strip()
        
        return self.send_sms(donor_phone, message)
    
    def notify_request_confirmation(
        self,
        requester_phone: str,
        requester_name: str,
        blood_type: str,
        donor_count: int
    ) -> dict:
        """
        Send confirmation to blood requester
        
        Args:
            requester_phone: Requester's phone number
            requester_name: Requester's name
            blood_type: Blood type requested
            donor_count: Number of potential donors notified
        """
        message = f"""
🩸 Blood Buddy

Hello {requester_name},

Your request for {blood_type} blood has been received.

We've notified {donor_count} potential donors in your area.

You'll be contacted soon.

- Blood Buddy Team
        """.strip()
        
        return self.send_sms(requester_phone, message)
    
    def notify_donor_registered(
        self,
        donor_phone: str,
        donor_name: str,
        blood_type: str
    ) -> dict:
        """
        Send welcome SMS to new donor
        
        Args:
            donor_phone: Donor's phone number
            donor_name: Donor's name
            blood_type: Donor's blood type
        """
        message = f"""
🩸 Welcome to Blood Buddy!

Hi {donor_name},

Thank you for registering as a {blood_type} donor!

You'll receive notifications when someone needs your blood type.

Together, we save lives!

- Blood Buddy Team
        """.strip()
        
        return self.send_sms(donor_phone, message)
    
    def notify_emergency_request(
        self,
        recipients: List[str],
        blood_type: str,
        location: str,
        urgency: str = "URGENT"
    ) -> dict:
        """
        Send emergency blood request to multiple donors
        
        Args:
            recipients: List of donor phone numbers
            blood_type: Blood type needed
            location: Hospital/location
            urgency: Urgency level (URGENT/CRITICAL)
        """
        message = f"""
🚨 {urgency} BLOOD NEEDED! 🚨

Blood Type: {blood_type}
Location: {location}

If you can donate, please contact immediately!

Lives are at stake. Thank you!

- Blood Buddy Team
        """.strip()
        
        return self.send_bulk_sms(recipients, message)


# Global SMS service instance
sms_service = SMSService()


# Helper functions for easy access
def send_donor_match_notification(donor_phone: str, donor_name: str, blood_type: str, requester_name: str, location: str):
    """Quick function to send donor match notification"""
    return sms_service.notify_donor_match(donor_phone, donor_name, blood_type, requester_name, location)


def send_welcome_sms(donor_phone: str, donor_name: str, blood_type: str):
    """Quick function to send welcome SMS"""
    return sms_service.notify_donor_registered(donor_phone, donor_name, blood_type)


def send_emergency_alert(recipients: List[str], blood_type: str, location: str):
    """Quick function to send emergency alerts"""
    return sms_service.notify_emergency_request(recipients, blood_type, location, urgency="CRITICAL")
