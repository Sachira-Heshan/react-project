import React from "react";
import { Link } from "react-router-dom";

function Customer(props) {
  return (
    <>
      <div className="border-solid border-2 border-slate-400 px-4 py-1 rounded flex flex-col items-start">
        <Link to={props.link} className="">
          Name: <span className="underline">{props.name}</span>
        </Link>
        <h2>Industry: {props.industry}</h2>
      </div>
    </>
  );
}

export default Customer;
