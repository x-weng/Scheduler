import React, { useState } from 'react';
import axios from 'axios';
import { Slot } from '../types'; 

interface AddSlotFormProps {
  coachId: number; 
  setSlots: React.Dispatch<React.SetStateAction<Slot[]>>; 
}

const AddSlotForm: React.FC<AddSlotFormProps> = ({ coachId, setSlots }) => {
  const [startTime, setStartTime] = useState<string>(''); 
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    
    if (!startTime) {
      setError('Please select a start time.');
      return;
    }

    
    const startDate = new Date(startTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); 

    try {
      const response = await axios.post(`/slots/`, {
        coach: coachId,
        start_time: startDate, 
        end_time: endDate, 
        booked: false,
      });

      
      setSlots((prevSlots) => [...prevSlots, response.data]);
      setStartTime(''); 
      setError(''); 
    } catch (err) {
      setError('Failed to add slot. Please try again.');
      console.error('Error adding slot:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Slot for Coach {coachId}</h4>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default AddSlotForm;
