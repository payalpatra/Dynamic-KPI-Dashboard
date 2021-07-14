import React, { useState } from "react";
import { Link } from "react-router-dom"

function Signup() {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)
    const [loginButton, setLogin] = useState(false)

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
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

    const register = async (event) => {
        event.preventDefault();

        const { email, password, fullName } = data;


        if (!email || !password || !fullName) {
            setFail(true)
        } else {

            // Fetch Api to post data

            await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                }),
            }).then(Data => {
                if (Data.status === 200) {
                    setLogin(true)
                    setSuccess(true);
                } else {
                    setFail(true)
                }
            });
        }


        setData({
            email: "",
            password: "",
            fullName: ""
        })
        setInterval(function () {
            setFail(false)
            setSuccess(false);
        }, 2000);


    };

    return (
        <div className="h-full flex justify-center pt-40">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <Link to="/">
                        <img
                            src="https://www.capgemini.com/in-en/wp-content/themes/capgemini-komposite/assets/images/logo.svg"
                            className="w-40 h-10 ml-10 mb-4"
                            alt="badge"
                        />
                    </Link>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="fullName"
                        >
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            name="fullName"
                            value={data.fullName}
                            onChange={InputEvent}
                            type="text"
                            placeholder="Enter Your Full Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={InputEvent}
                            type="text"
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={InputEvent}
                            placeholder="Enter Your Password"
                        />
                        {success === true && <p className="text-green-500 text-xs "> You are Successfully Registered </p>}
                        {fail === true && <p className="text-red-500 text-xs ">Something went wrong </p>}
                    </div>
                    <div className="flex justify-center mb-3 ">
                        {loginButton === false ? (<button onClick={register}
                            className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign Up
                        </button>) : (<Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                            Log In
                        </Link>)}
                    </div>
                    <div className="flex flex-row align-center justify-center mb-1 ">
                        <p className="align-center text-xs mt-1 justify-center mr-1">Already have an account ?
                            <Link className="bg-gray-500 hover:bg-gray-700 px-2 ml-1 text-xs rounded focus:outline-none focus:shadow-outline text-white font-normal p-1" to="/login">Log In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
