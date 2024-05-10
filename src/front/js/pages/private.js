import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	useEffect(() => {
        if (!store.logged) {
            actions.syncTokenFromLocalStorage();
        }
    }, [store.logged]);

	console.log(store)

	return (
		
		<div className="text-center mt-5">
			<h1>Private</h1>

			{store.logged === true && (
				<div>
					<h3>Welcome</h3>
					<p><strong>Here's your private information</strong></p>
				</div>
			)}
			{store.logged === false && (
				<div>
					<h3>Unauthorized</h3>
					<p>You only could access with the correct credentials.</p>
									
				</div>
			)}
			{(store.logged !== true && store.logged !== false) && (
				<div>
					<h1>Authenticating</h1>
					<p>Checking..................</p>
				</div>
			)}
		</div>
	);
};
