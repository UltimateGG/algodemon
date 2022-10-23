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

interface Device {
  name: 'Desktop' | 'Mobile' | 'Tablet';
  sessions: number;
}

const getDeviceType = (session: Session) => {
  if (session.device.screenWidth > 1000) return 'Desktop';
  if (session.device.screenWidth > 600) return 'Tablet';
  return 'Mobile';
};

export interface Props {
  sessions: Session[];
}

export const DevicesChart = ({ sessions }: Props) => {
  const { theme } = useContext(ThemeContext);

  const deviceCount: Device[] = [];
  if (sessions)
    for (const session of sessions)
      if (session.device) {
        if (deviceCount.find(d => d.name === getDeviceType(session))) {
          deviceCount.find(d => d.name === getDeviceType(session))!.sessions++;
        } else {
          deviceCount.push({ name: getDeviceType(session), sessions: 1 });
        }
      }

  deviceCount.sort((a, b) => b.sessions - a.sessions);

  const data = {
    labels: deviceCount.map(p => p.name),
    datasets: [
      {
        type: 'pie' as const,
        label: 'Sessions',
        backgroundColor: [theme.colors.success[0], theme.colors.primary[0], theme.colors.background[1]],
        data: deviceCount.map(p => p.sessions),
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

