import React, { useEffect, useState } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const EmbeddedDashboard = () => {
  const [dashboardWidth, setDashboardWidth] = useState(window.innerWidth * 0.9);
  const [dashboardHeight, setDashboardHeight] = useState(window.innerHeight * 3.5);

  const dashboardChart = process.env.REACT_APP_DASHBOARD_CHART;
  const dashboardChartId = process.env.REACT_APP_DASHBOARD_CHART_ID;
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({});
    const dashboard = sdk.createDashboard({
      baseUrl: dashboardChart,
      dashboardId: dashboardChartId,
      background: '#D4D4D8',
      height: dashboardHeight,
      heightMode: 'fixed',
      width: dashboardWidth,
      widthMode: 'fixed',
      theme: 'light',
      renderingSpec: {
        version: 1,
        title: 'Customized chart title',
        description: 'Customized chart description',
        axes: {
          y: {
            logScale: true
          },
        },
        channels: {
          x: {
            labelOverride: "New field label"
          },
          y: {
            numberSuffix: "%"
          }
        },
        options: {
          labelSize: 150,
          lineSmoothing: 'monotone'
        }
      }
    });

    const embedDashboard = document.getElementById('dashboard');
    dashboard.render(embedDashboard);

    const handleResize = () => {
      setDashboardWidth(window.innerWidth * 0.9);
      setDashboardHeight(window.innerHeight * 3.5);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dashboardWidth, dashboardHeight, dashboardChart, dashboardChartId]);

  return (
    <div className='flex flex-col w-full bg-slate-950 py-12 px-2 md:px-6 justify-center'>
      <div className='flex justify-center flex-col'>
        <h4 className='text-3xl animate-characters font-bold mb-4'>INSIGHTS AND ANALYTICS</h4>
        <p className='text-sm'>(free flow chart)</p>
      </div>
      <div className='flex bg-zinc-300 drop-shadow-xl shadow-inner shadow-black justify-center py-5 px-1'>
        <div id="dashboard" />
      </div>
    </div>
  );
};

export default EmbeddedDashboard;
