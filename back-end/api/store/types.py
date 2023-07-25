import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id
from graphql_jwt.decorators import login_required, user_passes_test

from .connections import CountableConnection
from apps.store.models import Products , Variation , Category , MultipleImages


class MultipleImagesType(DjangoObjectType):

    class Meta:
        model = MultipleImages
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = ["image"]
    def resolve_image(self, info, **kwargs):
        if self.image:
            return self.image.url
        return None

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"
    def resolve_image(self, info, **kwargs):
        if self.image:
            return self.image.url
        return None

class ProductType(DjangoObjectType):
    category=graphene.Field(CategoryType)
    images = graphene.List(MultipleImagesType)
    class Meta:
        model = Products
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"

    def resolve_category(self, info, **kwargs):
        return self.category

    def resolve_image(self, info, **kwargs):
        if self.image:
            return self.image.url
        return None

    def resolve_images(self, info, **kwargs):
        return self.images.all()


class VariationType(DjangoObjectType):
    product=graphene.Field(ProductType)
    class Meta:
        model = Variation
        interfaces = (relay.Node,)
        connection_class = CountableConnection
        fields = "__all__"

    def resolve_product(self , info , **kwargs):
        return self.product


