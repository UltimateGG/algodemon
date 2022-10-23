import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Session } from '../../../contexts/SessionTrackerContext';
import { ThemeContext } from '../../../Jet';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export interface Device {
  name: 'Desktop' | 'Mobile' | 'Tablet';
  sessions: number;
}

export interface Props {
  devices: Device[];
}

export const DevicesChart = ({ devices }: Props) => {
  const { theme } = useContext(ThemeContext);

  const data = {
    labels: devices.map(p => p.name),
    datasets: [
      {
        type: 'pie' as const,
        label: 'Sessions',
        backgroundColor: [theme.colors.success[0], theme.colors.primary[0], theme.colors.background[1]],
        data: devices.map(p => p.sessions),
      },
    ],
  };

  return (
    <Pie
      options={options}
      data={data}
    />
  );
}

export default DevicesChart;

