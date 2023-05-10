from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.tokens import default_token_generator
from django.contrib import messages
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode , urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model
# Create your views here.
def activate(request , uidb64 , token):
    try:
        uid =urlsafe_base64_decode(uidb64).decode()
        user=get_user_model()._default_manager.get(pk=uid)

    except(ValueError , TypeError , get_user_model().DoesNotExist , OverflowError):
        user=None

    if user and default_token_generator.check_token(user , token):
        user.is_active=True
        user.save()

        return HttpResponseRedirect('/verification-success/')

    else:
        return HttpResponseRedirect('/verification-fail/')