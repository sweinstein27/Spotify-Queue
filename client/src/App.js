import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi();
var trackID;
var ID;
var trackProgress;

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
        trackProgress = response.progress_ms
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getAudioDetails() {
    var Url = "https://api.spotify.com/v1/audio-analysis/" + `${trackID}`
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
    spotifyApi.pause()
  }

  getPlay(){
    spotifyApi.play()
  }

  me(){
    spotifyApi.getMe()
    .then((response) => {
      ID = response.id
    })
  }
  
  skipSong(){
    spotifyApi.skipToNext()
  }

  previousSong(){
    spotifyApi.skipToPrevious()
  }

  seek(){
    var newPosition = trackProgress + 30000
    var Url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + `${newPosition}`
    debugger
    $.ajax({
    url: Url,
    headers: {
      'Authorization': `Bearer BQC-zEiiGd9aEerVLTY1QfNjRk8SHAGgvhMvf5x0khUH5gy2wN6jqWFAwO1oiz5hL-_gwkjkyxwMHIN7aY4TIJrnyeIRWu3CzTTfccWjcaAw4yRmkAzhT36q_ZtBu1QVby7WB3KrBsyVyZXjT9UO35hK6-q415OFEJdAWxGYTIvXxZelWDPppp5nZhkIfA`,
    },
      type: "PUT",
      contentType: JSON,
      success: function(data){
        console.log("success")
      },
      error: function(error){
        console.log(`Error is ${error}`)
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
          <button onClick={() => this.getPlay()}>
            Play
          </button>
        </div>
        <div>
          <button onClick={() => this.getPause()}>
            Pause
          </button>
        </div>
        <div>
          <button onClick={() => this.skipSong()}>
            Next Song
          </button>
        </div>
        <div>
          <button onClick={() => this.previousSong()}>
            Previous Song
          </button>
        </div>
        <div>
          <button onClick={() => this.seek()}>
            Seek Forward
          </button>
        </div>
        <div>
          <button onClick={() => this.me()}>
            User Info
          </button>
        </div>
        
      </div>
      
    );
  }
}

export default App;
