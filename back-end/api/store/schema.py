import graphene
import graphql_jwt

from .mutations import (
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    CreateVariation,
    UpdateVariation,
    DeleteVariation,

    )
from .queries import storeQuery

# class CustomerMutations(graphene.ObjectType):
#     customer_signup = CustomerSignUp.Field()
#     customer_update= CustomerUpdate.Field()
#     customer_delete= CustomerDelete.Field()


class StoreQueries(storeQuery):
    pass
class StoreMutations(graphene.ObjectType):
    create_category = CreateCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()
    create_variation = CreateVariation.Field()
    update_variation = UpdateVariation.Field()
    delete_variation = DeleteVariation.Field()
