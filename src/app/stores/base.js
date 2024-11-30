import {defineStore} from "pinia";

export const useBaseStore = defineStore("base", () => {
	const state = () => ({
		token: null,
	});

	state.token = localStorage.getItem("token");

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

	return {getToken, setToken, deleteToken};
});
