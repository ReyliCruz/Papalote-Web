import uuid
from django.db import models
from .fields import CloudinaryImageField

# Create your models here.

class ConfiguracionGeneral(models.Model):
    nombre_museo = models.CharField(max_length=100)
    logo = CloudinaryImageField(folder="logos")
    sede = models.CharField(max_length=100)
    latitud = models.DecimalField(max_digits=30, decimal_places=20)
    longitud = models.DecimalField(max_digits=30, decimal_places=20)
    color_principal = models.CharField(max_length=10)
    codigo_acceso = models.CharField(max_length=50)
    nombre_personaje = models.CharField(max_length=100)

class Rol(models.Model):
    nombre_rol = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre_rol

class Idioma(models.Model):
    codigo_idioma = models.CharField(max_length=10, unique=True)
    nombre_idioma = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre_idioma

class Tema(models.Model):
    nombre_tema = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre_tema

class Zona(models.Model):
    logo = CloudinaryImageField(folder="zonas")
    nombre = models.CharField(max_length=100)
    mensaje_es = models.TextField(blank=True, null=True)
    mensaje_en = models.TextField(blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.nombre

class Color(models.Model):
    nombre = models.CharField(max_length=50)
    red = models.PositiveIntegerField(default=0)
    green = models.PositiveIntegerField(default=0)
    blue = models.PositiveIntegerField(default=0)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return f"{self.nombre} - ({self.zona.nombre})"

class TipoRecurso(models.Model):
    nombre_tipo = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre_tipo

class MultimediaZona(models.Model):
    img = CloudinaryImageField(folder="multimedia-zonas")
    tipo_recurso = models.ForeignKey(TipoRecurso, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)

class Exhibicion(models.Model):
    latitud = models.DecimalField(max_digits=30, decimal_places=20, blank=True, null=True)
    longitud = models.DecimalField(max_digits=30, decimal_places=20, blank=True, null=True)
    piso = models.IntegerField()
    disponibilidad = models.BooleanField(default=True)
    img = CloudinaryImageField(folder="exhibiciones")
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    mensaje_es = models.TextField(blank=True, null=True)
    mensaje_en = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.nombre} - ({self.zona.nombre})"

class Objetivo(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)

class PaginaExhibicion(models.Model):
    img = CloudinaryImageField(folder="paginas")
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    titulo_es = models.CharField(max_length=100, blank=True, null=True)
    titulo_en = models.CharField(max_length=100, blank=True, null=True)
    contenido_es = models.TextField(blank=True, null=True)
    contenido_en = models.TextField(blank=True, null=True)

class Desafio(models.Model):
    TIPO_DESAFIO_CHOICES = [
        ("Escanear", "Escanear"),
        ("Publicacion", "Publicacion"),
        ("Opinion", "Opinion"),
    ]

    TIPO_RECOMPENSA_CHOICES = [
        ("Insignia", "Insignia"),
        ("Tarjeta", "Tarjeta"),
    ]

    nombre_desafio = models.CharField(max_length=50)
    img_desafio = CloudinaryImageField(folder="desafios")
    valor_meta = models.IntegerField(blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)
    nombre_recompensa = models.CharField(max_length=50, blank=True, null=True)
    img_recompensa = CloudinaryImageField(folder="recompensas")
    tipo_recompensa = models.CharField(max_length=50, blank=True, null=True, choices=TIPO_RECOMPENSA_CHOICES)
    tipo_desafio = models.CharField(max_length=50, blank=True, null=True, choices=TIPO_DESAFIO_CHOICES)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE, blank=True, null=True)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE, blank=True, null=True)

class Usuario(models.Model):
    id_usuario = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=128)
    fecha_nacimiento = models.DateField()
    fecha_registro = models.DateTimeField(auto_now_add=True)
    foto_perfil = CloudinaryImageField(folder="usuarios")
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, blank=True, null=True, default=1)
    idioma = models.ForeignKey(Idioma, on_delete=models.CASCADE, blank=True, null=True, default=1)
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE, blank=True, null=True, default=1)
    tarjeta = models.ForeignKey(
        Desafio,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="usuarios_tarjeta",
        limit_choices_to={"tipo_recompensa": "Tarjeta"}
    )

class UsuarioProgresoDesafio(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    desafio = models.ForeignKey(Desafio, on_delete=models.CASCADE)
    progreso_actual = models.IntegerField(default=0)
    fecha_completado = models.DateTimeField(blank=True, null=True)

class Escaneo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE, blank=True, null=True)
    fecha_escaneo = models.DateTimeField(auto_now_add=True)

class Opinion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    calificacion = models.IntegerField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fecha_opinion = models.DateTimeField(auto_now_add=True)

class Publicacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True)
    img = CloudinaryImageField(folder="social", blank=True, null=True)
    aceptado = models.BooleanField(default=False)
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE, blank=True, null=True)

class Notificacion(models.Model):
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    titulo_es = models.CharField(max_length=100, blank=True, null=True)
    titulo_en = models.CharField(max_length=100, blank=True, null=True)
    descripcion_es = models.TextField(blank=True, null=True)
    descripcion_en = models.TextField(blank=True, null=True)

class Preferencia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    puntaje_quiz = models.IntegerField()
    fecha_registro = models.DateTimeField(auto_now_add=True)



# Modelos que no se implementarán #########################

# Se dejará pendiente
class DialogoPersonaje(models.Model):
    mensaje_es = models.TextField(blank=True, null=True)
    mensaje_en = models.TextField(blank=True, null=True)
    pregunta_quiz = models.BooleanField(default=False)
#####################

# Se dejará pendiente
class Visita(models.Model):
    fecha_entrada = models.DateTimeField()
    fecha_salida = models.DateTimeField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    opinion_experiencia = models.TextField(blank=True, null=True)
#####################

# Se dejará pendiente
class Interaccion(models.Model):
    fecha_inicio = models.DateTimeField()
    fecha_finalizacion = models.DateTimeField()
    exhibicion = models.ForeignKey(Exhibicion, on_delete=models.CASCADE)
    visita = models.ForeignKey(Visita, on_delete=models.CASCADE)
#####################

# Se dejará pendiente
class Emoji(models.Model):
    nombre = models.CharField(max_length=50)
    img = CloudinaryImageField(folder="emojis")
#####################

# Se dejará pendiente
class Reaccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    emoji = models.ForeignKey(Emoji, on_delete=models.CASCADE)
    fecha_reaccion = models.DateTimeField()
#####################

# Se dejará pendiente
class Favorito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    fecha_guardado = models.DateTimeField()
#####################

###########################################################