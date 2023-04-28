import graphene

from .mutations import (
    CreateOrder,
)
from .queries import PaymentQuery

class PaymentMutations(graphene.ObjectType):
    create_order = CreateOrder.Field()
class PaymentQueries(PaymentQuery):
    pass
