from django.urls import path
from .views import activate
urlpatterns=[
    path('activation/<uidb64>/<token>/' ,activate , name='activation' ),
]