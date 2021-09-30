import React from 'react';

const Body = (props) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {props.children}
    </div>
  );
};

export default Body;
