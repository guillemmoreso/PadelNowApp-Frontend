import React, { Component } from 'react';

class SearchInput extends Component {
  state = {
    value: '',
  };

  changeInputValue = event => {
    this.props.filterClubs(event.target.value);
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div id="div-search-input">
        <img src="../../images/search-input.svg" alt="search-icon"></img>
        <input
          id="club-search-input"
          type="text"
          value={this.state.value}
          onChange={this.changeInputValue}
          placeholder="Insert user name here"
        />
        <span id="input-search-focus-border"></span>
      </div>
    );
  }
}

export default SearchInput;
