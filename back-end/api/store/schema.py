import graphene
import graphql_jwt

# from .mutations import (
#     CustomerSignUp,
#     CustomerUpdate,
#     CustomerDelete,
#     )
from .queries import storeQuery

# class CustomerMutations(graphene.ObjectType):
#     customer_signup = CustomerSignUp.Field()
#     customer_update= CustomerUpdate.Field()
#     customer_delete= CustomerDelete.Field()


class StoreQueries(storeQuery):
    pass
