import { useEffect, useState } from "react";
import "./Main.scss";
import axios from "axios";
import { setData } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { Gauge } from "@mui/x-charts/Gauge";

const Main = () => {
  const [bmsData, setBmsData] = useState({});
  const dispatch = useDispatch();

  const getData = async () => {
    const response = await axios.get(
      `https://blr1.blynk.cloud/external/api/getAll?token=${
        import.meta.env.VITE_BLYNK_TOKEN
      }`
    );
    const mongoData = await axios.post("http://localhost:8080/api/create-bms-data", {
      temperature: response.data.v1,
      humidity: response.data.v2,
      voltage: response.data.v3,
      batteryPercentage: response.data.v4,
    });
    console.log(mongoData);
    dispatch(setData(response.data));
    setBmsData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <h1>Overview</h1>
      <div className="main-gauges">
        <div className="gauge">
          <Gauge
            value={bmsData.v1}
            startAngle={0}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            height={250}
            width={250}
            color="white"
            valueMin={0}
            valueMax={50}
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          />
          <p>Temperature</p>
        </div>
        <div className="gauge">
          <Gauge
            value={bmsData.v2}
            startAngle={0}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            height={250}
            width={250}
            color="white"
            valueMin={0}
            valueMax={100}
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          />
          <p>Humidity</p>
        </div>
        <div className="gauge">
          <Gauge
            value={bmsData.v3}
            startAngle={0}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            height={250}
            width={250}
            color="white"
            valueMin={0}
            valueMax={5}
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          />
          <p>Battery Voltage</p>
        </div>
        <div className="gauge">
          <Gauge
            value={bmsData.v4}
            startAngle={0}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            height={250}
            width={250}
            color="white"
            valueMin={0}
            valueMax={100}
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          />
          <p>Battery Percentage</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
