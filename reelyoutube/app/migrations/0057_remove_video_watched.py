# Generated by Django 4.1.7 on 2023-08-13 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0056_remove_video_views_video_views'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='video',
            name='watched',
        ),
    ]