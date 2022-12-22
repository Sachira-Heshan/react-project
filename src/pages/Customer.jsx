import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseURL } from "../shared";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState("");
  const [tempCustomer, setTempCustomer] = useState("");
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      customer.name === tempCustomer.name &&
      customer.industry === tempCustomer.industry
    ) {
      setChanged(false);
    }
  }, [customer, tempCustomer]);

  useEffect(() => {
    fetch("http://localhost:8000/api/customers/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          navigate("/404");
        }
        if (response.status === 401) {
          navigate("/login");
        }
        if (response.status === 403) {
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, [id, navigate]);

  function handleSave(e) {
    e.preventDefault();
    const url = baseURL + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <>
      <div className="max-w-7xl w-[1280px] flex-grow mx-auto px-3 xl:px-0">
        {customer ? (
          <div className="flex flex-col mt-3">
            <h6>Customer Details</h6>
            <form id="customer">
              <div className="mt-2">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  className="bg-gray-200 pl-2 ml-2 boder-solid border-2 border-gray-400 rounded"
                  id="name"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                    setChanged(true);
                  }}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="industry">Industry: </label>
                <input
                  type="text"
                  className="bg-gray-200 pl-2 ml-2 boder-solid border-2 border-gray-400 rounded"
                  id="industry"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </form>

            {changed ? (
              <>
                <div>
                  {error ? (
                    <div className="text-red-500 mt-2">{error.message}</div>
                  ) : null}
                </div>
                <div className="mt-2">
                  <button
                    className="bg-slate-300 my-1 mr-2 py-1 px-3 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      setTempCustomer(customer);
                      setChanged(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    form="customer"
                    className="bg-slate-300 my-1 mr-2 py-1 px-3 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              const url = baseURL + "api/customers/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("access"),
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something went wrong!");
                  }
                  navigate("/customers");
                })
                .catch((error) => {
                  setError(error.message);
                });
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Customer;
