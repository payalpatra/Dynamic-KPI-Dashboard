import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "../../redux/actions/authActions";

function DashboardCard11() {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [data, setData] = useState({
        "company": '',
        "name": '',
        "email": '',
        "title": "",
        "amount": '',
    })

    const dispatch = useDispatch();

    const getAuth = useSelector((state) => state.getAuth);
    const { auth } = getAuth;

    useEffect(() => {
        dispatch(listAuth());
    }, [dispatch]);


    const InputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    };

    const addCustomer = async (e) => {
        e.preventDefault();
        const {
            company, name, email, title, amount
        } = data

        if (!company || !name || !email || !title || !amount) {
            setFailure(true);
        } else {
            await fetch("/api/customers/addData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    company, name, email, title, amount,
                }),
            }).then((Data) => {
                setSuccess(true);
            });
        }


        setInterval(function () {
            setSuccess(false);
            setFailure(false);
        }, 2000);

        setData({
            company: '',
            name: '',
            email: "",
            title: "",
            amount: '',
        })
    };


    return (auth.role === "Admin" &&
        <div className="col-span-full xl:col-span-12 pl-8 pr-8 lg:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <form className="bg-white overflow-x-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="company">
                        Company Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="company"
                        type="text"
                        name="company"
                        value={data.company}
                        onChange={InputEvent}
                        placeholder="Company"
                        required

                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="Name">
                        FULL Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={InputEvent}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={InputEvent}
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="designation">
                        Designation
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={InputEvent}
                        placeholder="Manager"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="email">
                        Amount
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="text"
                        name="amount"
                        value={data.amount}
                        onChange={InputEvent}
                        placeholder="$35647"
                        required
                    />
                </div>
                {failure === true && <p className="text-red-500 text-xs text-left mb-2 ">Inavalid Inputs</p>}
                {success === true && <p className="text-green-500 text-xs text-left mb-2 ">Customer Added</p>}
                <div className="flex items-center justify-between">
                    <button onClick={addCustomer} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Add Customer
                    </button>
                </div>
            </form>

        </div>
    );
}

export default DashboardCard11;