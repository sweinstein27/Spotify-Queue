import React, { Component } from 'react'

class Search extends Component {

  state = {
    query: "q=Muse&type=track&market=US&limit=10&offset=5"
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.search(this.state.query)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.query} onChange={event => this.setState({query: event.target.value})} />
        </form>
      </div>
    )
  }

}

export default Search