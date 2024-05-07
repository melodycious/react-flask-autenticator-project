const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			login: async (email, password) => {
				const opts = {
					method:'POST',
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				}

				try {
					const resp = await fetch('https://turbo-xylophone-q77x9v5vqx4p3qg5-3001.app.github.dev/api/token', opts)

					if (resp.status !== 200 ) {
						alert("There has been an error");
						return false;
					}

					const data = await resp.json();
						console.log("from back", data)
						localStorage.setItem("token", data.access_token);
						setStore({token: data.access_token});
						return true;
				}

				catch(error){
					console.log("Error loading message from backend", error)
				}
			}
			
		}
	}
};

export default getState;
