from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
import graphene
from graphql_jwt.decorators import login_required, user_passes_test

from apps.store.models import Products , Category , Variation
from .types import ProductType , VariationType , CategoryType

class storeQuery(graphene.ObjectType):
    product_list = graphene.List(
        ProductType,
    )
    category_list=graphene.List(
        CategoryType,
    )
    variation_list=graphene.List(
        VariationType,
    )
    product_details = relay.Node.Field(ProductType)
    category_details=relay.Node.Field(CategoryType)
    variation_details=relay.Node.Field(VariationType)

    @login_required
    @user_passes_test(
        lambda u: u.is_staff is True
    )
    def resolve_product_list(self, info, **kwargs):
        return Products.objects.filter(is_available=True)

    @login_required
    @user_passes_test(
        lambda u: u.is_staff is True
    )
    def resolve_variation_list(self , info , **kwargs):

        return Variation.objects.filter(is_active=True)

