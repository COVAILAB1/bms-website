import "./App.scss";
import Header from "./Components/Header/Header";
import Main from "../pages/Main/Main";
import Overall from "../pages/Overall/Overall";
// import emailjs from "@emailjs/browser";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Overall />
    </div>
  );
};

export default App;
