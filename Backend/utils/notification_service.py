"""
Firebase Cloud Messaging (FCM) Service
Send push notifications to multiple users via Firebase
"""

import os
import json
import logging
from typing import List, Dict, Optional
from firebase_admin import messaging
import firebase_admin

logger = logging.getLogger(__name__)


class FirebaseNotificationService:
    """Service for sending push notifications via Firebase Cloud Messaging"""
    
    def __init__(self):
        """Initialize FCM service"""
        try:
            # Check if Firebase is already initialized
            firebase_admin.get_app()
            self.enabled = True
            logger.info("FCM service initialized successfully")
        except ValueError:
            logger.warning("Firebase not initialized. Notification service disabled.")
            self.enabled = False
    
    def send_notification(
        self,
        token: str,
        title: str,
        body: str,
        data: Optional[Dict] = None
    ) -> dict:
        """
        Send push notification to a single device
        
        Args:
            token: Device FCM registration token
            title: Notification title
            body: Notification body text
            data: Optional additional data payload
            
        Returns:
            dict with 'success' and 'message_id' or 'error'
        """
        if not self.enabled:
            return {"success": False, "error": "FCM service not initialized"}
        
        try:
            message = messaging.Message(
                notification=messaging.Notification(
                    title=title,
                    body=body
                ),
                data=data or {},
                token=token
            )
            
            response = messaging.send(message)
            logger.info(f"Notification sent successfully. Message ID: {response}")
            
            return {
                "success": True,
                "message_id": response
            }
        
        except Exception as e:
            logger.error(f"Failed to send notification: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def send_multicast(
        self,
        tokens: List[str],
        title: str,
        body: str,
        data: Optional[Dict] = None
    ) -> dict:
        """
        Send notification to multiple devices
        
        Args:
            tokens: List of device FCM tokens
            title: Notification title
            body: Notification body text
            data: Optional additional data
            
        Returns:
            dict with success/failure counts
        """
        if not self.enabled:
            return {"success": False, "error": "FCM service not initialized"}
        
        try:
            message = messaging.MulticastMessage(
                notification=messaging.Notification(
                    title=title,
                    body=body
                ),
                data=data or {},
                tokens=tokens
            )
            
            response = messaging.send_multicast(message)
            
            logger.info(
                f"Multicast sent: {response.success_count} successful, "
                f"{response.failure_count} failed out of {len(tokens)}"
            )
            
            return {
                "success": True,
                "success_count": response.success_count,
                "failure_count": response.failure_count,
                "total": len(tokens),
                "responses": response.responses
            }
        
        except Exception as e:
            logger.error(f"Failed to send multicast: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def send_to_topic(
        self,
        topic: str,
        title: str,
        body: str,
        data: Optional[Dict] = None
    ) -> dict:
        """
        Send notification to all devices subscribed to a topic
        
        Args:
            topic: Topic name (e.g., "blood-type-o-positive")
            title: Notification title
            body: Notification body
            data: Optional data
        """
        if not self.enabled:
            return {"success": False, "error": "FCM service not initialized"}
        
        try:
            message = messaging.Message(
                notification=messaging.Notification(
                    title=title,
                    body=body
                ),
                data=data or {},
                topic=topic
            )
            
            response = messaging.send(message)
            logger.info(f"Topic notification sent to '{topic}'. Message ID: {response}")
            
            return {
                "success": True,
                "message_id": response,
                "topic": topic
            }
        
        except Exception as e:
            logger.error(f"Failed to send topic notification: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def subscribe_to_topic(self, tokens: List[str], topic: str) -> dict:
        """Subscribe devices to a topic"""
        if not self.enabled:
            return {"success": False, "error": "FCM service not initialized"}
        
        try:
            response = messaging.subscribe_to_topic(tokens, topic)
            logger.info(f"Subscribed {response.success_count} devices to topic '{topic}'")
            
            return {
                "success": True,
                "success_count": response.success_count,
                "failure_count": response.failure_count
            }
        
        except Exception as e:
            logger.error(f"Failed to subscribe to topic: {str(e)}")
            return {"success": False, "error": str(e)}
    
    # Blood Buddy specific notification methods
    
    def notify_donor_match(
        self,
        donor_tokens: List[str],
        blood_type: str,
        requester_name: str,
        location: str,
        urgency: str = "NORMAL"
    ) -> dict:
        """Notify donors of blood request match"""
        icon = "🚨" if urgency == "URGENT" else "🩸"
        
        title = f"{icon} Blood Needed - {blood_type}"
        body = f"{requester_name} needs {blood_type} blood at {location}"
        
        data = {
            "type": "blood_request",
            "blood_type": blood_type,
            "requester": requester_name,
            "location": location,
            "urgency": urgency,
            "action_url": "/respond-to-request"
        }
        
        return self.send_multicast(donor_tokens, title, body, data)
    
    def notify_donor_registered(self, token: str, donor_name: str, blood_type: str) -> dict:
        """Welcome notification for new donor"""
        title = "🩸 Welcome to Blood Buddy!"
        body = f"Hi {donor_name}, thank you for registering as a {blood_type} donor!"
        
        data = {
            "type": "welcome",
            "blood_type": blood_type
        }
        
        return self.send_notification(token, title, body, data)
    
    def notify_request_confirmed(
        self,
        requester_token: str,
        blood_type: str,
        donors_notified: int
    ) -> dict:
        """Confirm blood request received"""
        title = "🩸 Request Received"
        body = f"We've notified {donors_notified} {blood_type} donors in your area"
        
        data = {
            "type": "request_confirmation",
            "donors_count": str(donors_notified)
        }
        
        return self.send_notification(requester_token, title, body, data)
    
    def send_emergency_alert(
        self,
        topic: str,  # e.g., "blood-type-ab-negative"
        blood_type: str,
        location: str
    ) -> dict:
        """Send emergency alert to all donors of specific blood type"""
        title = f"🚨 URGENT: {blood_type} Blood Needed!"
        body = f"Critical need at {location}. Please respond if available!"
        
        data = {
            "type": "emergency",
            "blood_type": blood_type,
            "location": location,
            "priority": "high",
            "action_url": "/emergency-response"
        }
        
        return self.send_to_topic(topic, title, body, data)


# Global FCM service instance
fcm_service = FirebaseNotificationService()


# Helper functions for easy access
def send_donor_match_notification(
    donor_tokens: List[str],
    blood_type: str,
    requester_name: str,
    location: str
):
    """Quick function to send donor match notification"""
    return fcm_service.notify_donor_match(
        donor_tokens, blood_type, requester_name, location
    )


def send_welcome_notification(token: str, donor_name: str, blood_type: str):
    """Quick function to send welcome notification"""
    return fcm_service.notify_donor_registered(token, donor_name, blood_type)


def send_emergency_alert(blood_type: str, location: str):
    """Quick function to send emergency alerts to topic subscribers"""
    topic = f"blood-type-{blood_type.lower().replace('+', 'positive').replace('-', 'negative')}"
    return fcm_service.send_emergency_alert(topic, blood_type, location)
