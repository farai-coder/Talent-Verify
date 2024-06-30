
from django.db import models
import datetime

class Company(models.Model):
    registration_number = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)
    date_of_registration = models.DateField(default=datetime.date.today, null=True, blank=True)
    address = models.TextField()
    contact_person = models.CharField(max_length=100)
    number_of_employees = models.IntegerField()
    contact_phone = models.CharField(max_length=20)
    email = models.EmailField()

class Department(models.Model):
    department_id = models.CharField(max_length=20, unique=True, primary_key=True)
    name = models.CharField(max_length=100)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, default=1)

class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True, primary_key=True)
    national_id = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    department = models.ForeignKey('Department', on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    date_started = models.DateField()
    date_left = models.DateField(null=True, blank=True)
    duties = models.TextField()
    company = models.ForeignKey('Company', on_delete=models.CASCADE)

# class EmployeeHistory(models.Model):
#     employee = models.ForeignKey('Employee', on_delete=models.CASCADE)
#     role = models.CharField(max_length=100)
#     date_started = models.DateField()
#     date_left = models.DateField(null=True, blank=True)
#     duties = models.TextField()

class BulkUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)


