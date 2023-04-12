from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
import graphene
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay.node.node import from_global_id

from apps.user.models import User
from .types import CartType, CartItemsType

class CartQuery(graphene.ObjectType):
    cart_list = graphene.List(
        CartType,
    )
    cart_details = relay.Node.Field(CartType)
    cart_items_details = relay.Node.Field(CartItemsType , id=graphene.ID())
    cart_items_list = graphene.List(
        CartItemsType,
    )

    @login_required
    @user_passes_test(
        lambda u: u.is_staff is True
    )
    def resolve_cart_list(self, info, **kwargs):
        return Cart.objects.all()

    @login_required

    def resolve_cart_items_list(self, info, **kwargs):
        if info.context.user.is_staff:
            return CartItems.objects.all()
        else:
            return CartItems.objects.filter(user=info.context.user)
    
    @login_required
    def resolve_cart_items_details(self, info, **kwargs):
        cart_items = CartItems.objects.get(id=from_global_id(kwargs.get('id'))[1])
        if info.context.user == cart_items.user:
            return cart_items
        else:
            return None