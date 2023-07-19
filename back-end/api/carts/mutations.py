import graphene
import pytz
from django.shortcuts import get_object_or_404

from datetime import timedelta, datetime
from django.db.models import Q
from django.utils import timezone
from django.utils.translation import gettext as _
from django.conf import settings
from graphene import relay
from graphene_file_upload.scalars import Upload as FileUpload
from graphql_jwt.decorators import (
    login_required,
    user_passes_test
)
from graphql_relay.node.node import from_global_id
# from apps.user.tasks import send_create_a_password
from apps.user.models import (
    User,
)
from django.contrib.auth import get_user_model
from .types import CartItemsType , CartType
from apps.carts.models import Cart , CartItems
from apps.store.models import Products , Variation



class AddToCart(relay.ClientIDMutation):
    class Input:
        product_id = graphene.ID(required=True)
        quantity = graphene.Int(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
        ):

            user=info.context.user
            session_id = info.context.session.session_key
            errors = []
            product_id = from_global_id(input.get('product_id'))[1]
            if not Products.objects.filter(id=product_id).exists():
                errors.append(_('Product not found'))
                return AddToCart(
                    success=False,
                    errors=errors
                )
            product = Products.objects.get(id=product_id)
            quantity = input.get('quantity')
            if product.stock < quantity:
                errors.append('Product quantity is not enough')
                return AddToCart(
                    success=False,
                    errors=errors
                )
            cart = Cart.objects.get_or_create(cart_id = session_id , user=user)[0]
            cart_item , created = CartItems.objects.get_or_create(
                product=product,
                user=user,
                cart=cart,)
            # update
            if not created:
                if cart_item.user != user:
                    errors.append('You are not allowed to do this')
                    return AddToCart(
                        success=False,
                        errors=errors
                    )
                cart_item.quauntity += quantity
                cart_item.save()
            # create
            else:
                cart_item.quauntity = quantity
                cart_item.save()
            return AddToCart(success=True)
class RemoveItemFromCart(relay.ClientIDMutation):
    class Input:
        cart_item_id = graphene.ID(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
        ):
            user=info.context.user
            errors=[]
            cart_item_id = from_global_id(input.get('cart_item_id'))[1]
            if not CartItems.objects.filter(id=cart_item_id).exists():
                errors.append('Cart item not found')
                return RemoveItemFromCart(
                    success=False,
                    errors=errors
                )
            cart_item = CartItems.objects.get(id=cart_item_id)
            if  cart_item.user != user:
                errors.append(f'You are not allowed to delete this item')
                return RemoveItemFromCart(
                    success=False,
                    errors=errors
                )
            cart_item.delete()
            return RemoveItemFromCart(success=True)

class ReduceQuantityOfCartitem(relay.ClientIDMutation):
    class Input:
        cart_item_id = graphene.ID(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
        ):
            user=info.context.user
            errors=[]
            cart_item_id = from_global_id(input.get('cart_item_id'))[1]
            if not CartItems.objects.filter(id=cart_item_id).exists():
                errors.append(_('Cart item not found'))
                return ReduceQuantityOfCartitem(
                    success=False,
                    errors=errors
                )
            cart_item = CartItems.objects.get(id=cart_item_id)
            if cart_item.user != user:
                errors.append(_('You are not authorized to perform this action'))
                return ReduceQuantityOfCartitem(
                    success=False,
                    errors=errors
                )
            if cart_item.quauntity == 1:
                cart_item.delete()
            else:
                cart_item.quauntity -= 1
                cart_item.save()
            return ReduceQuantityOfCartitem(success=True)






