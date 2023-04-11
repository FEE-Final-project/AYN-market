import graphene
import pytz

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


class CreateCartItem(relay.ClientIDMutation):
    """
    user can create cart item
    """

    cart_item = graphene.Field(CartItemsType)

    class Input:
        product = graphene.ID(required=True)
        quantity = graphene.Int(required=True)
        cart_id = graphene.ID(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        errors = []

        product = Product.objects.get(id=from_global_id(input.get('product'))[1])
        quantity = input.get('quantity')
        user = info.context.user
        cart_id = input.get('cart_id')
        cart = get_obbject_or_create(Cart, id=cart_id)
        if product.quantity < quantity:
            errors.append(_('Product quantity is not enough'))
            return CreateCartItem(
                success=False,
                errors=errors
            )

        cart_item = CartItems.objects.create(
            product=product,
            quantity=quantity,
            user=user,
            cart=cart
        )

        return CreateCartItem(
            success=True,
            cart_item=cart_item
        )

class UpdateCartItem(relay.ClientIDMutation):
    """
    user can update cart item
    """
    cart_item = graphene.Field(CartItemsType)
    class Input:
        id = graphene.ID(required=True)
        quantity = graphene.Int(required=True)
        product = graphene.ID(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
        ):
        errors = []
        id = from_global_id(input.get('id'))[1]
        quantity = input.get('quantity')
        product=None
        product_id = from_global_id(input.get('product'))[1]
        if product_id:
            if not Product.objects.filter(id=product_id).exists():
                errors.append(_('Product not found'))
                return UpdateCartItem(
                    success=False,
                    errors=errors
                )
            product = Product.objects.get(id=product_id)
            if product.quantity < quantity:
                errors.append(_('Product quantity is not enough'))
                return UpdateCartItem(
                    success=False,
                    errors=errors
                )
            input['product'] = product

        cart_item = CartItems.objects.filter(id=id).first()
        if not cart_item:
            errors.append(_('Cart item not found'))
            return UpdateCartItem(
                success=False,
                errors=errors
            )
        for key, value in input.items():
            setattr(cart_item, key, value)
        cart_item.save()
        return UpdateCartItem(
            success=True,
            cart_item=cart_item
        )

class DeleteCartItem(relay.ClientIDMutation):
    """
    user can delete cart item
    """
    class Input:
        id = graphene.ID(required=True)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
        ):
        errors = []
        id = from_global_id(input.get('id'))[1]
        cart_item = CartItems.objects.filter(id=id).first()
        if not cart_item:
            errors.append(_('Cart item not found'))
            return DeleteCartItem(
                success=False,
                errors=errors
            )
        cart_item.delete()
        return DeleteCartItem(
            success=True
        )





