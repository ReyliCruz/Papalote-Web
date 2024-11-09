from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class ConfiguracionGeneralSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = ConfiguracionGeneral
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['logo'] = instance.logo
        return rep

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
    foto_perfil = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True},
            'foto_perfil': {'required': False},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.context['request'].method in ['PATCH', 'PUT']:
            self.fields.pop('password_hash', None)

    def create(self, validated_data):
        if 'password_hash' in validated_data:
            validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return super().create(validated_data)
    
    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['foto_perfil'] = instance.foto_perfil
        return rep

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
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Recompensa
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['img'] = instance.img
        return rep

class DesafioSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Desafio
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['img'] = instance.img
        return rep

class UsuarioRecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRecompensa
        fields = '__all__'

class UsuarioProgresoDesafioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioProgresoDesafio
        fields = '__all__'

class ZonaSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Zona
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['logo'] = instance.logo
        return rep

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
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Exhibicion
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['img'] = instance.img
        return rep

class ObjetivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objetivo
        fields = '__all__'

class PaginaExhibicionSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = PaginaExhibicion
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['img'] = instance.img
        return rep

class CodigoQRSerializer(serializers.ModelSerializer):
    codigo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CodigoQR
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['codigo'] = instance.codigo
        return rep

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
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Emoji
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['img'] = instance.img
        return rep

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

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class MultimediaRedSocialSerializer(serializers.ModelSerializer):
    url_recurso = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = MultimediaRedSocial
        fields = '__all__'

    def to_representation(self, instance):
        """Override to return only the Cloudinary URL."""
        rep = super().to_representation(instance)
        rep['url_recurso'] = instance.url_recurso
        return rep

class PreferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = '__all__'