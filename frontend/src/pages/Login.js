import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "../redux/actions/authActions"
import { Link } from "react-router-dom"


function Loginn() {
    const dispatch = useDispatch();

    const getAuth = useSelector((state) => state.getAuth);
    const { auth } = getAuth;

    useEffect(() => {
        dispatch(listAuth());
    }, [dispatch]);

    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    };



    const login = async (event) => {


        event.preventDefault();

        const { email, password } = data
        if (!email || !password) {
            setFail(true)
        } else {


            // Fetch Api to post data
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            }).then(Data => {
                console.log(Data.status)
                if (Data.status === 200) {
                    console.log(Data)
                    setSuccess(true);
                } else {
                    setFail(true)
                }
            });
        }


        setData({
            email: "",
            password: ""
        })
        setInterval(function () {
            setFail(false)
            setSuccess(false);
        }, 2000);

    }


    return (
        <div className="h-full flex justify-center pt-40">

            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <Link to="/">
                        <img src="https://www.capgemini.com/in-en/wp-content/themes/capgemini-komposite/assets/images/logo.svg" className="w-40 h-10 ml-10 mb-4" alt="badge" />
                    </Link>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text"
                            name="email"
                            value={data.email}
                            onChange={InputEvent}
                            placeholder="Enter Your Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={InputEvent}
                            placeholder="Enter Your Password" />
                        {success === true && <p className="text-green-500 text-xs ">You Are Logged In </p>}
                        {fail === true && <p className="text-red-500 text-xs ">Something went wrong </p>}
                    </div>
                    <div className="flex justify-center ">
                        <button onClick={login} className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Log In
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginn
