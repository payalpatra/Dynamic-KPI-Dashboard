import React from 'react';

import { Link } from 'react-router-dom';
import User01 from '../../images/user-36-01.jpg';
import User02 from '../../images/user-36-02.jpg';
import User03 from '../../images/user-36-03.jpg';
import User04 from '../../images/user-36-04.jpg';
import Modal from '../../partials/header/Form';

function DashboardAvatars() {


  return (
    <ul className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
      <li>
        <Link className="block" to="/dashboard">
          <img className="w-9 h-9 rounded-full" src={User01} width="36" height="36" alt="User 01" />
        </Link>
      </li>
      <li>
        <Link className="block" to="/dashboard">
          <img className="w-9 h-9 rounded-full" src={User02} width="36" height="36" alt="User 02" />
        </Link>
      </li>
      <li>
        <Link className="block" to="/dashboard">
          <img className="w-9 h-9 rounded-full" src={User03} width="36" height="36" alt="User 03" />
        </Link>
      </li>
      <li>
        <Link className="block" to="/dashboard">
          <img className="w-9 h-9 rounded-full" src={User04} width="36" height="36" alt="User 04" />
        </Link>
      </li>
      <li>

        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-gray-300 text-indigo-500 shadow-sm transition duration-150 ml-2">
          <span className="sr-only">Add new user</span>
          <Modal />
        </button>
      </li>
    </ul>
  );
}

export default DashboardAvatars;
