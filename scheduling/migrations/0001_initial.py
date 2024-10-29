

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(choices=[('coach', 'Coach'), ('student', 'Student')], max_length=10)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('booked', models.BooleanField(default=False)),
                ('coach', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='slots', to='scheduling.user')),
                ('student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='booked_slots', to='scheduling.user')),
            ],
        ),
        migrations.CreateModel(
            name='Call',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('satisfaction_score', models.IntegerField()),
                ('notes', models.TextField(blank=True)),
                ('slot', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='scheduling.slot')),
            ],
        ),
    ]
