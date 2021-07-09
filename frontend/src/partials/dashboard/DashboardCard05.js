import React, { useState, useEffect } from 'react';
import RealtimeChart from '../../charts/RealtimeChart';
import Pdf from "react-to-pdf";
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
const ref = React.createRef();

const apiKey = "5da61562c3b949418870439ca68d573f"
const url = `https://api.twelvedata.com/time_series?symbol=CAP,EUR/USD,ETH/BTC:Huobi,RY:TSX&interval=1min&apikey=${apiKey}`

function DashboardCard05() {
  let [data_, setdata] = useState({})

  const fetchData = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(""));
  }

  useEffect(() => {
    fetchData();
    setdata(data)
  }, []);

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  // // Dummy data to be looped
  let data = [
    157.81, 157.75, 155.48, 154.28, 153.14, 152.25, 151.04, 152.49, 155.49, 156.87,
    153.73, 156.42, 158.06, 155.62, 158.16, 155.22, 158.67, 160.18, 161.31, 163.25,
    165.91, 164.44, 165.97, 162.27, 160.96, 159.34, 155.07, 159.85, 153.79, 151.92,
    150.95, 149.65, 148.09, 149.81, 147.85, 149.52, 150.21, 152.22, 154.42, 153.42,
    150.91, 158.52, 153.37, 157.58, 159.09, 159.36, 158.71, 159.42, 155.93, 157.71,
    150.62, 156.28, 157.37, 53.08, 155.94, 155.82, 153.94, 152.65, 154.25
  ];




  const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000));
    });
    return dates;
  };

  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  // Fake update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 2000);
    return () => clearInterval(interval)
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: data_,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
    <Pdf targetRef={ref} filename="company-share.pdf">
      {({ toPdf }) =>

        <div ref={ref} className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
          <header type= "Button" style={{cursor: "pointer"}} onClick={toPdf} className="px-5 py-4 border-b border-gray-100 flex items-center">
            <h2 className="font-semibold text-gray-800">Company Share Price</h2>

          </header>

          <RealtimeChart data={chartData} width={595} height={248} />
        </div>

      }
    </Pdf>
  );
}

export default DashboardCard05;
