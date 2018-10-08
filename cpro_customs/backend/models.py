from django.db import models

# Create your models here.

class LicensePlate(models.Model):
    number = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    year_of_issue = models.IntegerField(default=0)
    
    def __str__(self):
        return self.text
