from django.contrib import admin
from apps.payment.models import Payment , Order , OrderProduct

admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(OrderProduct)