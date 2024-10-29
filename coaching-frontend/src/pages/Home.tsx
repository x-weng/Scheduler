import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    <h1>Welcome to the Coaching Scheduler</h1>
    <Link to="/coach">Coach Dashboard</Link> | <Link to="/student">Student Dashboard</Link>
  </div>
);

export default Home;
