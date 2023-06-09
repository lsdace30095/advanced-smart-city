"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
from core.settings import STATIC_ROOT, MEDIA_ROOT

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()
application = WhiteNoise(application, root=STATIC_ROOT)
application.add_files(MEDIA_ROOT, prefix='/media/')
