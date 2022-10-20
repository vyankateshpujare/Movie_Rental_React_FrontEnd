import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/fakeCustomerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getAllCustomers } from "../actions/customerAction";
import { Link } from "react-router-dom";

export default function Customer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const customers = useSelector((state) => state.customerReducer.customers);

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <React.Fragment>
      <div className="row mt-5 rounded">
        <div className="col-3">
          <Link to="/customers/addCustomer">
            <button className="btn btn-light shadow-sm w-75 rounded p-1">
              ADD CUSTOMER
            </button>
          </Link>
        </div>
        <div className="col">
          {customers.length === 0 ? (
            <h4>No Data Found</h4>
          ) : (
            <table className="table shadow-sm w-75">
              <thead className="shadow-sm bg-light">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>isGold</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <Link
                        to={`/customers/${c._id}`}
                        className="text-decoration-none text-black"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td>{c.phone}</td>
                    <td>{c.isGold.toString()}</td>
                    <td>
                      <button
                        className="btn btn-secondary rounded-circle"
                        onClick={() => handleDelete(c._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
