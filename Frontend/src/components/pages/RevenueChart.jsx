import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';

function RevenueChart() {
  const { date1, date2 } = useParams();
  const chartContainerRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/orders/getOrdersByDateRange/' + date1 + '/' + date2)
      .then(response => {
        const processedData = processData(response.data);
        setData(processedData);
        console.log(processedData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [date1, date2]);

  useEffect(() => {
    if (data.length > 0 && chartContainerRef.current) {
      const labels = data.map(item => item.dateOrdered);
      const values = data.map(item => item.totalPrice);

      const ctx = chartContainerRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Total Price',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  // Function to process data and sum up totalPrice for items with the same dateOrdered
  const processData = data => {
    const processedData = [];

    data.forEach(item => {
      item.dateOrdered = item.dateOrdered.slice(0,10);
      const existingItem = processedData.find(entry => entry.dateOrdered === item.dateOrdered);

      if (existingItem) {
        existingItem.totalPrice += item.totalPrice;
      } else {
        processedData.push({ ...item });
      }
    });

    return processedData;
  };

  return (
    <div>
      <p>Profit between {date1} and {date2}</p>
      <div>
        <canvas ref={chartContainerRef}></canvas>
      </div>
    </div>
  );
}

export default RevenueChart;
