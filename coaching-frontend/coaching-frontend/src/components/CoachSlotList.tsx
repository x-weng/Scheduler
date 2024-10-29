import { Slot } from "../types";

const CoachSlotList: React.FC<{ slots: Slot[] }> = ({ slots }) => (
    <div>
      <h3>Slots for Selected Coach</h3>
      {slots.length === 0 ? (
        <p>No available slots.</p>
      ) : (
        <ul>
          {slots.map((slot) => {
            const startTime = new Date(slot.start_time);
            const endTime = new Date(slot.end_time);
            return (
              <li key={slot.id}>
                {`Start: ${startTime.toLocaleString()}, End: ${endTime.toLocaleString()}`}
                {slot.booked && <span> (Booked)</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

export default CoachSlotList;
