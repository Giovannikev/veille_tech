# Generated by Django 4.2.13 on 2024-07-11 16:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0002_restaurant_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='owner',
        ),
    ]
