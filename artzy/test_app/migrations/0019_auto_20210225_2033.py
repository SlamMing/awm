# Generated by Django 2.2 on 2021-02-25 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0018_auto_20210225_1843'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='painting',
            field=models.TextField(blank=True, null=True),
        ),
    ]
