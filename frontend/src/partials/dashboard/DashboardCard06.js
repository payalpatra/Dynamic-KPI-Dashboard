import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import Pdf from "react-to-pdf";


// Import utilities
import { tailwindConfig } from '../../utils/Utils';
const ref = React.createRef();

// CUSTOMER SATISFACTION
function DashboardCard06() {

  // Local Storage
  let Graphs = JSON.parse(localStorage.getItem("graphs"))
  let customerSatisfaction = Graphs[6].customerSatisfaction


  let chartData = {
    labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: customerSatisfaction,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <Pdf targetRef={ref} filename="customer-satisfaction.pdf">
      {({ toPdf }) =>
        <div ref={ref} className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
          <header type="Button" style={{ cursor: "pointer" }} onClick={toPdf} className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Customer Satisfaction</h2>
          </header>
          <DoughnutChart data={chartData} width={389} height={260} />
        </div>
      }
    </Pdf>
  );
}

export default DashboardCard06;
