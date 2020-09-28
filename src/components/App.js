import React, { useEffect, useState } from 'react';

import SpotifyWebApi from "spotify-web-api-js";

import { getTokenFromUrl } from '../extra/spotify'
import { useDataLayerValue } from '../extra/DataLayer';

import '../styling/App.css';
import Login from './Login';
import Player from './Player';

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{ user }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token)

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })
    }

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: 'SET_PLAYLISTS',
          playlists: playlists
      })
    })

    spotify.getPlaylist('37i9dQZEVXcVTwvkyQ5PrM').then((response) => {
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response
      })
    })
  }, [dispatch, token]);

  console.log('user:', user);
  console.log('token:', token);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
