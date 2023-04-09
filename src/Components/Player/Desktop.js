import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import PlayerLg from "./PlayerLg";

const Desktop = () => {
  const { currentMusic } = useContext(Context);

  if (!currentMusic) {
    return null;
  }
  const { artist, photo, title } = currentMusic;

  return (
    <div className=" lg:min-h-screen w-full flex flex-col lg:min-w-[50%] justify-between">
      <div className="hidden lg:flex flex-col p-5 w-full bg-inherit duration-300 h-full">
        <div className="w-full flex flex-col flex-[1] justify-end p-5  gap-3">
          <h1 className="text-5xl font-extrabold">{title}</h1>
          <h3 className="text-2xl text-white text-opacity-50">{artist}</h3>
        </div>
        <div className="flex-[4]  flex justify-center items-center w-full">
          <img
            src={photo}
            alt={title}
            className="object-contain max-w-[50%] "
          />
        </div>
      </div>
      <div className=" min-w-screen w-[100%] fixed bottom-0 lg:relative">
        <PlayerLg />
      </div>
    </div>
  );
};

export default Desktop;
