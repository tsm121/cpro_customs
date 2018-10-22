from django.db import models

# Create your models here.

class Transaction(models.Model):
    id_number = models.CharField(max_length=255)
    license_plate = models.CharField(max_length=255)
    date = models.DateTimeField(default=0)
    taxes_and_fees = models.FloatField(default=0)
    reference_number = models.CharField(max_length=255, default=0)

    def __str__(self):
        return self.text

class Product(models.Model):
    type_of_product = models.CharField(max_length=255)

    def __str__(self):
        return self.text

class TransactionProduct(models.Model):
    transaction = models.ForeignKey(Transaction, related_name='products', on_delete=models.PROTECT, default=None)
    product = models.ForeignKey(Product, related_name='transaction', on_delete=models.PROTECT, default=None)
    price = models.FloatField(default=0)
    weight = models.FloatField(default=None)
    volume = models.FloatField(default=None)
    pieces = models.IntegerField(default=None)

    def __str__(self):
        return self.text

