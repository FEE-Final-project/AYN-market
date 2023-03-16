import graphene


from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id
from graphql_jwt.decorators import login_required, user_passes_test

from apps.user.models import (
    User
)
from .connections import CountableConnection

class CustomerType(DjangoObjectType):

    class Meta:
        model = User
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"
    