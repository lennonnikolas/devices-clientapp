import React from 'react';

const Header = (props) => {
  return (
    <h1 style={{textAlign: 'center'}}>{props.children}</h1>
  );
};

export default Header;
