import React from "react";
import Customer from "../components/Customer";
import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState("");

  useEffect(() => {
    console.log("Fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  return (
    <>
      <div className="max-w-7xl flex-grow flex flex-col mx-auto mt-3 px-3 xl:px-0">
        <h2 className="mb-2 mx-auto font-bold uppercase">Customers</h2>
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
      </div>
    </>
  );
}

export default Customers;
