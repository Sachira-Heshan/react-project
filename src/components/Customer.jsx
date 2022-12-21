import React from "react";
import { Link } from "react-router-dom";

function Customer(props) {
  return (
    <>
      <div className="border-solid border-2 border-slate-400 px-4 py-1 rounded flex flex-col items-start">
        <Link to={props.link} className="">
          Name: <span className="underline">{props.name}</span>
        </Link>
        <p>Industry: {props.industry}</p>
      </div>
    </>
  );
}

export default Customer;
