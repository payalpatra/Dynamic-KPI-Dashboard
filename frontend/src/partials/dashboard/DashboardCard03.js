import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "../../redux/actions/authActions";

function DashboardCard03() {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [data, setData] = useState({
        "employee": "",
        "task": "",
        "deadline": "",
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

    const addTask = async (e) => {
        e.preventDefault();
        const { employee, task, deadline } = data

        if (!employee || !task || !deadline) {
            setFailure(true);
        }else {
            await fetch("/api/tasks/addData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    employee, task, deadline
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
            "employee": "",
            "task": "",
            "deadline": "",
        })
    };

    return (auth.role === "Admin" &&
        <div className="col-span-full xl:col-span-12 pl-8 pr-8 lg:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <form className="bg-white overflow-x-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="employee">
                        Employer Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="employee"
                        type="text"
                        name="employee"
                        value={data.employee}
                        onChange={InputEvent}
                        placeholder="Employee Name"
                        required

                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="task">
                        Task
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="task"
                        type="text"
                        name="task"
                        value={data.task}
                        onChange={InputEvent}
                        placeholder="Task"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm text-left font-bold mb-2" htmlFor="task">
                        Deadline
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="deadline"
                        type="text"
                        name="deadline"
                        value={data.deadline}
                        onChange={InputEvent}
                        placeholder="19 July"
                        required
                    />
                </div>
                {failure === true && <p className="text-red-500 text-xs text-left mb-2 ">Inavalid Inputs</p>}
                {success === true && <p className="text-green-500 text-xs text-left mb-2 ">Task Assigned</p>}
                <div className="flex items-center justify-between">
                    <button onClick={addTask} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Assign
                    </button>
                </div>
            </form>

        </div>
    );
}

export default DashboardCard03;
