import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllRentals } from "../actions/rentalAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateRental ,deleteRental} from "../actions/rentalAction";

export default function Rental() {
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRentals());
  }, []);

  const handleReturn = (id) => {
    dispatch(updateRental(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteRental(id));
  };
  console.log(rentals);
  return (
    <React.Fragment>
      <div className="row mt-5 ">
        <div className="col-3">
          <Link to="/rentals/addRental">
            <button
              type="button"
              className="btn btn-light shadow-sm w-75 rounded p-1"
            >
              Add Rental
            </button>
          </Link>
        </div>
        <div className="col">
          {rentals.length === 0 ? (
            <h4>No Data Found</h4>
          ) : (
            <table className="table shadow-sm w-100">
              <thead className="shadow-sm bg-light">
                <tr>
                  <th>Customer</th>
                  <th>Movie</th>
                  <th>RentalFees</th>
                  <th>Date-Out</th>
                  <th>Date-In</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r._id}>
                    <td>{r.customer.name}</td>
                    <td>{r.movie.title}</td>
                    <td>{r.rentalFee}</td>
                    <td>{r.dateOut}</td>
                    <td>
                      {r.dateIn ? (
                        r.dateIn
                      ) : (
                        <button
                          className="btn btn-light shadow-sm"
                          onClick={() => handleReturn(r._id)}
                        >
                          Return
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn text-secondary shadow-sm btn-light rounded-circle"
                        onClick={() => handleDelete(r._id)}
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
