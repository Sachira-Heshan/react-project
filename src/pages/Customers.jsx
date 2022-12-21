import React from "react";
import Customer from "../components/Customer";
import { useEffect, useState } from "react";
import AddCustomer from "../components/AddCustomer";
import { baseURL } from "../shared";

function Customers() {
  const [customers, setCustomers] = useState("");
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    console.log("Fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  function newCustomer(name, industry) {
    const newCustomer = {
      name: name,
      industry: industry,
    };
    const url = baseURL + "api/customers/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setShow(false);
        setCustomers([...customers, data.customer]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="max-w-7xl flex-grow flex flex-col mx-auto mt-3 px-3 xl:px-0">
        <h4 className="mb-2 mx-auto font-bold uppercase">Customers</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {customers
            ? customers.map((customer) => {
                return (
                  <Customer
                    key={customer.id}
                    link={"/customers/" + customer.id}
                    name={customer.name}
                    industry={customer.industry}
                  />
                );
              })
            : "Loading..."}
        </div>
        <AddCustomer
          newCustomer={newCustomer}
          show={show}
          toggleShow={toggleShow}
        />
      </div>
    </>
  );
}

export default Customers;
