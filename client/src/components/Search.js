import React, { Component } from 'react'
import SearchList from './SearchList';
import SearchContainer from '../containers/SearchContainer'

class Search extends Component {

  state = {
    query: "q=Muse&type=track&market=US&limit=10&offset=5"
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.search(this.state.query)
  }

  render() {
    return(
      <div>
          <SearchContainer />
      </div>
  )
  }

}

export default Search;