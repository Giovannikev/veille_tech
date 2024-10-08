# Generated by Django 4.2.13 on 2024-07-12 08:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_remove_restaurant_owner'),
        ('accounts', '0004_restaurantowner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='restaurantowner',
            old_name='user',
            new_name='owner',
        ),
        migrations.AlterField(
            model_name='restaurantowner',
            name='restaurant',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='restaurant.restaurant'),
        ),
    ]
