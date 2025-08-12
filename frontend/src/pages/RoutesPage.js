// frontend/src/pages/RoutesPage.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ route_id: '', distance_km: 0, traffic_level: 'Normal', base_time_minutes: 0 });

  const load = async () => { const res = await api.get('/routes'); setRoutes(res.data); };
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/routes', form);
    setForm({ route_id: '', distance_km: 0, traffic_level: 'Normal', base_time_minutes: 0 });
    load();
  };

  const remove = async (id) => { await api.delete(`/routes/${id}`); load(); };

  return (
    <div className="page routes-page">
      <h2>Routes</h2>
      <form onSubmit={add}>
        <input placeholder="Route ID" value={form.route_id} onChange={(e) => setForm({ ...form, route_id: e.target.value })} />
        <input type="number" placeholder="Distance (km)" value={form.distance_km} onChange={(e) => setForm({ ...form, distance_km: parseInt(e.target.value) })} />
        <select value={form.traffic_level} onChange={(e) => setForm({ ...form, traffic_level: e.target.value })}>
          <option>Normal</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="number" placeholder="Base time (min)" value={form.base_time_minutes} onChange={(e) => setForm({ ...form, base_time_minutes: parseInt(e.target.value) })} />
        <button>Add</button>
      </form>
      <ul>
        {routes.map(r => <li key={r.id}>{r.route_id} - {r.distance_km}km - {r.traffic_level} <button onClick={() => remove(r.id)}>Delete</button></li>)}
      </ul>
    </div>
  );
};

export default RoutesPage;
