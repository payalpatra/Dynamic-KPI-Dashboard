import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "../../redux/actions/authActions";

import { getCustomers as listCustomer } from "../../redux/actions/customerActions";


function DashboardCard08() {

    const dispatch = useDispatch();

    const getCustomers = useSelector((state) => state.getCustomers);
    const { customers, loading, error } = getCustomers;

    const getAuth = useSelector((state) => state.getAuth);
    const { auth } = getAuth;


    useEffect(() => {
        dispatch(listCustomer());
        dispatch(listAuth());
    }, [dispatch]);

    console.log(customers)


    const changeStatus = async (e) => {

        const id = e.target.value
        await fetch("/api/customers/updateStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                id
            }),
        }).then(Data => {
            dispatch(listCustomer());
        });

    }



    const customerss = [
        {
            id: '0',
            company: 'Company A',
            name: 'Alex Shatov',
            email: 'alexshatov@gmail.com',
            title: "Purchaching Manager",
            status: "In Progress",
            amount: '$2,890.66',
        },
        {
            id: '1',
            company: 'Company B',
            name: 'Philip Harbach',
            email: 'philip.h@gmail.com',
            title: "Accounting Assistant",
            status: "In Progress",
            amount: '$2,767.04',
        },
        {
            id: '2',
            company: 'Company C',
            name: 'Mirko Fisuk',
            email: 'mirkofisuk@gmail.com',
            title: "Accounting Assistant",
            status: "In Progress",
            amount: '$2,996.00',
        },
        {
            id: '3',
            company: 'Company D',
            name: 'Olga Semklo',
            email: 'olga.s@cool.design',
            title: "Owner",
            status: "Completed",
            amount: '$1,220.66',
        },
        {
            id: '4',
            company: 'Company E',
            name: 'Burak Long',
            email: 'longburak@gmail.com',
            title: "Owner",
            status: "Completed",
            amount: '$1,890.66',
        },
    ];



    return (
        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">All Customers</h2>
            </header>
            <div className="p-3">

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Company</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Designation</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Status</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Total Amount</div>
                                </th>
                                {auth.role === "Admin" && (<th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Update  Status</div>
                                </th>)}

                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm divide-y divide-gray-100">
                            {loading ? (
                                <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                                customers.map(customer => {
                                    return (
                                        <tr key={customer._id}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <div className="font-medium text-gray-800">{customer.company}</div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{customer.name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{customer.email}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{customer.title}</div>
                                            </td>
                                            {customer.status === "Completed" && (<td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">{customer.status}</div>
                                            </td>)}
                                            {customer.status === "In Progress" && (<td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-yellow-500">{customer.status}</div>
                                            </td>)}
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">{customer.amount}</div>
                                            </td>

                                            {auth.role === "Admin" && (<td className="p-2 whitespace-nowrap">
                                                <div className="text-left ">
                                                    <button value={customer._id} onClick={changeStatus} className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-18" style={{ outline: "none" }}>
                                                        {customer.status === "In Progress" ? "Completed" : "In Progress"}
                                                    </button>

                                                </div>
                                            </td>)}

                                        </tr>
                                    )
                                }))
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )

}
export default DashboardCard08
