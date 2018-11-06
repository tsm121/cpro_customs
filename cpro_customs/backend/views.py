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

    def get_product_amounts(self, products):

        amounts = {
            'beer': 0,
            'alcopop_other': 0,
            'wine': 0,
            'fortified_wine': 0,
            'spirit': 0,
            'cigarettes': 0,
            'snuff_chewing_tobacco': 0,
            'smoking_tobacco': 0,
            'cigars_cigarillos': 0,
            'paper_sheaths': 0,
            'has_tobacco': False,
            'horse': 0,
            'dog': 0
        }

        for product in products:
            if product['type_of_product'] == 'beer':
                amounts['beer'] += product['amount']
            elif product['type_of_product'] == 'alcopop_other':
                amounts['alcopop_other'] += product['amount']
            elif product['type_of_product'] == 'wine':
                amounts['wine'] += product['amount']
            elif product['type_of_product'] == 'fortified_wine':
                amounts['fortified_wine'] += product['amount']
            elif product['type_of_product'] == 'spirit':
                amounts['spirit'] += product['amount']
            elif product['type_of_product'] == 'cigarettes':
                amounts['cigarettes'] += product['amount']
                amounts['has_tobacco'] = True
            elif product['type_of_product'] == 'snuff_chewing_tobacco':
                amounts['snuff_chewing_tobacco'] += product['amount']
                amounts['has_tobacco'] = True
            elif product['type_of_product'] == 'smoking_tobacco':
                amounts['smoking_tobacco'] += product['amount']
                amounts['has_tobacco'] = True
            elif product['type_of_product'] == 'cigars_cigarillos':
                amounts['cigars_cigarillos'] += product['amount']
                amounts['has_tobacco'] = True
            elif product['type_of_product'] == 'paper_sheaths':
                amounts['paper_sheaths'] += product['amount']
            elif product['type_of_product'] == 'horse':
                amounts['horse'] += product['amount']
            elif product['type_of_product'] == 'dog':
                amounts['dog'] += product['amount']

        return amounts

    def get_product_values(self, products):
        values = []

        for product in products:
            values.append(product['value'])

        values.sort(reverse=True)
        return values


    def get_misc_tobacco_amount(self, product_amounts):
        amount_sum = product_amounts['snuff_chewing_tobacco']
        amount_sum += product_amounts['smoking_tobacco']
        amount_sum += product_amounts['cigars_cigarillos']
        return amount_sum

    def get_beer_wine_amount(self, product_amount):
        amount_sum = product_amount['beer']
        amount_sum += product_amount['alcopop_other']
        amount_sum += product_amount['wine']
        amount_sum += product_amount['fortified_wine']



    def get_tax_free_quotas(self, product_amounts):
        quotas = {
            'beer': 2,
            'wine': 1.5,
            'spirit': 1,
            'tobacco_cigarettes': 200,
            'tobacco_other': 250,
            'paper_sheaths': 200
        }

        if product_amounts['spirit'] == 0:
            quotas['wine'] += 1.5
        else:
            if quotas['spirit'] > product_amounts['spirit']:
                quotas['wine'] += quotas['spirit'] - product_amounts['spirit']

        if not product_amounts['has_tobacco']:
            quotas += 1.5
        else:
            if product_amounts['cigarettes'] >= quotas['tobacco_cigarettes']:
                quotas['tobacco_other'] = 0
            elif self.get_misc_tobacco_amount(product_amounts) >= quotas['tobacco_other']:
                quotas['tobacco_cigarettes'] = 0
            elif product_amounts['cigarettes'] >= self.get_misc_tobacco_amount(product_amounts)*1.25:
                quotas['tobacco_other'] = 0

        if quotas['wine'] > product_amounts['wine'] + product_amounts['fortified_wine']:
            quotas['beer'] += quotas['wine'] - ( product_amounts['wine'] + product_amounts['fortified_wine'] )

        return quotas

    def check_valid_amounts(self, absolute_quotas, product_amounts):
        if self.get_beer_wine_amount(product_amounts) > absolute_quotas['beer_wine']:
            return False
        if product_amounts['spirit'] > absolute_quotas['spirit']:
            return False
        if product_amounts['cigarettes'] > absolute_quotas['tobacco_cigarettes']:
            return False
        if self.get_misc_tobacco_amount(product_amounts) > absolute_quotas['tobacco_other']:
            return False
        if product_amounts['paper_sheaths'] > absolute_quotas['paper_sheaths']:
            return False
        return True

    def calculate_vat(self, product_values, tax_free_limit, number_of_people):
        total_value = 0
        tax_free_box = tax_free_limit*number_of_people
        for value in product_values:
            total_value += value
            if value <= tax_free_box:
                tax_free_box -= value
        if total_value > tax_free_limit:
            total_vat = (total_value - (tax_free_limit*number_of_people-tax_free_box)) * 0.25
        else:
            total_vat = 0
        return total_vat

    def post(self, request):
        data = request.data

        product_amounts = self.get_product_amounts(data['products'])
        product_values = self.get_product_values(data['products'])

        tax_free_quotas = self.get_tax_free_quotas(product_amounts)
        absolute_quotas  = {
            'beer_wine': 27,
            'spirit': 4,
            'tobacco_cigarettes': 400,
            'tobacco_other': 500,
            'paper_sheaths': 400
        }
        unit_costs = {
            'beer': 20,
            'alcopop_other': 20,
            'wine': 60,
            'fortified_wine': 115,
            'spirit': 325,
            'cigarettes': 290,
            'snuff_chewing_tobacco': 120,
            'smoking_tobacco': 290,
            'cigars_cigarillos': 290,
            'paper_sheaths': 5,
            'horse': 5000
        }

        total_fees = 0

        if not self.check_valid_amounts(absolute_quotas, product_amounts):
            return Response(False)

        #TODO: Calculate fees
        if product_amounts['beer'] > tax_free_quotas['beer']:
            total_fees += (product_amounts['beer'] - tax_free_quotas['beer']) * unit_costs['beer']
            tax_free_quotas['beer'] = 0
        else:
            tax_free_quotas['beer'] = tax_free_quotas['beer'] - product_amounts['beer']

        if product_amounts['alcopop_other'] > tax_free_quotas['beer']:
            total_fees += (product_amounts['alcopop_other'] - tax_free_quotas['beer']) * unit_costs['alcopop_other']
            tax_free_quotas['beer'] = 0
        else:
            tax_free_quotas['beer'] = tax_free_quotas['beer'] - product_amounts['alcopop_other']

        if product_amounts['wine'] > tax_free_quotas['wine']:
            total_fees += (product_amounts['wine'] - tax_free_quotas['wine']) * unit_costs['wine']
            tax_free_quotas['wine'] = 0
        else:
            tax_free_quotas['wine'] = tax_free_quotas['wine'] - product_amounts['wine']

        if product_amounts['fortified_wine'] > tax_free_quotas['wine']:
            total_fees += (product_amounts['fortified_wine'] - tax_free_quotas['wine']) * unit_costs['fortified_wine']
            tax_free_quotas['wine'] = 0
        else:
            tax_free_quotas['wine'] = tax_free_quotas['wine'] - product_amounts['fortified_wine']

        if product_amounts['spirit'] > tax_free_quotas['spirit']:
            total_fees += (product_amounts['spirit'] - tax_free_quotas['spirit']) * unit_costs['spirit']

        if tax_free_quotas['tobacco_other'] == 0:
            if product_amounts['cigarettes'] > tax_free_quotas['tobacco_cigarettes']:
                total_fees += (product_amounts['cigarettes'] - tax_free_quotas['cigarettes']) * unit_costs['cigarettes']

        if tax_free_quotas['tobacco_cigarettes'] == 0:
            if product_amounts['smoking_tobacco'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['smoking_tobacco'] - tax_free_quotas['tobacco_other']) * unit_costs['smoking_tobacco']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['smoking_tobacco']

            if product_amounts['cigars_cigarillos'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['cigars_cigarillos'] - tax_free_quotas['tobacco_other']) * unit_costs['cigars_cigarillos']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['cigars_cigarillos']

            if product_amounts['snuff_chewing_tobacco'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['snuff_chewing_tobacco'] - tax_free_quotas['spirit']) * unit_costs['snuff_chewing_tobacco']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['snuff_chewing_tobacco']

        if product_amounts['paper_sheaths'] > tax_free_quotas['paper_sheaths']:
            total_fees += (product_amounts['paper_sheaths'] - tax_free_quotas['paper_sheaths']) * unit_costs['paper_sheaths']

        if data['over_a_day']:
            total_vat = self.calculate_vat(product_values, 6000, data['number_of_product'])
        else:
            total_vat = self.calculate_vat(product_values, 3000, data['number_of_product'])

        if data['amount_to_pay'] != total_vat + total_fees:
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
