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
        parsed['date'] = parsed['date'].split('T')[0] + " " + parsed['date'].split('T')[1].split(':')[0] + ":" + parsed['date'].split('T')[1].split(':')[1] 
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

    def post(self, request, format=None):
        #TODO: Implement valdiation using relevant legislation

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
