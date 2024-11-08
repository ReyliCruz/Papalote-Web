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
router.register(r'dialogo-personajes', DialogoPersonajeViewSet)
router.register(r'tipo-recompensas', TipoRecompensaViewSet)
router.register(r'recompensas', RecompensaViewSet)
router.register(r'desafios', DesafioViewSet)
router.register(r'niveles', NivelViewSet)
router.register(r'nivel-recompensas', NivelRecompensaViewSet)
router.register(r'usuario-recompensas', UsuarioRecompensaViewSet)
router.register(r'usuario-progreso-desafios', UsuarioProgresoDesafioViewSet)
router.register(r'zonas', ZonaViewSet)
router.register(r'zona-traducciones', ZonaTraduccionViewSet)
router.register(r'colores', ColorViewSet)
router.register(r'tipo-recursos', TipoRecursoViewSet)
router.register(r'multimedia-zonas', MultimediaZonaViewSet)
router.register(r'exhibiciones', ExhibicionViewSet)
router.register(r'exhibicion-traducciones', ExhibicionTraduccionViewSet)
router.register(r'objetivos', ObjetivoViewSet)
router.register(r'pagina-exhibiciones', PaginaExhibicionViewSet)
router.register(r'codigo-qr', CodigoQRViewSet)
router.register(r'escaneos', EscaneoViewSet)
router.register(r'interacciones', InteraccionViewSet)
router.register(r'opiniones', OpinionViewSet)
router.register(r'emojis', EmojiViewSet)
router.register(r'publicaciones', PublicacionViewSet)
router.register(r'reacciones', ReaccionViewSet)
router.register(r'favoritos', FavoritoViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'multimedia', MultimediaRedSocialViewSet)
router.register(r'publicaciones', PublicacionTraduccionViewSet)
router.register(r'preferencias', PreferenciaViewSet)

# Exportar las rutas
urlpatterns = router.urls + [
    path('login/', LoginView.as_view(), name='login'),
    path('codigo-acceso/', CodigoAccesoView.as_view(), name='codigo-acceso'),
]