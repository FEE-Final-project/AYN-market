from graphql_jwt.utils import get_credentials
from .shortcuts import get_user_by_token


class CustomJSONWebTokenBackend:
    def authenticate(self, request=None, **kwargs):
        if request is None or getattr(request, '_jwt_token_auth', False):
            return None

        token = get_credentials(request, **kwargs)

        if token is not None:
            return get_user_by_token(token, request)

        return None

    def get_user(self, user_id):
        return None
