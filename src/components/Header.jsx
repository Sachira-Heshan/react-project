import React from "react";

function Header(props) {
  return (
    <>
      <h1>Header</h1>
      {props.children}
    </>
  );
}

export default Header;
