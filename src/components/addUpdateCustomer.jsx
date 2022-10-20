import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addCustomer, updateCustomer } from "../actions/customerAction";

const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  phone: yup.string().min(7).max(10).required(),
});

export function customerLoader({ params }) {
  const customerId = params.customerId;
  return customerId;
}

export default function AddCustomer() {
  const customers = useSelector((state) => state.customerReducer.customers);

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
      dispatch(updateCustomer(data));
      navigate("/customers");
    } else {
      // dispatch(addGenre({ name: data.name, _id:"sajakjksjkjjskjk" }));
      dispatch(addCustomer(data));
      navigate("/customers");
    }
  };

  const customerId = useLoaderData();

  useEffect(() => {
    if (!customerId) return;

    const customer = customers.find((c) => c._id === customerId);
    setValue("name", customer.name);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
    setValue("_id",customer._id)
  });

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        action=""
        onSubmit={handleSubmit(onSubmitHandler)}
        className="shadow Form-width p-3 rounded"
      >
        <div>
          
            <h3 className="bg-light p-2 shadow-sm rounded">
              {customerId ? "Update Customer" : "Add Customer"}
            </h3>
          
        </div>
        <div>
          <input
            type="text"
            {...register("name")}
            id="name"
            placeholder="Name"
            className="input-width mt-2 rounded p-1"
          />
        </div>
        <div>
          <p className="div-height text-danger">{errors.name?.message}</p>
        </div>
        <div>
          <input
            type="text"
            {...register("phone")}
            id="phone"
            placeholder="Phone"
            className="input-width mt-2 rounded p-1"
          />
        </div>
        <div>
          <p className="div-height text-danger">{errors.phone?.message}</p>
        </div>
        <div>
          <input
            type="checkbox"
            className="mx-2 form-check-input"
            {...register("isGold")}
          />
          <label htmlFor="" className="form-label">
            isGold
          </label>
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
