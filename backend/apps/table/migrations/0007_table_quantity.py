# Generated by Django 4.2.13 on 2024-07-16 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('table', '0006_alter_table_nb_chaises_alter_table_nb_place'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
