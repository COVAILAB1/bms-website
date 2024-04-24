import { useSelector } from "react-redux";
import "./Overall.scss";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../src/Components/Loader/Loader";

const Overall = () => {
  // const data = useSelector((store) => store.bmsData.data);

  // const [graphdata, setGraphdata] = useState(data.slice(-10));
  const [data, setData] = useState();

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
    // dispatch(setData(mongoData.data.data));
    setData(mongoData.data.data);
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

  if(!data) return <Loader />

  return (
    <div className="overall-main">
      <h1>Overall</h1>
      <table className="overall">
        <tr>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>voltage</th>
          <th>Battery Percentage</th>
        </tr>
        {data.map((data) => (
          <tr key={data._id}>
            <td>{data.temperature}</td>
            <td>{data.humidity}</td>
            <td>{data.voltage}</td>
            <td>{data.batteryPercentage}</td>
          </tr>
        ))}
      </table>

      <div className="overall-graph">
        <h1>Graph</h1>
        <h2>Temperature</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
          series={[
            {
              data: data.map((data) => data.temperature),
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
        <h2>Humidity</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
          series={[
            {
              data: data.map((data) => data.humidity),
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
        <h2>Voltage</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
          series={[
            {
              data: data.map((data) => data.voltage),
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
        <h2>Battery Percentage</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
          series={[
            {
              data: data.map((data) => data.batteryPercentage),
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </div>
  );
};

export default Overall;
