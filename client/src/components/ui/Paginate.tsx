'use client';
import React from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Paginate = ({
  totalPages,
  currentPage,
  paginate
}: Props): JSX.Element => {
  return (
    <nav className="flex justify-center">
      <ul className="flex items-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className="mx-1">
            <button
              onClick={() => {
                paginate(index + 1);
              }}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
