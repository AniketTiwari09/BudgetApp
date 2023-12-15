import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartComponent = () => {
  const [lineChartData, setLineChartData] = useState([10, 20, 30, 40, 60, 70, 80]);
  const [barChartData, setBarChartData] = useState([10, 20, 30, 40, 60, 70, 80]);
  const [pieChartData, setPieChartData] = useState([
    40, 375, 93, 400, 400, 100, 50, 10, 20, 30, 40, 60, 70, 80, 90, 100, 110, 120
  ]);

  const [lineChartLabels, setLineChartLabels] = useState([
    'Gym', 'Rent', 'Utilities', 'Grocery', 'Events', 'shop', 'electronics'
  ]);
  const [barChartLabels, setBarChartLabels] = useState([
    'Gym', 'Rent', 'Utilities', 'Grocery', 'Events', 'shop', 'electronics'
  ]);
  const [pieChartLabels, setPieChartLabels] = useState([
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ]);



  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    let lineChart = null;
    let barChart = null;
    let pieChart = null;

    const lineData = {
      labels: lineChartLabels,
      datasets: [{
        label: 'Line Chart',
        data: lineChartData,
        fill: false,
        borderColor: 'rgba(0, 0, 0, 1)',
        tension: 0.1,
      }],
    };

    const barData = {
      labels: barChartLabels,
      datasets: [{
        label: 'Bar Chart',
        data: barChartData,
        backgroundColor: [
          'rgba(50, 50, 50, 0.5)',
          'rgba(100, 100, 100, 0.5)',
          'rgba(150, 150, 150, 0.5)',
          'rgba(200, 200, 200, 0.5)',
          'rgba(250, 250, 250, 0.5)',
          'rgba(300, 300, 300, 0.5)',
          'rgba(350, 350, 350, 0.5)',
        ],
        borderColor: [
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
      }],
    };

    const pieData = {
      labels: pieChartLabels,
      datasets: [{
        label: 'Pie Chart',
        data: pieChartData,
        backgroundColor: [
          'rgba(50, 50, 50, 0.5)',
          'rgba(100, 100, 100, 0.5)',
          'rgba(150, 150, 150, 0.5)',
          'rgba(200, 200, 200, 0.5)',
          'rgba(250, 250, 250, 0.5)',
          'rgba(300, 300, 300, 0.5)',
          'rgba(350, 350, 350, 0.5)',
          'rgba(400, 400, 400, 0.5)',
          'rgba(450, 450, 450, 0.5)',
          'rgba(500, 500, 500, 0.5)',
          'rgba(550, 550, 550, 0.5)',
          'rgba(600, 600, 600, 0.5)',
        ],
        hoverOffset: 4,
      }],
    };

    if (lineChartRef.current) {
      lineChart = new Chart(lineChartRef.current, {
        type: 'line',
        data: lineData,
      });
    }

    if (barChartRef.current) {
      barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: barData,
      });
    }

    if (pieChartRef.current) {
      pieChart = new Chart(pieChartRef.current, {
        type: 'pie',
        data: pieData,
      });
    }

    return () => {
      if (lineChart) {
        lineChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, [lineChartData, barChartData, pieChartData, lineChartLabels, barChartLabels, pieChartLabels]);

  const handleLineDataChange = (e, index) => {
    const newData = [...lineChartData];
    newData[index] = parseInt(e.target.value, 10);
    setLineChartData(newData);

    sendDataToBackend({ lineChartData: newData });
  };

  const handleBarDataChange = (e, index) => {
    const newData = [...barChartData];
    newData[index] = parseInt(e.target.value, 10);
    setBarChartData(newData);

    sendDataToBackend({ barChartData: newData });
  };

  const handlePieDataChange = (e, index) => {
    const newData = [...pieChartData];
    newData[index] = parseInt(e.target.value, 10);
    setPieChartData(newData);

    sendDataToBackend({ pieChartData: newData });
  };

  const handleLineLabelChange = (e, index) => {
    const newLabels = [...lineChartLabels];
    newLabels[index] = e.target.value;
    setLineChartLabels(newLabels);
  };

  const handleBarLabelChange = (e, index) => {
    const newLabels = [...barChartLabels];
    newLabels[index] = e.target.value;
    setBarChartLabels(newLabels);
  };

  const handlePieLabelChange = (e, index) => {
    const newLabels = [...pieChartLabels];
    newLabels[index] = e.target.value;
    setPieChartLabels(newLabels);
  };

  const sendDataToBackend = (data) => {
    axios.post('http://159.203.116.79:3000/chartData', data)
      .then(response => {
        console.log(response.data); // Log the response from the backend
        // Optionally handle success (e.g., show a success message)
      })
      .catch(error => {
        console.error('Error sending chart data:', error);
        // Optionally handle errors (e.g., show an error message)
      });
  };


  

  return (
    <div>
      {/* Line Chart */}
      <div>
        <h3>Line Chart</h3>
        {lineChartLabels.map((label, index) => (
          <div key={`line_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handleLineLabelChange(e, index)}
            />
            <input
              type="number"
              value={lineChartData[index]}
              onChange={(e) => handleLineDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={lineChartRef} />

      {/* Bar Chart */}
      <div>
        <h3>Bar Chart</h3>
        {barChartLabels.map((label, index) => (
          <div key={`bar_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handleBarLabelChange(e, index)}
            />
            <input
              type="number"
              value={barChartData[index]}
              onChange={(e) => handleBarDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={barChartRef} />

      {/* Pie Chart */}
      <div>
        <h3>Pie Chart</h3>
        {pieChartLabels.map((label, index) => (
          <div key={`pie_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handlePieLabelChange(e, index)}
            />
            <input
              type="number"
              value={pieChartData[index]}
              onChange={(e) => handlePieDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={pieChartRef} />
    </div>
  );
};

export default ChartComponent;
