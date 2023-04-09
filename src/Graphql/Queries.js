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

export const GET_SONGS_SEARCH = gql`
  query GetSongs($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;
