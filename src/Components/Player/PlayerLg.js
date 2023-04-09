import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { Context } from "../../Context/Context";
import { formatTime } from "../Playlist/MusicCard";

const PlayerLg = () => {
  const { currentMusic } = useContext(Context);
  const progressRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioElementRef = useRef(null);

  const duration = currentMusic?.duration;

  const createAudioElement = useCallback(() => {
    const audio = new Audio(currentMusic.url);
    setIsPlaying(true);
    audio.play();
    audioElementRef.current = audio;
  }, [currentMusic]);

  useEffect(() => {
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
    };

    audioElementRef.current.addEventListener("timeupdate", (e) =>
      handleDurationChange(e)
    );

    return () => {
      audioElementRef.current.removeEventListener(
        "timeupdate",
        handleDurationChange
      );
    };
  }, []);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmuteClick = () => {
    setIsMuted(!isMuted);
  };

  if (!currentMusic) return <></>;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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
      <div className="flex w-full justify-between gap-6 text-2xl p-2">
        <div className="flex flex-2 w-full  justify-center gap-10 p-2">
          <button className="btn hover:bg-opacity-10">
            <FaBackward />
          </button>
          <button
            className="btn hover:bg-opacity-10"
            onClick={handlePlayPauseClick}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="btn hover:bg-opacity-10">
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
