import React, { useState } from "react";
import Datacontext from "./Datacontext";

const UseData = (props) => { // Accept props here
  const Data = []
  const [userdata,setUserdata] = useState({user:null})
  const [datas, setDatas] = useState(""); // Initialize datas state as null or empty
  const [showNavbar, setShowNavbar] = useState(true);
  const fetchId = async () => {
    try {
      const response = await fetch(`https://portfolio-generator-u166.onrender.com/api/data/fetchid`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setDatas(data)
    } catch (error) {
      alert("Error ");
    }
  };

const fetchdata  = async (userId) =>{
  try {
    const response = await fetch(`https://portfolio-generator-u166.onrender.com/api/data/fetch/${userId}`,{
      method: "GET",
    });
    const data = await response.json()
    console.log(data);
    setUserdata(data)
  } catch (error) {
    alert("error");
  }
}

  return (
    <Datacontext.Provider value={{ datas, showNavbar, fetchId, setShowNavbar,fetchdata,userdata,setUserdata }}>
      {props.children} {/* Pass children components */}
    </Datacontext.Provider>
  );
};

export default UseData;

