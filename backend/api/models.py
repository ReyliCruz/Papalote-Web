import uuid
from django.db import models

# Create your models here.

# Configuración general del museo
class ConfiguracionGeneral(models.Model):
    nombre_museo = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/')
    sede = models.CharField(max_length=100)
    latitud = models.DecimalField(max_digits=30, decimal_places=20)
    longitud = models.DecimalField(max_digits=30, decimal_places=20)
    color_principal = models.CharField(max_length=10)
    codigo_acceso = models.CharField(max_length=50)
    nombre_personaje = models.CharField(max_length=100)

# Roles de usuario
class Rol(models.Model):
    nombre_rol = models.CharField(max_length=50)

# Idiomas disponibles
class Idioma(models.Model):
    codigo_idioma = models.CharField(max_length=10, unique=True)
    nombre_idioma = models.CharField(max_length=50)

# Temas que prefieren los usuarios
class Tema(models.Model):
    nombre_tema = models.CharField(max_length=50)

# Modelo de usuario con UUID como clave primaria
class Usuario(models.Model):
    id_usuario = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=128)
    fecha_nacimiento = models.DateField()
    fecha_registro = models.DateTimeField(auto_now_add=True)
    foto_perfil = models.ImageField(upload_to='usuarios/', blank=True, null=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, blank=True, null=True)
    idioma = models.ForeignKey(Idioma, on_delete=models.CASCADE, blank=True, null=True)
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE, blank=True, null=True)

class Visita(models.Model):
    fecha_entrada = models.DateTimeField()
    fecha_salida = models.DateTimeField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    opinion_experiencia = models.TextField(blank=True, null=True)

class DialogoPersonaje(models.Model):
    mensaje = models.TextField()
    idioma = models.ForeignKey(Idioma, on_delete=models.CASCADE)
    pregunta_quiz = models.BooleanField(default=False)

class TipoRecompensa(models.Model):
    nombre_tipo = models.CharField(max_length=50)

class Recompensa(models.Model):
    nombre = models.CharField(max_length=50)
    img = models.ImageField(upload_to='recompensas/')
    tipo_recompensa = models.ForeignKey(TipoRecompensa, on_delete=models.CASCADE)

class Desafio(models.Model):
    nombre = models.CharField(max_length=50)
    img = models.ImageField(upload_to='desafios/')
    valor_meta = models.IntegerField(blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)
    recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE, blank=True, null=True)

class UsuarioRecompensa(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE)
    fecha_obtencion = models.DateTimeField()
    equipado = models.BooleanField(default=False)

class UsuarioProgresoDesafio(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    desafio = models.ForeignKey(Desafio, on_delete=models.CASCADE)
    progreso_actual = models.IntegerField(default=0)
    completado = models.BooleanField(default=False)

class Zona(models.Model):
    logo = models.ImageField(upload_to='zonas/')
    nombre = models.CharField(max_length=100)
    mensaje_es = models.TextField(blank=True, null=True)
    mensaje_en = models.TextField(blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)

class Color(models.Model):
    nombre = models.CharField(max_length=50)
    red = models.PositiveIntegerField(default=0)
    green = models.PositiveIntegerField(default=0)
    blue = models.PositiveIntegerField(default=0)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE, blank=True, null=True)

class TipoRecurso(models.Model):
    nombre_tipo = models.CharField(max_length=50)

class MultimediaZona(models.Model):
    url_recurso = models.URLField()
    tipo_recurso = models.ForeignKey(TipoRecurso, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)

class Exhibicion(models.Model):
    latitud = models.DecimalField(max_digits=30, decimal_places=20, blank=True, null=True)
    longitud = models.DecimalField(max_digits=30, decimal_places=20, blank=True, null=True)
    piso = models.IntegerField()
    disponibilidad = models.BooleanField(default=True)
    img = models.ImageField(upload_to='exhibiciones/', blank=True, null=True)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    mensaje_es = models.TextField(blank=True, null=True)
    mensaje_en = models.TextField(blank=True, null=True)

class Objetivo(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)

class PaginaExhibicion(models.Model):
    img = models.ImageField(upload_to='paginas/')
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    titulo_es = models.CharField(max_length=100, blank=True, null=True)
    titulo_en = models.CharField(max_length=100, blank=True, null=True)
    contenido_es = models.TextField(blank=True, null=True)
    contenido_en = models.TextField(blank=True, null=True)

class CodigoQR(models.Model):
    codigo = models.ImageField(upload_to='qrcodes/', blank=True, null=True)
    fecha_creacion = models.DateTimeField()
    fecha_vencimiento = models.DateTimeField(blank=True, null=True)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)

class Escaneo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    codigo_qr = models.ForeignKey(CodigoQR, on_delete=models.CASCADE)
    fecha_escaneo = models.DateTimeField()

class Interaccion(models.Model):
    fecha_inicio = models.DateTimeField()
    fecha_finalizacion = models.DateTimeField()
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    visita = models.ForeignKey(Visita, on_delete=models.CASCADE)

class Opinion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    calificacion = models.IntegerField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fecha_opinion = models.DateTimeField()

class Emoji(models.Model):
    nombre = models.CharField(max_length=50)
    img = models.ImageField(upload_to='emojis/')

class MultimediaRedSocial(models.Model):
    url_recurso = models.ImageField(upload_to='social/', blank=True, null=True)
    tipo_recurso = models.ForeignKey(TipoRecurso, on_delete=models.CASCADE)

class Publicacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    multimedia = models.ForeignKey(MultimediaRedSocial, on_delete=models.CASCADE)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True)

class Reaccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    emoji = models.ForeignKey(Emoji, on_delete=models.CASCADE)
    fecha_reaccion = models.DateTimeField()

class Favorito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    fecha_guardado = models.DateTimeField()

class Notificacion(models.Model):
    fecha_creacion = models.DateTimeField()
    titulo_es = models.CharField(max_length=100, blank=True, null=True)
    titulo_en = models.CharField(max_length=100, blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)

class Preferencia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    puntaje_quiz = models.IntegerField()
    fecha_registro = models.DateTimeField(auto_now_add=True)
