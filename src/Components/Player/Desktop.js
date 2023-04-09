import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import PlayerLg from "./PlayerLg";

const Desktop = () => {
  const { currentMusic } = useContext(Context);

  if (!currentMusic) {
    return null;
  }
  const { _id, artist, duration, photo, title, url } = currentMusic;

  return (
    <div className="hidden lg:flex flex-col p-5 w-full bg-inherit duration-300">
      <div className="w-full flex flex-col flex-[1] justify-end p-5  gap-3">
        <h1 className="text-5xl font-extrabold">{title}</h1>
        <h3 className="text-2xl text-white text-opacity-50">{artist}</h3>
      </div>
      <div className="flex-[4]  flex justify-center items-center w-full">
        <img src={photo} alt={title} className="object-contain max-w-[50%] " />
      </div>
      <div className="flex-[1] ">
        <PlayerLg />
      </div>
    </div>
  );
};

export default Desktop;
