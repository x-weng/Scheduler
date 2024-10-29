
import React, { useEffect, useState } from 'react';
import { Slot, User } from '../types';
import apiClient from '../api/apiClient';
import { Link, useParams } from 'react-router-dom';
interface CoachDashboardProps {
    users: User[];
  }

const CoachDashboard: React.FC<CoachDashboardProps> = ({users}) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSlotStartTime, setNewSlotStartTime] = useState<string>('');
  const { coachId } = useParams<{ coachId: string }>();

  const coach = users.filter(user=>user.role=="coach").find((s) => s.id === Number(coachId));
  const students = users.filter(user=>user.role=="student")

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await apiClient.get(`/slots`, { params: { coach_id: coachId } });
        setSlots(res.data);
      } catch (err) {
        setError('Failed to fetch slots');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [coachId]);

  const handleAddSlot = async () => {
    if (!newSlotStartTime) {
      alert('Please fill in start time.');
      return;
    }
    

    try {
      const startTime = new Date(newSlotStartTime).toISOString();
      const startTimeObj = new Date(newSlotStartTime);

        
        const now = new Date();
        if (startTimeObj < now) {
        alert('You cannot schedule a slot in the past.');
        return;
        }

      const endTime = new Date(startTimeObj.getTime() + 2 * 60 * 60 * 1000).toISOString();
      await apiClient.post(`/slots/`, {
        coach: coachId,
        start_time: startTime,
        end_time: endTime,
        booked: false,
      });
      alert('Slot added successfully!');
      
      const res = await apiClient.get(`/slots`, { params: { coach_id: coachId } });
      setSlots(res.data);
    } catch (err) {
      alert('Failed to add slot');
    }
  };

  if (loading) return <p>Loading slots...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Coach {coach?.name}'s Dashboard</h2>
      <h3>Your Slots</h3>
      <ul>
        {slots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          slots.map(slot => (
            <li key={slot.id}>
              {`Start: ${new Date(slot.start_time).toLocaleString()}, End: ${new Date(slot.end_time).toLocaleString()}`}
                {slot.booked && `, Student:${students.find((s) => s.id === Number(slot.student))?.name}   Phone: ${students.find((s) => s.id === Number(slot.student))?.phone} |`}
              {slot.booked &&  <Link to={`/coaches/${coach?.id}/slots/${slot.id}/record-call`}>View Booked Slots</Link>

             }

            </li>
          ))
        )}
      </ul>

      <h3>Add New Slot</h3>
      <div>
        <input
          type="datetime-local"
          value={newSlotStartTime}
          onChange={e => setNewSlotStartTime(e.target.value)}
        />
        <button onClick={handleAddSlot}>Add Slot</button>
      </div>
    </div>
  );
};

export default CoachDashboard;
