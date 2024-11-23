import {defineStore} from "pinia";

export const useBaseStore = defineStore("base", () => {
	const state = () => ({
		token: null,
	});

	state.token = '21|dDAmjdN5E7MzZnBwnbFh1b60TalwTOAOmJvX4cUJ5b543fc6'

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
