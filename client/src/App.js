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
        'Authorization': `Bearer BQDhzJuJwO6NANcHxRNrMgVliQypH2ydZf1ZRWfjWhDCHBzNGVNyOgle-CH9av4oZG7eOQRGMSsMIuQmuBIBL983h_oDwBQAUwgT2lpdiuPQps7jeyeJZezs3rIm5nw5fA-Np_VvoC4_S_1yzRA3vPJ-zntlk9W69a0gzayNYQxT84g3IIcrorzVCJoI6Q`,
    },
      type: "GET",
      contentType: JSON,
      success: function(data){
        this.setState({
          trackData: {
            key: data.track.key,
            bpm: data.track.tempo
          }
        })
        console.log(data)
      },
      error: function(data){
        debugger
        console.log(data.responseText)
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
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=abba&type=track&market=US&offset=0",
      headers: {
        'Authorization': `Bearer BQCWJeRaXoSvaOOjwbWIYWNJIdg0GG5099lHo3qEtDeAAC3VfKyMVcLnYB2q-DhhlXZ_RvqsQkmgKDfKzLZaxMDg5zbmce92pmu-rccer7P7DtGiqjtwfZVoKb-MUgpkH45-W_YD1Gp-PISqsyvVRCCLKiDUX-bh1dTs-krkX8qPdSHHh0nr_L7M_ljAUw`,
      },
      type: "GET",
      contentType: JSON,
      success: function(data){
        debugger
        console.log("success")
      },
      error: function(data){
        console.log(data.responseText)
        debugger
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
          Current Possition: { this.state.nowPlaying.trackProgress}
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
          {/* <div>
          Key: { this.state.trackData.key }  "NA"
          BPM: { this.state.trackData.bpm } "NA"
          </div> */}
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
          <button onClick={() => this.search()}>
            Search
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
