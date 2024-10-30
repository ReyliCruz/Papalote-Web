from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password

# Create your views here.

class ConfiguracionGeneralViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionGeneral.objects.all()
    serializer_class = ConfiguracionGeneralSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class IdiomaViewSet(viewsets.ModelViewSet):
    queryset = Idioma.objects.all()
    serializer_class = IdiomaSerializer

class TemaViewSet(viewsets.ModelViewSet):
    queryset = Tema.objects.all()
    serializer_class = TemaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VisitaViewSet(viewsets.ModelViewSet):
    queryset = Visita.objects.all()
    serializer_class = VisitaSerializer

class DialogoPersonajeViewSet(viewsets.ModelViewSet):
    queryset = DialogoPersonaje.objects.all()
    serializer_class = DialogoPersonajeSerializer

class TipoRecompensaViewSet(viewsets.ModelViewSet):
    queryset = TipoRecompensa.objects.all()
    serializer_class = TipoRecompensaSerializer

class RecompensaViewSet(viewsets.ModelViewSet):
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer

class DesafioViewSet(viewsets.ModelViewSet):
    queryset = Desafio.objects.all()
    serializer_class = DesafioSerializer

class NivelViewSet(viewsets.ModelViewSet):
    queryset = Nivel.objects.all()
    serializer_class = NivelSerializer

class NivelRecompensaViewSet(viewsets.ModelViewSet):
    queryset = NivelRecompensa.objects.all()
    serializer_class = NivelRecompensaSerializer

class UsuarioRecompensaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioRecompensa.objects.all()
    serializer_class = UsuarioRecompensaSerializer

class UsuarioProgresoDesafioViewSet(viewsets.ModelViewSet):
    queryset = UsuarioProgresoDesafio.objects.all()
    serializer_class = UsuarioProgresoDesafioSerializer

class ZonaViewSet(viewsets.ModelViewSet):
    queryset = Zona.objects.all()
    serializer_class = ZonaSerializer

class ZonaTraduccionViewSet(viewsets.ModelViewSet):
    queryset = ZonaTraduccion.objects.all()
    serializer_class = ZonaTraduccionSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class TipoRecursoViewSet(viewsets.ModelViewSet):
    queryset = TipoRecurso.objects.all()
    serializer_class = TipoRecursoSerializer

class MultimediaZonaViewSet(viewsets.ModelViewSet):
    queryset = MultimediaZona.objects.all()
    serializer_class = MultimediaZonaSerializer

class ExhibicionViewSet(viewsets.ModelViewSet):
    queryset = Exhibicion.objects.all()
    serializer_class = ExhibicionSerializer

class ExhibicionTraduccionViewSet(viewsets.ModelViewSet):
    queryset = ExhibicionTraduccion.objects.all()
    serializer_class = ExhibicionTraduccionSerializer

class ObjetivoViewSet(viewsets.ModelViewSet):
    queryset = Objetivo.objects.all()
    serializer_class = ObjetivoSerializer

class ObjetivoTraduccionViewSet(viewsets.ModelViewSet):
    queryset = ObjetivoTraduccion.objects.all()
    serializer_class = ObjetivoTraduccionSerializer

class PaginaExhibicionViewSet(viewsets.ModelViewSet):
    queryset = PaginaExhibicion.objects.all()
    serializer_class = PaginaExhibicionSerializer

class PaginaExhibicionTraduccionViewSet(viewsets.ModelViewSet):
    queryset = PaginaExhibicionTraduccion.objects.all()
    serializer_class = PaginaExhibicionTraduccionSerializer

class CodigoQRViewSet(viewsets.ModelViewSet):
    queryset = CodigoQR.objects.all()
    serializer_class = CodigoQRSerializer

class EscaneoViewSet(viewsets.ModelViewSet):
    queryset = Escaneo.objects.all()
    serializer_class = EscaneoSerializer

class InteraccionViewSet(viewsets.ModelViewSet):
    queryset = Interaccion.objects.all()
    serializer_class = InteraccionSerializer

class OpinionViewSet(viewsets.ModelViewSet):
    queryset = Opinion.objects.all()
    serializer_class = OpinionSerializer

class EmojiViewSet(viewsets.ModelViewSet):
    queryset = Emoji.objects.all()
    serializer_class = EmojiSerializer

class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer

class ReaccionViewSet(viewsets.ModelViewSet):
    queryset = Reaccion.objects.all()
    serializer_class = ReaccionSerializer

class FavoritoViewSet(viewsets.ModelViewSet):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

class NotificacionTraduccionViewSet(viewsets.ModelViewSet):
    queryset = NotificacionTraduccion.objects.all()
    serializer_class = NotificacionTraduccionSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            correo = serializer.validated_data['correo']
            password = serializer.validated_data['password']

            try:
                usuario = Usuario.objects.get(correo=correo)
            except Usuario.DoesNotExist:
                return Response(
                    {"detail": "Usuario no encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if check_password(password, usuario.password_hash):
                return Response(
                    {"detail": "Autenticación exitosa.", "id_usuario": str(usuario.id_usuario)},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"detail": "Contraseña incorrecta."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)