from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Slot, Call
from .serializers import UserSerializer, SlotSerializer, CallSerializer

class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all().order_by('start_time')  
    serializer_class = SlotSerializer
    
    def get_queryset(self):
        
        coach_id = self.request.query_params.get('coach_id', None)
        student_id = self.request.query_params.get('student_id', None)
        booked = self.request.query_params.get('booked', None)

        
        queryset = self.queryset

        
        if coach_id is not None:
            queryset = queryset.filter(coach_id=coach_id)

        if student_id is not None:
            queryset = queryset.filter(student_id=student_id)

        if booked is not None:
            
            queryset = queryset.filter(booked=(booked.lower() == 'true'))

        return queryset
        
    @action(detail=True, methods=['post'])
    def record_call(self, request, pk=None):
        slot = self.get_object()
        data = request.data

        call, created = Call.objects.update_or_create(
            slot=slot,
            defaults={
                'satisfaction_score': data['satisfaction_score'],
                'notes': data.get('notes', ''),
            }
        )

        return Response(CallSerializer(call).data)

    @action(detail=True, methods=['post'])
    def book(self, request, pk=None):
        slot = self.get_object()
        student_id = request.data.get('student_id')

        if not slot.booked:
            slot.student_id = student_id
            slot.booked = True
            slot.save()
            return Response(SlotSerializer(slot).data)
        return Response({'error': 'Slot already booked'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class CallViewSet(viewsets.ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer

    def retrieve(self, request, pk=None):
            
            try:
                slot = Slot.objects.get(id=pk)
                call = Call.objects.get(slot=slot)
                return Response(CallSerializer(call).data)
            except Slot.DoesNotExist:
                return Response({'detail': 'Slot not found.'}, status=status.HTTP_404_NOT_FOUND)
            except Call.DoesNotExist:
                return Response({'detail': 'Call not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def record(self, request, pk=None):
        data = request.data
        try:
            call = Call.objects.update_or_create(
                slot_id=pk,
                defaults={
                    'satisfaction_score': data['satisfaction_score'],
                    'notes': data.get('notes', ''),
                }
            )
            return Response(CallSerializer(call[0]).data)
        except Exception as e:
            return Response({'detail': str(e)}, status=400)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role', None)
        if role:
            queryset = queryset.filter(role=role)
        return queryset