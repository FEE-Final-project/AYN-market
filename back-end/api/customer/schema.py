import graphene
import graphql_jwt

from .mutations import (
    CustomerSignUp,
    CustomerUpdate,
    CustomerDelete,
    AddToWishList,
    RemoveFromWishList
    )
from .queries import CustomerQuery

class CustomerMutations(graphene.ObjectType):
    customer_signup = CustomerSignUp.Field()
    customer_update= CustomerUpdate.Field()
    customer_delete= CustomerDelete.Field()
    add_to_wish_list = AddToWishList.Field()
    remove_from_wish_list = RemoveFromWishList.Field()


class CustomerQueries(CustomerQuery):
    pass
