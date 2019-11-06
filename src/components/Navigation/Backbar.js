import React, { Component } from 'react';

class Backbar extends Component {
  render() {
    return (
      <>
        <img
          className="go-back"
          src="../../images/left-arrow.svg"
          onClick={() => {
            this.props.history.goBack();
          }}
          alt="arrow-back"
        ></img>
      </>
    );
  }
}

export default Backbar;
