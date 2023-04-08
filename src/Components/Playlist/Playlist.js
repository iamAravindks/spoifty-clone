import { useContext } from "react";
import { Context } from "../../Context/Context";
import MusicCard from "./MusicCard";

export const Playlist = () => {
  const { musics } = useContext(Context);

  return (
    <div className="flex flex-col  ">
      {musics?.map((music) => (
        <MusicCard music={music} key={music._id} />
      ))}
    </div>
  );
};
