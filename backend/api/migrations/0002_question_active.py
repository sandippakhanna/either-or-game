# Generated by Django 3.1.2 on 2021-04-25 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
