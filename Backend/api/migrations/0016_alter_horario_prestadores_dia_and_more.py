# Generated by Django 5.1.1 on 2024-10-17 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_horario_prestadores_dia_horario_prestadores_hora_fin_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horario_prestadores',
            name='dia',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='horario_prestadores',
            name='hora_fin',
            field=models.TimeField(),
        ),
    ]
