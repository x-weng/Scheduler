

from django.utils import timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduling', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='slot',
            name='end_time',
            field=models.DateTimeField(default=timezone.now),
            preserve_default=False,
        ),
    ]
