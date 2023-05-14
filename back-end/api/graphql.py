import graphene

from api.auth.schema import AuthMutations , AuthQueries
from api.customer.schema import CustomerMutations , CustomerQueries
from api.store.schema import StoreQueries , StoreMutations
from api.carts.schema import CartQueries , CartMutations
from api.payment.schema import PaymentQueries , PaymentMutations
class Query(AuthQueries , CustomerQueries ,StoreQueries ,CartQueries,PaymentQueries, graphene.ObjectType):
    pass
class Mutation(AuthMutations , CustomerMutations ,StoreMutations,CartMutations ,PaymentMutations, graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)
