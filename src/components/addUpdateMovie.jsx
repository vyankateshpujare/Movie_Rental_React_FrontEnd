import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, getCurrentMovie, updateMovie } from "../actions/movieAction";
import { getAllGenres } from "../actions/genreAction";

const schema = yup.object().shape({
  title: yup.string().min(3).max(50).required(),
  dailyRentalRate: yup.number().min(1).max(50).required(),
  numberInStock: yup.number().min(0).max(50).required(),
});

export function movieLoader({ params }) {
  const movieId = params.movieId;
  return movieId;
}

export default function AddMovie() {
  const genres = useSelector((state) => state.genreReducer.genres);
  const movie = useSelector((state) => state.movieReducer.currentMovie);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    if (!data._id) {
      dispatch(addMovie(data));
      navigate("/movies");
    } else {
      dispatch(updateMovie(data));
      navigate("/movies");
    }
  };

  const movieId = useLoaderData();
  useEffect(() => {
    dispatch(getAllGenres());
    if (movieId) {
      dispatch(getCurrentMovie(movieId));
    }
  }, []);

  useEffect(() => {
    if (!movieId) return;
    setValue("title", movie.title);
    setValue("genre", movie.genre?._id);
    setValue("dailyRentalRate", movie.dailyRentalRate);
    setValue("numberInStock", movie.numberInStock);
    // setValue("liked", movie.liked);
    setValue("_id", movie._id);
  }, [movie._id]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        action=""
        onSubmit={handleSubmit(onSubmitHandler)}
        className="shadow Form-width p-3 rounded"
      >
        <div>
          <h3 className="bg-light p-2 shadow-sm rounded">
            {!movieId ? "Add Movie" : "Update Movie"}
          </h3>
        </div>
        <div className="">
          {/* <label htmlFor="title" className="m-2 "><h5>Movie Title : </h5></label> */}
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className="input-width mt-2 rounded p-1 "
          />
        </div>
        <div>
          <p className="div-height text-danger">{errors.title?.message}</p>
        </div>
        <div>
          {/* <label htmlFor="Genre" className="m-2 "><h5>Genre : </h5></label> */}
          <select
            name=""
            id=""
            className="input-width mt-2 rounded p-1 "
            {...register("genre")}
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="div-height text-danger">{errors.genreId?.message}</p>
        </div>
        <div>
          {/* <label htmlFor="dailyRentalRate" className="m-2 "><h5>DailyRentalRate : </h5></label> */}
          <input
            type="text"
            {...register("dailyRentalRate")}
            id="dailyRentalRate"
            placeholder="DailyRentalRate"
            className="input-width mt-2 rounded p-1"
          />
        </div>
        <div>
          <p className="div-height text-danger">
            {errors.dailyRentalRate?.message}
          </p>
        </div>
        <div>
          {/* <label htmlFor="numberInStock" className="m-2 "><h5>NumberInStock : </h5></label> */}
          <input
            type="text"
            {...register("numberInStock")}
            id="numberInStock"
            placeholder="NumberInStock"
            className="input-width mt-2 rounded p-1"
          />
        </div>

        <div>
          <p className="div-height text-danger">
            {errors.numberInStock?.message}
          </p>
        </div>

        <div>
          <button className="btn btn-secondary shadow btn-width ">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
