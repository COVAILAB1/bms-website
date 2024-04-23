import { useEffect, useState } from "react";
import "./Main.scss";
import axios from "axios";
import { setData } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";

const Main = () => {
  const [bmsData, setBmsData] = useState({});
  const dispatch = useDispatch();

  const getData = async () => {
    const response = await axios.get(
      `https://blr1.blynk.cloud/external/api/getAll?token=${
        import.meta.env.VITE_BLYNK_TOKEN
      }`
    );
    dispatch(setData(response.data));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <h1>Main</h1>
    </div>
  );
};

export default Main;
