from django import forms
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six


TEST_EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'


class ChoiceArrayField(ArrayField):
    """
    A field that allows us to store an array of choices.
    Uses Django's Postgres ArrayField
    and a MultipleChoiceField for its formfield.
    https://gist.github.com/danni/f55c4ce19598b2b345ef
    """

    def formfield(self, **kwargs):
        defaults = {
            'form_class': forms.MultipleChoiceField,
            'choices': self.base_field.choices,
        }
        defaults.update(kwargs)
        # Skip our parent's formfield implementation completely as we don't
        # care for it.
        # pylint:disable=bad-super-call
        return super(ArrayField, self).formfield(**defaults)


class TokenGenerator(PasswordResetTokenGenerator):
    """Token generator for send mail confirmation links"""

    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) +
            six.text_type(timestamp) +
            six.text_type(user.is_active)
        )


class DictToObj:
    """
    Helper class adds possibility to convert dict to object (for test purposes)
    """

    def __init__(self, data):
        for k, v in data.items():
            if isinstance(v, list):
                setattr(self, k, [
                    DictToObj(i) if isinstance(i, dict) else i for i in v
                ])
            else:
                setattr(self, k, DictToObj(v) if isinstance(v, dict) else v)


def datetime_range(start, end, delta):
    current = start
    while current < end:
        yield current
        current += delta
