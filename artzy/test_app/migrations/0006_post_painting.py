# Generated by Django 2.2 on 2020-08-01 13:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0005_auto_20200801_1511'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='painting',
            field=models.FileField(default=django.utils.timezone.now, upload_to='image/'),
            preserve_default=False,
        ),
    ]