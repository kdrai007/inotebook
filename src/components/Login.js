import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      history.push("/")
      props.showAlert('logged in successfully','success')
    }
    else{
      props.showAlert('invalid credentials','danger')
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-3">
      <h2 className="mb-3">Log In To Access Inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />

        </div>
        <button type="submit" className="btn btn-primary" >log in</button>
      </form>
    </div>
  )
}

export default Login
