import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


import { getUsers as listUsers } from "../../redux/actions/usersAction";

import { getAuth as listAuth } from "../../redux/actions/authActions";

function DashboardCard10() {
  const dispatch = useDispatch();

  const getUsers = useSelector((state) => state.getUsers);
  const { users } = getUsers;

  const getAuth = useSelector((state) => state.getAuth);
  const { auth } = getAuth;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listAuth());

  }, [dispatch]);

  const changeRole = async (e) => {

    const id = e.target.value
    await fetch("/api/auth/updateRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id
      }),
    }).then(Data => {
      console.log(Data)
    });


  }

  const filteredUsers = users.filter(user => user._id !== auth._id)

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
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
                filteredUsers.map(employee => {
                  return (
                    <tr key={employee._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src="https://i1.sndcdn.com/artworks-q2CRJXVVeKryjno9-O2sRwA-t500x500.jpg" width="40" height="40" alt={employee.fullName} />
                          </div>
                          <div className="font-medium text-gray-800">{employee.fullName}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">Finalize testing plan</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left ">20 JULY</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-yellow-500">Pending</div>
                      </td>

                      {auth.role === "Admin" && (<td className="p-2 whitespace-nowrap">
                        <div className="text-left ">
                          <button value={employee._id} onClick={changeRole} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-20" style={{ outline: "none" }}>
                            {employee.role === "User" ? "Complete" : ""}
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
