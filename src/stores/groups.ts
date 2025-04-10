import {defineStore} from "pinia";
import {api} from "@/api/index.ts";

export interface Group {
	id: number;
	name: string;
	specialty: {
		id: number;
		name: string;
		qualification: string;
	};
	students?: {
		id: number;
		name: string;
		surname: string;
		patronymic: string;
		initials: string;
	}[];
}

interface GroupStore {
	groups: Group[] | null;
}

export const useGroupsStore = defineStore('groups',{
	state: (): GroupStore => ({
		groups: null
	}),
	actions: {
		async requestGroups() {
			this.groups = await api.getGroups();
		}
	}
})
