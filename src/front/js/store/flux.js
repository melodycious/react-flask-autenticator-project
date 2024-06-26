const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
            logged: false,
			user: null,
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
				const token = sessionStorage.getItem("token");
				console.log("app loaded synching with session storage");
				if (token && token != "" && token != undefined) setStore({token: token, logged: true});

			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
			
				try {
					const resp = await fetch('https://turbo-xylophone-q77x9v5vqx4p3qg5-3001.app.github.dev/api/token', opts)
			
					if (resp.ok) {
						const data = await resp.json();
						console.log("from back", data)
						sessionStorage.setItem("token", data.access_token);
						setStore({
							token: data.access_token,
							logged: true
						});
						return true;
					} else {
						alert("There is an error");
						return false;
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
					return false;
				}
			},
			
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("login out");
				setStore({token: null});
			},

			createUser: async (userName, email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						
						body: JSON.stringify({
							"user_name": userName,
							"email": email,
							"password": password
						})
					});
			
					if (response.ok) {
						const data = await response.json();
						console.log(data)
						return true;
					} else {
						alert("There has been some error, please check it out.");
						return false;
					}
				} catch (error) {
					console.error("There was an error:", error);
					return false;
				}
			},
		}
	}
};

export default getState;
