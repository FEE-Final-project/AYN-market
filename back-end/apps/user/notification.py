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

        # link_type = f'?type=email_confirm&next={self.location}'


            # auth_token = get_token(self.user)
            # refresh_token = create_refresh_token(self.user)

            # link_type += f'&token={auth_token}&refresh_token={refresh_token}'




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
        message=render_to_string("email/reset_password.html" , {
            'user':user,
            'domain':cur_site,
            'token':account_activation_token.make_token(user),
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        })
        send_message=EmailMessage(mail_subject , message ,to=[to_email])
        send_message.send()

    # def send_create_a_password(self):
    #     """Send create new password email (for doctors and pharmacists)"""

    #     # Generate temporary password
    #     tmp_password = uuid.uuid4().hex[:8]
    #     self.user.set_password(tmp_password)
    #     self.user.is_active = True
    #     self.user.save()

    #     # Create dynamic link:
    #     token = (
    #         f'?uid64={urlsafe_base64_encode(force_bytes(self.user.pk))}'
    #         f'&token={account_activation_token.make_token(self.user)}'
    #         f'&type=reset_password'
    #     )

    #     link = f'{settings.DOMAIN}/auth/create-password/{token}'

    #     context = {
    #         'link': link,
    #         'site_name': settings.SITE_NAME,
    #     }
    #     html_message = render_to_string(
    #         'email/create_a_password.html',
    #         context
    #     )

    #     send_mail(
    #         subject='Create a password',
    #         from_email=settings.DEFAULT_FROM_EMAIL,
    #         message=None,
    #         recipient_list=[self.user.email],
    #         fail_silently=True,
    #         html_message=html_message
    #     )
