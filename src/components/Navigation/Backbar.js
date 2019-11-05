import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

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
        ></img>
      </>
    );
  }
}

export default Backbar;
