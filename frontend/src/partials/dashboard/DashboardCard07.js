import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



import { getAuth as listAuth } from "../../redux/actions/authActions";

import { getMessages as listMessages } from "../../redux/actions/messageActions";



function DashboardCard07() {
    const [succes, setSuccess] = useState(true);


    const dispatch = useDispatch();

    const getAuth = useSelector((state) => state.getAuth);
    const { auth } = getAuth;


    const getMessages = useSelector((state) => state.getMessages);
    const { messages, loading, error } = getMessages;




    useEffect(() => {
        dispatch(listMessages());
        dispatch(listAuth());
    }, [dispatch]);


    const [Message, setMessage] = useState({
        "message": "",
    });


    const InputEvent = (event) => {
        const { name, value } = event.target;
        setMessage((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    };
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            createMessage(event)
        }
    };


    const getMessageDetails = () => {

        const MESSAGE = {
            "message": Message.message,
            "name": auth.fullName,
        }

        if (!MESSAGE.name || !MESSAGE.message) {
            setMessage({
                "message": "",
            })

        } else {
            const response = fetch("/api/message/addMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(MESSAGE)
            }).then((Data) => {
                if (Data) {
                    dispatch(listMessages())
                } else {

                    setSuccess(false)
                }
            });

            /// Clearing The Form Data 
            setMessage({
                "message": "",
            })
        }

    }

    const createMessage = (e) => {
        e.preventDefault();
        getMessageDetails()
    }

    // auth.role !== undefined &&
    return (auth.role !== undefined &&
        <div className="col-span-full xl:col-span-6  bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="flex p:2 sm:p-6 justify-between flex flex-col">

                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="flex items-center space-x-4">
                        <img src="https://www.pnglib.com/wp-content/uploads/2020/01/chat-logo_5e1705e5e6694.png" className="h-10 w-10" alt="messageIcon" />
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3">Messages</span>
                            </div>
                            <span className="text-lg text-gray-600"></span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : (
                        messages.map((message) => message.name === auth.fullName ? (
                            <div className="chat-message">
                                <div className="flex items-end justify-end">
                                    <div className="flex flex-col space-y-1 text-xs max-w-xs mx-2 order-1 items-end">
                                        <div className="text-xs text-gray-500">
                                            <span className="text-xs text-gray-500" >{message.name}</span>
                                        </div>
                                        <div className="flex items-end flex-col">
                                            <span className="px-4 text-sm  py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">{message.message}</span>
                                            <span className="text-xs mr-2 text-gray-500">{(message.createdAt)}</span>
                                        </div>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                                </div>
                            </div>
                        ) : (
                            <div className="chat-message">
                                <div className="flex items-end">
                                    <div className="flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div className="text-xs flex text-gray-500" >
                                            <span className="text-xs text-gray-500">{(message.name)}</span>
                                        </div>
                                        <div className="flex items-end flex-col">
                                            <span className="px-4 text-sm py-1 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message.message}  </span>
                                            <span className="text-xs mr-2 text-gray-500">{(message.createdAt)}</span>
                                        </div>
                                    </div>
                                    <img src="https://avatars.githubusercontent.com/u/67522406?v=4" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                </div>

                            </div>
                        )
                        )
                    )}

                </div>
                {succes === false && <p className="text-red-500">Server Error ! Come Back Later</p>}
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <span className="absolute inset-y-0 flex items-center">
                            <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="text"
                            placeholder="Write Something"
                            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                            name="message"
                            onKeyDown={handleKeyDown}
                            value={Message.message}
                            onChange={InputEvent}

                        />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                </svg>
                            </button>

                            <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                            <button type="button" onClick={createMessage}
                                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardCard07


