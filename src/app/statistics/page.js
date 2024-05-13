'use client';
import React, { useEffect } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

export default function ChartPage() {
  useEffect(() => {
    const sdk1 = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-project-0-cbtftzd',
    });

    const chart1 = sdk1.createChart({
      chartId: '663f7e17-3815-4e74-8b12-15fe5591e496',
      width: '100%',
      height: '500px',
    });

    chart1
      .render(document.getElementById('chart1'))
      .catch(() => window.alert('Az első diagram inicializálása sikertelen volt'));

    const sdk2 = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-project-0-cbtftzd',
    });

    const chart2 = sdk2.createChart({
      chartId: '663f8efe-dc15-4ea1-8e8b-e161bf8d5eb1',
      width: '100%',
      height: '500px',
    });

    chart2
      .render(document.getElementById('chart2'))
      .catch(() => window.alert('A második diagram inicializálása sikertelen volt'));
  }, []);

  return (
    <section className='mt-16'>
      <div>
        <div id="chart2" style={{ width: '100%', height: '500px' }}></div>
        <button id="refreshButton2" onClick={() => window.location.reload()}>Frissítés</button>
      </div>
      <div className='mt-16'>
        <div id="chart1" style={{ width: '100%', height: '500px' }}></div>
        <button id="refreshButton1" onClick={() => window.location.reload()}>Frissítés</button>
      </div>
    </section>
  );
}

