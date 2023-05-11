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
from django.utils.http import urlsafe_base64_decode , urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from apps.user.notification import NotificationManager

from .types import CustomerType



class CustomerSignUp(relay.ClientIDMutation):
    """
    Admin can create customer
    """

    customer = graphene.Field(CustomerType)

    class Input:
        password = graphene.String(required=True)
        password_confirmation = graphene.String(required=True)
        email = graphene.String(required=True)
        username=graphene.String(required=True)
        gender = graphene.String()
        phone = graphene.String()

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)


    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        errors = []

        email = input.get('email').lower().strip()
        phone = input.get('phone' , None)
        username=input.get('username')
        password=input.get('password')
        password_confirmation=input.get('password_confirmation')
        if password != password_confirmation:
            errors.append(
                _('password and password confirmation does not match!')
            )

            return CustomerSignUp(success=False, errors=errors)

        email_has_account = User.objects.filter(email=email).exists()
        if email_has_account:
            errors.append(
                _('User with these email already exist!')
            )
            return CustomerSignUp(success=False, errors=errors)

        phone_has_account = User.objects.filter(phone=phone).exists()
        if phone and phone_has_account:
            errors.append(
                _('User with these phone already exist!')
            )

            return CustomerSignUp(success=False, errors=errors)

        username_has_account=User.objects.filter(username=username).exists()
        if username_has_account:
            errors.append(
                _('User with these username already exist!')
            )

            return CustomerSignUp(success=False, errors=errors)

        try:
            customer = User.objects.create_user(
                email=email,
                username=username

            )
            if phone:
                customer.phone = phone
            if input.get('gender'):
                customer.gender=input.get('gender')

            customer.set_password(input.get('password'))

            customer.is_active=True

            customer.save()
            NotificationManager(customer).send_confirmation_link()


            return CustomerSignUp(customer=customer, success=True)
        except Exception as e:
            errors += [e]
            return CustomerSignUp(success=False, errors=errors)


class CustomerUpdate(relay.ClientIDMutation):
    customer=graphene.Field(CustomerType)

    class Input:
        customer_id = graphene.ID(required=True)
        username =graphene.String()
        gender = graphene.String()
        phone = graphene.String()


    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        errors = []
        user = info.context.user
        customer_id = input.get('customer_id')
        customer = User.objects.filter(id=from_global_id(customer_id)[1]).exists()
        if not customer:
            errors.append(
                _('Customer does not exist!')
            )

            return CustomerUpdate(success=False, errors=errors)

        phone = input.get('phone')
        username=input.get('username')
        if phone and User.objects.filter(phone=phone).exclude(id=from_global_id(customer_id)[1]).exists():
            errors.append(
                _('User with these phone already exist!')
            )

            return CustomerUpdate(success=False, errors=errors)
        if username and User.objects.filter(username=username).exclude(id=from_global_id(customer_id)[1]).exists():
            errors.append(
                _('User with these username already exist!')
            )

            return CustomerUpdate(success=False, errors=errors)
        try:
            customer = User.objects.get(id=from_global_id(customer_id)[1])
            if user.id != customer.id:
                errors.append(
                    _(f'You are not allowed to update this customer!')
                )

                return CustomerUpdate(success=False, errors=errors)
            for k , v in input.items():
                if k not in ['customer_id']:
                    setattr(customer, k, v)
            customer.save()
            return CustomerUpdate(customer=customer, success=True)
        except Exception as e:
            errors += [e]
            return CustomerUpdate(success=False, errors=errors)



class CustomerDelete(relay.ClientIDMutation):
    class Input:
        Customer_id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    @login_required
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            customer=User.objects.get(id=from_global_id(input.get('Customer_id'))[1])
            if info.context.user.id == customer.id:
                errors = [
                    _('You are not allowed to delete this customer')
                ]
                return CustomerDelete(success=False, errors=errors)

            customer.delete()
            return CustomerDelete(success=True)
        except Exception:
            errors = [
                _('customer does not exist')
            ]
            return CustomerDelete(success=False, errors=errors)
