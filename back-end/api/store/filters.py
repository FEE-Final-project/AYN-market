import django_filters as filters

from django.db.models import Q
from graphql_relay.node.node import from_global_id
from apps.store.models import (
    Products,
    Category,
    Variation,
)

class ProductFilter(filters.FilterSet):
    """
    Filter for Product model
    """
    search = filters.CharFilter(field_name="product_name", lookup_expr="icontains")
    price = filters.NumberFilter(lookup_expr="exact")
    price__gt = filters.NumberFilter(field_name="price", lookup_expr="gt")
    price_lt = filters.NumberFilter(field_name="price", lookup_expr="lt")
    is_available = filters.BooleanFilter(lookup_expr="exact")
    category = filters.CharFilter(method="filter_category")

    class Meta:
        model = Products
        fields = ["product_name", "price", "is_available"]

    def filter_category(self, queryset, name, value):
        """
        Filter by category
        """
        try:
            category_id = from_global_id(value)[1]

            return queryset.filter(category__id =category_id)
        except:
            return queryset

class CategoryFilter(filters.FilterSet):
    """
    Filter for Category model
    """
    search = filters.CharFilter(field_name="category_name", lookup_expr="icontains")
    class Meta:
        model = Category
        fields = ["category_name"]


