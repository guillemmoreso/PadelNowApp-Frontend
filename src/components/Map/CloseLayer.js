import React from 'react';

const CloseLayer = props => {
  return (
    <>
      <div className="close-layer" onClick={props.closeAllPopups}></div>
    </>
  );
};

export default CloseLayer;
