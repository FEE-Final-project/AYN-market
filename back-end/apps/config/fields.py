from django.db import models
class TrimEmailField(models.EmailField):
    """
    Custom EmailField that ignores leading and trailing spaces in data and
    makes it lowercase
    """

    def get_prep_value(self, value):
        original_value = super(TrimEmailField, self).get_prep_value(value)

        if original_value:
            return original_value.strip()

    def pre_save(self, model_instance, add):
        original_value = super(TrimEmailField, self).pre_save(
            model_instance,
            add
        )

        if original_value:
            return original_value.lower().strip()
class TrimCharField(models.CharField):
    """Custom CharField that ignores leading and trailing spaces in data"""

    def get_prep_value(self, value):
        original_value = super(TrimCharField, self).get_prep_value(value)

        if original_value:
            return original_value.strip()

    def pre_save(self, model_instance, add):
        original_value = super(TrimCharField, self).pre_save(
            model_instance,
            add
        )

        if original_value:
            return original_value.strip()
