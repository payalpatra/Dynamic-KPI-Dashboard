import React, { useState } from "react";

function DashboardCard02() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // eslint-disable-next-line 
  today = mm + "-" + '01' + "-" + yyyy;

  let Data = [
    { ActualSales: [1600, 900, 1300, 2450, 3700, 4000] },
    { TargetSales: [2600, 5350, 4800, 5200, 4800, 5000] },
    {
      MLabels: [
        "01-01-2021",
        "02-01-2021",
        "03-01-2021",
        "04-01-2021",
        "05-01-2021",
        "06-01-2021",
      ],
    },
    { CapexData: [9200, 6600, 8800, 5200, 9200, 6600] },
    { DividendsData: [2600, 5350, 4000, 7500, 2000, 1700] },
    {
      Clabels: [
        "01-01-2021",
        "02-01-2021",
        "03-01-2021",
        "04-01-2021",
        "05-01-2021",
        "06-01-2021",
      ],
    },
    { customerSatisfaction: ["60", "30", "20"] },
  ];

  let KPIS = [
    {
      id: "0",
      type: "Monthly Sales",
      Data1: "Actual",
      Data2: "Target",
      Data3: "",
    },
    {
      id: "1",
      type: "Customer Satisfaction",
      Data1: "Satisfied",
      Data2: "Neutral",
      Data3: "Unsatisfied",
    },
    {
      id: "2",
      type: "Capex vs Dividends",
      Data1: "Capex",
      Data2: "Dividends",
      Data3: "",
    },
  ];

  if (!JSON.parse(localStorage.getItem("graphs"))) {
    localStorage.setItem("graphs", JSON.stringify(Data));
  }

  let Graphs = JSON.parse(localStorage.getItem("graphs"));

  let [GRAPHS, setGRAPS] = useState([
    { ActualSales: Graphs[0].ActualSales },
    { TargetSales: Graphs[1].TargetSales },
    {
      MLabels: Graphs[2].MLabels,
    },
    { CapexData: Graphs[3].CapexData },
    { DividendsData: Graphs[4].DividendsData },
    {
      Clabels: Graphs[5].Clabels,
    },
    { customerSatisfaction: Graphs[6].customerSatisfaction },
  ]);

  const [data, setData] = useState({
    Actual: "",
    Target: "",
    Satisfied: "",
    Neutral: "",
    Unsatisfied: "",
    Capex: "",
    Dividends: "",
  });

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const UpdateKPI = (e) => {
    // e.preventDefault();
    let id = e.target.value;

    // Monthly Sales
    let ActualSales = GRAPHS[0].ActualSales;
    let TargetSales = GRAPHS[1].TargetSales;
    let MLabels = GRAPHS[2].MLabels;

    // Capex Vs Dividens
    let CapexData = GRAPHS[3].CapexData;
    let DividendsData = GRAPHS[4].DividendsData;
    let Clabels = GRAPHS[5].Clabels;

    // Customer Satisfaction
    let customerSatisfaction = GRAPHS[6].customerSatisfaction;

    // UPDATE DATA FOR MONTHSALES
    if (!data.Actual || !data.Target || !data.Capex || !data.Dividends || !data.Satisfied || !data.Neutral || !data.Unsatisfied) {
      setFailure(true)
    }
    if (data.Actual && data.Target && id === "0") {

      // USER INPUTS
      let Data1 = parseInt(data.Actual);
      let Data2 = parseInt(data.Target);

      let lastLabel = MLabels[MLabels.length - 1].split("-")[0];
      let Data3 = today

      // The Data For the current Month is already Present
      if (lastLabel === today.split("-")[0]) {
        ActualSales.pop()
        ActualSales.push(Data1);
        TargetSales.pop()
        TargetSales.push(Data2);
        console.log("unsuccesfull atempt");
      } else {
        ActualSales.push(Data1);
        TargetSales.push(Data2);
        MLabels.push(Data3);
      }
      setFailure(false)
      setSuccess(true);
    }

    // UPDATE DATA FOR MONTHSALES
    if (data.Satisfied && data.Neutral && data.Unsatisfied && id === "1") {

      // USER INPUTS
      let Data1 = data.Satisfied;
      let Data2 = data.Neutral;
      let Data3 = data.Unsatisfied;
      customerSatisfaction = [Data1, Data2, Data3];

      setFailure(false)
      setSuccess(true);
    }

    // UPDATE DATA FOR CAPEX VS DIVIDENDS
    if (data.Capex && data.Dividends && id === "2") {

      // USER INPUTS
      let Data1 = parseInt(data.Capex);
      let Data2 = parseInt(data.Dividends);

      let lastLabel = Clabels[Clabels.length - 1].split("-")[0];
      let Data3 = today;

      if (lastLabel === today.split("-")[0]) {
        CapexData.pop()
        CapexData.push(Data1);
        DividendsData.pop()
        DividendsData.push(Data2);
      } else {

        CapexData.push(Data1);
        DividendsData.push(Data2);
        Clabels.push(Data3);
      }
      setFailure(false)
      setSuccess(true);
    }


    // SHOW MESSAGE
    setInterval(function () {
      setSuccess(false);
      setFailure(false);
    }, 2000);


    setGRAPS([
      { ActualSales: ActualSales },
      { TargetSales: TargetSales },
      {
        MLabels: MLabels,
      },
      { CapexData: CapexData },
      { DividendsData: DividendsData },
      {
        Clabels: Clabels,
      },
      { customerSatisfaction: customerSatisfaction },
    ]);
  };


  localStorage.setItem("graphs", JSON.stringify(GRAPHS));

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg mt-0 rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          Update KPIS For The Next Month
        </h2>
        {failure === true && (
          <p className="text-red-600 font-bold">Invalid Inputs</p>
        )}
        {success === true && (
          <p className="text-green-600 font-bold">Data Updated Successfully</p>
        )}
      </header>
      <div className="p-8">
        {/* Table */}
        <div className="overflow-x-auto flex justify-center">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">KPI TYPE</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Data1</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Data2</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Data3</div>
                </th>
                {/* {auth.role === "Admin" && 
                ( */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Update</div>
                </th>
                {/* )
                } */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody type="form" className="text-sm divide-y divide-gray-100">
              {KPIS.map((kpi) => {
                return (
                  <tr key={kpi.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">
                          {kpi.type}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-indigo-500 ">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id={kpi.Data1}
                          name={kpi.Data1}
                          type="text"
                          placeholder={kpi.Data1}
                          onChange={InputEvent}
                          style={{ fontSize: "13px" }}
                          autoComplete="off"
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-indigo-500">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id={kpi.Data2}
                          name={kpi.Data2}
                          type="text"
                          placeholder={kpi.Data2}
                          onChange={InputEvent}
                          style={{ fontSize: "13px" }}
                          autoComplete="off"
                        />
                      </div>
                    </td>
                    {kpi.Data3 ? (
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-indigo-500">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={kpi.Data3}
                            name={kpi.Data3}
                            type="text"
                            placeholder={kpi.Data3}
                            onChange={InputEvent}
                            style={{ fontSize: "12px" }}
                            autoComplete="off"
                          />
                        </div>
                      </td>
                    ) : (
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-indigo-500">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={kpi.Data3}
                            name={kpi.Data3}
                            type="text"
                            placeholder={kpi.Data3}
                            onChange={InputEvent}
                            value="Not Applicable"
                            style={{ fontSize: "11px" }}
                            autoComplete="off"
                          />
                        </div>
                      </td>
                    )}
                    {/* {auth.role === "Admin" && ( */}
                    <td
                      className="p-2 whitespace-nowrap"
                      style={{ width: "fitContent" }}
                    >
                      <div className="text-left ">
                        <button
                          value={kpi.id}
                          onClick={UpdateKPI}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded w-20"
                          style={{ outline: "none" }}
                          type="reset"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                    {/* )} */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
