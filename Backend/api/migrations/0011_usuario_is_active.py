# Generated by Django 5.1.1 on 2024-10-15 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_consultas_agendadas_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]