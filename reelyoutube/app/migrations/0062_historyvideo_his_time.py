# Generated by Django 4.1.7 on 2023-08-14 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0061_historyvideo'),
    ]

    operations = [
        migrations.AddField(
            model_name='historyvideo',
            name='his_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]