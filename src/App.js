import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import { Playlist } from "./Components/Playlist";
import { Context } from "./Context/Context";
import { GET_PLAYLISTS } from "./Graphql/Queries";

const App = () => {
  const { error, data, loading } = useQuery(GET_PLAYLISTS);
  const { setNav } = useContext(Context);

  useEffect(() => {
    if (data?.getPlaylists) {
      console.log(data?.getPlaylists);
      const lists = data?.getPlaylists.map((item) => item.title);

      setNav(lists);
    }
  }, [data]);

  if (loading) return <Loader />;
  return (
    <div className="max-h-screen overflow-hidden ">
      <Navbar />
      <div className="drawer-content lg:pl-[20rem]"></div>
    </div>
  );
};

export default App;
