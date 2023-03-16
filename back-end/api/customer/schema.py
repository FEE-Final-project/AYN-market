import graphene
import graphql_jwt

from .mutations import (
    CustomerSignUp,
    CustomerUpdate,
    CustomerDelete,
    )
from .queries import CustomerQuery

class CustomerMutations(graphene.ObjectType):
    customer_signup = CustomerSignUp.Field()
    customer_update= CustomerUpdate.Field()
    customer_delete= CustomerDelete.Field()


class CustomerQueries(CustomerQuery):
    pass
