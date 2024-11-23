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

class DesafioViewSet(viewsets.ModelViewSet):
    queryset = Desafio.objects.all()
    serializer_class = DesafioSerializer

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
                     "foto_perfil": usuario.foto_perfil if usuario.foto_perfil else None,
                     "rol": usuario.rol.nombre_rol if usuario.rol else None,
                     "idioma": usuario.idioma.codigo_idioma if usuario.idioma else None,
                     "tema": usuario.tema.nombre_tema if usuario.tema else None,
                     "tarjeta": usuario.tarjeta.img_recompensa if usuario.tarjeta else None,
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
        
class VerificarCodigoAccesoView(APIView):
    def post(self, request):
        codigo_usuario = request.data.get("codigo_acceso", "")

        try:
            configuracion = ConfiguracionGeneral.objects.first()
            if configuracion:
                if configuracion.codigo_acceso == codigo_usuario:
                    return Response({"detail": "Código válido."}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "Código inválido."}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"detail": "Configuración general no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except ConfiguracionGeneral.DoesNotExist:
            return Response({"detail": "Configuración general no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
class ZonaDetailView(APIView):
    def get(self, request, name):
        zona = get_object_or_404(Zona, nombre=name)
        
        num_exhibiciones = Exhibicion.objects.filter(zona=zona).count()
        
        multimedia = MultimediaZona.objects.filter(zona=zona).values_list('img', flat=True)
        
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

class ExhibitionsByZoneView(APIView):
    def get(self, request):
        zonas = Zona.objects.all()
        
        zones_data = []
        for zona in zonas:
            exhibiciones = Exhibicion.objects.filter(zona=zona)
            sub_items = [{"id": exhibicion.id, "name": exhibicion.nombre} for exhibicion in exhibiciones]

            primary_color = Color.objects.filter(zona=zona, nombre='PrimaryColor').first()
            color = f"rgb({primary_color.red}, {primary_color.green}, {primary_color.blue})" if primary_color else None
            
            zone_data = {
                "id": zona.id,
                "text": zona.nombre,
                "color": color,
                "image": zona.logo if zona.logo else None,
                "subItems": sub_items
            }
            
            zones_data.append(zone_data)
        
        return Response(zones_data)
    
class PaginasExhibicionView(APIView):
    def get(self, request, nombre_exhibicion):
        exhibicion = get_object_or_404(Exhibicion, nombre=nombre_exhibicion)
        
        paginas = PaginaExhibicion.objects.filter(exhibicion=exhibicion)
        
        serializer = PaginaExhibicionSerializer(paginas, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class DesafiosUsuarioView(APIView):
    def get(self, request, usuario_id):
        desafios = Desafio.objects.all()
        
        progreso_desafios = UsuarioProgresoDesafio.objects.filter(usuario_id=usuario_id)
        progreso_dict = {progreso.desafio_id: progreso.progreso_actual for progreso in progreso_desafios}

        desafios_data = []
        for desafio in desafios:
            desafio_data = {
                "id": desafio.id,
                "nombre_desafio": desafio.nombre_desafio,
                "descripcion_es": desafio.descripcion_es,
                "progreso_actual": progreso_dict.get(desafio.id, 0),
                "valor_meta": desafio.valor_meta,
                "img_desafio": desafio.img_desafio if desafio.img_desafio else None,
            }
            desafios_data.append(desafio_data)
        
        return Response(desafios_data)

class InsigniasView(APIView):
    def get(self, request, usuario_id):
        usuario = get_object_or_404(Usuario, id_usuario=usuario_id)

        desafios = Desafio.objects.filter(tipo_recompensa="Insignia")

        insignias_data = []
        for desafio in desafios:
            progreso_usuario = UsuarioProgresoDesafio.objects.filter(
                usuario=usuario, desafio=desafio
            ).first()

            insignia_data = {
                "id": desafio.id,
                "nombre_recompensa": desafio.nombre_recompensa,
                "imagen": desafio.img_recompensa if desafio.img_recompensa else None,
                "obtenido": bool(progreso_usuario and progreso_usuario.fecha_completado),
            }
            insignias_data.append(insignia_data)

        return Response(insignias_data, status=status.HTTP_200_OK)


class TarjetasView(APIView):
    def get(self, request, usuario_id):
        usuario = get_object_or_404(Usuario, id_usuario=usuario_id)

        desafios = Desafio.objects.filter(tipo_recompensa="Tarjeta")

        tarjetas_data = []
        for desafio in desafios:
            progreso_usuario = UsuarioProgresoDesafio.objects.filter(
                usuario=usuario, desafio=desafio
            ).first()

            tarjeta_data = {
                "id": desafio.id,
                "nombre_recompensa": desafio.nombre_recompensa,
                "imagen": desafio.img_recompensa if desafio.img_recompensa else None,
                "obtenido": bool(progreso_usuario and progreso_usuario.fecha_completado),
            }
            tarjetas_data.append(tarjeta_data)

        return Response(tarjetas_data, status=status.HTTP_200_OK)

class PublicacionesAceptadasView(APIView):
    def get(self, request):
        publicaciones = Publicacion.objects.filter(aceptado=True)
        
        data = []
        for publicacion in publicaciones:
            usuario = publicacion.usuario
            data.append({
                "id": publicacion.id,
                "id_usuario": str(usuario.id_usuario),
                "nombre": usuario.nombre,
                "foto_perfil": usuario.foto_perfil if usuario.foto_perfil else None,
                "tarjeta": usuario.tarjeta.img_recompensa if usuario.tarjeta else None,
                "descripcion": publicacion.descripcion,
                "img": publicacion.img if publicacion.img else None,
                "id_exhibicion": publicacion.exhibicion.id if publicacion.exhibicion else None,
                "nombre_exhibicion": publicacion.exhibicion.nombre if publicacion.exhibicion else None,
            })
        
        return Response(data, status=status.HTTP_200_OK)
    
class PublicacionesAdminView(APIView):
    def get(self, request):
        publicaciones = Publicacion.objects.all()
        
        data = []
        for publicacion in publicaciones:
            usuario = publicacion.usuario
            data.append({
                "id": publicacion.id,
                "id_usuario": str(usuario.id_usuario),
                "nombre": usuario.nombre,
                "foto_perfil": usuario.foto_perfil if usuario.foto_perfil else None,
                "descripcion": publicacion.descripcion,
                "img": publicacion.img if publicacion.img else None,
                "id_exhibicion": publicacion.exhibicion.id if publicacion.exhibicion else None,
                "nombre_exhibicion": publicacion.exhibicion.nombre if publicacion.exhibicion else None,
                "aceptado": publicacion.aceptado
            })
        
        return Response(data, status=status.HTTP_200_OK)