from rest_framework import serializers
from .models import User, Slot, Call
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id', 'coach', 'start_time','end_time', 'booked','student']
    
    def validate(self, data):
        
        if data['start_time'] < timezone.now():
            raise serializers.ValidationError("You cannot schedule a slot in the past.")

        
        overlapping_slots = Slot.objects.filter(
            coach_id=data['coach'],
            start_time__lt=data['end_time'],
            end_time__gt=data['start_time'],
        )

        if overlapping_slots.exists():
            raise serializers.ValidationError("The selected time slot overlaps with an existing booked slot.")

        return data
    
    def validate_coach(self, value):
        
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value
class CallSerializer(serializers.ModelSerializer):
    slot = SlotSerializer()

    class Meta:
        model = Call
        fields = '__all__'
