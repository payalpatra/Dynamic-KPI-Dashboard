import React from 'react';
import BarChart from '../../charts/BarChart01';
import Pdf from "react-to-pdf";

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
const ref = React.createRef();


// MONTHLY SALES
function DashboardCard04() {

  const ActualSales = [1000, 1600, 900, 1300, 2450, 3700, 4000]
  const TargetSales = [4900, 2600, 5350, 4800, 5200, 4800, 5000]

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021', '06-01-2021'
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Actual',
        data: ActualSales,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Target',
        data: TargetSales,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <Pdf targetRef={ref} filename="monthly-sales.pdf">
      {({ toPdf }) =>
        <div ref={ref} className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
          <header type="Button" style={{ cursor: "pointer" }} onClick={toPdf} className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Monthly Sales </h2>
          </header>
          <BarChart data={chartData} width={595} height={248} />
        </div>
      }
    </Pdf>
  );
}

export default DashboardCard04;
