# Generated by Django 5.1 on 2024-09-08 23:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_admin_centro_comunitario_prestador_remove_usuario_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='rut',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True, validators=[django.core.validators.MaxValueValidator(999999999), django.core.validators.MinValueValidator(10000000)]),
        ),
    ]