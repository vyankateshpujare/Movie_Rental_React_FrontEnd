import React, { useState } from "react";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link,useNavigate } from "react-router-dom";
import { loginUser } from "../actions/loginAction";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (data) => {
    dispatch(loginUser(data));
    navigate("/home");
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
          <h2 className="bg-light p-2 shadow-sm ">Lets sign you in.</h2>
          <p className=" mb-4">Please enter your login and password!</p>
          <div>
            <MdEmail fontSize={25} />
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              className="btn btn-secondary shadow btn-width m-2"
            >
              Login
            </button>
            <p className="small fw-bold mt-2 mb-3">
              <a href="#!" className="link-primary">
                Forgot password ?{" "}
              </a>
            </p>
            <p className="small fw-bold mt-2 mb-3">
              Don't have an account?{" "}
              <Link to="/register" className="link-danger">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
