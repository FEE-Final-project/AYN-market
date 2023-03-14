import uuid
from datetime import timedelta, date
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)




from apps.config.models import (
    TimeStampedModel,
)
from apps.config.fields import TrimCharField, TrimEmailField



#   _   _ ____  _____ ____
#  | | | / ___|| ____|  _ \
#  | | | \___ \|  _| | |_) |
#  | |_| |___) | |___|  _ <
#   \___/|____/|_____|_| \_\
#
class UserManager(BaseUserManager):
    def create_user(self,username, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(username=username,email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self,username, email, password ):
        """Creates and saves a new super user"""
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.role = 1
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    """
    Custom user model that supports using email instead of username
    """

    GENDER = (
        ( 'male', 'Male'),
        ('female', 'Female')
    )

    email = TrimEmailField(
        max_length=255,
        unique=True,
        null=True,
        blank=True
    )
    first_name = TrimCharField(max_length=255, null=True, blank=True)
    last_name = TrimCharField(max_length=255, null=True, blank=True)
    username=TrimCharField(max_length=255, null=True, blank=True)


    gender = models.CharField(
        max_length=255,
        choices=GENDER,
        null=True,
        blank=True,
    )

    phone = TrimCharField(
        max_length=20,
        null=True,
        blank=True,
        unique=True
    )
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_email_confirmed = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['username']

    class Meta:
        db_table = 'user'

    def __str__(self):
        if self.email:
            return self.email
        if self.phone:
            return self.phone



    @property
    def is_admin(self):
        return True if self.role in [User.ROLE.admin, User.ROLE.super_admin] else False

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f'{self.first_name} {self.last_name}'
        return ''

    @property
    def full_gender(self):
        return f'{self.GENDER[self.gender]}' if self.gender else '-'





# class Address(TimeStampedModel):
#     """
#     Story: As a Patient, I want to add my address, so that it can be used for
#     the delivery medicine purpose.
#     """
#     user = models.ForeignKey(
#         User,
#         null=True,
#         blank=True,
#         on_delete=models.CASCADE,
#         related_name='address_list'
#     )
#     area = TrimCharField(max_length=50, null=True, blank=True)
#     block = TrimCharField(max_length=50, null=True, blank=True)
#     street = TrimCharField(max_length=50, null=True, blank=True)
#     avenue = TrimCharField(max_length=255, null=True, blank=True)
#     longitude = models.DecimalField(max_digits=25, decimal_places=20, null=True, blank=True)
#     latitude = models.DecimalField(max_digits=25, decimal_places=20, null=True, blank=True)
#     building = models.IntegerField(null=True, blank=True)
#     apartment = models.IntegerField(null=True, blank=True)
#     additional_info = TrimCharField(max_length=255, null=True, blank=True)
    # is_primary = models.BooleanField(default=False)

    # class Meta:
    #     db_table = 'user_address'

    # def get_address_string(self):
    #     address = []

    #     if self.area:
    #         address.append(self.area)

    #     if self.block:
    #         address.append(str(self.block))

    #     if self.street:
    #         address.append(self.street)

        # if self.building:
        #     address.append(str(self.building))

        # if self.apartment:
        #     address.append(str(self.apartment))

        # address = ', '.join(address)
        # return address

