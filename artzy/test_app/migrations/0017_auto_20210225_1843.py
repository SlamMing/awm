# Generated by Django 2.2 on 2021-02-25 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0016_auto_20200915_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='painting',
            field=models.ImageField(blank=True, upload_to='image/%y'),
        ),
    ]