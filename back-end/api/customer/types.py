import graphene


from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id
from graphql_jwt.decorators import login_required, user_passes_test

from apps.user.models import (
    User
)
from .connections import CountableConnection
from api.store.types import ProductType
class CustomerType(DjangoObjectType):
    wish_list = graphene.List(ProductType)
    class Meta:
        model = User
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"

    def resolve_wish_list(self, info, **kwargs):
        return self.wish_list.all()
