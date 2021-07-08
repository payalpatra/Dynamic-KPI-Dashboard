import React, { useState } from 'react';
import Transition from './Transition.js';

function Info({
  children,
  className,
  containerClassName
}) {

  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setInfoOpen(true)}
      onMouseLeave={() => setInfoOpen(false)}
      onFocus={() => setInfoOpen(true)}
      onBlur={() => setInfoOpen(false)}
    >
      <button
        className="block"
        aria-haspopup="true"
        aria-expanded={infoOpen}
        onClick={(e) => e.preventDefault()}
      >
 
      </button>
      <div className="z-10 absolute bottom-full left-1/2 transform -translate-x-1/2">
        <Transition
          show={infoOpen}
          tag="div"
          className={`bg-white border border-gray-200 p-3 rounded shadow-lg overflow-hidden mb-2 ${containerClassName}`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </div>
  );
}

export default Info;