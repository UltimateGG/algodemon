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
  ArcElement,
  BarController
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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
  ArcElement,
  BarController
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

export interface PageView {
  page: string;
  views: number;
}

export interface Props {
  pageViews: PageView[];
}

export const PageViewsChart = ({ pageViews }: Props) => {
  const { theme } = useContext(ThemeContext);

  const data = {
    labels: pageViews.map(p => p.page),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Page Views',
        backgroundColor: theme.colors.primary[0],
        data: pageViews.map(p => p.views),
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
    />
  );
}

export default PageViewsChart;

