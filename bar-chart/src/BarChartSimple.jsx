import { useState, useEffect, useMemo } from 'react';
import './BarChartSimple.css';

// Mock API - inline for interview
const chartData = [
  { id: 1, name: 'Legal', value: 32, color: '#3F888F' },
  { id: 2, name: 'Sales', value: 20, color: '#FFA420' },
  { id: 3, name: 'Engineering', value: 60, color: '#287233' },
  { id: 4, name: 'Manufacturing', value: 5, color: '#4E5452' },
  { id: 5, name: 'Maintenance', value: 14, color: '#642424' },
  { id: 6, name: 'Human Resources', value: 35, color: '#1D1E33' },
  { id: 7, name: 'Events', value: 43, color: '#E1CC4F' },
];

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(chartData), 500);
  });
};

export default function BarChartSimple() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    getData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...data.map((item) => item.value), 1);
  }, [data]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>📊 Bar Chart</h1>
        <p>Interview-Ready Solution</p>
      </div>

      <div className="container">
        <div className="chart-title">
          <h2>Department Ticket Count</h2>
          {hoveredBar && (
            <div className="tooltip">
              <strong>{hoveredBar.name}</strong>: {hoveredBar.value} tickets
            </div>
          )}
        </div>

        <div className="chart-container">
          {/* Y-axis labels */}
          <div className="y-axis">
            {[100, 75, 50, 25, 0].map((percent) => (
              <div key={percent} className="y-label">
                {Math.round((percent / 100) * maxValue)}
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="bars-container">
            <div className="bars">
              {data.map((item) => {
                const heightPercent = (item.value / maxValue) * 100;
                return (
                  <div key={item.id} className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: item.color,
                      }}
                      onMouseEnter={() => setHoveredBar(item)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <span className="bar-value">{item.value}</span>
                    </div>
                    <div className="bar-label">{item.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Grid lines */}
            <div className="grid-lines">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div
                  key={percent}
                  className="grid-line"
                  style={{ bottom: `${percent}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          {data.map((item) => (
            <div key={item.id} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Fetch data from API (mock getData function)</li>
          <li>✓ Display bar chart with proportional heights</li>
          <li>✓ Color-coded bars</li>
          <li>✓ Labels for each department</li>
          <li>✓ Y-axis scale</li>
          <li>✓ Grid lines for reference</li>
          <li>✓ Hover tooltips</li>
          <li>✓ Legend</li>
        </ul>
      </div>
    </div>
  );
}
