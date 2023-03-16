from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):
    """
    The base abstract model mixin for other models
    to avoid duplicates of attributes
    """
    created_at = models.DateTimeField(
        editable=False,
        null=True,
        blank=True,
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        editable=False,
        null=True,
        blank=True,
        auto_now=True
    )

    class Meta:
        abstract = True