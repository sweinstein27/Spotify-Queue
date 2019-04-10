export function getToken() {
  return function(dispatch) {
    const params = function getHashParams() {
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
    token = params.access_token;
    dispatch({type: "SAVE_TOKEN", payload: token})
  }

  export function saveToken(token) {
    return {
      type: "SAVE_TOKEN",
      payload: {
        token
      }
    }
  }
// store.dispatch((dispatch) => {
//   debugger
//   const params = this.getHashParams();
//   token = params.access_token;
//   dispatch({type: "SAVE_TOKEN", payload: token})
// })


  // function getHashParams() {
  //   var hashParams = {};
  //   var e, r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   e = r.exec(q)
  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //   }
  //   return hashParams;
  }