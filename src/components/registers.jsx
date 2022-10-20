import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../actions/registerAction";
import { useDispatch } from "react-redux";

export default function Register() {
  const schema = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(registerUser(data));
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <form
          action=""
          onSubmit={handleSubmit(onSubmitHandler)}
          className="shadow Form-width p-3 rounded"
        >
          <h2 className="bg-light p-2 shadow-sm ">Lets sign up.</h2>
          <div className="mt-3">
            <FaUserAlt fontSize={20} />
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              autoComplete="off"
              className="input-width ms-2 rounded"
            />
          </div>
          <div>
            <p className="div-height text-danger">{errors.name?.message}</p>
          </div>
          <div>
            <MdEmail fontSize={25} />
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              autoComplete="off"
              className="input-width ms-2 rounded"
            />
          </div>
          <div>
            <p className="div-height text-danger">{errors.email?.message}</p>
          </div>
          <div>
            <BsFillKeyFill fontSize={25} />
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              className="input-width ms-2 rounded"
            />
          </div>

          <div>
            <p className="div-height text-danger">
              {" "}
              {errors.password?.message}
            </p>
          </div>
          <div>
            <input
              {...register("isAdmin")}
              type="checkbox"
              autoComplete="off"
              className="mx-2"
            />
            <label htmlFor="">isAdmin</label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-secondary shadow btn-width m-2"
            >
              Register
            </button>

            <p className="small fw-bold mt-2 mb-3">
              Don't have an account?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
