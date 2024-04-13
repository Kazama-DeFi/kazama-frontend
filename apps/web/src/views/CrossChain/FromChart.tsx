import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, UTCTimestamp, LineData, LineStyle } from 'lightweight-charts';
import dayjs from 'dayjs';

interface CryptoChartProps {
  ticker: string;
}

const FromChart: React.FC<CryptoChartProps> = ({ ticker }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [priceData, setPriceData] = useState<{ time: number; value: number }[]>([]);

  const fetchPriceData = async () => {
    try {
      const params = new URLSearchParams({
        vs_currency: 'usd',
        days: '7',
      });

      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${ticker}/market_chart?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch price data. Status: ${response.status}`);
      }

      const data = await response.json();
      const prices = data.prices.map((item: [number, number]) => ({
        time: item[0],
        value: item[1],
      }));

      setPriceData(prices);
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  useEffect(() => {
    // Fetch new data when ticker changes
    fetchPriceData();
  }, [ticker]);

  useEffect(() => {
    if (chartContainerRef.current) {
      // Clear existing chart
      if (chartRef.current) {
        chartRef.current.remove();
      }

      // Create a new chart
      chartRef.current = createChart(chartContainerRef.current, { 
        layout: {
            background: { color: "transparent" },
            textColor: '#a6a7aa'
          },
          autoSize: true,
          handleScale: false,
          handleScroll: false,
          rightPriceScale: {
            scaleMargins: {
              top: 0.3,
              bottom: 0.1,
            },
            borderVisible: true,
          },
          grid: {
            horzLines: {
              visible: false,
            },
            vertLines: {
              visible: false,
            },
          },
          crosshair: {
            horzLine: {
              visible: true,
              labelVisible: true,
              labelBackgroundColor: "#2a2a41",
              color: "#fff",
              style: 1,
            },
            mode: 0,
            vertLine: {
              visible: false,
              labelVisible: false,
              style: 1,
              width: 1,
              color: "#7A6EAA",
            },
          },
        width: 500, 
        height: 250
    });
    
    const newSeries = chartRef.current.addAreaSeries({
        lineWidth: 2,
        lineColor: "#10D960",
        topColor: 'rgba(16, 217, 96, 0.651)',
        bottomColor: 'rgba(16, 217, 96, 0)',
    })

      // Set data for the new series
      const formattedData = priceData.map(({ time, value }) => ({
        time: time as UTCTimestamp,
        value,
      }));
      newSeries.setData(formattedData);
    }
  }, [priceData]);

  return <div ref={chartContainerRef} />;
};

export default FromChart;