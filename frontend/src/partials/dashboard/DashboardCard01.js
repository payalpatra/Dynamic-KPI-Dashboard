import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



import { getAuth as listAuth } from "../../redux/actions/authActions";

function DashboardCard10() {

  const [Tasks, setTasks] = useState([])

  const dispatch = useDispatch();

  const getAuth = useSelector((state) => state.getAuth);
  const { auth } = getAuth;

  
  useEffect(() => {

    dispatch(listAuth());

  }, [dispatch]);

  useEffect(() => {
    fetch("/api/tasks/employeeData")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setTasks(jsonRes));
  },[]);


const UpdateStatus = (e) =>{
  console.log(e.target.value)
}

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg mt-10 rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Upcoming Deadlines</h2>
      </header>
      <div className="p-8">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Assigned To</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Task</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Deadline</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                {auth.role === "Admin" && (<th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Update</div>
                </th>)
                }
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {
                Tasks.map(employee => {
                  return (
                    <tr key={employee._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src="https://i1.sndcdn.com/artworks-q2CRJXVVeKryjno9-O2sRwA-t500x500.jpg" width="40" height="40" alt={employee.employee} />
                          </div>
                          <div className="font-medium text-gray-800">{employee.employee}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{employee.task}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left ">{employee.deadline}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-yellow-500">Pending</div>
                      </td>

                      {auth.role === "Admin" && (<td className="p-2 whitespace-nowrap">
                        <div className="text-left ">
                          <button value={employee._id} onClick={UpdateStatus} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-20" style={{ outline: "none" }}>
                            {auth.role === "Admin" ? "Complete" : ""}
                          </button>

                        </div>
                      </td>)}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
