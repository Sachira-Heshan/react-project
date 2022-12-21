import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props) {
  //const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  return (
    <>
      <div className="flex justify-center">
        <button
          className="inline-block mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          variant="primary"
          onClick={props.toggleShow}
        >
          + Add Customer
        </button>

        <Modal
          show={props.show}
          onHide={props.toggleShow}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form
                className="w-full max-w-sm"
                id="add-customer"
                onSubmit={(e) => {
                  e.preventDefault();
                  setName("");
                  setIndustry("");
                  props.newCustomer(name, industry);
                }}
              >
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="name"
                    >
                      Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="name"
                      type="text"
                      placeholder="IBM"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="industry"
                    >
                      Industry
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="industry"
                      type="text"
                      placeholder="Computing"
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              variant="secondary"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={props.toggleShow}
            >
              Close
            </button>
            <button
              form="add-customer"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              variant="primary"
              onClick={props.show}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
