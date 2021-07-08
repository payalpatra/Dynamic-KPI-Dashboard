import React from 'react'

function Signup() {
    return (
        <div className="h-full flex justify-center pt-40">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <img src="https://www.capgemini.com/in-en/wp-content/themes/capgemini-komposite/assets/images/logo.svg" className="w-40 h-10 ml-10 mb-4" alt="badge" />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                            Full Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="Enter Your Full Name" />
                    </div>
                   
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Your Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter Your Password" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex justify-center ">
                        <button className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
