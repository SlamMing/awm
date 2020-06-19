# Generated by Django 3.0.5 on 2020-06-19 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True)),
                ('author_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True)),
                ('painting', models.FileField(blank=True, upload_to='image/')),
                ('like_count', models.IntegerField(default=1)),
                ('author_id', models.IntegerField(default=-1)),
                ('pub_date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]