// frontend/src/components/ChartCard.js
import React from 'react';

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export default ChartCard;
