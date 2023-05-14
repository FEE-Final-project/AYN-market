from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
import graphene
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay.node.node import from_global_id

from apps.user.models import User
from .types import CartType, CartItemsType
from apps.carts.models import Cart, CartItems

class CartQuery(graphene.ObjectType):
    cart_list = graphene.List(
        CartType,
    )
    cart_details = graphene.Field(CartType)


    @login_required
    @user_passes_test(
        lambda u: u.is_staff is True
    )
    def resolve_cart_list(self, info, **kwargs):
        return Cart.objects.all()

    @login_required
    def resolve_cart_details(self, info, **kwargs):
        return Cart.objects.get(user=info.context.user)

