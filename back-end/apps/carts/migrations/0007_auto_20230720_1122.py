# Generated by Django 3.1.4 on 2023-07-20 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0006_auto_20230720_1121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='cart_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]