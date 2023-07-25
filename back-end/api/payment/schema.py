import graphene

from .mutations import (
    CreateOrder,
    Checkout
)
from .queries import PaymentQuery

class PaymentMutations(graphene.ObjectType):
    create_order = CreateOrder.Field()
    checkout = Checkout.Field()
class PaymentQueries(PaymentQuery):
    pass
