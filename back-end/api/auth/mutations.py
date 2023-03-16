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

