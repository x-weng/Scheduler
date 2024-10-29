
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import apiClient from './api/apiClient';

import StudentDetail from './components/StudentDetail';
import CoachDashboard from './components/CoachDashboard'; 
import { User, Slot } from './types';
import Home from './components/Home';
import RecordCall from './components/RecordCall';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await apiClient.get('/users');

        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchSlots = async (studentId: number): Promise<Slot[]> => {
    try {
      const res = await apiClient.get(`/slots`, { params: { student_id: studentId } });
      return res.data;
    } catch (error) {
      console.error('Error fetching slots:', error);
      return [];
    }
  };

  const fetchCoachSlots = async (coachId: number): Promise<Slot[]> => {
    try {
      const res = await apiClient.get(`/slots`, { params: { coach_id: coachId, booked: false } });
      return res.data;
    } catch (error) {
      console.error('Error fetching coach slots:', error);
      return [];
    }
  };

  const bookSlot = async (slotId: number, studentId: number): Promise<void> => {
    try {
      await apiClient.post(`/slots/${slotId}/book/`, { student_id: studentId });
      alert('Slot booked successfully!');
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('Failed to book slot. Please try again.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route
          path="/students/:studentId"
          element={
            <StudentDetail
              users={users}
              fetchSlots={fetchSlots}
              fetchCoachSlots={fetchCoachSlots}
              bookSlot={bookSlot}
            />
          }
        />
        <Route
          path="/coaches/:coachId"
          element={<CoachDashboard users={users}/>} 
        />
        <Route path="/coaches/:coachId/slots/:slotId/record-call" element={<RecordCall />} />

      </Routes>
    </Router>
  );
};

export default App;
