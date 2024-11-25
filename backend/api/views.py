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
    
class ExposicionesTemporalesView(APIView):
    def get(self, request):
        exposiciones_temporales = Exhibicion.objects.filter(zona__nombre="EXPOSICIONES TEMPORALES")
        
        data = [
            {
                "id": exhibicion.id,
                "nombre": exhibicion.nombre,
                "img": exhibicion.img if exhibicion.img else None,
            }
            for exhibicion in exposiciones_temporales
        ]

        return Response(data, status=status.HTTP_200_OK)

class ExhibitionsByZoneView(APIView):
    def rgb_to_hex(self, r, g, b):
        """Convierte valores RGB a formato hexadecimal."""
        return f"#{r:02x}{g:02x}{b:02x}"

    def get(self, request):
        zonas = Zona.objects.all()
        
        zones_data = []
        for zona in zonas:
            exhibiciones = Exhibicion.objects.filter(zona=zona)
            sub_items = [{"id": exhibicion.id, "name": exhibicion.nombre} for exhibicion in exhibiciones]

            primary_color = Color.objects.filter(zona=zona, nombre='PrimaryColor').first()
            if primary_color:
                color = self.rgb_to_hex(primary_color.red, primary_color.green, primary_color.blue)
            else:
                color = "#CDE5C3"

            multimedia = MultimediaZona.objects.filter(zona=zona)
            images = [{"id": item.id, "img": item.img} for item in multimedia if item.img]

            zone_data = {
                "id": zona.id,
                "text": zona.nombre,
                "color": color,
                "image": zona.logo if zona.logo else None,
                "mensaje": zona.mensaje_es if zona.mensaje_es else None,
                "descripcion": zona.descripcion_es if zona.descripcion_es else None,
                "subItems": sub_items,
                "images": images
            }
            
            zones_data.append(zone_data)
        
        return Response(zones_data)
  
class PaginasExhibicionView(APIView):
    def get(self, request, nombre_exhibicion):
        exhibicion = get_object_or_404(Exhibicion, nombre=nombre_exhibicion)
        
        paginas = PaginaExhibicion.objects.filter(exhibicion=exhibicion)
        
        serializer = PaginaExhibicionSerializer(paginas, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ExhibicionCompletaView(APIView):
    def get(self, request, id):
        exhibicion = get_object_or_404(Exhibicion, id=id)
        
        objetivos = Objetivo.objects.filter(exhibicion=exhibicion).values(
            'id', 'descripcion_es'
        )
        
        paginas = PaginaExhibicion.objects.filter(exhibicion=exhibicion).values(
            'id', 'titulo_es', 'contenido_es', 'img'
        )
        
        opiniones = Opinion.objects.filter(exhibicion=exhibicion).values(
            'id', 'descripcion', 'calificacion', 'fecha_opinion', 'usuario__nombre', 'usuario__apellido'
        )

        data = {
            "id": exhibicion.id,
            "nombre": exhibicion.nombre,
            "zona": exhibicion.zona.nombre,
            "img": exhibicion.img if exhibicion.img else None,
            "piso": exhibicion.piso,
            "disponibilidad": exhibicion.disponibilidad,
            "latitud": exhibicion.latitud,
            "longitud": exhibicion.longitud,
            "mensaje_es": exhibicion.mensaje_es,
            "objetivos": list(objetivos),
            "paginas": list(paginas),
            "opiniones": list(opiniones),
        }
        
        return Response(data, status=status.HTTP_200_OK)
    
class DesafiosUsuarioView(APIView):
    def get(self, request, usuario_id):
        usuario = get_object_or_404(Usuario, id_usuario=usuario_id)
        desafios = Desafio.objects.all()

        completados_ids = UsuarioProgresoDesafio.objects.filter(usuario=usuario, obtenido=True).values_list("desafio_id", flat=True)

        desafios_data = []

        for desafio in desafios:
            if desafio.id in completados_ids:
                progreso_actual = desafio.valor_meta
                obtenido = True
            else:
                progreso_actual = self.calcular_progreso(usuario, desafio)

                if progreso_actual >= desafio.valor_meta:
                    UsuarioProgresoDesafio.objects.update_or_create(
                        usuario=usuario,
                        desafio=desafio,
                        defaults={"obtenido": True}
                    )
                    obtenido = True
                else:
                    obtenido = False

            desafio_data = {
                "id": desafio.id,
                "nombre_desafio": desafio.nombre_desafio,
                "descripcion_es": desafio.descripcion_es,
                "progreso_actual": progreso_actual,
                "valor_meta": desafio.valor_meta,
                "img_desafio": desafio.img_desafio if desafio.img_desafio else None,
                "obtenido": obtenido,
            }
            desafios_data.append(desafio_data)

        return Response(desafios_data)

    def calcular_progreso(self, usuario, desafio):
        if desafio.tipo_desafio == "Escanear":
            if desafio.zona:
                return Escaneo.objects.filter(usuario=usuario, exhibicion__zona=desafio.zona).values("exhibicion").distinct().count()
            elif desafio.exhibicion:
                return Escaneo.objects.filter(usuario=usuario, exhibicion=desafio.exhibicion).count()
            else:
                return Escaneo.objects.filter(usuario=usuario).values("exhibicion").distinct().count()

        elif desafio.tipo_desafio == "Publicacion":
            return Publicacion.objects.filter(usuario=usuario, exhibicion__isnull=False).count()

        elif desafio.tipo_desafio == "Opinion":
            return Opinion.objects.filter(usuario=usuario).values("exhibicion").distinct().count()

        return 0

class BaseRecompensasView(APIView):
    tipo_recompensa = None

    def get(self, request, usuario_id):
        if not self.tipo_recompensa:
            return Response({"detail": "Tipo de recompensa no definido."}, status=400)

        usuario = get_object_or_404(Usuario, id_usuario=usuario_id)

        desafios = Desafio.objects.filter(tipo_recompensa=self.tipo_recompensa)

        recompensas_data = []
        for desafio in desafios:
            progreso_usuario = UsuarioProgresoDesafio.objects.filter(
                usuario=usuario, desafio=desafio
            ).first()

            if not progreso_usuario:
                progreso_actual = self.calcular_progreso(usuario, desafio)
                if progreso_actual >= desafio.valor_meta:
                    progreso_usuario, created = UsuarioProgresoDesafio.objects.get_or_create(
                        usuario=usuario,
                        desafio=desafio,
                        defaults={"obtenido": True}
                    )
                else:
                    progreso_usuario = None

            recompensa_data = {
                "id": desafio.id,
                "nombre_recompensa": desafio.nombre_recompensa,
                "imagen": desafio.img_recompensa if desafio.img_recompensa else None,
                "obtenido": bool(progreso_usuario and progreso_usuario.obtenido),
            }
            recompensas_data.append(recompensa_data)

        return Response(recompensas_data, status=200)

    def calcular_progreso(self, usuario, desafio):
        if desafio.tipo_desafio == "Escanear":
            if desafio.zona:
                return Escaneo.objects.filter(usuario=usuario, exhibicion__zona=desafio.zona).values("exhibicion").distinct().count()
            elif desafio.exhibicion:
                return Escaneo.objects.filter(usuario=usuario, exhibicion=desafio.exhibicion).count()
            else:
                return Escaneo.objects.filter(usuario=usuario).values("exhibicion").distinct().count()

        elif desafio.tipo_desafio == "Publicacion":
            return Publicacion.objects.filter(usuario=usuario, exhibicion__isnull=False).count()

        elif desafio.tipo_desafio == "Opinion":
            return Opinion.objects.filter(usuario=usuario).values("exhibicion").distinct().count()

        return 0

class InsigniasView(BaseRecompensasView):
    tipo_recompensa = "Insignia"

class TarjetasView(BaseRecompensasView):
    tipo_recompensa = "Tarjeta"

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

from django.db.models import Count, Avg, Max, Min, F, Q
from datetime import datetime, timedelta

class EstadisticasView(APIView):
    def get(self, request):
        # Configuración General
        configuracion = ConfiguracionGeneral.objects.first()
        configuracion_data = {
            "nombre_museo": configuracion.nombre_museo if configuracion else None,
            "sede": configuracion.sede if configuracion else None,
            "logo": configuracion.logo if configuracion and configuracion.logo else None,
        }

        # Usuarios y Segmentación por Edad
        total_usuarios = Usuario.objects.count()
        usuarios_por_edad = Usuario.objects.annotate(
            edad=(datetime.now().year - F('fecha_nacimiento__year'))
        ).values("edad").annotate(total=Count("id_usuario")).order_by("edad")

        usuarios_por_rango_edad = {
            "niños": usuarios_por_edad.filter(edad__lte=12).count(),
            "adolescentes": usuarios_por_edad.filter(edad__gt=12, edad__lte=18).count(),
            "adultos": usuarios_por_edad.filter(edad__gt=18, edad__lte=60).count(),
            "adultos_mayores": usuarios_por_edad.filter(edad__gt=60).count(),
        }

        # Visitas derivadas de Escaneos
        total_visitas = Escaneo.objects.distinct("usuario", "fecha_escaneo__date").count()
        visitas_por_zona = Escaneo.objects.values("exhibicion__zona__nombre").annotate(
            total=Count("id")
        ).order_by("-total")

        visitas_por_exhibicion = Escaneo.objects.values("exhibicion__nombre").annotate(
            total=Count("id")
        ).order_by("-total")

        visitas_por_dia = Escaneo.objects.extra(
            select={'day': "DATE(fecha_escaneo)"}
        ).values('day').annotate(total=Count("id")).order_by('day')

        # Opiniones y Calificaciones
        total_opiniones = Opinion.objects.count()
        promedio_calificacion_general = Opinion.objects.aggregate(promedio=Avg("calificacion"))["promedio"]

        opiniones_por_zona = Opinion.objects.values(
            "exhibicion__zona__nombre"
        ).annotate(
            total_opiniones=Count("id"),
            promedio_calificacion=Avg("calificacion"),
        ).order_by("-promedio_calificacion")

        opiniones_por_exhibicion = Opinion.objects.values(
            "exhibicion__nombre"
        ).annotate(
            total_opiniones=Count("id"),
            promedio_calificacion=Avg("calificacion"),
        ).order_by("-promedio_calificacion")

        # Zonas y Exhibiciones
        zonas_data = Zona.objects.annotate(
            total_exhibiciones=Count("exhibicion"),
            total_visitas=Count("exhibicion__escaneo"),
            promedio_calificacion=Avg("exhibicion__opinion__calificacion"),
        ).values(
            "id", "nombre", "total_exhibiciones", "total_visitas", "promedio_calificacion"
        ).order_by("-total_visitas")

        exhibiciones_data = Exhibicion.objects.annotate(
            total_visitas=Count("escaneo"),
            total_opiniones=Count("opinion"),
            promedio_calificacion=Avg("opinion__calificacion"),
        ).values(
            "id", "nombre", "zona__nombre", "total_visitas", "total_opiniones", "promedio_calificacion", "disponibilidad"
        ).order_by("-total_visitas")

        exhibiciones_mas_opinadas = exhibiciones_data[:5]
        exhibiciones_mejor_calificadas = exhibiciones_data.order_by("-promedio_calificacion")[:5]
        exhibiciones_mas_visitadas = exhibiciones_data[:5]
        exhibiciones_menos_visitadas = exhibiciones_data.order_by("total_visitas")[:5]

        # Publicaciones
        total_publicaciones = Publicacion.objects.count()
        publicaciones_aceptadas = Publicacion.objects.filter(aceptado=True).count()
        publicaciones_por_exhibicion = Publicacion.objects.values("exhibicion__nombre").annotate(total=Count("id"))

        # Segmentación por Actividad
        usuarios_activos_30_dias = Escaneo.objects.filter(
            fecha_escaneo__gte=datetime.now() - timedelta(days=30)
        ).values("usuario").distinct().count()

        usuarios_no_activos = total_usuarios - usuarios_activos_30_dias

        # Relación Zonas-Opiniones-Visitas
        zonas_relacionadas = Zona.objects.annotate(
            total_visitas=Count("exhibicion__escaneo"),
            promedio_calificacion=Avg("exhibicion__opinion__calificacion"),
        ).values("nombre", "total_visitas", "promedio_calificacion").order_by("-total_visitas")

        # Dashboard Data
        data = {
            "configuracion_general": configuracion_data,
            "usuarios": {
                "total": total_usuarios,
                "por_edad": list(usuarios_por_edad),
                "por_rango_edad": usuarios_por_rango_edad,
                "activos_30_dias": usuarios_activos_30_dias,
                "no_activos": usuarios_no_activos,
            },
            "visitas": {
                "total": total_visitas,
                "por_dia": list(visitas_por_dia),
                "por_zona": list(visitas_por_zona),
                "por_exhibicion": list(visitas_por_exhibicion),
            },
            "opiniones": {
                "total": total_opiniones,
                "promedio_calificacion_general": promedio_calificacion_general,
                "por_zona": list(opiniones_por_zona),
                "por_exhibicion": list(opiniones_por_exhibicion),
            },
            "zonas": {
                "detalle": list(zonas_data),
                "relacionadas": list(zonas_relacionadas),
            },
            "exhibiciones": {
                "detalle": list(exhibiciones_data),
                "mas_visitadas": list(exhibiciones_mas_visitadas),
                "menos_visitadas": list(exhibiciones_menos_visitadas),
                "mas_opinadas": list(exhibiciones_mas_opinadas),
                "mejor_calificadas": list(exhibiciones_mejor_calificadas),
            },
            "publicaciones": {
                "total": total_publicaciones,
                "aceptadas": publicaciones_aceptadas,
                "por_exhibicion": list(publicaciones_por_exhibicion),
            },
        }

        return Response(data, status=200)
