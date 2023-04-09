import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import Loader from "./Components/Loader";
import Desktop from "./Components/Player/Desktop";
import Sidebar from "./Components/Sidebar";
import { SongList } from "./Components/SongList";
import { Context } from "./Context/Context";
import { GET_PLAYLISTS } from "./Graphql/Queries";

const App = () => {
  const { error, data, loading } = useQuery(GET_PLAYLISTS);

  const { setNav, setTab, currentTab } = useContext(Context);
  const [open, setOpen] = useState(window.innerWidth < 991 ? false : true);
  const [position, setPosition] = useState(
    window.innerWidth >= 991 ? "relative" : "absolute"
  );
  useEffect(() => {
    if (data?.getPlaylists) {
      console.log(data?.getPlaylists);
      const lists = data?.getPlaylists.map((item) => item.title);

      setNav(lists);
      if (currentTab === null) {
        const tab = data?.getPlaylists.find((item) =>
          item.title.includes("For You")
        );

        setTab(tab.title);
      }
    }
  }, [data]);

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

  if (loading) return <Loader />;
  return (
    <div className="max-h-screen  lg:flex relative">
      <Sidebar
        open={open}
        position={position}
        menuClickHandler={menuClickHandler}
        onClickHandler={onClickHandler}
      />
      <SongList onClickHandler={onClickHandler} />
      <Desktop />
    </div>
  );
};

export default App;
