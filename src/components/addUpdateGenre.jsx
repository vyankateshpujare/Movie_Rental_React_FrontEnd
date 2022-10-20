import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addGenre, getCurrentGenre, updateGenre } from "../actions/genreAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
});

export function genreLoader({ params }) {
  const genreId = params.genreId;
  return genreId;
}

export default function AddGenre() {
  const genre = useSelector((state) => state.genreReducer.currentGenre);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    if (data._id) {
      // dispatch(updateGenre({ name: data.name, _id: data._id }));
      dispatch(updateGenre(data));
      navigate("/genres");
    } else {
      // dispatch(addGenre({ name: data.name, _id:"sajakjksjkjjskjk" }));
      dispatch(addGenre(data));
      navigate("/genres");
    }
  };

  const genreId = useLoaderData();

  useEffect(() => {
    if (!genreId) return;

    dispatch(getCurrentGenre(genreId));
    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, [genre._id]);

  return (
    <div className="d-flex justify-content-center mt-5 ">
      <form
        action=""
        onSubmit={handleSubmit(onSubmitHandler)}
        className="shadow Form-width p-3 rounded "
      >
        <div>
          <p>
            <h3 className="bg-light p-2 shadow-sm rounded ">
              {genreId ? "Update Genre" : "Add Genre"}
            </h3>
          </p>
        </div>
        <div>
          <label htmlFor="name" className="m-2 ">
            <h5>Genre Name : </h5>
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="input-width mt-2 rounded p-1"
          />
        </div>
        <div>
          <p className="div-height text-danger">{errors.name?.message}</p>
        </div>
        <div>
          <button className="btn btn-secondary shadow btn-width m-2">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
