import {defineStore} from "pinia";
import {api} from "@/api/index.ts";

export interface Student {
	id: number;
	name: string;
	surname: string;
	patronymic: string;
	initials: string;
}

export interface Group {
	id: number;
	name: string;
	specialty: {
		id: number;
		name: string;
		qualification: string;
	};
	students?: Student[];
}

interface GroupStore {
	groups: Group[];
}

export const useGroupsStore = defineStore('groups',{
	state: (): GroupStore => ({
		groups: []
	}),
	actions: {
		async requestGroups() {
			this.groups = await api.getGroups();
		}
	}
})
