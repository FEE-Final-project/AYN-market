import graphene
from graphql_jwt.decorators import login_required

from .types import AuthType


class AuthQuery(graphene.ObjectType):
    me = graphene.Field(AuthType)

    @login_required
    def resolve_me(self, info, **kwargs):
        me = info.context.user
        return me