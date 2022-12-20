import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="max-w-7xl w-[1280px] mx-auto mb-auto px-3 mt-2">
        <p>The page you are looking for is not found!</p>
        <Link
          to="/"
          className="bg-slate-500 inline-block px-3 py-1 rounded my-2 text-white"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
