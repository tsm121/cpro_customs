from rest_framework import serializers
from backend.models import Transaction, Product, TransactionProduct
import uuid


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('type_of_product')


class TransactionProductSerializer(serializers.ModelSerializer):
   # transaction = TransactionSerializer()
   # product = ProductSerializer()

    #product = serializers.StringRelatedField()
    
    class Meta:
        model = TransactionProduct
        fields = ('price', 'weight', 'volume', 'pieces', 'product')


class TransactionSerializer(serializers.ModelSerializer):
    #products = serializers.StringRelatedField(many=True, default=[])
    products = TransactionProductSerializer(many=True, default=[])

    class Meta:
        model = Transaction
        fields = ('id_number', 'license_plate', 'date', 'taxes_and_fees', 'reference_number', 'products')

    def create(self, validated_data):
        transaction_product_data = validated_data.pop('products')
        validated_data['id_number'] = uuid.uuid4()  
        transaction = Transaction.objects.create(**validated_data)
        for transaction_product in transaction_product_data:
            product = transaction_product.pop('product')
            TransactionProduct.objects.create(transaction=transaction, product=product, **transaction_product)
        return transaction


