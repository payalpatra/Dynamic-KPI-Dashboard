import React from 'react'
import "./common.css"

function Dropdown() {


    return (

        <div className="dropdown inline-block relative mr-2">
            <button className="bg-indigo-300 text-gray-700 font-semibold py-1 px-1 rounded inline-flex items-center">
                <span className="mr-1"></span>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Value</a></li>

            </ul>
        </div>





    )
}

export default Dropdown
