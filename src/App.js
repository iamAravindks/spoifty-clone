import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import { Playlist } from "./Components/Playlist";
import Sidebar from "./Components/Sidebar";
import { SongList } from "./Components/SongList";
import { Context } from "./Context/Context";
import { GET_PLAYLISTS } from "./Graphql/Queries";

const App = () => {
  const { error, data, loading } = useQuery(GET_PLAYLISTS);
  const { setNav, setTab, currentTab } = useContext(Context);

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

  if (loading) return <Loader />;
  return (
    <div className="max-h-screen overflow-hidden lg:flex ">
      <Sidebar />
      <SongList />
    </div>
  );
};

export default App;
