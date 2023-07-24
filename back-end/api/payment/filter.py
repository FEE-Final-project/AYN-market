from apps.payment.models import Payment , Order , OrderProduct
from .types import PaymentType , OrderType , OrderProductType
from django.db.models import Q
import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import to_global_id , from_global_id
import django_filters as filters

class OrderFilter(filters.FilterSet):
    """
    Filter for Order model
    """
    search = filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    status = filters.CharFilter(field_name="status", lookup_expr='exact')
    customer_id = filters.CharFilter(method="filter_customer_id")
    class Meta:
        model = Order
        fields = ["first_name" , "status"]

    def filter_customer_id(self, queryset, name, value):
        """
        Filter by customer_id
        """
        customer_id = from_global_id(value)[1]
        return queryset.filter(user__id=customer_id)