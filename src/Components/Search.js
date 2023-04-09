import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";

const Search = ({ search, onChangeHandler, onClickHandler }) => {
  const { currentTab } = useContext(Context);
  const [btn, setBtn] = useState(window.innerWidth > 991 ? "true" : "false");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 991) {
        setBtn(false);
      } else {
        setBtn(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    //   Problem here
    <div className="w-[90%] sm:w-[95%]  pl-4 pb-3 fixed bg-inherit lg:max-w-[23%]  z-[800]">
      <div className="tooltip tooltip-right" data-tip="change category">
        <h1
          className={`${
            btn ? "btn bg-black" : ""
          } text-4xl font-extrabold my-6  lg:my-4 cursor-pointer lg:cursor-auto `}
          onClick={onClickHandler}
        >
          {currentTab}
        </h1>
      </div>
      <div class="relative min-w-full mt-5">
        <input
          type="text"
          class="min-w-full pl-4 pr-4 py-2 rounded-lg  bg-opacity-700  focus:outline-none shadow-lg"
          placeholder="Search Song"
          value={search}
          onChange={onChangeHandler}
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
