import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id
from graphql_jwt.decorators import login_required, user_passes_test
from api.store.connections import CountableConnection
from apps.carts.models import Cart
from apps.carts.models import CartItems


class CartItemsType(DjangoObjectType):

    class Meta:
        model = CartItems
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"

    def resolve_total_amount(self , info , **kwargs):
        return self.total

class CartType(DjangoObjectType):
    cart_items = graphene.List(CartItemsType)
    total_amount = graphene.Int()
    class Meta:
        model = Cart
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"
    def resolve_cart_items(self, info, **kwargs):
        return self.cart_items.all()
    def resolve_total_amount(self , info , **kwargs):
        return self.total

