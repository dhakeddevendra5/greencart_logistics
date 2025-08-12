// frontend/src/pages/SimulationHistoryPage.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const SimulationHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/simulation-results');
      setHistory(res.data);
    };
    load();
  }, []);

  return (
    <div className="page simulation-history-page">
      <h2>Simulation History</h2>
      <ul>
        {history.map(h => (
          <li key={h.id}>
            <strong>{new Date(h.created_at).toLocaleString()}</strong> — Summary: {h.summary}
            <pre style={{maxHeight:120, overflow:'auto'}}>{JSON.stringify(h.results_json.summary,null,2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimulationHistoryPage;
