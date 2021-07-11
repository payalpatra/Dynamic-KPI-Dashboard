import React from 'react';
import Info from '../../utils/Info';
import BarChart from '../../charts/BarChart02';
import Pdf from "react-to-pdf";

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
const ref = React.createRef();


// CAPEX V/S DIVIDENDS
function DashboardCard09() {

  let Data1 = [6200, 9200, 6600, 8800, 5200, 9200]
  let Data2 = [4000, 2600, 5350, 4000, 7500, 2000]

  let labels = [
    '12-01-2020', '01-01-2021', '02-01-2021',
    '03-01-2021', '04-01-2021', '05-01-2021', "06-01-2021"
  ]


  localStorage.setItem("CapexData", JSON.stringify(Data1))
  let CapexData = localStorage.getItem("CapexData")

  localStorage.setItem("DividendsData", JSON.stringify(Data2))
  let DividendsData = localStorage.getItem("DividendsData")


  localStorage.setItem("labelData", JSON.stringify(labels))
  let labelData = localStorage.getItem("labelData")

  const chartData = {
    labels: JSON.parse(labelData),
    datasets: [
      // Light blue bars --> CAPEX
      {
        label: 'Stack 1',
        data: JSON.parse(CapexData),
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars --> Dividends
      {
        label: 'Stack 2',
        data: JSON.parse(DividendsData),
        backgroundColor: tailwindConfig().theme.colors.indigo[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <Pdf targetRef={ref} filename="capex-dividends.pdf">
      {({ toPdf }) =>

        <div ref={ref} className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
          <header type="Button" onClick={toPdf} style={{ cursor: "pointer" }} className="px-5 py-4 border-b border-gray-100 flex items-center">
            <h2 className="font-semibold text-gray-800">Capex vs Dividends</h2>
            <Info className="ml-2" containerClassName="min-w-80">

            </Info>
          </header>
          <div className="px-5 py-3">
            <div className="flex items-start">
              <div className="text-3xl font-bold text-gray-800 mr-2"></div>
              <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          {/* Chart built with Chart.js 3 */}
          <div className="flex-grow">
            {/* Change the height attribute to adjust the chart height */}
            <BarChart data={chartData} width={595} height={248} />
          </div>
        </div>
      }
    </Pdf>
  );
}

export default DashboardCard09;
