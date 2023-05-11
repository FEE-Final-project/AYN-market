import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id
from graphql_jwt.decorators import login_required, user_passes_test

from apps.payment.models import Payment , Order , OrderProduct

class OrderType(DjangoObjectType):
    class Meta:
        model = Order
        interfaces = (relay.Node,)
        # connection_class = CountableConnection
        fields = "__all__"

class OrderProductType(DjangoObjectType):
    class Meta:
        model = OrderProduct
        interfaces = (relay.Node,)
        # connection_class = CountableConnection
        fields = "__all__"

class PaymentType(DjangoObjectType):
    class Meta:
        model = Payment
        interfaces = (relay.Node,)
        # connection_class = CountableConnection
        fields = "__all__"