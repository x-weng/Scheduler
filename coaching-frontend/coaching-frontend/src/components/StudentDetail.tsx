
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Slot, User } from '../types';
import SlotList from './SlotList'; 

interface StudentDetailProps {
  users: User[];
  fetchSlots: (studentId: number) => Promise<Slot[]>; 
  fetchCoachSlots: (coachId: number) => Promise<Slot[]>; 
  bookSlot: (slotId: number, studentId: number) => Promise<void>; 
}

const StudentDetail: React.FC<StudentDetailProps> = ({
  users,
  fetchSlots,
  fetchCoachSlots,
  bookSlot,
}) => {
  const { studentId } = useParams<{ studentId: string }>();
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<number | null>(null);

  const student = users.filter(user=>user.role=="student").find((s) => s.id === Number(studentId));
  const coaches = users.filter(user=>user.role=="coach")

  useEffect(() => {
    if (student) {
      fetchSlots(student.id).then(setBookedSlots);
    }
  }, [student, fetchSlots]);

  const handleCoachSelect = (coachId: number) => {
    setSelectedCoachId(coachId);
    fetchCoachSlots(coachId).then(setAvailableSlots);
  };

  const handleBookSlot = (slotId: number) => {
    if (student) {
      bookSlot(slotId, student.id).then(() => {
        fetchSlots(student.id).then(setBookedSlots); 
      });
    }
  };

  if (!student) return <p>Student not found.</p>;

  return (
    <div>
      <h2>Student {student.name}'s Detail Page</h2>

      <h3>Booked Slots</h3>
      <SlotList slots={bookedSlots} studentId={studentId} booked_list={true} coaches={coaches}/>

      <h3>Book a Slot</h3>
      <select onChange={(e) => handleCoachSelect(Number(e.target.value))}>
        <option value="">Select a coach</option>
        {users.filter(user=>user.role=="coach").map((coach) => (
          <option key={coach.id} value={coach.id}>
            {coach.name}
          </option>
        ))}
      </select>

      {selectedCoachId && (
        <>
          <h4>Available Slots</h4>
          <SlotList slots={availableSlots} studentId={studentId} bookSlot={handleBookSlot}  booked_list={false} coaches={coaches} />
        </>
      )}
    </div>
  );
};

export default StudentDetail;
