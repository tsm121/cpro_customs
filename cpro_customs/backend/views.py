from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from backend.models import Transaction, Product
from backend.serializers import TransactionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
import requests

class TransactionList(APIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Transactions(APIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        if(self.validate(request.data['reference_number'])):
            for i in request.data['products']:
                i['product'] = Product.objects.get(type_of_product=i['product']).pk
            serializer = TransactionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'url': 'https://toll.idi.ntnu.no/api/backend/' + serializer.data['id_number']}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_402_PAYMENT_REQUIRED)

    def validate(self, reference_number):
        #implement validation towards the payment service provider here
        #TODO: implement validation using relevant legislation
        return True

class TransactionDetail(APIView):

    def get_object(self, uid):
        try:
            return Transaction.objects.get(id_number=uid)
        except Transaction.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, uid, format=None):
        transaction = self.get_object(uid=uid)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)


class TransactionValidation(APIView):


    ########## ALCOHOL ##########

    def alcohol_validate(self, product, litre_cost, bottle_cost):
        if product['unit'] == 'litre':
            return product['vat'] == product['amount']*litre_cost
        elif product['unit'] == 'bottle':
            return product['vat'] == product['amount']*bottle_cost

    ########## TOBACCO ##########
    def tobacco_validate(self, product, unit_cost):
        return product['vat'] == (product['amount']/100)*unit_cost


    ########## SWITCH IMPLEMENTATION ##########
    def switch(self, product):
        return {
            # 'light_beer': self.alcohol_validate(product, 20, 7),
            'beer_and_alcopop': self.alcohol_validate(product, 20, 7),
            'wine': self.alcohol_validate(product, 60, 45),
            'fortified_wine': self.alcohol_validate(product, 115, 85),
            'spirits': self.alcohol_validate(product, 325, 230),
            'cigarettes': self.tobacco_validate(product, 290),
            'snuff_and_chewing_tobacco': self.tobacco_validate(product, 120),
            'smoking_tobacco': self.tobacco_validate(product, 290),
            'cigars_and_cigarillos': self.tobacco_validate(product, 290),
            'cigarette_paper_and_sheaths': self.tobacco_validate(product, 5),

        }[product['type_of_product']]

    def post(self, request, format=None):
        #TODO: Implement valdiation using relevant legislation
        #TODO: Implement for goods and animals

        for product in request.data['products']:
            if not self.switch(product):
                return Response(False)
        return Response(True)

'''
    def put(self, request, pk, format=None):
        transaction = self.get_object(pk=pk)
        serializer = TransactionSerializer(transaction)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        transaction = self.get_object(pk=pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''
'''
class TransactionDetail(APIView):
    def get(self, request, pk):
        try:
            transaction = Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            return HttpResponse(status=404)
        
        if request.method == 'GET':
            serializer = TransactionSerializer(transaction)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = TransactionSerializer(transaction, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            transaction.delete()
            return HttpResponse(status=204)
'''


class ExchangeRate(APIView):

    def get(self, request, currency):
        if request.method == 'GET':
            r = requests.get('https://api.exchangeratesapi.io/latest?base='+currency.upper())
            data = r.json()
            return Response(data['rates']['NOK'])
