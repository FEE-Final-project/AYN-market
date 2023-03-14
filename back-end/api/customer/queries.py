from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
import graphene
from apps.user.models import User
from .types import CustomerType


class CustomerQuery(graphene.ObjectType):
    customer_list = graphene.List(
        CustomerType,
    )
    customer_details = relay.Node.Field(CustomerType)

    def resolve_customer_list(self, info, **kwargs):
        return User.objects.filter(
            is_staff=False,
        )