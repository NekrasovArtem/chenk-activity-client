import {defineStore} from "pinia";

export const useBaseStore = defineStore("base", () => {
	const state = () => ({
		token: null,
		user: null
	});

	state.token = localStorage.getItem("token");
	state.user = JSON.parse(localStorage.getItem("user"));

	console.log(state.token)

	function getToken() {
		return state.token;
	}

	function setToken(value) {
		localStorage.setItem("token", value);
		state.token = value;
	}

	function deleteToken() {
		localStorage.removeItem("token");
		state.token = null;
	}

	function getUser() {
		return state.user;
	}

	function setUser(user) {
		localStorage.setItem("user", JSON.stringify(user));
		state.token = user;
	}

	return {getToken, setToken, deleteToken, getUser, setUser};
});
