import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import (
    user_passes_test
)

from apps.user.models import User
from api.customer.types import CustomerType

class AuthType(DjangoObjectType):
    is_admin = graphene.Boolean()
    role = graphene.String()
    customer = graphene.Field(CustomerType)
    phone = graphene.String()

    class Meta:
        model = User
        interfaces = (relay.Node,)
        fields = (
            'id',
            'role',
            'is_admin',
            'is_active',
        )

    def resolve_is_admin(self, info, **kwargs):
        return True if (
            info.context.user.is_admin

        ) else False

    def resolve_role(self, info, **kwargs):
        return info.context.user.role

    @user_passes_test(lambda user: user.role == 'customer')
    def resolve_customer(self, info):
        return info.context.user