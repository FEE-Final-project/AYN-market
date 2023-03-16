from graphql_jwt.utils import get_payload
from .utils import get_user_by_payload


def get_user_by_token(token, context=None):
    payload = get_payload(token, context)
    return get_user_by_payload(payload)
