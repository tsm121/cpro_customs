from rest_framework import serializers
from backend.models import Transaction, Product, TransactionProduct
import uuid


class TransactionSerializer(serializers.ModelSerializer):
    products = serializers.StringRelatedField(many=True, default=[])
    
    class Meta:
        model = Transaction
        fields = ('id_number', 'license_plate', 'date', 'taxes_and_fees', 'reference_number', 'products')

    def create(self, validated_data):
        transaction_product_data = validated_data.pop('products')
        validated_data['id_number'] = uuid.uuid4()  
        transaction = Transaction.objects.create(**validated_data)
        for transaction_product in transaction_product_data:
            product_data = transaction_product.pop('product')
            product = Product.objects.create(**product_data)
            TransactionProduct.objects.create(transaction=transaction, product=product, **transaction_product)
        return transaction


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('type_of_product')


'''
class TransactionProductSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer()
    product = ProductSerializer()

    class Meta:
        model = TransactionProduct
        fields = ('price', 'weight', 'volume', 'pieces')
'''
