import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
        actions.logout();
        // Recarga la página después de cerrar sesión
        window.location.reload();
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
							<button className="btn btn-primary">Log in</button>
						</Link>
						:
						<button onClick={handleLogout} className="btn btn-primary">Log Out</button>
						
					}
					
				</div>
			</div>
		</nav>
	);
};
