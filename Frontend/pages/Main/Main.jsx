import "./Main.scss";
import { Gauge } from "@mui/x-charts/Gauge";
import React, { useEffect, useState } from "react";
import { assessBatteryHealth } from "../../utils/constants";
import Loader from "../../src/Components/Loader/Loader";
import AOS from "aos";
import "aos/dist/aos.css";

const Main = () => {
  const [data, setData] = useState(null);
  const [batteryHealth, setBatteryHealth] = useState(null);

  const fetchData = () => {
    fetch("https://bms-backend-0ci9.onrender.com/data")
      .then((response) => response.json())
      .then((bmsData) => {
        setData(bmsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 second
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Recalculate battery health when data is fetched
  useEffect(() => {
    if (data) {
      const health = assessBatteryHealth(
        data.Temperature_Sensor_1,
        data.Total_Voltage,
        data.Humidity,
        300 // Example static value, adjust as needed
      );
      setBatteryHealth(health);
    }
  }, [data]); // Trigger calculation when data changes

  useEffect(() => {
    AOS.init();
  }, []);

  // Check if data exists, show loader if not
  if (!data) return <Loader />;

  return (
    <div className="main">
      <h1>Overview</h1> {/* Main title */}

      {/* Gauge Section */}
      <div className="main-gauges">
        {/* Temperature Gauge */}
        <div className="gauge" data-aos="fade-up" data-aos-duration="500">
          <Gauge
            value={data.Temperature_Sensor_1 || 0} // Default to 0 if no data
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
          <p>Temperature 1</p> {/* Title */}
        </div>
        

        {/* Humidity Gauge */}
        <div className="gauge" data-aos="fade-up" data-aos-duration="600">
          <Gauge
            value={data.Humidity || 0} // Default to 0 if no data
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
          <p>Humidity</p> {/* Title */}
        </div>

        {/* Battery Voltage Gauge */}
        <div className="gauge" data-aos="fade-up" data-aos-duration="700">
          <Gauge
            value={data.Total_Voltage || 0} // Default to 0 if no data
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
          <p>Battery Voltage</p> {/* Title */}
        </div>

        {/* Battery Percentage Gauge */}
        <div className="gauge" data-aos="fade-up" data-aos-duration="800">
          <Gauge
            value={data.Capacity_Remaining_Percent || 0} // Default to 0 if no data
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
          <p>Battery Percentage</p> {/* Title */}
        </div>
      </div>

      {/* Battery Condition Section */}
      <div className="condition">
        <h1>Battery Condition</h1> {/* Section Title */}
        <div className="condition-main">
          {/* Battery Health Condition */}
          <div>
            <p>Current battery health condition: </p>
            <h3>{batteryHealth?.healthStatus}</h3> {/* Health status */}
            <p
              className="indicate"
              style={{ backgroundColor: batteryHealth?.color }} // Dynamic color based on health
            ></p>
          </div>

          {/* Suggestions */}
          <div>
            <p>
              Suggestions: <span>{batteryHealth?.suggestions}</span> {/* Suggestions */}
            </p>
          </div>

          {/* Recommendations */}
          <div>
            <h3>Recommendations</h3>
            <p>
              Temperature:{" "}
              <span>{batteryHealth?.recommendations?.temperature}</span> {/* Recommended Temperature */}
            </p>
            <p>
              Voltage: <span>{batteryHealth?.recommendations?.voltage}</span> {/* Recommended Voltage */}
            </p>
            <p>
              Humidity: <span>{batteryHealth?.recommendations?.humidity}</span> {/* Recommended Humidity */}
            </p>
            <p>
              Charge Cycles:{" "}
              <span>{batteryHealth?.recommendations?.chargeCycles}</span> {/* Recommended Charge Cycles */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
