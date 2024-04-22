import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  )
}

export default App;