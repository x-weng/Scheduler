from django.db import models

class User(models.Model):
    ROLE_CHOICES = [('coach', 'Coach'), ('student', 'Student')]
    
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class Slot(models.Model):
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='slots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    booked = models.BooleanField(default=False)
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='booked_slots')

    def __str__(self):
        return f"Slot at {self.start_time} by {self.coach.name}"

class Call(models.Model):
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)
    satisfaction_score = models.IntegerField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Call for {self.slot.coach.name}'s slot"
