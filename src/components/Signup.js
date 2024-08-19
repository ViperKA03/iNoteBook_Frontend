import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'


const Signup = (props) => {
    const host = "http://localhost:5000";
    let history=useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" ,name:"",cpassword:""});
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,paswword}=credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            name:credentials.name
          }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            // save teh auth token and redirect to page
            localStorage.setItem('token',json.authToken)
            props.showAlert("Account  Created Successfully","success ");
            history('/')
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
      };
  return (
    <div className="container mt-2">
        <h2 className="mb-2"> Create an ccount to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={onChange}
            minLength={5}
            required
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            minLength={5}
            required
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >
            Password
          </label>
          <input
          name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
             name="cpassword"
             minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
