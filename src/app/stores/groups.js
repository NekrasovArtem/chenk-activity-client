import {defineStore} from "pinia";
import {api} from "@/app/api/index.js";

export const useGroupsStore = defineStore('groups',{
	state: () => ({
		groups: null
	}),
	actions: {
		getGroups() {
			return this.groups;
		},
		async setGroups() {
			this.groups = await api.getGroups();
		}
	}
})
