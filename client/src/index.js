import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Search from "./components/Search";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SearchListContainer from './containers/HomeContainer'

/* Add basic styling for NavLinks */
const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }
   
  /* add the navbar component */
  const Navbar = () =>
    <div>
      <NavLink
        to="/"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: 'darkblue'
        }}
      >Home</NavLink>
      <NavLink
        to="/search"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
      >Search</NavLink>
    </div>;


ReactDOM.render((
    <Router>
        <React.Fragment>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
        </React.Fragment>
    </Router>), 
    document.getElementById('container')
);


