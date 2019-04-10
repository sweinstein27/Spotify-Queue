import React, { Component } from 'react';
import '../Search.css';
import axios from 'axios'
import $ from 'jquery';
import SearchList from '../components/SearchList'
import Search from '../components/Search'
import {HomeContainer} from '../containers/HomeContainer'



// const spotifyApi = new SpotifyWebApi();
// var trackID;
// var ID;
// var trackProgress;
// var searchObject;
var token = "2"




class SearchContainer extends Component {
    constructor(){
        super();
        this.state = {
          searchObject: [],
          query: "q=name:jude&type=track"
        }
      }
    
    search(){
        var query = this.state.query
        debugger
        $.ajax({
          url: "https://api.spotify.com/v1/search?" + `${query}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          type: "GET",
          contentType: JSON,
        })
        .then ((data) => {
          debugger
            this.setState({
                searchObject: data.tracks.items
            })
        })
    }

    componentDidMount(){
        this.search()
    }

    render() {
        return (
        <div>
            <div>
                <button onClick={() => this.search()}>
                search
                </button>
            </div>
            {/* <div>
                <ul>
                {this.state.searchObject.map(object => (
                    <button>
                    {object.name}
                    </button> 
                ))}
                </ul>
            </div> */}
        </div>
        );
    }
    

}

export default SearchContainer;

