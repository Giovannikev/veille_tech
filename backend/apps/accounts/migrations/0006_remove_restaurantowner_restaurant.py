# Generated by Django 4.2.13 on 2024-07-12 08:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_rename_user_restaurantowner_owner_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurantowner',
            name='restaurant',
        ),
    ]
