import "./Main.scss";
import { Gauge } from "@mui/x-charts/Gauge";
import { useSelector } from "react-redux";

const Main = () => {
  const bmsData = useSelector(
    (store) => store.bmsData.data[store.bmsData.data.length - 1]
  );

  return (
    <div className="main">
      <h1>Overview</h1>
      <div className="main-gauges">
        <div className="gauge">
          <Gauge
            value={bmsData.temperature}
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
            value={bmsData.humidity}
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
            value={bmsData.voltage}
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
            value={bmsData.batteryPercentage}
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
