
import React from 'react';
import { Slot,User } from '../types';

interface SlotListProps {
  slots: Slot[];
  studentId : string | undefined
  bookSlot?: (slotId: number) => void;
  booked_list: Boolean,
  coaches :User[]
}

const SlotList: React.FC<SlotListProps> = ({ slots, bookSlot,studentId,booked_list,coaches}) => {


  return (
    <ul>
      {booked_list ?slots.filter(slot => slot.student==studentId).map((slot) => (
        
        <li key={slot.id}>
          {`Start: ${new Date(slot.start_time).toLocaleString()}, End: ${new Date(slot.end_time).toLocaleString()}, Coach:${coaches.find((s) => s.id === Number(slot.coach))?.name}   Phone: ${coaches.find((s) => s.id === Number(slot.coach))?.phone}`}
            <span> (Booked)</span>
        </li>
      )):slots.filter(slot => slot.booked == false).map((slot) => (
        <li key={slot.id}>
          {`Start: ${new Date(slot.start_time).toLocaleString()}, End: ${new Date(slot.end_time).toLocaleString()}`}
          { 
            bookSlot && <button onClick={() => bookSlot(slot.id)}>Book</button>
          }
        </li>
      ))}
    </ul>
  );
};

export default SlotList;
