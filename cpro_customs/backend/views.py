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
    def vat_switch(self, product):
        return {
            'light_beer': self.alcohol_validate(product, 20, 7),
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

        total_value = 0 # The total value of the imported items, excluding fees and vat
        total_vat = 0 # The total vat for the imported items (i.e. 290 NOK per 100 cigarettes)
        total_fees = 0 # Total amount of fees for the imported items (i.e. 5000 NOK to import a horse)
        mva = 0 # The mva for exceeding the total value limit

        total_value_limit = 6000

        low_alcohol_limit = 27 # The max limit for importing alcoholic beverages with less than 22%
        high_alcohol_limit = 4 # The max limit for importing alcoholic beverages with more than 22%
        tobacco_limit = 500 # The max limit for number of units of tobacco
        cigarettes_limit = 400 # The max limit for number of cigarettes
        cigarette_paper_sheath_limit = 400 # The max limit for number of cigarette papers/sheaths

        cost_per_horse = 5000 # The static cost for importing a horse


        data = request.data

        for product in data['products']:
            if not self.vat_switch(product):
                return Response(False)
            total_vat = product['vat']

            # Amount limit validation
            # Tobacco
            if product['type_of_product'] == 'light_beer':
                if product['amount'] > low_alcohol_limit:
                    return Response(False)
                low_alcohol_limit -= product['amount']
            elif product['type_of_product'] == 'beer_and_alcopop':
                if product['amount'] > low_alcohol_limit:
                    return Response(False)
                low_alcohol_limit -= product['amount']
            elif product['type_of_product'] == 'wine':
                if product['amount'] > low_alcohol_limit:
                    return Response(False)
                low_alcohol_limit -= product['amount']
            elif product['type_of_product'] == 'fortified_wine':
                if product['amount'] > low_alcohol_limit:
                    return Response(False)
                low_alcohol_limit -= product['amount']
            elif product['type_of_product'] == 'spirits':
                if product['amount'] > high_alcohol_limit:
                    return Response(False)

            # Alcohol
            elif product['type_of_product'] == 'cigarettes':
                if product['amount'] > cigarettes_limit:
                    return Response(False)
            elif product['type_of_product'] == 'snuff_and_chewing_tobacco':
                if product['amount'] > tobacco_limit:
                    return Response(False)
                tobacco_limit -= product['amount']
            elif product['type_of_product'] == 'smoking_tobacco':
                if product['amount'] > tobacco_limit:
                    return Response(False)
                tobacco_limit -= product['amount']
            elif product['type_of_product'] == 'cigars_and_cigarillos':
                if product['amount'] > tobacco_limit:
                    return Response(False)
                tobacco_limit -= product['amount']
            elif product['type_of_product'] == 'cigarette_paper_and_sheaths':
                if product['amount'] > cigarette_paper_sheath_limit:
                    return Response(False)

            # Fee validation
            # Animal
            if product['type_of_product'] == 'horse':
                if product['fee'] != product['amount']*cost_per_horse:
                    return Response(False)
                total_fees += product['fee']

            total_value += product['value']


        if totale_value > total_value_limit:
            mva = (total_value-total_value_limit)*0.25
            if product['mva'] != mva:
                return Response(False)


        #TODO: create the Transaction in the database

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
