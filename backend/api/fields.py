from django.db.models import CharField
from cloudinary.uploader import upload

class CloudinaryImageField(CharField):
    def __init__(self, *args, folder=None, **kwargs):
        self.folder = folder
        kwargs['max_length'] = 255
        kwargs['blank'] = True
        kwargs['null'] = True
        super().__init__(*args, **kwargs)

    def pre_save(self, model_instance, add):
        file = getattr(model_instance, self.attname)

        if file and hasattr(file, 'file'):
            response = upload(file, folder=self.folder)
            image_url = response.get("secure_url", "")

            setattr(model_instance, self.attname, image_url)
            return image_url

        return file
