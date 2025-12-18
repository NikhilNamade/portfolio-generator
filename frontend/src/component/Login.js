import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentails] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        {props.setProgress(10)}
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            navigate("/");
        } else {
            alert("Unable to Login")
        }
        {props.setProgress(100)}
    }
    const onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container my-5' style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <p className="fs-1 fw-bolder my-2" style={{textAlign:'center'}}>Login</p>
            <form onSubmit={handleSubmit} style={{width:"70vmin"}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp" style={{ width: "60vmin" }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onchange} style={{ width: "60vmin" }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login