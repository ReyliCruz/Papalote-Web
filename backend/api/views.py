from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404

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

class UsuarioRecompensaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioRecompensa.objects.all()
    serializer_class = UsuarioRecompensaSerializer

class UsuarioProgresoDesafioViewSet(viewsets.ModelViewSet):
    queryset = UsuarioProgresoDesafio.objects.all()
    serializer_class = UsuarioProgresoDesafioSerializer

class ZonaViewSet(viewsets.ModelViewSet):
    queryset = Zona.objects.all()
    serializer_class = ZonaSerializer

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

class ObjetivoViewSet(viewsets.ModelViewSet):
    queryset = Objetivo.objects.all()
    serializer_class = ObjetivoSerializer

class PaginaExhibicionViewSet(viewsets.ModelViewSet):
    queryset = PaginaExhibicion.objects.all()
    serializer_class = PaginaExhibicionSerializer

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

class MultimediaRedSocialViewSet(viewsets.ModelViewSet):
    queryset = MultimediaRedSocial.objects.all()
    serializer_class = MultimediaRedSocialSerializer

class PreferenciaViewSet(viewsets.ModelViewSet):
    queryset = Preferencia.objects.all()
    serializer_class = PreferenciaSerializer

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
                    {"detail": "Autenticación exitosa.", 
                     "id_usuario": str(usuario.id_usuario),
                     "nombre": usuario.nombre,
                     "apellido": usuario.apellido,
                     "correo": usuario.correo,
                     "fecha_nacimiento": usuario.fecha_nacimiento,
                     "fecha_registro": usuario.fecha_registro,
                     "foto_perfil": usuario.foto_perfil.url if usuario.foto_perfil else None,
                     "rol": usuario.rol.nombre_rol if usuario.rol else None,
                     "idioma": usuario.idioma.codigo_idioma if usuario.idioma else None,
                     "tema": usuario.tema.nombre_tema if usuario.tema else None,
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"detail": "Contraseña incorrecta."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CodigoAccesoView(APIView):
    def get(self, request):
        try:
            configuracion = ConfiguracionGeneral.objects.first()
            if configuracion:
                return Response({"codigo_acceso": configuracion.codigo_acceso}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Configuración general no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except ConfiguracionGeneral.DoesNotExist:
            return Response({"detail": "Configuración general no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
class ZonaDetailView(APIView):
    def get(self, request, name):
        zona = get_object_or_404(Zona, nombre=name)
        
        num_exhibiciones = Exhibicion.objects.filter(zona=zona).count()
        
        multimedia = MultimediaZona.objects.filter(zona=zona).values_list('url_recurso', flat=True)
        
        data = {
            "id": zona.id,
            "nombre": zona.nombre,
            "numero_exhibiciones": num_exhibiciones,
            "logo": zona.logo,
            "mensaje_es": zona.mensaje_es,
            "mensaje_en": zona.mensaje_en,
            "descripcion_es": zona.descripcion_es,
            "descripcion_en": zona.descripcion_en,
            "multimedia": list(multimedia)
        }
        
        return Response(data, status=status.HTTP_200_OK)
    
class ExhibicionDetailView(APIView):
    def get(self, request, name):
        exhibicion = get_object_or_404(Exhibicion, nombre=name)
        
        objetivos = Objetivo.objects.filter(exhibicion=exhibicion).values('descripcion_es', 'descripcion_en')
        
        data = {
            "id": exhibicion.id,
            "nombre": exhibicion.nombre,
            "zona": exhibicion.zona.nombre,
            "img": exhibicion.img,
            "piso": exhibicion.piso,
            "disponibilidad": exhibicion.disponibilidad,
            "latitud": exhibicion.latitud,
            "longitud": exhibicion.longitud,
            "mensaje_es": exhibicion.mensaje_es,
            "mensaje_en": exhibicion.mensaje_en,
            "objetivos": list(objetivos),
        }
        
        return Response(data, status=status.HTTP_200_OK)
