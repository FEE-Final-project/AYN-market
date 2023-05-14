from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
import graphene
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay.node.node import from_global_id

from apps.user.models import User
from apps.payment.models import Payment , Order , OrderProduct
from .types import PaymentType , OrderType , OrderProductType

class PaymentQuery(graphene.ObjectType):
    order_list = graphene.List(OrderType)
    order_details = relay.Node.Field(OrderType)
    order_product_list = graphene.List(OrderProductType)
    order_product_details = relay.Node.Field(OrderProductType)

    def resolve_order_list(self, info, **kwargs):
        return Order.objects.all()

    def resolve_order_details(self, info, **kwargs):
        return Order.objects.get(id=from_global_id(kwargs.get('id'))[1])

    def resolve_order_product_list(self, info, **kwargs):
        return OrderProduct.objects.all()
        
    def resolve_order_product_details(self, info, **kwargs):
        return OrderProduct.objects.get(id=from_global_id(kwargs.get('id'))[1])