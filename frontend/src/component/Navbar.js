import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Datacontext from "../context/data/Datacontext";
const Navbar = (props) => {
    const { fetchdata, userdata ,fetchId,datas} = useContext(Datacontext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = ()=>{
        {props.setProgress(10)}
        localStorage.removeItem("token");
        navigate("/login");
        {props.setProgress(100)}
        //#344955
    }
    useEffect(() => {
        fetchId()
      }, [])
    const handleUpdate = ()=>{
        console.log(datas.userId);
        fetchdata(datas.userId);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg " style={{width:"100%",margin:"0",backgroundColor:"white",position: "sticky",top: "0",zIndex: "1000"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{color:"black"}}>Portfolio-Generator</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}  aria-disabled="true">About</Link>
                            </li> */}
                        </ul>
                        {!localStorage.getItem("token")?<div style={{backgroundColor:"transparent"}}>
                            <Link className="btn btn-primary mx-2 my-2" to="/login" type="submit">Login</Link>
                            <Link className="btn btn-primary my-2" to="/signup" type="submit">SignUp</Link>
                        </div>:
                        <div style={{backgroundColor:"transparent",width:"22vmin", display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                            <button className='btn btn-primary' onClick={handleClick}>Logout</button>
                            <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar