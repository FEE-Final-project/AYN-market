import graphene

from api.auth.schema import AuthMutations , AuthQueries
from api.customer.schema import CustomerMutations , CustomerQueries
from api.store.schema import StoreQueries
class Query(AuthQueries , CustomerQueries ,StoreQueries , graphene.ObjectType):
    pass
class Mutation(AuthMutations , CustomerMutations , graphene.ObjectType):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)
