__author__ = 'Farai Rato'
__date__created = ""

from rest_framework import serializers
from .models import Company, Employee, Department

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'date_of_registration', 'registration_number', 'address', 'contact_person', 'number_of_employees', 'contact_phone', 'email']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['national_id', 'name', 'employee_id', 'department', 'role', 'date_started', 'date_left', 'duties', 'company']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['department_id', 'name', 'company']

class BulkUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
