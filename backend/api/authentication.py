from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

class GlobalAPIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get("X-API-KEY")
        
        if not api_key:
            raise AuthenticationFailed("API Key no proporcionada.")

        if api_key != settings.PAPALOTE_API_KEY:
            raise AuthenticationFailed("API Key inválida.")

        return None
