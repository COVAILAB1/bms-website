import React, { useState, useEffect } from "react";
import "./Overall.scss";
import AOS from "aos";
import { Gauge } from "@mui/x-charts/Gauge";
import "aos/dist/aos.css";

const Overall = () => {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("https://bms-backend-rbwe.onrender.com/data") // Update this URL if needed
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

  // Assuming data.Cells is your array of cell data with Voltage and Cell_no
  const cells = data?.Cells || []; // If no data, default to an empty array

  return (
    <div className="overall-main">
      <h1>Battery Cells Overview</h1>

      {/* Check if data exists, show loader if not */}
      {data ? (
        <div className="main-gauges">
          {/* Dynamically render gauges for each cell */}
          {cells.map((cell, index) => (
            <div
              key={cell.Cell_no}
              className="gauge"
              data-aos="fade-up"
              data-aos-duration={`${500 + index * 100}`}
            >
              <Gauge
                value={cell.Voltage || 0} // Voltage value from the cell
                startAngle={0}
                endAngle={360}
                innerRadius="80%"
                outerRadius="100%"
                height={250}
                width={250}
                color="white"
                valueMin={0}
                valueMax={5} // Adjust this to the maximum possible voltage
                style={{
                  fontSize: "2rem",
                  fontWeight: "500",
                }}
              />
              <p>Cell {cell.Cell_no}</p> {/* Cell title */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p> // Simple loader text, can replace with Loader component
      )}

      {/* Protection Status Section */}
      {data?.Protection_Status ? (
        <div className="condition1">
          <h1>Protection Status</h1>
          <div className="condition-main1">
            <div>
              <p><strong>Single Cell Overvoltage Count:</strong> {data.Protection_Status.Single_Cell_Overvoltage_Count}</p>
              <p><strong>Single Cell Undervoltage Count:</strong> {data.Protection_Status.Single_Cell_Undervoltage_Count}</p>
              <p><strong>Whole Pack Overvoltage Count:</strong> {data.Protection_Status.Whole_Pack_Overvoltage_Count}</p>
              <p><strong>Whole Pack Undervoltage Count:</strong> {data.Protection_Status.Whole_Pack_Undervoltage_Count}</p>
              <p><strong>Charging Over-Temperature Count:</strong> {data.Protection_Status.Charging_Over_Temperature_Count}</p>
              <p><strong>Charging Low-Temperature Count:</strong> {data.Protection_Status.Charging_Low_Temperature_Count}</p>
              <p><strong>Discharge Over-Temperature Count:</strong> {data.Protection_Status.Discharge_Over_Temperature_Count}</p>
              <p><strong>Discharge Low-Temperature Count:</strong> {data.Protection_Status.Discharge_Low_Temperature_Count}</p>
              <p><strong>Charging Overcurrent Count:</strong> {data.Protection_Status.Charging_Overcurrent_Count}</p>
              <p><strong>Discharge Overcurrent Count:</strong> {data.Protection_Status.Discharge_Overcurrent_Count}</p>
              <p><strong>Short Circuit Protection Count:</strong> {data.Protection_Status.Short_Circuit_Protection_Count}</p>
              <p><strong>Front-end Detection IC Error Count:</strong> {data.Protection_Status.Front_end_Detection_IC_Error_Count}</p>
              <p><strong>Software Lock MOS Count:</strong> {data.Protection_Status.Software_Lock_MOS_Count}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading protection status...</p> // Loader for protection status
      )}
    </div>
  );
};

export default Overall;
