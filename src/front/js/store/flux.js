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

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization" : "Bearer " + store.token
					}
				};
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				console.log("app loaded synching with Local storage");
				if (token && token != "" && token != undefined) setStore({token: token});

			},

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
			},
			
			logout: () => {
				localStorage.removeItem("token");
				console.log("login out");
				setStore({token: null});
			}
		}
	}
};

export default getState;
