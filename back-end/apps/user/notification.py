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
from graphql_relay.node.node import to_global_id
from apps.user.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from apps.config.utils import TokenGenerator

account_activation_token = TokenGenerator()


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


        self.location = location if location else 'general_info'

        self.tmp_password = tmp_password

    def send_confirmation_link(self):
        """Email activation link"""

        mail_subject= " Please activate you account "
        to_email=self.user.email
        message=render_to_string("email/email_confirm.html" , {
            'user':self.user,
            'domain':settings.DOMAIN,
            'token': account_activation_token.make_token(self.user),
            'uid':urlsafe_base64_encode(force_bytes(self.user.pk)),
        })
        send_message=EmailMessage(mail_subject , message ,to=[to_email])
        send_message.send()



    def send_password_reset_link(self):
        """Send reset password confirmation link"""
        # Create dynamic link:

        cur_site=settings.DOMAIN
        mail_subject= " Reset password "
        to_email=self.user.email
        user = self.user
        message=render_to_string("email/reset_password.html" , {
            'user':user,
            'domain':cur_site,
            'token':account_activation_token.make_token(user),
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        })
        send_message=EmailMessage(mail_subject , message ,to=[to_email])
        send_message.send()

