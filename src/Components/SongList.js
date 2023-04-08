import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { GET_SONGS } from "../Graphql/Queries";
import PingLoader from "./PingLoader";
import { Playlist } from "./Playlist/Playlist";
import Search from "./Search";

export const SongList = () => {
  const { getPlaylistId, currentTab, setMusics } = useContext(Context);

  const [playlistId, setPlayListId] = useState(getPlaylistId(currentTab));
  const { loading, error, data, refetch } = useQuery(GET_SONGS, {
    variables: { playlistId },
    skip: !playlistId, // Skip the query until playlistId is available
  });

  useEffect(() => {
    setPlayListId(getPlaylistId(currentTab));
    refetch();
  }, [currentTab]);

  useEffect(() => {
    console.log({ currentTab, data });
    if (data?.getSongs) {
      setMusics(data?.getSongs);
    }
  }, [data]);

  return (
    <div className="w-full relative lg:w-1/4 max-h-screen bg-base-200 p-5 pt-16 lg:pt-10 overflow-scroll">
      <Search />
      <div className="mt-36">
        {loading && !data ? <PingLoader /> : <Playlist />}
      </div>
    </div>
  );
};
