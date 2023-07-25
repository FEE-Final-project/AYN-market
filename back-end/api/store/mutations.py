import graphene
import pytz

from datetime import timedelta, datetime
from django.db.models import Q
from django.utils import timezone
from django.utils.translation import gettext as _
from django.conf import settings
from graphene import relay
from graphene_file_upload.scalars import Upload as FileUpload
from graphql_jwt.decorators import (
    login_required,
    user_passes_test
)
from graphql_relay.node.node import from_global_id
# from apps.user.tasks import send_create_a_password
from apps.user.models import (
    User,
)
from django.contrib.auth import get_user_model

from apps.store.models import Products , Category , Variation , MultipleImages
from .types import ProductType , VariationType , CategoryType

class CreateProduct(relay.ClientIDMutation):
    product = graphene.Field(ProductType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Input:
        name = graphene.String(required=True)
        description = graphene.String()
        price = graphene.Int(required=True)
        stock = graphene.Int(required=True)
        category = graphene.ID()
        image = FileUpload()
        is_available = graphene.Boolean(required=True)
        images = graphene.List(FileUpload)

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):

        try:
            product_name = input.get('name')
            if Products.objects.filter(product_name=product_name).exists():
                raise Exception('Product already exists')
            Category_id = input.get('category')
            if Category_id and not Category.objects.filter(id=from_global_id(Category_id)[1]).exists():
                raise Exception('Category with these id does not exist')
                category = Category.objects.get(id=from_global_id(Category_id)[1])
                input['category'] = category
            price = input.get('price')
            stock = input.get('stock')
            description = input.get('description')
            is_available = input.get('is_available')
            image = input.get('image')
            product = Products.objects.create(
                product_name=product_name,
                description=description,
                price=price,
                stock=stock,
                is_available=is_available,
                image=image
            )
            if input.get('category'):
                category_id = from_global_id(input.get('category'))[1]
                category = Category.objects.filter(id=category_id).exists()
                if not category:
                    raise Exception('Category does not exist')
                category = Category.objects.get(id=category_id)
                product.category = category


            if input.get('images'):
                for image in input.get('images'):
                    MultipleImages.objects.create(
                        product=product,
                        image=image
                    )
            product.save()
            return CreateProduct(product=product, success=True)
        except Exception as e:
            return CreateProduct(success=False, errors=[str(e)])

class UpdateProduct(relay.ClientIDMutation):
    product=graphene.Field(ProductType)
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)
        product_name = graphene.String()
        description = graphene.String()
        price = graphene.Int()
        stock = graphene.Int()
        category = graphene.ID()
        image = FileUpload()
        is_available = graphene.Boolean()
        images = graphene.List(FileUpload)

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            product_id = from_global_id(input.get('id'))[1]
            product = Products.objects.filter(id=product_id).exists()
            if not product:
                raise Exception('Product does not exist')

            product = Products.objects.get(id=product_id)
            input.pop('id')
            if input.get('category'):
                category_id = from_global_id(input.get('category'))[1]
                category = Category.objects.filter(id=category_id).exists()
                if not category:
                    raise Exception('Category does not exist')
                category = Category.objects.get(id=category_id)
                input['category'] = category
            if input.get('images'):
                for image in input.get('images'):
                    MultipleImages.objects.create(
                        product=product,
                        image=image
                    )
            input.pop('images')
            for key, value in input.items():
                setattr(product, key, value)
            product.save()
            return UpdateProduct(product=product, success=True)
        except Exception as e:
            return UpdateProduct(success=False, errors=[str(e)])

class DeleteProduct(relay.ClientIDMutation):
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            product_id = from_global_id(input.get('id'))[1]
            product = Products.objects.filter(id=product_id).exists()
            if not product:
                raise Exception('Product does not exist')
            product = Products.objects.get(id=product_id)
            product.delete()
            return DeleteProduct(success=True)
        except Exception as e:
            return DeleteProduct(success=False, errors=[str(e)])

class CreateCategory(relay.ClientIDMutation):
    category = graphene.Field(CategoryType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Input:
        name = graphene.String(required=True)
        description = graphene.String()
        image = FileUpload()
        print(image)
    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):

        try:
            print(info.context.user ,"hi")
            category_name = input.get('name')
            if Category.objects.filter(category_name=category_name).exists():
                raise Exception('Category already exists')
            description = input.get('description')
            image = input.get('image')
            print(image)
            category = Category.objects.create(
                category_name=category_name,
                description=description,
                image=image
            )
            return CreateCategory(category=category, success=True)
        except Exception as e:
            return CreateCategory(success=False, errors=[str(e)])

class UpdateCategory(relay.ClientIDMutation):
    category=graphene.Field(CategoryType)
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)
        category_name = graphene.String()
        description = graphene.String()
        image = FileUpload()

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            category_id = from_global_id(input.get('id'))[1]
            category = Category.objects.filter(id=category_id).exists()
            if not category:
                raise Exception('Category does not exist')
            category = Category.objects.get(id=category_id)
            input.pop('id')

            if input.get('category_name'):
                if Category.objects.filter(category_name=input.get('category_name')).exists():
                    raise Exception('Category already exists')

            for key, value in input.items():
                setattr(category, key, value)
            category.save()
            return UpdateCategory(category=category, success=True)
        except Exception as e:
            return UpdateCategory(success=False, errors=[str(e)])

class DeleteCategory(relay.ClientIDMutation):
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            category_id = from_global_id(input.get('id'))[1]
            category = Category.objects.filter(id=category_id).exists()
            if not category:
                raise Exception('Category does not exist')
            category = Category.objects.get(id=category_id)
            category.delete()
            return DeleteCategory(success=True)
        except Exception as e:
            return DeleteCategory(success=False, errors=[str(e)])

class CreateVariation(relay.ClientIDMutation):
    variation=graphene.Field(VariationType)
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        product_id=graphene.ID(required=True)
        variation_category = graphene.ID(required=True)
        variation_value = graphene.Int(required=True)
        is_active = graphene.Boolean()

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            var_category=input.get('variation_category')
            var_value=input.get('variation_value')
            product_id=from_global_id(input.get('product_id'))[1]
            product=Products.objects.filter(id=product_id).exists()
            if not product:
                raise Exception('Product does not exist')
            product=Products.objects.get(id=product_id)
            if Variation.objects.filter(variation_category=var_category, variation_value=var_value, product=product).exists():
                raise Exception('Variation already exists')
            variation=Variation.objects.create(
                product=product,
                variation_category=var_category,
                variation_value=var_value,
                is_active=input.get('is_active')
            )
            return CreateVariation(variation=variation, success=True)
        except Exception as e:
            return CreateVariation(success=False, errors=[str(e)])

class UpdateVariation(relay.ClientIDMutation):
    variation=graphene.Field(VariationType)
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)
        product_id=graphene.ID()
        variation_category = graphene.String()
        variation_value = graphene.Int()
        is_active = graphene.Boolean()

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            var_id=from_global_id(input.get('id'))[1]
            if not Variation.objects.filter(id=var_id).exists():
                raise Exception('Variation does not exist')
            variation=Variation.objects.get(id=var_id)
            input.pop('id')
            pro_id=from_global_id(input.get('product_id'))[1]
            if pro_id and not Products.objects.filter(id=pro_id).exists():
                raise Exception('Product does not exist')
            if pro_id:
                input['product']=Products.objects.get(id=pro_id)
            for key, value in input.items():
                setattr(variation, key, value)
            variation.save()
            return UpdateVariation(variation=variation, success=True)
        except Exception as e:
            return UpdateVariation(success=False, errors=[str(e)])

class DeleteVariation(relay.ClientIDMutation):
    success=graphene.Boolean()
    errors=graphene.List(graphene.String)
    class Input:
        id=graphene.ID(required=True)

    @login_required
    @user_passes_test(lambda user: user.is_staff)
    def mutate_and_get_payload(
        root,
        info,
        **input
    ):
        try:
            var_id=from_global_id(input.get('id'))[1]
            if not Variation.objects.filter(id=var_id).exists():
                raise Exception('Variation does not exist')
            variation=Variation.objects.get(id=var_id)
            variation.delete()
            return DeleteVariation(success=True)
        except Exception as e:
            return DeleteVariation(success=False, errors=[str(e)])





