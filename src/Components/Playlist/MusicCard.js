import { useContext } from "react";
import { HiOutlinePlay } from "react-icons/hi";
import { Context } from "../../Context/Context";

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
};

const MusicCard = ({ music }) => {
  const { _id, artist, duration, photo, title, url } = music;
  const { currentMusic, setCurrentMusic } = useContext(Context);

  return (
    <div
      className={`w-full flex justify-start items-start p-4 relative overflow-scroll hover:bg-gray-800 ${
        currentMusic?._id === _id && "bg-gray-800"
      } cursor-pointer`}
      onClick={() => setCurrentMusic(music)}
    >
      <div className="avatar   flex-[1] ">
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
