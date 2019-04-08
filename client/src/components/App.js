import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchListContainer from '../containers/SearchListContainer'
// import Search from './Search';
// the App component should render out the GifListContainer component

// function App() {
//   return (
//     <div>
//         <SearchListContainer />
//     </div>
//   )
// }

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Search(){
  return <h2>Search Results</h2>
}

function AppRouter() {
  return (
    <Router>
      <div>
      <SearchListContainer />
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route path="/search/" component={Search} />
      </div>
    </Router>
  );
}

export default AppRouter;

