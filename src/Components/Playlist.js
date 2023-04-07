import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_PLAYLISTS } from "../Graphql/Queries";

export const Playlist = () => {
  const { error, data } = useQuery(GET_PLAYLISTS);

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  return <div>Playlist</div>;
};
