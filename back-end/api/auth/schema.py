import graphene
import graphql_jwt

from .mutations import (
    ObtainJSONWebToken,
)
from .queries import AuthQuery


#      _         _   _
#     / \  _   _| |_| |__
#    / _ \| | | | __| '_ \
#   / ___ \ |_| | |_| | | |
#  /_/   \_\__,_|\__|_| |_|
#            _
#   ___  ___| |__   ___ _ __ ___   __ _
#  / __|/ __| '_ \ / _ \ '_ ` _ \ / _` |
#  \__ \ (__| | | |  __/ | | | | | (_| |
#  |___/\___|_| |_|\___|_| |_| |_|\__,_|
#
class AuthMutations(graphene.ObjectType):
    obtain_token = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    # reset_password = ResetPassword.Field()
    # reset_password_confirm = ResetPasswordConfirm.Field()
    # email_confirm = EmailConfirm.Field()
    # customer_resend_email = ReSendEmail.Field()


class AuthQueries(AuthQuery):
    pass
