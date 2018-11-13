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
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import copy
import datetime

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
            request.data["date"] = datetime.datetime.now()
            request_data = copy.deepcopy(request.data)
            if "email" in request.data:
                to_address = request.data.pop("email")
            else:
                to_address = False
            for i in request.data['products']:
                i['product'] = Product.objects.get(type_of_product=i['product']).pk
            serializer = TransactionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                if to_address:
                    self.send_email(to_address, request_data)
                return Response({'url': 'https://toll.idi.ntnu.no/api/backend/transaction/' + serializer.data['id_number']}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_402_PAYMENT_REQUIRED)

    def validate(self, reference_number):
        #implement validation towards the payment service provider here
        #TODO: implement validation using relevant legislation
        return True

    def send_email(self, address, content):
        #do nothing
        sender = settings.EMAIL_HOST_USER
        subject = "Receipt for customs declaration"
        html_body = render_to_string('email/mail_template.html', self.parse_content(content))
        plain_body = strip_tags(html_body) 
        send_mail(subject, plain_body, sender, [address], html_message=html_body, fail_silently=False)
        return 

    def parse_content(self, content):
        parsed = content
        parsed['date'] = parsed['date'].strftime("%Y-%m-%d %H:%M:%S")
        parsed['date'] = parsed['date'].split(' ')[0] + " " + parsed['date'].split(' ')[1].split(':')[0] + ":" + parsed['date'].split(' ')[1].split(':')[1] 
        for product in parsed['products']:
            for j in product:
                if isinstance(product[j], bool):
                    if product[j]:
                        product[j] = "Yes"
                    else:
                        product[j] = "No"
        return parsed

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
            'Beer': 0,
            'Alcopop and others': 0,
            'Wine': 0,
            'Fortified wine': 0,
            'Spirits': 0,
            'Cigarettes': 0,
            'Snuff and chewing tobacco': 0,
            'Smoking tobacco': 0,
            'Cigars and Cigarillos': 0,
            'Cigarette paper and sheets': 0,
            'has_tobacco': False,
            'Horse': 0,
            'Dog': 0,
            'Goods': 0,
            'Other': 0
        }

        for product in products:
            if product['product'] == 'Beer':
                amounts['Beer'] += float(product['amount'])
            elif product['product'] == 'Alcopop and others':
                amounts['Alcopop and others'] += float(product['amount'])
            elif product['product'] == 'Wine':
                amounts['Wine'] += float(product['amount'])
            elif product['product'] == 'Fortified wine':
                amounts['Fortified wine'] += float(product['amount'])
            elif product['product'] == 'Spirits':
                amounts['Spirits'] += float(product['amount'])
            elif product['product'] == 'Cigarettes':
                amounts['Cigarettes'] += float(product['amount'])
                amounts['has_tobacco'] = True
            elif product['product'] == 'Snuff and chewing tobacco':
                amounts['Snuff and chewing tobacco'] += float(product['amount'])
                amounts['has_tobacco'] = True
            elif product['product'] == 'Smoking tobacco':
                amounts['Smoking tobacco'] += float(product['amount'])
                amounts['has_tobacco'] = True
            elif product['product'] == 'Cigars and Cigarillos':
                amounts['Cigars and Cigarillos'] += float(product['amount'])
                amounts['has_tobacco'] = True
            elif product['product'] == 'Cigarette paper and sheets':
                amounts['Cigarette paper and sheets'] += float(product['amount'])
            elif product['product'] == 'Horse':
                amounts['Horse'] += float(product['amount'])
            elif product['product'] == 'Dog':
                amounts['Dog'] += float(product['amount'])
            elif product['product'] == 'Goods':
                amounts['Goods'] += float(product['amount'])
            elif product['product'] == 'Others':
                amounts['Others'] += float(product['amount'])

        return amounts

    def get_product_values(self, products):
        values = []

        for product in products:
            values.append(float(product['value']))

        values.sort(reverse=True)
        return values

    def get_misc_tobacco_amount(self, product_amounts):
        amount_sum = product_amounts['Snuff and chewing tobacco']
        amount_sum += product_amounts['Smoking tobacco']
        amount_sum += product_amounts['Cigars and Cigarillos']
        return amount_sum

    def get_beer_wine_amount(self, product_amount):
        amount_sum = product_amount['Beer']
        amount_sum += product_amount['Alcopop and others']
        amount_sum += product_amount['Wine']
        amount_sum += product_amount['Fortified wine']
        return amount_sum

    def get_tax_free_quotas(self, product_amounts):
        quotas = {
            'beer': 2,
            'wine': 1.5,
            'spirit': 1,
            'tobacco_cigarettes': 200,
            'tobacco_other': 250,
            'paper_sheets': 200
        }

        if product_amounts['Spirits'] == 0:
            quotas['wine'] += 1.5
        else:
            if quotas['spirit'] > product_amounts['Spirits']:
                quotas['wine'] += quotas['spirit'] - product_amounts['Spirits']

        if not product_amounts['has_tobacco']:
            quotas['wine'] += 1.5
        else:
            if product_amounts['Cigarettes'] >= quotas['tobacco_cigarettes']:
                quotas['tobacco_other'] = 0
            elif self.get_misc_tobacco_amount(product_amounts) >= quotas['tobacco_other']:
                quotas['tobacco_cigarettes'] = 0
            elif product_amounts['Cigarettes'] >= self.get_misc_tobacco_amount(product_amounts)*1.25:
                quotas['tobacco_other'] = 0

        if quotas['wine'] > product_amounts['Wine'] + product_amounts['Fortified wine']:
            quotas['beer'] += quotas['wine'] - ( product_amounts['Wine'] + product_amounts['Fortified wine'] )

        return quotas

    def get_horses(self, products):
        horses = []
        for product in products:
            if product['product'] == 'Horse':
                horses.append(product)
        return horses

    def get_dogs(self, products):
        dogs = []
        for product in products:
            if product['product'] == 'Dog':
                dogs.append(product)
        return dogs

    def check_valid_amounts(self, absolute_quotas, product_amounts):
        if self.get_beer_wine_amount(product_amounts) > absolute_quotas['beer_wine']:
            return False
        if product_amounts['Spirits'] > absolute_quotas['spirit']:
            return False
        if product_amounts['Cigarettes'] > absolute_quotas['tobacco_cigarettes']:
            return False
        if self.get_misc_tobacco_amount(product_amounts) > absolute_quotas['tobacco_other']:
            return False
        if product_amounts['Cigarette paper and sheets'] > absolute_quotas['paper_sheets']:
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
            'paper_sheets': 400
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
            'paper_sheets': 5,
            'horse': 5000
        }

        total_fees = 0

        if not self.check_valid_amounts(absolute_quotas, product_amounts):
            return Response(False)

        # Calculates fees
        if product_amounts['Beer'] > tax_free_quotas['beer']:
            total_fees += (product_amounts['Beer'] - tax_free_quotas['beer']) * unit_costs['beer']
            tax_free_quotas['beer'] = 0
        else:
            tax_free_quotas['beer'] = tax_free_quotas['beer'] - product_amounts['Beer']

        if product_amounts['Alcopop and others'] > tax_free_quotas['beer']:
            total_fees += (product_amounts['Alcopop and others'] - tax_free_quotas['beer']) * unit_costs['alcopop_other']
            tax_free_quotas['beer'] = 0
        else:
            tax_free_quotas['beer'] = tax_free_quotas['beer'] - product_amounts['Alcopop and others']

        if product_amounts['Fortified wine'] > tax_free_quotas['wine']:
            total_fees += (product_amounts['Fortified wine'] - tax_free_quotas['wine']) * unit_costs['fortified_wine']
            tax_free_quotas['wine'] = 0
        else:
            tax_free_quotas['wine'] = tax_free_quotas['wine'] - product_amounts['Fortified wine']

        if product_amounts['Wine'] > tax_free_quotas['wine']:
            total_fees += (product_amounts['Wine'] - tax_free_quotas['wine']) * unit_costs['wine']
            tax_free_quotas['wine'] = 0
        else:
            tax_free_quotas['wine'] = tax_free_quotas['wine'] - product_amounts['Wine']

        if product_amounts['Spirits'] > tax_free_quotas['spirit']:
            total_fees += (product_amounts['Spirits'] - tax_free_quotas['spirit']) * unit_costs['spirit']

        if tax_free_quotas['tobacco_other'] == 0:
            if product_amounts['Cigarettes'] > tax_free_quotas['tobacco_cigarettes']:
                total_fees += (product_amounts['Cigarettes'] - tax_free_quotas['tobacco_cigarettes'])/100 * unit_costs['cigarettes']
                tax_free_quotas['tobacco_cigarettes'] = 0

        if tax_free_quotas['tobacco_cigarettes'] == 0:
            if product_amounts['Smoking tobacco'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['Smoking tobacco'] - tax_free_quotas['tobacco_other'])/100 * unit_costs['smoking_tobacco']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['Smoking tobacco']

            if product_amounts['Cigars and Cigarillos'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['Cigars and Cigarillos'] - tax_free_quotas['tobacco_other'])/100 * unit_costs['cigars_cigarillos']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['Cigars and Cigarillos']

            if product_amounts['Snuff and chewing tobacco'] > tax_free_quotas['tobacco_other']:
                total_fees += (product_amounts['Snuff and chewing tobacco'] - tax_free_quotas['tobacco_other'])/100 * unit_costs['snuff_chewing_tobacco']
                tax_free_quotas['tobacco_other'] = 0
            else:
                tax_free_quotas['tobacco_other'] = tax_free_quotas['tobacco_other'] - product_amounts['Snuff and chewing tobacco']

        if product_amounts['Cigarette paper and sheets'] > tax_free_quotas['paper_sheets']:
            total_fees += (product_amounts['Cigarette paper and sheets'] - tax_free_quotas['paper_sheets'])/100 * unit_costs['paper_sheets']

        if product_amounts['Horse'] > 0:
            horses = self.get_horses(data['products'])
            for horse in horses:
                if not horse['contacted_NFSA'] or not horse['registered_NFSA']:
                    return Response(False)
            total_fees += product_amounts['Horse'] * unit_costs['horse']

        if product_amounts['Dog']:
            dogs = self.get_dogs(data['products'])
            for dog in dogs:
                if not dog['contacted_NFSA']:
                    return Response(False)

        if data['over_a_day']:
            total_vat = self.calculate_vat(product_values, 6000, int(data['number_of_people']))
        else:
            total_vat = self.calculate_vat(product_values, 3000, int(data['number_of_people']))

        if float(data['amount_to_pay']) != total_vat + total_fees:
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
