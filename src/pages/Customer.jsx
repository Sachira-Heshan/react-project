import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseURL } from "../shared";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Loading customer...");
    fetch("http://localhost:8000/api/customers/" + id)
      .then((response) => {
        if (response.status === 404) {
          navigate("/404");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, [id]);

  return (
    <>
      <div className="max-w-7xl w-[1280px] flex-grow mx-auto px-3 xl:px-0">
        {customer ? (
          <div className="flex flex-col mt-3">
            <h6>Customer Details</h6>
            <p>ID: {customer.id}</p>
            <p>Name: {customer.name}</p>
            <p>Industry: {customer.industry}</p>
          </div>
        ) : null}
        <button
          onClick={(e) => {
            e.preventDefault();
            const url = baseURL + "api/customers/" + id;
            fetch(url, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Something went wrong!");
                }
                navigate("/customers");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
        >
          Update
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            const url = baseURL + "api/customers/" + id;
            fetch(url, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Something went wrong!");
                }
                navigate("/customers");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Customer;
