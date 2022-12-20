import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
        <p>Customer id: {customer ? customer.id : null}</p>
        <p>Customer name: {customer ? customer.name : null}</p>
        <p>Customer industry: {customer ? customer.industry : null}</p>
      </div>
    </>
  );
}

export default Customer;
