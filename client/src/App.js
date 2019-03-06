import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi();
var trackID;
var ID;
var trackProgress;
var searchObject;


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
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      trackData: {
        key: "",
        bpm: ""
      },
      searchObject: []
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
              albumArt: response.item.album.images[0],
              trackProgress: response.progress_ms
            }
        });
      })
  }

  getAudioDetails() {
    var Url = "https://api.spotify.com/v1/audio-analysis/" + `${trackID}`
    $.ajax({
      url: Url,
      headers: {
        'Authorization': `Bearer BQByggrgsr3qkJI4WZ6DVoubKcx-OEKrHEsCL7UBCmv6-4ghvpK0ppaNvzN0JjmHt4vOmuX35SrOkNsbwT4XxXi3-mByEuyltQIaYnj753otzuNAcbofX9vhZnpORioeAh9IcaOtU0jq9pYl518VHJoBqZWecWZ1y_jwhPMNRZ9R4XtogaZEHE5jDXQSzQ`,
      },
      type: "GET",
      contentType: JSON,
      // success: function(data){
      //   this.setState({
      //     trackData: {
      //       key: data.track.key,
      //       bpm: data.track.tempo
      //     }
      //   })
      //   debugger
      //   console.log(data)
      // },
      // error: function(data){
      //   debugger
      //   console.log(data.responseText)
      // }
    })
    .then ((response) => {
      this.setState({
        trackData: {
          key: response.track.key,
          bpm: response.track.tempo
        }
      })
    })
    debugger
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
      'Authorization': `Bearer BQCWJeRaXoSvaOOjwbWIYWNJIdg0GG5099lHo3qEtDeAAC3VfKyMVcLnYB2q-DhhlXZ_RvqsQkmgKDfKzLZaxMDg5zbmce92pmu-rccer7P7DtGiqjtwfZVoKb-MUgpkH45-W_YD1Gp-PISqsyvVRCCLKiDUX-bh1dTs-krkX8qPdSHHh0nr_L7M_ljAUw`,
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

  search(){
    var trackID;
    var name;
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=abba&type=track&market=US&offset=0",
      headers: {
        'Authorization': `Bearer BQAbBP3AqP3CWrFfjlTsx_ZcBOB-u6pATvPdL-RP8z2mAMiHlwy0N1FVzjNgMuqawWYHFM8d6R6o_5AGxidUoCjiOwsqzCMMkcSPXCY6SRwNASdaLqvlHv99kjIQR9lptsy66cWfCGCn6-wqx6gL_h8DAL8-Y2rgZztayGZSapHHqZNPhBjnIhu6ug8frQ`,
      },
      type: "GET",
      contentType: JSON,
    })
    .then ((data) => {
      searchObject = data.tracks.items
      
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
          Current Possition: { this.state.nowPlaying.trackProgress}
        </div>
        <div>
          Key: { this.state.trackData.key }  
        </div>
        <div>
          BPM: { this.state.trackData.bpm } 
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
          <button onClick={() => this.search()} search={this.state.searchObject}>
            Search
          </button>
            Search Results: { this.state.searchObject }
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
