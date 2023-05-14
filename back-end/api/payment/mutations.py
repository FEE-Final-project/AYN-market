import graphene
import pytz
from graphene import InputObjectType, Int, String, Float, Boolean

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
import uuid
from graphql_relay.node.node import from_global_id
from django.db import transaction

from apps.user.models import User
from apps.payment.models import Payment , Order , OrderProduct
from .types import PaymentType , OrderType , OrderProductType
from apps.carts.models import Cart , CartItems

class CreateOrder(relay.ClientIDMutation):
    order = graphene.Field(OrderType)
    class Input:
        # payment = graphene.ID(required=True)
        # address = graphene.String(required=True)
        phone = graphene.String(required=True)
        email = graphene.String(required=True)
        name = graphene.String(required=True)
        cart_id = graphene.ID(required=True)
        first_name = String(required=True)
        last_name = String(required=True)
        phone_number = String(required=True)
        email = String(required=True)
        address_line1 = String(required=True)
        address_line2 = String()
        country = String(required=True)
        state = String(required=True)
        city = String(required=True)
        order_note = String()
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):

        user=info.context.user
        cart = Cart.objects.get(user=user)
        order_number = str(uuid.uuid4()).replace("-", "").upper()[:12]
        try:
            order = Order.objects.create(
                user=user,
                order_number=order_number,
                first_name=input.get('first_name'),
                last_name=input.get('last_name'),
                phone_number=input.get('phone_number'),
                email=input.get('email'),
                address_line1=input.get('address_line1'),
                address_line2=input.get('address_line2'),
                country=input.get('country'),
                state=input.get('state'),
                city=input.get('city'),
                order_note=input.get('order_note'),
                # payment=Payment.objects.get(id=from_global_id(input.get('payment'))[1]),
                # address=input.get('address'),
                order_total=cart.total,
                status="New",
            )
            for items in cart.cart_items.all():
                OrderProduct.objects.create(
                    order=order,
                    product=items.product,
                    quantity=items.quauntity,
                    product_price=items.product.price,
                    is_ordered=True,
                    user=user,
                )
            cart.cart_items.all().delete()
        except:
            return CreateOrder(
                success=False,
                errors=["Something went wrong"]
            )
        return CreateOrder(
            success=True,
            order=order
        )