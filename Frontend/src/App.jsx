import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../redux/dataSlice.js";
import Loader from "./Components/Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  const [bmsdata, setBmsdata] = useState();

  const getData = async () => {
    const response = await axios.get(
      `https://blr1.blynk.cloud/external/api/getAll?token=${
        import.meta.env.VITE_BLYNK_TOKEN
      }`
    );
    const mongoDataPost = await axios.post(
      "http://localhost:8080/api/create-bms-data",
      {
        temperature: response.data.v1,
        humidity: response.data.v2,
        voltage: response.data.v3,
        batteryPercentage: response.data.v4,
      }
    );
    const mongoData = await axios.get("http://localhost:8080/api/getdata");
    dispatch(setData(mongoData.data.data));
    setBmsdata(mongoData.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      {bmsdata ? <Outlet /> : <Loader />}
    </div>
  );
};

export default App;
