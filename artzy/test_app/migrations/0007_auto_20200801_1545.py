# Generated by Django 2.2 on 2020-08-01 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0006_post_painting'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='painting',
            field=models.FileField(blank=True, upload_to='image/'),
        ),
    ]
