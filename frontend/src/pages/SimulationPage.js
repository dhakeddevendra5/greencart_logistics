// frontend/src/pages/SimulationPage.js
import React, { useState } from 'react';
import api from '../api/api';
import Loader from '../components/Loader';

const SimulationPage = () => {
  const [availableDrivers, setAvailableDrivers] = useState(2);
  const [startTime, setStartTime] = useState('09:00');
  const [maxHoursPerDriver, setMaxHoursPerDriver] = useState(8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  const run = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await api.post('/simulations/run', { availableDrivers, startTime, maxHoursPerDriver });
      setResult(res.data.simResult);
    } catch (error) {
      setErr(error.response?.data?.error || 'Failed to run simulation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page simulation-page">
      <h2>Run Simulation</h2>
      <form onSubmit={run} className="card">
        <label>Available Drivers</label>
        <input type="number" value={availableDrivers} onChange={(e) => setAvailableDrivers(parseInt(e.target.value))} />
        <label>Start Time (HH:MM)</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>Max Hours per Driver</label>
        <input type="number" value={maxHoursPerDriver} onChange={(e) => setMaxHoursPerDriver(parseInt(e.target.value))} />
        <button type="submit" disabled={loading}>Run Simulation</button>
      </form>
      {loading && <Loader />}
      {err && <div className="error">{err}</div>}
      {result && (
        <div className="card">
          <h3>Summary</h3>
          <pre>{JSON.stringify(result.summary, null, 2)}</pre>
          <h4>Fuel Breakdown</h4>
          <pre>{JSON.stringify(result.fuelBreakdown, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
