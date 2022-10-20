import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadLogin } from "./actions/loginAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, []);

  return (
    <div className="App m-2">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
