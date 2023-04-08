import { useContext, useRef } from "react";
import { Context } from "../Context/Context";
import Logo from "../assets/Logo.svg";
import Profile from "../assets/profile.jpg";
const Navbar = () => {
  const { NavList, currentTab, setTab } = useContext(Context);
  const menuRef = useRef(null);
  const ipRef = useRef(null);
  const menuClickHandler = (tab) => {
    setTab(tab);
    menuRef.current.click();
  };
  return (
    <div className="absolute ">
      <div className="inline-block m-6 mt-7 absolute z-[999]">
        <img src={Logo} alt="logo" />
      </div>
      <div className="drawer  drawer-mobile">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={ipRef}
        />

        <div className="absolute bottom-4 left-6  ">
          <label
            htmlFor="my-drawer"
            className=" drawer-button overflow-hidden"
            ref={menuRef}
          >
            <div className="avatar cursor-pointer z-[999]">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={Profile} alt="Profile" />
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu pt-20 p-4 w-80 bg-base-300  text-base-content z-[999]">
            {NavList?.map((nav) => (
              <li
                className={`w-full  btn items-start rounded-sm  my-4 p-2 ${
                  currentTab !== null &&
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
