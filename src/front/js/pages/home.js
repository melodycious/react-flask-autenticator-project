import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import hackergirl from "../../img/hacker-girl.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect (() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
	}, [store.token]);


	return (
		<div className="text-center mt-5">
			<h1>Authentication Testing</h1>
			<p>
				<img src={hackergirl} width="250px" />
			</p>
			<div className="alert alert-info">
				{store.message || "Hello, here's your assignment, please log in to check it out"}
			</div>
			<p>
				
			</p>
		</div>
	);
};
