import graphene

from api.auth.schema import AuthMutations , AuthQueries
from api.customer.schema import CustomerMutations , CustomerQueries
from api.store.schema import StoreQueries , StoreMutations
class Query(AuthQueries , CustomerQueries ,StoreQueries , graphene.ObjectType):
    pass
class Mutation(AuthMutations , CustomerMutations ,StoreMutations , graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)
