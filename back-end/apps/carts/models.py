from django.db import models
from uuid import uuid4
from apps.store.models import Products , Variation
from django.contrib.auth import get_user_model

class Cart(models.Model):
    cart_id=models.CharField(max_length=255 , blank=True , default="a")
    date_added=models.DateField( auto_now=False, auto_now_add=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE , null=True)

    def __str__(self):
        return "cart"
    @property
    def total(self):
        total=0
        for cart_item in self.cart_items.all():
            total += cart_item.sub_total()
        return total

class CartItems(models.Model):
    user=models.ForeignKey(get_user_model(),on_delete=models.CASCADE , null =True)
    variation=models.ManyToManyField(Variation, null=True ,blank=True)
    product=models.ForeignKey(Products, on_delete=models.CASCADE)
    cart=models.ForeignKey(Cart,related_name="cart_items", on_delete=models.CASCADE , null=True)
    quauntity=models.IntegerField(blank=True , null=True , default=1)
    is_active=models.BooleanField(default=True)

    def sub_total(self):
        return self.product.price * self.quauntity

    def __str__(self):
        return self.product.product_name
    class Meta:
        ordering=("-id",)
