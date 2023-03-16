import uuid
import random
import requests

from graphql_jwt.shortcuts import get_token
from graphql_jwt.refresh_token.shortcuts import create_refresh_token
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from twilio.rest import Client
from fcm_django.models import FCMDevice
from graphql_relay.node.node import to_global_id

from apps.config.utils import TokenGenerator
from api.order.types import OrderType
from .models import User, Notification


account_activation_token = TokenGenerator()


FIREBASE_API_URL = (
    f'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key='
    f'{settings.FIREBASE_API_KEY}'
)


class NotificationManager:
    def __init__(
        self,
        user=None,
        email=None,
        phone=None,
        tmp_password=None,
        location=None
    ):
        self.user = user

        if email:
            self.user = User.objects.get(email=email)
        if phone:
            self.user = User.objects.get(phone=phone)

        if self.user:
            self.devices = FCMDevice.objects.filter(user=self.user)

        self.location = location if location else 'general_info'

        self.tmp_password = tmp_password

    def send_confirmation_link(self):
        """Email activation link"""

        self.user.reset_expired = False
        self.user.save()

        link_type = f'?type=email_confirm&next={self.location}'

        if self.location == 'general_info':
            auth_token = get_token(self.user)
            refresh_token = create_refresh_token(self.user)

            link_type += f'&token={auth_token}&refresh_token={refresh_token}'

        res = requests.post(
            FIREBASE_API_URL,
            json={
              "dynamicLinkInfo": {
                    "domainUriPrefix": "https://link.mshfa.app",
                    "link": f"{settings.DOMAIN}/auth/login/{link_type}",
                    "androidInfo": {
                        "androidPackageName": "app.mshfa.mshfa"
                    },
                    "iosInfo": {
                        "iosBundleId": "app.mshfa.mshfa"
                    }
                }
            }
        )

        if res.status_code == 200:
            data = res.json()
            link = data.get('shortLink')

            context = {
                'username': None,
                'email': self.user.email,
                'uid': urlsafe_base64_encode(force_bytes(self.user.pk)),
                'token': account_activation_token.make_token(self.user),
                'link': link,
                'site_name': settings.SITE_NAME,
                'domain': settings.DOMAIN
            }

            html_message = render_to_string(
                'email/email_confirm.html',
                context
            )

            send_mail(
                subject='Verify email address',
                from_email=settings.DEFAULT_FROM_EMAIL,
                message=None,
                recipient_list=[self.user.email],
                fail_silently=True,
                html_message=html_message
            )

    def send_confirmation_sms(self):
        """Confirmation SMS"""
        code = random.randrange(100000, 900000)

        self.user.sms_code = code
        self.user.save()

        if settings.TWILIO_SEND_SMS:
            client = Client(
                settings.TWILIO_ACCOUNT_SID,
                settings.TWILIO_AUTH_TOKEN
            )
            client.messages.create(
                messaging_service_sid=settings.TWILIO_MESSAGING_SID,
                body=f"Your code Mshfa: {code}",
                to=self.user.phone
            )

    def send_password_reset_link(self):
        """Send reset password confirmation link"""
        # Create dynamic link:

        token = (
            f'?uid64={urlsafe_base64_encode(force_bytes(self.user.pk))}'
            f'&token={account_activation_token.make_token(self.user)}'
            f'&type=reset_password'
        )

        res = requests.post(
            FIREBASE_API_URL,
            json={
              "dynamicLinkInfo": {
                    "domainUriPrefix": "https://link.mshfa.app",
                    "link": f"{settings.DOMAIN}/auth/create-password/{token}",
                    "androidInfo": {
                        "androidPackageName": "app.mshfa.mshfa"
                    },
                    "iosInfo": {
                        "iosBundleId": "app.mshfa.mshfa"
                    }
                }
            }
        )

        if res.status_code == 200:
            data = res.json()
            link = data.get('shortLink')

            context = {
                'link': link,
                'site_name': settings.SITE_NAME,
            }
            html_message = render_to_string(
                'email/reset_password.html',
                context
            )

            send_mail(
                subject='Password recovery',
                from_email=settings.DEFAULT_FROM_EMAIL,
                message=None,
                recipient_list=[self.user.email],
                fail_silently=True,
                html_message=html_message
            )

    def send_create_a_password(self):
        """Send create new password email (for doctors and pharmacists)"""

        # Generate temporary password
        tmp_password = uuid.uuid4().hex[:8]
        self.user.set_password(tmp_password)
        self.user.is_active = True
        self.user.save()

        # Create dynamic link:
        token = (
            f'?uid64={urlsafe_base64_encode(force_bytes(self.user.pk))}'
            f'&token={account_activation_token.make_token(self.user)}'
            f'&type=reset_password'
        )

        link = f'{settings.DOMAIN}/auth/create-password/{token}'

        context = {
            'link': link,
            'site_name': settings.SITE_NAME,
        }
        html_message = render_to_string(
            'email/create_a_password.html',
            context
        )

        send_mail(
            subject='Create a password',
            from_email=settings.DEFAULT_FROM_EMAIL,
            message=None,
            recipient_list=[self.user.email],
            fail_silently=True,
            html_message=html_message
        )

    def send_push_notification(
        self,
        title=None,
        msg=None,
        action=0,
        relation=None,
        reminder=None,
        type=None
    ):
        """Send push notifications"""
        hist = Notification.objects.filter(
            user=self.user,
            msg=msg,
            action=action,
            backend_relation_id=relation,
            reminder=reminder,
            type=type
        )

        if self.user and self.devices and not hist:
            # =====================================
            # LAB TESTS
            # =====================================
            if type == Notification.TYPE.lab_test:
                # Create notification record in db
                hist = Notification.objects.create(
                    user=self.user,
                    msg=msg,
                    action=action,
                    backend_relation_id=relation,
                    reminder=reminder,
                    type=type
                )

                # Send notification
                self.devices.send_message(
                    title=title,
                    body=msg,
                    data={
                        'action': action,
                        'notification_pk': hist.id,
                        'reminder': reminder
                    }
                )
            # =====================================
            # ORDER
            # =====================================
            elif type == Notification.TYPE.order:
                frontend_relation_id = to_global_id(
                    type=OrderType._meta.name,
                    id=relation
                ) if relation else None

                # Create notification record in db
                hist = Notification.objects.create(
                    user=self.user,
                    msg=msg,
                    action=action,
                    frontend_relation_id=frontend_relation_id,
                    backend_relation_id=relation,
                    reminder=reminder,
                    type=type
                )

                # Send notification
                self.devices.send_message(
                    title=title,
                    body=msg,
                    data={
                        'action': action,
                        'relation': frontend_relation_id,
                        'notification_pk': hist.id,
                        'reminder': reminder
                    }
                )
            # =====================================
            # APPOINTMENT
            # =====================================
            elif type == Notification.TYPE.appointment:
                frontend_relation_id = to_global_id(
                    type=AppointmentType._meta.name,
                    id=relation
                ) if relation else None

                # Create notification record in db
                hist = Notification.objects.create(
                    user=self.user,
                    msg=msg,
                    action=action,
                    frontend_relation_id=frontend_relation_id,
                    backend_relation_id=relation,
                    reminder=reminder,
                    type=type
                )

                # Send notification
                self.devices.send_message(
                    title=title,
                    body=msg,
                    data={
                        'action': action,
                        'relation': frontend_relation_id,
                        'notification_pk': hist.id,
                        'reminder': reminder
                    }
                )

            # =====================================
            # PAYMENT
            # =====================================
            elif type == Notification.TYPE.payment:

                # Create notification record in db
                hist = Notification.objects.create(
                    user=self.user,
                    msg=msg,
                    type=type
                )

                # Send notification
                self.devices.send_message(
                    title=title,
                    body=msg,
                    data={
                        'action': action,
                        'notification_pk': hist.id,
                    }
                )

    def admin_send_push_notification(
            self,
            title=None,
            msg=None,
            to_open=None,
            doctor_id=None,
            speciality=None
    ):
        if self.user and self.devices:
            # Create notification record in db
            Notification.objects.create(
                user=self.user,
                msg=msg,
            )
            # Send notification
            self.devices.send_message(
                title=title,
                body=msg,
                data={
                    'action': None,
                    'relation': None,
                    'notification_pk': None,
                    'reminder': None,
                    'to_open': to_open,
                    'doctor_id': doctor_id,
                    'speciality': speciality
                }
            )

    def send_email_notification(self, subject, msg):
        """Send email"""
        context = {
            'title': subject,
            'message': msg
        }
        html_message = render_to_string(
            'email/email_message.html',
            context
        )

        send_mail(
            subject=subject,
            from_email=settings.DEFAULT_FROM_EMAIL,
            message=None,
            recipient_list=[self.user.email],
            fail_silently=True,
            html_message=html_message
        )

    def send_appointment_email_notification(self, subject, msg, relation):
        app_id = to_global_id(
            type=AppointmentType._meta.name,
            id=relation
        ) if relation else None

        res = requests.post(
            FIREBASE_API_URL,
            json={
              "dynamicLinkInfo": {
                    "domainUriPrefix": "https://link.mshfa.app",
                    "link": (
                        f"{settings.DOMAIN}/future-appointments/"
                        f"details/{app_id}?type=appointment&id={app_id}"
                    ),
                    "androidInfo": {
                        "androidPackageName": "app.mshfa.mshfa"
                    },
                    "iosInfo": {
                        "iosBundleId": "app.mshfa.mshfa"
                    }
                }
            }
        )

        if res.status_code == 200:
            data = res.json()
            link = data.get('shortLink')

            context = {
                'username': self.user.full_name,
                'title': subject,
                'message': msg,
                'link': link
            }
            html_message = render_to_string(
                'email/appointment_message.html',
                context
            )

            send_mail(
                subject=subject,
                from_email=settings.DEFAULT_FROM_EMAIL,
                message=None,
                recipient_list=[self.user.email],
                fail_silently=True,
                html_message=html_message
            )

    def send_sms_notification(self, msg):
        """Send SMS"""
        if settings.TWILIO_SEND_SMS:
            client = Client(
                settings.TWILIO_ACCOUNT_SID,
                settings.TWILIO_AUTH_TOKEN
            )
            client.messages.create(
                messaging_service_sid=settings.TWILIO_MESSAGING_SID,
                body=msg,
                to=self.user.phone
            )
