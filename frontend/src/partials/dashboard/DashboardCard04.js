import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "../../redux/actions/authActions";

import BarChart from "../../charts/BarChart01";
import Pdf from "react-to-pdf";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
const ref = React.createRef();

// MONTHLY SALES
function DashboardCard04() {


  const dispatch = useDispatch();

  const getAuth = useSelector((state) => state.getAuth);
  const { auth } = getAuth;

  useEffect(() => {
    dispatch(listAuth());
  }, [dispatch]);


  let Graphs = JSON.parse(localStorage.getItem("graphs"))


  let ActualSales = Graphs[0].ActualSales
  let TargetSales = Graphs[1].TargetSales
  let MLabels = Graphs[2].MLabels


  const chartData = {
    labels: MLabels,
    datasets: [
      // Light blue bars
      {
        label: "Actual",
        data: ActualSales,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: "Target",
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
      {({ toPdf }) => (
        <div
          ref={ref}
          className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200"
        >
          <header
            type="Button"
            style={{ cursor: "pointer" }}
            onClick={toPdf}
            className="px-5 py-4 border-b border-gray-100"
          >
            <h2 className="font-semibold text-gray-800">Monthly Sales </h2>
          </header>
          <BarChart data={chartData} width={595} height={248} />
        </div>
      )}
    </Pdf>
  );
}

export default DashboardCard04;
