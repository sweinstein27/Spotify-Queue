import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeContainer from '../containers/HomeContainer'
// import Search from './Search';
// the App component should render out the GifListContainer component

class Home extends React.Component {
  render() {
    return (
      <div>
          <HomeContainer />
       </div>
    )
  }
}

export default Home;
