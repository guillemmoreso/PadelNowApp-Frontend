import React, { Component } from 'react';

class SearchClubs extends Component {
  state = {
    input: '',
  };

  handleInput = e => {
    const { query } = this.props;
    const { input } = this.state;
    this.setState({
      input: e.target.value,
    });
    query(input);
  };

  render() {
    const { input } = this.state;
    return (
      <div>
        <input value={input} onChange={this.handleInput}></input>
      </div>
    );
  }
}

export default SearchClubs;
