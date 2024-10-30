from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class ConfiguracionGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionGeneral
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class IdiomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idioma
        fields = '__all__'

class TemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tema
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True},
            'foto_perfil': {'required': False},
        }

    def create(self, validated_data):
        if 'password_hash' in validated_data:
            validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return super().create(validated_data)
    
    def validate_correo(self, value):
        if Usuario.objects.filter(correo=value).exists():
            raise serializers.ValidationError("El usuario con este correo ya existe.")
        return value

class VisitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visita
        fields = '__all__'

class DialogoPersonajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogoPersonaje
        fields = '__all__'

class TipoRecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoRecompensa
        fields = '__all__'

class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa
        fields = '__all__'

class DesafioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desafio
        fields = '__all__'

class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = '__all__'

class NivelRecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelRecompensa
        fields = '__all__'

class UsuarioRecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRecompensa
        fields = '__all__'

class UsuarioProgresoDesafioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioProgresoDesafio
        fields = '__all__'

class ZonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zona
        fields = '__all__'

class ZonaTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZonaTraduccion
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class TipoRecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoRecurso
        fields = '__all__'

class MultimediaZonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultimediaZona
        fields = '__all__'

class ExhibicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibicion
        fields = '__all__'

class ExhibicionTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibicionTraduccion
        fields = '__all__'

class ObjetivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objetivo
        fields = '__all__'

class ObjetivoTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetivoTraduccion
        fields = '__all__'

class PaginaExhibicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaginaExhibicion
        fields = '__all__'

class PaginaExhibicionTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaginaExhibicionTraduccion
        fields = '__all__'

class CodigoQRSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodigoQR
        fields = '__all__'

class EscaneoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escaneo
        fields = '__all__'

class InteraccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaccion
        fields = '__all__'

class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opinion
        fields = '__all__'

class EmojiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emoji
        fields = '__all__'

class PublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = '__all__'

class ReaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaccion
        fields = '__all__'

class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

class NotificacionTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificacionTraduccion
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class MultimediaRedSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultimediaRedSocial
        fields = '__all__'

class PublicacionTraduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicacionTraduccion
        fields = '__all__'

class PreferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = '__all__'