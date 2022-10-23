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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Session } from '../../../contexts/SessionTrackerContext';
import { ThemeContext } from '../../../Jet';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
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

interface PageView {
  page: string;
  views: number;
}

export interface Props {
  sessions: Session[];
}

export const PageViewsChart = ({ sessions }: Props) => {
  const { theme } = useContext(ThemeContext);

  const uniquePages: PageView[] = [];
  if (sessions)
    for (const session of sessions)
      for (const event of session.events)
        if (event.type === 'pageview') {
          if (uniquePages.find(p => p.page === event.page)) {
            uniquePages.find(p => p.page === event.page)!.views++;
          } else {
            uniquePages.push({ page: event.page, views: 1 });
          }
        }

  uniquePages.sort((a, b) => b.views - a.views);

  const data = {
    labels: uniquePages.map(p => p.page),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Page Views',
        backgroundColor: theme.colors.primary[0],
        data: uniquePages.map(p => p.views),
      },
    ],
  };

  return (
    <Chart
      type='bar'
      options={options}
      data={data}
    />
  );
}

export default PageViewsChart;

