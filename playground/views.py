from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from .models import Member
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.response import Response
from .models import Company, Employee
from .serializer import CompanySerializer, EmployeeSerializer

from rest_framework import generics
from rest_framework.views import APIView

import csv
import io

def say_hello(request):
    # pull information from the database
    # send emails
    return HttpResponse("Hello world")

@csrf_exempt
def upload_companies_csv(request):
    csv_file = request.FILES["csv_file"]
    print('csv', csv)
    file_data = csv_file.read().decode("utf-8")
    print('file data', file_data)
    csv_data = csv.DictReader(io.StringIO(file_data))
    print("csv data", csv_data)

    for row in csv_data:
        company = Company(
            name = row['name'],
            date_of_registration = row['date_of_registration'],
            registration_number = row['registration_number'],
            address = row['address'],
            contact_person = row['contact_person'],
            number_of_employees = row['number_of_employees'],
            contact_phone = row['contact_phone'],
            email = row['email']
        )
        company.save()
    print("company saved successfully")
    return HttpResponse("company saved successfully")

@csrf_exempt
def upload_employees_csv(request):
    print("reached here")
    csv_file = request.FILES["csv_file"]
    print('csv', csv)
    file_data = csv_file.read().decode("utf-8")
    print('file data', file_data)
    csv_data = csv.DictReader(io.StringIO(file_data))
    print("csv data", csv_data)

    for row in csv_data:
        department = int(row['department'].strip())
        print(type(department))
        company = int(row['company'].strip())
        employee = Employee(
            employee_id=row['employee_id'].strip(),
            national_id = row['national_id'].strip(),
            name = row['name'].strip(),
            department = department,
            role = row['role'].strip(),
            date_started = row['date_started'].strip(),
            date_left = row['date_left'].strip(),
            duties = row['duties'].strip(),
            company = company,
        )
        employee.save()
    print("employees saved successfully")
    return HttpResponse("employees saved successfully")

@csrf_exempt
def get_company_departments(request, id):
    company_id = id
    print("request", request)
    department_list = []
    departments = Department.objects.filter(company = company_id)

    for department in departments:
        department_list.append({'name': department.name})
    return HttpResponse(json.dumps(department_list), content_type='application/json')

@csrf_exempt
def get_employee_history(request, national_id):
    national_id = national_id
    print(national_id)
    print(request)
    history = []
    employees = Employee.objects.filter(national_id=national_id)
    print(employees)
    for employee in employees:
        if employee.date_left is not None:
            history.append({'name':employee.name, 'company':employee.company.name, 'department':employee.department.name, 'role':employee.role
                            ,'duties':employee.duties, 'dateStarted':employee.date_started.strftime('%Y-%m-%d')
                            , 'dateLeft':employee.date_left.strftime('%Y-%m-%d')})


    return HttpResponse(json.dumps(history), content_type='application/json')


class comView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class companiesView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class createCompany(APIView):
    serializer_class = CompanySerializer

    def post(self, request,pk,  format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.name
            date_of_registration = serializer.data.date_of_registration
            registration_number = serializer.data.registration_number
            address = serializer.data.address
            contact_person = serializer.data.contact_person
            departments = serializer.data.departments
            number_of_employees = serializer.data.number_of_employees
            contact_phone = serializer.data.contact_phone
            email = serializer.data.email

            queryset = Company.objects.filter(pk=pk)
            if queryset.exists():
                company = queryset.get()
                company.name = name
                company.date_of_registration = date_of_registration
                company.registration_number = registration_number
                company.address = address
                company.contact_person = contact_person
                company.departments = departments
                company.number_of_employees = number_of_employees
                company.contact_phone = contact_phone
                company.email = email
                company.save()
        return HttpResponse('updated succesfully')

from rest_framework import generics
from .models import Company, Employee, Department
from .serializer import CompanySerializer, EmployeeSerializer, DepartmentSerializer

class CompanyCreateView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyUpdateView(generics.UpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDeleteView(generics.DestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeUpdateView(generics.UpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class DepartmentCreateView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentUpdateView(generics.UpdateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDeleteView(generics.DestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


