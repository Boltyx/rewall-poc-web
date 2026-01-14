import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import './TwodimSpectrum.css';

// Custom shape for the scatter points (sized by references)
const CustomDot = (props) => {
  const { cx, cy, payload, onMouseEnter, onMouseLeave, activeId } = props;
  const isActive = activeId === payload.id;
  
  // Calculate size based on references (logarithmic scale approx)
  const size = payload.references ? Math.max(4, Math.min(16, Math.log(payload.references) * 2)) : 6;
  const finalSize = isActive ? size * 1.3 : size;
  
  return (
    <g 
      onMouseEnter={() => onMouseEnter(payload)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
    >
      {/* Halo (static, no pulse) */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={finalSize + 4} 
        fill={payload.color || "#3b82f6"} 
        fillOpacity={0.15}
      />
      {/* Core dot */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={finalSize} 
        fill={payload.color || "#3b82f6"} 
        stroke="rgba(255,255,255,0.5)" 
        strokeWidth={1}
      />
    </g>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="spectrum-tooltip">
        <div className="spectrum-tooltip__header">
          <FileText size={14} className="spectrum-tooltip__icon" />
          <span className="spectrum-tooltip__type">Research Paper</span>
        </div>
        <h4 className="spectrum-tooltip__title">{data.title}</h4>
        <div className="spectrum-tooltip__meta">
          <span className="spectrum-tooltip__author">{data.author}</span>
          <span className="spectrum-tooltip__year">{data.year}</span>
        </div>
        <div className="spectrum-tooltip__metrics">
          <div className="spectrum-metric">
            <span className="spectrum-metric__label">Position:</span>
            <span className="spectrum-metric__value">{data.positionLabel}</span>
          </div>
          <div className="spectrum-metric">
            <span className="spectrum-metric__label">Evidence:</span>
            <span className="spectrum-metric__value">{data.clarityLabel}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TwodimSpectrum({ data, question }) {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <div className="spectrum-container">
      <div className="spectrum-header">
        <h3 className="spectrum-title">Research Landscape</h3>
        <p className="spectrum-subtitle">
          Mapping {data.length} sources for: <span className="spectrum-question">"{question}"</span>
        </p>
      </div>

      <div className="spectrum-chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            {/* Grid quadrants */}
            <ReferenceLine x={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
            
            {/* Axes */}
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Position" 
              domain={[-1, 1]} 
              tick={false} 
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Clarity" 
              domain={[-1, 1]} 
              tick={false} 
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />

            {/* Labels for Quadrants/Axes */}
            <text x="50%" y="10" textAnchor="middle" className="spectrum-axis-label top">High Clarity / Proven</text>
            <text x="50%" y="390" textAnchor="middle" className="spectrum-axis-label bottom">Ambiguous / Theoretical</text>
            <text x="10" y="200" textAnchor="start" className="spectrum-axis-label left">High Risk / Anti</text>
            <text x="99%" y="200" textAnchor="end" className="spectrum-axis-label right">Low Risk / Pro</text>

            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            <Scatter 
              name="Sources" 
              data={data} 
              shape={(props) => (
                <CustomDot 
                  {...props} 
                  activeId={activePoint} 
                  onMouseEnter={(p) => setActivePoint(p.id)}
                  onMouseLeave={() => setActivePoint(null)}
                />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend / Guide */}
        <div className="spectrum-guide">
          <div className="spectrum-guide__item">
            <span className="dot dot--blue"></span> Consencus
          </div>
          <div className="spectrum-guide__item">
            <span className="dot dot--purple"></span> Emerging
          </div>
          <div className="spectrum-guide__item">
            <span className="dot dot--red"></span> Contested
          </div>
        </div>
      </div>
    </div>
  );
}
