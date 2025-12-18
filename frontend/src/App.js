import React, { useContext, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UseData from "./context/data/UseData";
import Datacontext from "./context/data/Datacontext";
import LoadingBar from 'react-top-loading-bar'
import Portfolio1 from "./portfolios/Portfolio1"
import Portfolio2 from "./portfolios/Portfolio2"
import Portfolio3 from "./portfolios/Portfolio3"
import PortfolioNo4 from "./portfolios/PortfolioNo4";
function App() {
  const [shownav, setShownav] = useState(true);
  const [progress, setProgress] = useState(0);
  return (
    <>
      <UseData>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}

          />
          <NavbarSwitcher setProgress={setProgress} />
          <Routes>
            <Route exact path="/" element={<Home setProgress={setProgress} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login setProgress={setProgress} />} />
            <Route exact path="/signup" element={<Signup setProgress={setProgress} />} />
            <Route exact path="/portfolio1" element={<Portfolio1 />} />
            <Route exact path="/portfolio1/:userId" element={<Portfolio1 />} />
            <Route exact path="/portfolio2" element={<Portfolio2 />} />
            <Route exact path="/portfolio2/:userId" element={<Portfolio2 />} />
            <Route exact path="/portfolio3" element={<Portfolio3 />} />
            <Route exact path="/portfolio3/:userId" element={<Portfolio3 />} />
            <Route exact path="/portfolio4" element={<PortfolioNo4 />} />
            <Route exact path="/portfolio4/:userId" element={<PortfolioNo4 />} />
          </Routes>
        </Router>
      </UseData>
    </>
  );
}
const NavbarSwitcher = (props) => {
  const location = useLocation()
  return location.pathname === "/" || location.pathname === "/about" ? <Navbar setProgress={props.setProgress} /> : ""
};

export default App;
