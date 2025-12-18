import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const navigate = useNavigate();
    const [credintails, setCredentails] = useState({ name: "", email: "", password: "" })
    
    const onchange = (e) => {
        setCredentails({ ...credintails, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        {props.setProgress(10)}
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credintails.name, email: credintails.email, password: credintails.password })
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            console.log("account  created")
            navigate("/");
        } else {
            alert("account not created")
        }
        {props.setProgress(100)}
    }
    return (
        <div className='container my-5' style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <p className="fs-1 fw-bolder my-2" style={{textAlign:'center'}}>SignUp</p>
            <form onSubmit={handleSubmit} style={{width:"70vmin"}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credintails.name} onChange={onchange} style={{ width: "60vmin" }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credintails.email} onChange={onchange} aria-describedby="emailHelp" style={{ width: "60vmin" }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credintails.password} onChange={onchange} id="password" style={{ width: "60vmin" }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup