import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi();
var trackID;

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        trackID = response.item.id
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getAudioDetails() {
    const Url = "https://api.spotify.com/v1/audio-analysis/" + `${trackID}`
    $.ajax({
      url: Url,
      headers: {
        'Authorization': `Bearer BQBheTXPuSakucnQgGzsS2-Y5phZ9HVxKuvY7aAJ6aN7c2m67jvkaI5WgY2uOgwRusy0iCOzbQ4tY1grqA4j4W9tQ3dxuvy_4ZXtejKkMIsfPb0BQ3E0zMWnApK4qpVrxrzgwDlO2WoAwc6yVz-991tjQcs0Kb_KF3L_sMyio6tM1A-mlepJr7__vljAEQ`,
    },
      type: "GET",
      contentType: JSON,
      success: function(data){
        debugger
        console.log(data)
      },
      error: function(error){
        debugger
        console.log(`Error ${error}`)
      }
    })
  }

  getPause() {
    const Url = "https://api.spotify.com/v1/me/player/pause"

    $.ajax({
      url: Url,
      headers: {
        'Authorization': `Bearer BQBheTXPuSakucnQgGzsS2-Y5phZ9HVxKuvY7aAJ6aN7c2m67jvkaI5WgY2uOgwRusy0iCOzbQ4tY1grqA4j4W9tQ3dxuvy_4ZXtejKkMIsfPb0BQ3E0zMWnApK4qpVrxrzgwDlO2WoAwc6yVz-991tjQcs0Kb_KF3L_sMyio6tM1A-mlepJr7__vljAEQ`,
    },
      type: "PUT",
      contentType: JSON,
      success: function(response){
        alert("Paused")
      },
      error: function(error){
        console.log("broken")
      }

    })
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        <div>
          <button onClick={() => this.getAudioDetails()}>
            Audio Details
          </button>
        </div>
        <div>
          <button onClick={() => this.getPause()}>
            Pause
          </button>
        </div>
      </div>
      
    );
  }
}

export default App;
