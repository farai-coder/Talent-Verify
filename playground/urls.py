__author__ = 'Farai Rato'
__date__created = ""

from django.urls import path
from . import views

urlpatterns = [
    path('say_hello/', views.say_hello),
    path('companies/', views.CompanyListView.as_view()),
    path('companies/create/', views.CompanyCreateView.as_view()),
    path('companies/<int:pk>/', views.CompanyDetailView.as_view()),
    path('companies/<int:pk>/update/', views.CompanyUpdateView.as_view()),
    path('companies/<int:pk>/delete/', views.CompanyDeleteView.as_view()),
    path('employees/', views.EmployeeListView.as_view()),
    path('employees/create/', views.EmployeeCreateView.as_view()),
    path('employees/<int:pk>/', views.EmployeeDetailView.as_view()),
    path('employees/<int:pk>/update/', views.EmployeeUpdateView.as_view()),
    path('employees/<int:pk>/delete/', views.EmployeeDeleteView.as_view()),
    path('companies/import_companies_csv/', views.upload_companies_csv,),
    path('employees/import_employees_csv/', views.upload_employees_csv,),
    path('departments/create/', views.DepartmentCreateView.as_view()),
    path('departments/<int:pk>/update/', views.DepartmentUpdateView.as_view()),
    path('departments/<int:pk>/delete/', views.DepartmentDeleteView.as_view()),
    path('departments/', views.DepartmentListView.as_view()),
    path('companies/<int:id>/departments/', views.get_company_departments),
    path('employees/<str:national_id>/employee_history/', views.get_employee_history),
]
