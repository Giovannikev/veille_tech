# Generated by Django 4.2.13 on 2024-07-12 08:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('table', '0003_table_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='table',
            name='number',
        ),
    ]
