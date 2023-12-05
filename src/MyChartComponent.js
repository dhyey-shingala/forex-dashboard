import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";

const MyChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      // If there is an existing chart instance, destroy it before creating a new one
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const dates = data.map((item) => {
        return DateTime.fromISO(item.Date).toJSDate();
      });
      const openPrices = data.map((item) => parseFloat(item.Open));
      const closePrices = data.map((item) => parseFloat(item.Close));

      // Create a new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Open Prices",
              data: openPrices,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Close Prices",
              data: closePrices,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                parser: "datetime",
                tooltipFormat: "ll",
              },
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price",
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MyChartComponent;
