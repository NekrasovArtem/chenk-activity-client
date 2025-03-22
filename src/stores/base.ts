import {defineStore} from "pinia";

interface UserData {
	id: number;
	name: string;
	surname: string;
	patronymic: string;
	email: string;
	role: string;
}

interface BaseStore {
	token: string | null;
	userData: UserData | null;
	isMenuActive: boolean;
}

export const useBaseStore = defineStore("base", {
	state: (): BaseStore => ({
		token: localStorage.getItem("token"),
		userData: null,
		isMenuActive: false,
	}),
	actions: {
		setToken(value: string) {
			localStorage.setItem("token", value);
			this.token = value;
		},
		setUser(user: UserData) {
			localStorage.setItem("userId", String(user.id));
			this.userData = user;
		},
		deleteData() {
			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			this.token = null;
			this.userData = null;
		},
	},
});
