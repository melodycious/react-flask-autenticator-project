import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Router, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	console.log("este es el token", token)
	

	const handleClick = async(e) => {
		e.preventDefault();
		e.stopPropagation();
		
		console.log(email, password)
		const triedToLogin = await actions.login(email, password);
		if (triedToLogin) {
			navigate("/home")
			console.log(store)
		}
        else {
            return ({"error": "Login failed. Please check your credentials."});
        }


	}


	return (

		<div className="container">
				<div className="row justify-content-md-center">
				<h1 className="text-center mt-5">Login</h1>
					<div className="text-center mt-3 col-6">
					<form className="">
						<div className="form-group">
						<input type="text" 
						className="form-control" 
						placeholder="email" 
						value={email} 
						onChange={(e) => setEmail(e.target.value)} />
						<input type="password" 
						className="form-control mt-2"
						placeholder="password" 
						value={password} 
						onChange={(e) => setPassword(e.target.value)} />
						<button className="btn btn-secondary mt-1" onClick={handleClick}>Login</button>
						</div>
					</form>
				</div>
				
				</div>
				</div>
			
	)
};
