# Generated by Django 5.0.6 on 2024-06-30 14:59

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BulkUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='uploads/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('registration_number', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('date_of_registration', models.DateField(blank=True, default=datetime.date.today, null=True)),
                ('address', models.TextField()),
                ('contact_person', models.CharField(max_length=100)),
                ('number_of_employees', models.IntegerField()),
                ('contact_phone', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_id', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('company', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='playground.company')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
                ('national_id', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=100)),
                ('date_started', models.DateField()),
                ('date_left', models.DateField(blank=True, null=True)),
                ('duties', models.TextField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playground.company')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playground.department')),
            ],
        ),
    ]
