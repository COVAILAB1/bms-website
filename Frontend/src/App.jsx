import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
// import emailjs from "@emailjs/browser";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
