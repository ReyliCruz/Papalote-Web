from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path

# Crear el router y registrar las vistas
router = DefaultRouter()
router.register(r'configuracion-general', ConfiguracionGeneralViewSet)
router.register(r'roles', RolViewSet)
router.register(r'idiomas', IdiomaViewSet)
router.register(r'temas', TemaViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'visitas', VisitaViewSet)
router.register(r'dialogos-personaje', DialogoPersonajeViewSet)
router.register(r'desafios', DesafioViewSet)
router.register(r'usuario-progreso-desafios', UsuarioProgresoDesafioViewSet)
router.register(r'zonas', ZonaViewSet)
router.register(r'colores', ColorViewSet)
router.register(r'tipos-recurso', TipoRecursoViewSet)
router.register(r'multimedia-zonas', MultimediaZonaViewSet)
router.register(r'exhibiciones', ExhibicionViewSet)
router.register(r'objetivos', ObjetivoViewSet)
router.register(r'pagina-exhibicion', PaginaExhibicionViewSet)
router.register(r'codigo-qr', CodigoQRViewSet)
router.register(r'escaneos', EscaneoViewSet)
router.register(r'interacciones', InteraccionViewSet)
router.register(r'opiniones', OpinionViewSet)
router.register(r'emojis', EmojiViewSet)
router.register(r'publicaciones', PublicacionViewSet)
router.register(r'reacciones', ReaccionViewSet)
router.register(r'favoritos', FavoritoViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'preferencias', PreferenciaViewSet)

# Exportar las rutas
urlpatterns = router.urls + [
    path('login/', LoginView.as_view(), name='login'),
    path('codigo-acceso/', CodigoAccesoView.as_view(), name='codigo-acceso'),
    path('zona/<str:name>/', ZonaDetailView.as_view(), name='zona-detail'),
    path('exhibicion/<str:name>/', ExhibicionDetailView.as_view(), name='exhibicion-detail'),
    path('exhibitions-by-zone/', ExhibitionsByZoneView.as_view(), name='exhibitions-by-zone'),
    path('paginas/<str:nombre_exhibicion>/', PaginasExhibicionView.as_view(), name='paginas-exhibicion'),
    path('desafios-usuario/<uuid:usuario_id>/', DesafiosUsuarioView.as_view(), name='desafios-usuario'),
    path('insignias/<uuid:usuario_id>/', InsigniasView.as_view(), name='insignias-usuario'),
    path('tarjetas/<uuid:usuario_id>/', TarjetasView.as_view(), name='tarjetas-usuario'),
    path('publicaciones-aceptadas/', PublicacionesAceptadasView.as_view(), name='publicaciones-aceptadas'),
    path('publicaciones-admin/', PublicacionesAdminView.as_view(), name='publicaciones-admin'),
]