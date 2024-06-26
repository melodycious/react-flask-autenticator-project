import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
        actions.logout();
        navigate("/");
    };
	

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{
						!store.token ?

						<Link to="/login">
							<button className="btn btn-primary me-2">Log in</button>
						</Link>
						:
						<button onClick={handleLogout} className="btn btn-primary me-2">Log Out</button>
						
					}
					<Link to="/signup">
							<button className="btn btn-primary">Register</button>
						</Link>
				</div>
			</div>
		</nav>
	);
};
