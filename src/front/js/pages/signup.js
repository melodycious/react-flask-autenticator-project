import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Router, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	
	const handleClick = async(e) => {
		console.log(userName, email, password)
		e.preventDefault();
		e.stopPropagation();

	
		const triedToSignUp = await actions.createUser(userName, email, password);
		if (triedToSignUp) {
			navigate("/login")
		   }
        else {
            return ({"error": "Sign Up failed. Please check your credentials."});
        }


	}

	return (
				<div className="container">
				<div className="row justify-content-md-center">
				<div className="text-center mt-5 col-6">
				<h2>Sign Up</h2>
				<form className="">
					<div className="form-group">
						<label for="userName">User name:</label>
						<input
							type="text" 
							className="form-control"
							id="newuser" 
							value={userName}
							placeholder= "your username"
							onChange={(e)=> setUserName(e.target.value)} 
							required/>
					</div>
				    <div className="form-group">
						<label for="email">Email:</label>
						<input
							type="email" 
							className="form-control"
							id="email" 
							name="email" 
							value={email}
							placeholder= "your email"
							onChange={(e)=> setEmail(e.target.value)} 
							required/>
					</div>
					<div className="form-group">
						<label for="userPassword">Password:</label>
						<input
						type="password" 
						className="form-control"
						id="password" 
						name="password" 
						value={password}
						placeholder= "your password"
						onChange={(e)=> setPassword(e.target.value)}
						required/>
					</div>
					<div>
						
							<button onClick={handleClick} className="btn btn-secondary mt-1" type="submit">Sign Up</button>
						
					</div>
				</form>

				
			</div>
			</div>
			</div>
			
	)
};
