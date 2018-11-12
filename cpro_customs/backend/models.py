from django.db import models

# Create your models here.

class Transaction(models.Model):
    id_number = models.CharField(max_length=255)
    license_plate = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    amount_to_pay = models.DecimalField(default=0, max_digits=20, decimal_places=2)
    currency = models.CharField(max_length=255)
    reference_number = models.CharField(max_length=255, default=0)


   # def __str__(self):
   #     return self.text

class Product(models.Model):
    type_of_product = models.CharField(max_length=255)

    #def __str__(self):
    #    return self.text

class TransactionProduct(models.Model):
    transaction = models.ForeignKey(Transaction, related_name='products', on_delete=models.PROTECT, default=None)
    product = models.ForeignKey(Product, related_name='transaction', on_delete=models.PROTECT, default=None)
    value = models.DecimalField(default=0, max_digits=20, decimal_places=2)
    currency = models.CharField(max_length=255, default="NOK")
    fee = models.DecimalField(default=0, max_digits=20, decimal_places=2)
    amount = models.DecimalField(default=0, max_digits=20, decimal_places=2)
    vat = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=255)
    breed = models.CharField(max_length=255, blank=True)
    contacted_NFSA = models.NullBooleanField(blank=True)
    registered_NFSA = models.NullBooleanField(blank=True)
    of_EU_origin = models.NullBooleanField(blank=True)
    name = models.CharField(max_length=255, blank=True)


    #def __str__(self):
    #    return self.text

