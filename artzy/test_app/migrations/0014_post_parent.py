# Generated by Django 2.2 on 2020-08-24 14:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0013_post_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='test_app.Post'),
        ),
    ]
