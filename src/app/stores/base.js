import {defineStore} from "pinia";

export const useBaseStore = defineStore("base", () => {
	const state = () => ({
		token: null,
	});

	state.token = localStorage.getItem("token");

	console.log(state.token);

	function getToken() {
		return state.token;
	}

	function setToken(value) {
		localStorage.setItem("token", value);
		state.token = value;
	}

	return {getToken, setToken};
});
