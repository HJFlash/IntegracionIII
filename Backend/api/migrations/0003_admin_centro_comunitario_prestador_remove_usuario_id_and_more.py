# Generated by Django 5.1 on 2024-09-08 23:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_project_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('rut', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('nombres', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(default='ApellidoDesconocido', max_length=100)),
                ('contacto', models.CharField(default='Sin contacto', max_length=20, unique=True)),
                ('direccion', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Centro_Comunitario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_centro', models.IntegerField()),
                ('nombre', models.CharField(max_length=50)),
                ('direccion', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Prestador',
            fields=[
                ('rut', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('nombres', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(default='ApellidoDesconocido', max_length=100)),
                ('contrasena', models.CharField(blank=True, max_length=25)),
                ('contacto', models.CharField(default='Sin contacto', max_length=20, unique=True)),
                ('servicio', models.CharField(max_length=30)),
                ('calle', models.CharField(default='CalleDesconocida', max_length=25)),
                ('num_casa', models.CharField(max_length=50)),
                ('num_apar', models.CharField(blank=True, max_length=50)),
            ],
        ),

        migrations.AddField(
            model_name='usuario',
            name='apellidos',
            field=models.CharField(default='ApellidoDesconocido', max_length=100),
        ),
        migrations.AddField(
            model_name='usuario',
            name='calle',
            field=models.CharField(default='CalleDesconocida', max_length=25),
        ),
        migrations.AddField(
            model_name='usuario',
            name='contacto',
            field=models.CharField(default='Sin contacto', max_length=20, unique=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='contrasena',
            field=models.CharField(blank=True, max_length=25),
        ),
        migrations.AddField(
            model_name='usuario',
            name='nombres',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='num_apar',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='num_casa',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='rut',
            field=models.IntegerField(default=0, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usuario',
            name='id_centro',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.centro_comunitario'),
        ),
                migrations.RemoveField(
            model_name='usuario',
            name='id',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='name',
        ),
        migrations.CreateModel(
            name='Horario_Prestadores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descanso', models.TimeField()),
                ('hora_inicio', models.TimeField()),
                ('hora_termino', models.TimeField()),
                ('rut_prestador', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.prestador')),
            ],
        ),
        migrations.CreateModel(
            name='Consultas_Agendadas',
            fields=[
                ('id_consulta', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('servicio', models.CharField(max_length=30)),
                ('fecha', models.DateField()),
                ('hora_inicio', models.TimeField()),
                ('hora_termino', models.TimeField()),
                ('rut_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
                ('rut_prestador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.prestador')),
            ],
        ),
    ]