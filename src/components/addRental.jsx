import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addRental, updateRental } from "../actions/rentalAction";
import { useEffect } from "react";
import { getAllMovies } from "../actions/movieAction";
import { getAllCustomers } from "../actions/customerAction";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  movieId: yup.string().required(),
  customerId: yup.string().required(),
  
});

export default function AddRental() {
  const customers = useSelector((state) => state.customerReducer.customers);
  const movies = useSelector((state) => state.movieReducer.movies);

  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllCustomers());
  },[]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    if (data._id) {
      // dispatch(updateRental());
      // navigate("/rentals")
    } else {
      console.log(data)
      dispatch(addRental(data));
      navigate("/rentals")
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <form
          action=""
          className="shadow Form-width p-3 rounded"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <h3 className="bg-light p-2 shadow-sm rounded">Add Rental</h3>
          </div>
          <div>
            <select
              name=""
              id=""
              className="input-width mt-2 rounded p-1 "
              {...register("customerId")}
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="div-height text-danger">
              {errors.customerId?.message}
            </p>
          </div>
          <div>
            <select
              name=""
              id=""
              className="input-width mt-2 rounded p-1 "
              {...register("movieId")}
            >
              <option value="">Select Movie</option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="div-height text-danger">{errors.movieId?.message}</p>
          </div>
          <div>
            <button className="btn btn-secondary shadow btn-width ">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
