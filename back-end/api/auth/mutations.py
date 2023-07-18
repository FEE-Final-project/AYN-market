import graphene
import graphql_jwt
from django.utils import timezone
from django.contrib.auth import logout
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.conf import settings
from graphene import relay
from graphql_relay.node.node import from_global_id
from graphql_jwt.shortcuts import get_token
from graphql_jwt.refresh_token.shortcuts import create_refresh_token
from graphql_jwt.decorators import (
    login_required,
    user_passes_test
)
from django.contrib.auth import get_user_model

from apps.user.models import User
from django.utils.translation import gettext as _
from .types import AuthType
from api.customer.types import CustomerType
from graphql_jwt.decorators import (
    login_required,
    user_passes_test
)


#      _         _   _
#     / \  _   _| |_| |__
#    / _ \| | | | __| '_ \
#   / ___ \ |_| | |_| | | |
#  /_/   \_\__,_|\__|_| |_|
#


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(CustomerType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        user = info.context.user
        return cls(user=user, success=True, errors=None)

class AdminUserCreate(relay.ClientIDMutation):
    """
    Admin can create superUser
    """

    admin = graphene.Field(AuthType)

    class Input:
        password = graphene.String(required=True)
        password_confirmation = graphene.String(required=True)
        email = graphene.String(required=True)
        username=graphene.String(required=True)
        gender = graphene.String()
        phone = graphene.String()

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        errors = []

        email = input.get('email').lower().strip()
        phone = input.get('phone' , None)
        username=input.get('username')
        password=input.get('password')
        password_confirmation=input.get('password_confirmation')
        if password != password_confirmation:
            errors.append(
                _('password and password confirmation does not match!')
            )

            return CustomerSignUp(success=False, errors=errors)

        email_has_account = User.objects.filter(email=email).exists()
        if email_has_account:
            errors.append(
                _('User with these email already exist!')
            )
            return CustomerSignUp(success=False, errors=errors)

        phone_has_account = User.objects.filter(phone=phone).exists()
        if phone and phone_has_account:
            errors.append(
                _('User with these phone already exist!')
            )

            return CustomerSignUp(success=False, errors=errors)

        username_has_account=User.objects.filter(username=username).exists()
        if username_has_account:
            errors.append(
                _('User with these username already exist!')
            )

            return CustomerSignUp(success=False, errors=errors)

        try:
            admin = User.objects.create_superuser(
                email=email,
                username=username
            )
            if phone:
                customer.phone = phone
            if input.get('gender'):
                customer.gender=input.get('gender')

            admin.set_password(input.get('password'))

            admin.is_active=True

            admin.save()

            return AdminUserCreate(admin=admin, success=True)
        except Exception as e:
            errors += [e]
            return AdminUserCreate(success=False, errors=errors)
