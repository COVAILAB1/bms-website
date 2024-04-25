import { useEffect, useState } from "react";
import "./Header.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../../redux/dataSlice";
import emailjs from "@emailjs/browser";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    console.log("get data");
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
    console.log(mongoDataPost);
    const mongoData = await axios.get(
      "https://bms-website-server.onrender.com/api/getdata"
    );
    dispatch(setData(mongoData.data.data));
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

    const handleResize = () => {
      if (window.innerHeight <= 700) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header-org">
      <div className="header-temp"></div>
      <div className="header">
        <p className="title">BMS Dashboard</p>
      </div>
    </div>
  );
};

export default Header;
