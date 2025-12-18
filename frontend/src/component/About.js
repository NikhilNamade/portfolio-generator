import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Datacontext from "../context/data/Datacontext";
import Portfolio1 from "../portfolios/portfolio1.jpg";
import Portfolio2 from "../portfolios/portfolio2.jpg";
import Portfolio3 from "../portfolios/portfolio3.jpg";
const About = () => {
  const navigate = useNavigate()
  const { setShowNavbar ,fetchId,datas} = useContext(Datacontext);
  useEffect(() => {
    fetchId()
  }, [])
  return (
    <>
      <div className="bxos">
        <div className="box" style={{
            backgroundImage: `url(${Portfolio1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <h1>Portfolio1</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio1")}}>Preview</button>
          <button className="select" onClick={() => {setShowNavbar(false); navigate(`/portfolio1/${datas.userId}`)}}>Select</button>
          </div>
        </div>
        <div className="box"  style={{
            backgroundImage: `url(${Portfolio2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <h1>Portfolio2</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio2")}}>Preview</button>
          <button className="select" onClick={() => {setShowNavbar(false); navigate(`/portfolio2/${datas.userId}`)}}>Select</button>
          </div>
        </div>
        <div className="box"  style={{
            backgroundImage: `url(${Portfolio3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <h1>Portfolio3</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio3")}}>Preview</button>
          <button className="select" onClick={() =>{setShowNavbar(false); navigate(`/portfolio3/${datas.userId}`)}}>Select</button>
          </div>
        </div>
        <div className="box"  style={{
            backgroundImage: `url(${Portfolio3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <h1>Portfolio4</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio4")}}>Preview</button>
          <button className="select" onClick={() =>{setShowNavbar(false); navigate(`/portfolio4/${datas.userId}`)}}>Select</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
