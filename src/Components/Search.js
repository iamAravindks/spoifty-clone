import React, { useContext } from "react";
import { Context } from "../Context/Context";

const Search = () => {
  const { currentTab } = useContext(Context);
  return (
    //   Problem here
    <div className="w-full ">
      <h1 className="text-4xl font-extrabold my-6 lg:my-4 ">{currentTab}</h1>
      <div class="relative min-w-full mt-5">
        <input
          type="text"
          class="min-w-full pl-4 pr-4 py-2 rounded-lg  bg-opacity-700  focus:outline-none "
          placeholder="Search Song, Artist"
        />
        <div class="absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Search;
