/* eslint-disable react/prop-types */
import React from 'react';

const Body = (props) => {
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }>
      {props.children}
    </div>
  );
};

export default Body;
