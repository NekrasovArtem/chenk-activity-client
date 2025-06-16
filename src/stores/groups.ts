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
		code: string;
		name: string;
		qualification: string;
	};
	students: Student[];
}

interface GroupStore {
	groups: Group[];
	pages: number;
}

export const useGroupsStore = defineStore('groups',{
	state: (): GroupStore => ({
		groups: [],
		pages: 0
	}),
	actions: {
		async requestGroups(page: number = 1, search: string = '') {
			const response  = await api.getGroups(page, search)
			this.groups = response.data;
			this.pages = await response.meta.last_page;
		}
	}
})
