# Generated by Django 4.2.13 on 2024-07-10 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('table', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='image',
            field=models.ImageField(blank=True, upload_to='qr_codes/'),
        ),
    ]
