import graphene
from .mutations import (
    AddToCart,
    RemoveItemFromCart,
    ReduceQuantityOfCartitem,
)
from .queries import CartQuery

class CartMutations(graphene.ObjectType):
    add_to_cart = AddToCart.Field()
    remove_from_cart = RemoveItemFromCart.Field()
    reduce_quantity_of_cartitem = ReduceQuantityOfCartitem.Field()
class CartQueries(CartQuery):
    pass
