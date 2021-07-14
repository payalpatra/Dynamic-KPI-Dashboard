import React, { useState, useRef, useEffect } from 'react';

import Transition from '../../utils/Transition.js';
import Dashboard from "../../partials/dashboard/DashboardCard02"

function Dropdown() {

    const [searchOpen, setSearchOpen] = useState(false);

    const trigger = useRef(null);
    const searchContent = useRef(null);
    const searchInput = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!searchOpen || searchContent.current.contains(target) || trigger.current.contains(target)) return;
            setSearchOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!searchOpen || keyCode !== 27) return;
            setSearchOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            {/* Button */}
            <button
                ref={trigger}
                className={`w-3 h-4 flex items-center justify-center btn rounded-full text-white bg-indigo-500  ml-3 ${searchOpen && 'bg-indigo-200'}`}
                onClick={() => { setSearchOpen(!searchOpen); setImmediate(() => searchInput.current.focus()); }}
                aria-controls="search-modal"
            >

                <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
            </button>
            {/* Modal backdrop */}
            <Transition
                className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
                show={searchOpen}
                enter="transition ease-out duration-200"
                enterStart="opacity-0"
                enterEnd="opacity-100"
                leave="transition ease-out duration-100"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                aria-hidden="true"
            />
            {/* Modal dialog */}
            <Transition
                id="search-modal"
                className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
                role="dialog"
                aria-modal="true"
                show={searchOpen}
                enter="transition ease-in-out duration-200"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4"
            >
                <div className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg" ref={searchContent}>
                    {/* form */}
                    <form className="border-b border-gray-200">
                        <div className="relative">
                            <label htmlFor="modal-search" className="sr-only">Update Anything</label>
                            <input id="modal-search" className="w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none ml-1 py-3 pl-10 pr-4" type="search" placeholder="Update KPIS …" ref={searchInput} />
                            <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                                <img className="w-8 h-8 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-2 mr-8" src="https://png.pngtree.com/png-vector/20190916/ourmid/pngtree-graph-icon-for-your-project-png-image_1731094.jpg" alt="" />
                            </button>
                        </div>
                    </form>
                    <div className="py-4 px-2" onFocus={() => setSearchOpen(true)} onBlur={() => setSearchOpen(false)}>
                        {/* Recent searches */}
                        <div className="mb-0 last:mb-0">
                            <ul className="text-sm">
                               
                            <Dashboard/>
                            </ul>
                        </div>

                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default Dropdown;