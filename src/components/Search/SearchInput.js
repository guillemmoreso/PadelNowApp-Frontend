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
      <input
        id="club-search-input"
        type="text"
        value={this.state.value}
        onChange={this.changeInputValue}
        placeholder="Search here the club"
      />
    );
  }
}

export default SearchInput;
