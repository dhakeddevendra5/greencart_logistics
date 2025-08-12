// frontend/src/pages/DriversPage.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');

  const load = async () => {
    const res = await api.get('/drivers');
    setDrivers(res.data);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/drivers', { name });
    setName('');
    load();
  };

  const remove = async (id) => {
    await api.delete(`/drivers/${id}`);
    load();
  };

  return (
    <div className="page drivers-page">
      <h2>Drivers</h2>
      <form onSubmit={add}>
        <input placeholder="Driver name" value={name} onChange={(e) => setName(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {drivers.map((d) => (
          <li key={d.id}>
            {d.name} - shift hours: {d.current_shift_hours} <button onClick={() => remove(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriversPage;
