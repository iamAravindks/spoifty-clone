import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { Context } from "../../Context/Context";
import { formatTime } from "../Playlist/MusicCard";

const PlayerLg = () => {
  const { currentMusic, queue, setCurrentMusic } = useContext(Context);
  const progressRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioElementRef = useRef(null);

  const duration = currentMusic?.duration;

  const createAudioElement = useCallback(() => {
    const audio = new Audio(currentMusic?.url);
    setIsPlaying(true);
    audio.play();
    audioElementRef.current = audio;
  }, [currentMusic]);

  useEffect(() => {
    setCurrentTime(0);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.removeAttribute("src");
      audioElementRef.current.load();
    }

    createAudioElement();

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.removeAttribute("src");
        audioElementRef.current.load();
      }
    };
  }, [currentMusic, createAudioElement]);

  useEffect(() => {
    if (isPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
    audioElementRef.current.volume = isMuted ? 0 : 1;
  }, [isPlaying, isMuted]);

  useEffect(() => {
    if (!audioElementRef.current) return;
    const handleDurationChange = (e) => {
      setCurrentTime(parseInt(e.target.currentTime));

      const progress = parseInt(
        (e.target.currentTime / e.target.duration) * 100
      );
      progressRef.current.value = progress;
      if (e.target.currentTime === e.target.duration) handleNextSong();
    };

    const handleSeekerChange = (e) => {
      audioElementRef.current.currentTime =
        (e.target.value * audioElementRef.current.duration) / 100;
    };

    const progressRefCurrent = progressRef.current;

    if (progressRefCurrent)
      progressRefCurrent.addEventListener("change", handleSeekerChange);

    audioElementRef.current.addEventListener(
      "timeupdate",
      handleDurationChange
    );

    return () => {
      audioElementRef.current.removeEventListener(
        "timeupdate",
        handleDurationChange
      );
      if (progressRefCurrent)
        progressRefCurrent?.removeEventListener("change", handleSeekerChange);
    };
  }, [currentMusic]);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmuteClick = () => {
    setIsMuted(!isMuted);
  };

  const handleNextSong = () => {
    // get the index of the currentMusic

    const indexOfCurrentMusic = queue.findIndex(
      (music) => music._id === currentMusic._id
    );

    // set the currentMusic into the nextInd
    setCurrentMusic(queue[(indexOfCurrentMusic + 1) % queue.length]);
  };

  const handlePrevSong = () => {
    // get the index of the currentMusic
    const indexOfCurrentMusic = queue.findIndex(
      (music) => music._id === currentMusic._id
    );

    // calculate the index of the previous song, wrapping around to the end if necessary
    const prevIndex = (indexOfCurrentMusic - 1 + queue.length) % queue.length;

    // set the currentMusic to the previous song
    setCurrentMusic(queue[prevIndex]);
  };

  if (!currentMusic) return <></>;

  return (
    <div className=" w-full bg-base-200 h-full flex flex-col justify-center items-center  z-[1000]">
      <div className="w-full flex justify-center items-center p-3">
        <input
          type={"range"}
          name="playerLg"
          id="playerLg"
          min={"0"}
          max="100"
          className="w-full"
          ref={progressRef}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <p className="text-white text-opacity-50">{formatTime(currentTime)}</p>
        <p className="text-white text-opacity-50">{formatTime(duration)}</p>
      </div>
      <div className="flex flex-col items-center justify-center lg:hidden w-full gap-3 my-2">
        <h2 className="w-full text-center font-bold text-xl">
          {currentMusic?.title}
        </h2>
        <h3 className="w-full text-center text-white text-opacity-50">
          {currentMusic?.artist}
        </h3>
      </div>
      <div className="flex w-full justify-between gap-6 text-2xl p-2">
        <div className="flex flex-2 w-full  justify-center gap-10 p-2 pl-4 ">
          <div
            className="avatar flex justify-center items-center 
          animate-rotate lg:hidden
          "
          >
            <div className="w-10 h-10 rounded-full ">
              <img src={currentMusic?.photo} alt={currentMusic?.artist} />
            </div>
          </div>
          <button className="btn hover:bg-opacity-10" onClick={handlePrevSong}>
            <FaBackward />
          </button>
          <button
            className="btn hover:bg-opacity-10"
            onClick={handlePlayPauseClick}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="btn hover:bg-opacity-10" onClick={handleNextSong}>
            <FaForward />
          </button>
        </div>
        <div className="flex flex-1 w-full p-2">
          <button
            className="btn hover:bg-opacity-10"
            onClick={handleMuteUnmuteClick}
          >
            {isMuted ? <RxSpeakerOff /> : <RxSpeakerLoud />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerLg;
