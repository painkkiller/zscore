import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// Функция для расчета z-score
const calculateZScore = (data, key) => {
  const values = data.map((item) => item[key]);
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const stdDev = Math.sqrt(
    values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length
  );

  return data.map((item) => ({
    ...item,
    [`${key}ZScore`]: Math.abs((item[key] - mean) / stdDev),
  }));
};

// Добавляем z-score для pv и uv
const processedData = calculateZScore(calculateZScore(data, 'pv'), 'uv');


// Компонент для кастомного отображения точек
const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;

  // Определяем цвет точки на основе z-score
  const color =
    Math.abs(payload.pvZScore) > 1 || Math.abs(payload.uvZScore) > 1
      ? '#ff0000'
      : '#8884d8';

  return <circle cx={cx} cy={cy} r={4} fill={color} stroke={color} />;
};

function App() {

  return (
    <ResponsiveContainer minWidth={800} minHeight={600}>
      <LineChart
        width={500}
        height={300}
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={<CustomizedDot />} type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line dot={<CustomizedDot />} type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default App
