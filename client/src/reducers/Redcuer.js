import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
var token;

export default function reducer(state={
  token: ""
}, action) {

  switch (action.type) {
    case "SAVE_TOKEN": {
      return {...state, token: action.payload}
    }
  }
  return state
}


// const store = createStore(reducer, middleware);





// store.dispatch((dispatch) => {
//   debugger
//   const params = this.getHashParams();
//   token = params.access_token;
//   dispatch({type: "SAVE_TOKEN", payload: token})
// })


//   function getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     e = r.exec(q)
//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }






/* Add basic styling for NavLinks */
// const link = {
//     width: '100px',
//     padding: '12px',
//     margin: '0 6px 6px',
//     background: 'blue',
//     textDecoration: 'none',
//     color: 'white',
//   }
   
//   /* add the navbar component */
//   const Navbar = () =>
//     <div>
//       <NavLink
//         to="/"
//         /* set exact so it knows to only set activeStyle when route is deeply equal to link */
//         exact
//         /* add styling to Navlink */
//         style={link}
//         /* add prop for activeStyle */
//         activeStyle={{
//           background: 'darkblue'
//         }}
//       >Home</NavLink>
//       <NavLink
//         to="/search"
//         exact
//         style={link}
//         activeStyle={{
//           background: 'darkblue'
//         }}
//       >Search</NavLink>
//     </div>;


// ReactDOM.render((
//     <Router>
//         <React.Fragment>
//             <Navbar />
//             <Route exact path="/" component={Home} />
//             <Route exact path="/search" component={Search} />
//         </React.Fragment>
//     </Router>), 
//     <Provider store={store}>
//       {/* <HomeContainer /> */}
//       <TokensReducer />
//     </Provider>,
//     document.getElementById('container')
// );


