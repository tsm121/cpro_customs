from django.test import  TestCase
from rest_framework.test import APIClient




class APIInvalidTestCases(TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_invalid_beer(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '430',
            'products': [
                {
                    'product': 'Beer',
                    'amount': '28',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '560',
                    'fees': '430'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_alcopop(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '430',
            'products': [
                {
                    'product': 'Alcopop and others',
                    'amount': '28',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '560',
                    'fees': '430'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_wine(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '1320',
            'products': [
                {
                    'product': 'Wine',
                    'amount': '28',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '1120',
                    'fees': '1320'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_fortified_wine(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '2530',
            'products': [
                {
                    'product': 'Fortified wine',
                    'amount': '28',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '1400',
                    'fees': '2530'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_spirits(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '1625',
            'products': [
                {
                    'product': 'Spirits',
                    'amount': '5',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '3000',
                    'fees': '1625'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_cigarettes(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '870',
            'products': [
                {
                    'product': 'Cigarettes',
                    'amount': '500',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '500',
                    'fees': '870'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_smoking_tobacco(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '1160',
            'products': [
                {
                    'product': 'Smoking tobacco',
                    'amount': '600',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '600',
                    'fees': '1160'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_snuff_chewing_tobacco(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '480',
            'products': [
                {
                    'product': 'Snuff and chewing tobacco',
                    'amount': '600',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '600',
                    'fees': '480'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_cigars_cigarillos(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '1160',
            'products': [
                {
                    'product': 'Cigars and Cigarillos',
                    'amount': '600',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '600',
                    'fees': '1160'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_paper_sheets(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '12.5',
            'products': [
                {
                    'product': 'Cigarette paper and sheets',
                    'amount': '500',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '600',
                    'fees': '12.5'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_horse(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '6750',
            'products': [
                {
                    'product': 'Horse',
                    'amount': '1',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '7000',
                    'fees': '5000',
                    'contacted_NFSA': True,
                    'registered_NFSA': False,
                    'of_EU_origin': True
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')

    def test_invalid_dog(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '0',
            'products': [
                {
                    'product': 'Dog',
                    'amount': '1',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '3000',
                    'fees': '0',
                    'contacted_NFSA': False
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'false')



class APIValidTestCases(TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_valid_alcohol(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '280',
            'products': [
                {
                    'product': 'Beer',
                    'amount': '5',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '200',
                    'fees': '60'
                },
                {
                    'product': 'Alcopop and others',
                    'amount': '5',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '400',
                    'fees': '100'
                },
                {
                    'product': 'Wine',
                    'amount': '3',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '300',
                    'fees': '120'
                },
                {
                    'product': 'Fortified wine',
                    'amount': '2',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '300',
                    'fees': '0'
                },
                {
                    'product': 'Spirits',
                    'amount': '1',
                    'unit': 'litre',
                    'vat': '25',
                    'value': '200',
                    'fees': '0'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'true')

    def test_valid_tobacco(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '995',
            'products': [
                {
                    'product': 'Cigarettes',
                    'amount': '300',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '600',
                    'fees': '290'
                },
                {
                    'product': 'Snuff and chewing tobacco',
                    'amount': '100',
                    'unit': 'grams',
                    'vat': '25',
                    'value': '300',
                    'fees': '120'
                },
                {
                    'product': 'Smoking tobacco',
                    'amount': '100',
                    'unit': 'grams',
                    'vat': '25',
                    'value': '300',
                    'fees': '290'
                },
                {
                    'product': 'Cigars and Cigarillos',
                    'amount': '100',
                    'unit': 'grams',
                    'vat': '25',
                    'value': '500',
                    'fees': '290'
                },
                {
                    'product': 'Cigarette paper and sheets',
                    'amount': '300',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '300',
                    'fees': '5'
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'true')

    def test_valid_horse(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '6750',
            'products': [
                {
                    'product': 'Horse',
                    'amount': '1',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '7000',
                    'fees': '5000',
                    'contacted_NFSA': True,
                    'registered_NFSA': True,
                    'of_EU_origin': True
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'true')

    def test_valid_dog(self):
        url = '/api/backend/transaction/validate/'
        data = {
            'license_plate': 'AA11111',
            'over_a_day': True,
            'number_of_people': '1',
            'amount_to_pay': '0',
            'products': [
                {
                    'product': 'Dog',
                    'amount': '1',
                    'unit': 'pieces',
                    'vat': '25',
                    'value': '3000',
                    'fees': '0',
                    'contacted_NFSA': True
                }
            ]
        }

        client = APIClient()
        response = client.post(url, data, format='json')

        self.assertEqual(response.content.decode('utf-8'), 'true')




