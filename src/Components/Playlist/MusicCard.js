import React from "react";

const MusicCard = ({ music }) => {
  const { _id, artist, duration, photo, title, url } = music;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }

  return (
    <div className="w-full flex justify-start items-start p-4 overflow-scroll hover:bg-base-100 cursor-pointer">
      <div className="avatar flex-[1]">
        <div className="w-12 rounded-full">
          <img src={photo} alt={artist} />
        </div>
      </div>
      <div className="flex-[4] self-start ">
        <h3 className="break-words">{title}</h3>
        <p className="text-white text-opacity-50">{artist}</p>
      </div>
      <div className="flex-1 text-right text-white text-opacity-50">
        {formatTime(duration)}
      </div>
    </div>
  );
};

export default MusicCard;
