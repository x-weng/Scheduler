
import React from 'react';
import { User } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface StudentDashboardProps {
  users: User[];
}

const Home: React.FC<StudentDashboardProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {users.filter(user=>user.role=="student").map((student) => (
          <li key={student.id}>
            <button onClick={() => navigate(`/students/${student.id}`)}>
              {student.name}
            </button>
          </li>
        ))}
      </ul>
        <h2>Coaches</h2>
        <ul>
          {users.filter(user=>user.role=="coach").map(coach => (
            <li key={coach.id}>
            <button onClick={() => navigate(`/coaches/${coach.id}`)}>
              {coach.name}
            </button>
            </li>
          ))}
        </ul>

    </div>
  );
};

export default Home;



