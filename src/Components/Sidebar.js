import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import Logo from "../assets/Logo.svg";
import Profile from "../assets/profile.jpg";
const Sidebar = () => {
  const { NavList, setTab, currentTab } = useContext(Context);
  const [open, setOpen] = useState(window.innerWidth < 991 ? false : true);
  const [position, setPosition] = useState(
    window.innerWidth >= 991 ? "relative" : "absolute"
  );
  const menuClickHandler = (tab) => {
    setTab(tab);
    if (window.innerWidth < 991) setOpen(false);
  };
  const onClickHandler = () => {
    if (window.innerWidth < 991) {
      setOpen((prev) => !prev);
      setPosition("absolute");
    } else setOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 991) {
        setOpen(true);
        setPosition("relative");
      } else {
        setPosition("absolute");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="inline-block p-6 lg:p-0  h-20  w-full bg-base-200 lg:w-auto lg:m-6 lg:mt-7 absolute z-[1000] ">
        <img src={Logo} alt="logo" />
      </div>
      <div
        className={`${
          open ? "w-80" : "w-0"
        } ${position} min-h-screen  flex flex-col bg-base-300 z-[999] duration-300`}
      >
        <ul
          className={`${
            open ? "flex" : "hidden"
          } flex-col pt-20 p-4 w-80   text-base-content z-[999]`}
        >
          {NavList?.map((nav, ind) => (
            <li
              key={ind}
              className={`w-full duration-100 btn ${
                !open && "scale-0"
              }  items-center justify-start rounded-md  my-4 p-2 ${
                currentTab !== {} &&
                nav.toLowerCase() === currentTab.toLowerCase()
                  ? "text-base"
                  : "text-opacity-50"
              }`}
              onClick={() => menuClickHandler(nav)}
            >
              {nav}
            </li>
          ))}
        </ul>
        <div
          className="avatar cursor-pointer z-[999] absolute  left-2 bottom-7 md:left-6 md:bottom-5 lg:left-6 lg:bottom-12 w-auto h-auto"
          onClick={onClickHandler}
        >
          <div className="w-7 md:w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={Profile} alt="Profile" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
