// frontend/src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ChartCard from '../components/ChartCard';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [fuelBreakdown, setFuelBreakdown] = useState([]);

  useEffect(() => {
    const load = async () => {
      // get latest simulation result
      try {
        const res = await api.get('/simulation-results');
        const rows = res.data;
        if (rows.length > 0) {
          const latest = rows[0];
          const results = latest.results_json;
          setSummary(results.summary);
          const fb = Object.entries(results.fuelBreakdown || {}).map(([k, v]) => ({ name: k, value: v }));
          setFuelBreakdown(fb);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="page dashboard-page">
      <h2>Dashboard</h2>
      {summary ? (
        <div className="grid">
          <div className="kpis">
            <div className="kpi">Total Profit: ₹{summary.totalProfit}</div>
            <div className="kpi">Efficiency: {summary.efficiencyScore}%</div>
            <div className="kpi">On-time: {summary.onTime}</div>
            <div className="kpi">Late: {summary.late}</div>
          </div>

          <ChartCard title="On-time vs Late">
            <PieChart width={300} height={250}>
              <Pie data={[{ name: 'On-time', value: summary.onTime }, { name: 'Late', value: summary.late }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                <Cell fill="#00C49F" />
                <Cell fill="#FF8042" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>

          <ChartCard title="Fuel Cost Breakdown">
            <BarChart width={400} height={250} data={fuelBreakdown}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Fuel (₹)">
                {fuelBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ChartCard>
        </div>
      ) : (
        <div>No simulation results found. Run a simulation to see KPIs.</div>
      )}
    </div>
  );
};

export default DashboardPage;
