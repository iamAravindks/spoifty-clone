import { gql } from "@apollo/client";

export const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      title
    }
  }
`;

export const GET_SONGS = gql`
  query GetSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      title
      photo
      url
    }
  }
`;
