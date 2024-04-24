import "./Main.scss";
import { Gauge } from "@mui/x-charts/Gauge";
import { useSelector } from "react-redux";
import { assessBatteryHealth } from "../../utils/constants";
import { useState } from "react";

const Main = () => {
  console.log("main componenet loaded");
  const bmsData = useSelector(
    (store) => store.bmsData.data[store.bmsData.data.length - 1]
  );
  const [batteryHealth, setBatteryHealth] = useState(
    assessBatteryHealth(
      bmsData?.temperature,
      bmsData?.voltage,
      bmsData?.humidity,
      300
    )
  );

  return (
    <div className="main">
      <h1>Overview</h1>
      <div className="main-gauges">
        <div className="gauge">
          <Gauge
            value={bmsData?.temperature}
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
            value={bmsData?.humidity}
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
            value={bmsData?.voltage}
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
            value={bmsData?.batteryPercentage}
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
      <div className="condition">
        <h1>Battery Condition</h1>
        <div className="condition-main">
          <div>
            <p>current battery health condition: </p>
            <h3>{batteryHealth?.healthStatus}</h3>
            <p
              className="indicate"
              style={{ backgroundColor: batteryHealth.color }}
            ></p>
          </div>
          <div>
            <p>
              suggestions: <span>{batteryHealth?.suggestions}</span>
            </p>
          </div>
          <div>
            <h3>Recommendations</h3>
            <p>
              Temperature:{" "}
              <span>{batteryHealth.recommendations.temperature}</span>
            </p>
            <p>
              Voltage: <span>{batteryHealth.recommendations.voltage}</span>
            </p>
            <p>
              Humidity: <span>{batteryHealth.recommendations.humidity}</span>
            </p>
            <p>
              Charge Cycles:{" "}
              <span>{batteryHealth.recommendations.chargeCycles}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
