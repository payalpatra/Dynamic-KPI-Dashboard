import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


import { getUsers as listUsers } from "../../redux/actions/usersAction";

import { getAuth as listAuth } from "../../redux/actions/authActions";

function DashboardCard10() {

  const adminAvtar = "https://www.ummg.edu.mm/Media/English/Staff/person.png"
  const userAvtar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6N5q9d8HiROYfdhFjLs3T1JWP3UJSlIPjsqQ78WCVITAtGq1CzbIn2N9EtR12mFSqVFQ&usqp=CAU"

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
      dispatch(listUsers());
    });


  }

  const filteredUsers = users.filter(user => user._id !== auth._id)

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Users</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">User Id</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                {auth.role === "Admin" && (<th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Edit Role</div>
                </th>)
                }
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {
                filteredUsers.map(user => {
                  return (
                    <tr key={user._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={user.role === "Admin" ? adminAvtar : userAvtar} width="40" height="40" alt={user.fullName} />
                          </div>
                          <div className="font-medium text-gray-800">{user.fullName}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{user._id}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left ">{user.role}</div>
                      </td>

                      {auth.role === "Admin" && (<td className="p-2 whitespace-nowrap">
                        <div className="text-left ">
                          <button value={user._id} onClick={changeRole} className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-16" style={{ outline: "none" }}>
                            {user.role === "User" ? "Admin" : "User"}
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
