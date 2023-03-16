from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from graphql_jwt.utils import jwt_payload
from graphql_jwt import exceptions


def custom_jwt_payload(user, context=None):
    payload = jwt_payload(user, context)
    payload['phone'] = user.phone if user.phone else ''
    payload['email'] = user.email
    return payload


def get_user_by_natural_key(username):
    UserModel = get_user_model()
    try:
        return UserModel.objects.get(
            Q(email__iexact=username) | Q(phone__iexact=username)
        )
    except UserModel.DoesNotExist:
        return None


def get_user_by_payload(payload):
    username = payload.get('email') or payload.get('phone') or None

    if not username:
        raise exceptions.JSONWebTokenError(_('Invalid payload'))

    user = get_user_by_natural_key(username)

    if user is not None and not getattr(user, 'is_active', True):
        raise exceptions.JSONWebTokenError(_('User is disabled'))
    return user
