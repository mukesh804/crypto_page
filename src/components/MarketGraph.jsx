import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', totalMarketCap: 1.2 },
  { date: 'Feb', totalMarketCap: 1.3 },
  { date: 'Mar', totalMarketCap: 1.1 },
  { date: 'Apr', totalMarketCap: 1.4 },
  { date: 'May', totalMarketCap: 1.6 },
  { date: 'Jun', totalMarketCap: 1.5 },
  { date: 'Jul', totalMarketCap: 1.8 }
].map(item => ({
  ...item,
  totalMarketCap: item.totalMarketCap * 1000000000000
}));

const formatYAxis = (value) => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(1)}T`;
  }
  return value;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B1921] border border-[#3B3B4F] p-4 rounded-lg shadow-lg">
        <p className="text-gray-400">{label}</p>
        <p className="text-xl font-bold text-white">
          ${(payload[0].value / 1000000000000).toFixed(2)}T
        </p>
      </div>
    );
  }
  return null;
};

const timeframes = ['1D', '1W', '1M', '1Y', 'ALL'];

export default function MarketGraph() {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');

  return (
    <div className="bg-[#1B1921] rounded-xl border border-[#2D2D3D] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Total Market Capitalization
        </h2>
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setActiveTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTimeframe === timeframe
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#2D2D3D] text-gray-400 hover:bg-[#3D3D4F]'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="marketCapGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.4}/>
                <stop offset="50%" stopColor="#4F46E5" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2D2D3D" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#2D2D3D' }}
              tickLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={formatYAxis}
              axisLine={{ stroke: '#2D2D3D' }}
              tickLine={false}
              domain={['dataMin - 100000000000', 'dataMax + 100000000000']}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{
                stroke: '#4F46E5',
                strokeWidth: 1,
                strokeDasharray: '5 5'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="totalMarketCap" 
              stroke="#4F46E5" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#marketCapGradient)"
              animationDuration={1000}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#4F46E5',
                stroke: '#fff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
