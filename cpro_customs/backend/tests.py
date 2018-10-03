from django.test import TestCase

# Create your tests here.
class DummyTestCase(TestCase):
    def setUp(self):
        print("setUp called")

    def test_dummy(self):
        self.assertEqual("", "")