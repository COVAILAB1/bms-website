import { useSelector } from "react-redux";
import "./Overall.scss";
import { LineChart } from "@mui/x-charts/LineChart";
import Loader from "../../src/Components/Loader/Loader";

const Overall = () => { 
  const data = useSelector((store) => store.bmsData.data);

  let graphData = [];

  if(!(Object.keys(data).length === 0)) {
    graphData = data.slice(-10);
  }
  // if (Object.keys(data).length === 0) {
  //   navigate("/");
  // }

  // const [graphdata, setGraphdata] = useState(data.slice(-10))

  if(Object.keys(data).length === 0) return <></>

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
              data: graphData.map((data) => data.temperature), 
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
              data: graphData.map((data) => data.humidity),
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
              data: graphData.map((data) => data.voltage),
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
              data: graphData.map((data) => data.batteryPercentage),
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
