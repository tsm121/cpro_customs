from django.urls import path
from backend import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
        #path('backend/', views.TransactionList.as_view()),
        path('backend/', views.Transactions.as_view()),
        path('backend/transaction/<uuid:uid>', views.TransactionDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
