# Generated by Django 5.1.1 on 2024-10-16 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_consultas_agendadas_servicio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultas_agendadas',
            name='servicio',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
