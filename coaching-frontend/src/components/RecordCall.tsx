import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

const RecordCall: React.FC = () => {
  const { slotId } = useParams<{ slotId: string }>();
  const [callDetails, setCallDetails] = useState<{ satisfaction_score?: number; notes?: string }>({});
  const [satisfactionScore, setSatisfactionScore] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await apiClient.get(`/calls/${slotId}/`); 
        setCallDetails(response.data);
        setSatisfactionScore(response.data.satisfaction_score);
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching call details:', error);
      }
    };

    if (slotId) fetchCallDetails();
  }, [slotId]);

  const handleRecordCall = async () => {
    try {
      await apiClient.post(`/calls/${slotId}/record/`, {
        satisfaction_score: satisfactionScore,
        notes: notes,
      });
      alert('Call recorded successfully!');
      window.location.reload(); 

      
    } catch (error) {
      console.error('Error recording call:', error);
      alert('Failed to record call. Please try again.');
    }
  };

  return (
    <div>
      <h3>Call Details</h3>
      {callDetails.satisfaction_score !== undefined ? (
        <div>
          <p>Satisfaction Score: {callDetails.satisfaction_score}</p>
          <p>Notes: {callDetails.notes}</p>
        </div>
      ) : (
        <div>
          <p>No call record found. You can record a call now.</p>
          <div>
            <label>
              Satisfaction Score:
              <input
                type="number"
                value={satisfactionScore}
                min="1"
                max="5"
                onChange={(e) => setSatisfactionScore(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              Notes:
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
          <button onClick={handleRecordCall}>Record Call</button>
        </div>
      )}
    </div>
  );
};

export default RecordCall;
