import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../redux/dataSlice.js";
import Loader from "./Components/Loader/Loader";
// import emailjs from "@emailjs/browser";

const App = () => {
  const dispatch = useDispatch();
  const [bmsdata, setBmsdata] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `https://blr1.blynk.cloud/external/api/getAll?token=${
        import.meta.env.VITE_BLYNK_TOKEN
      }`
    );
    console.log("response", response);
    const mongoDataPost = await axios.post(
      "https://bms-website-server.onrender.com/api/create-bms-data",
      {
        temperature: response.data.v1,
        humidity: response.data.v2,
        voltage: response.data.v3,
        batteryPercentage: response.data.v4,
      }
    );
    const mongoData = await axios.get(
      "https://bms-website-server.onrender.com/api/getdata"
    );
    dispatch(setData(mongoData.data.data));
    setBmsdata(mongoData.data.data);
    console.log(mongoData.data.data[mongoData.data.data.length - 1]);

    const templateParams = {
      from_name: "SmartEV Team",
      from_email: "smartevteam@example.in",
      to_name: "Ameer khan B",
      temperature:
        mongoData.data.data[mongoData.data.data.length - 1].temperature,
      voltage: mongoData.data.data[mongoData.data.data.length - 1].voltage,
      humidity: mongoData.data.data[mongoData.data.data.length - 1].humidity,
      batteryPercentage:
        mongoData.data.data[mongoData.data.data.length - 1].batteryPercentage,
    };

    console.log("template", templateParams);
    console.log("email js called");
    // const emailResponse = await emailjs.send(
    //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //   templateParams,
    //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    // );
    // console.log(emailResponse);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("bmsdata", bmsdata);

  return (
    <div className="app">
      <Header />
      {/* {bmsdata.length > 0 ? <Outlet /> : <Loader />} */}
      {bmsdata.length > 0 ? <h1>ok👍</h1> : <Loader />}

    </div>
  );
};

export default App;
