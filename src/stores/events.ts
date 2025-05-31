import { defineStore } from "pinia";
import { api } from "@/api/index.ts";

export interface Event {
	id: number;
	name: string;
	date_start: string;
	date_end: string;
	description: string;
	level: {
		id: number;
		name: string;
	};
	corpus: {
		id: number;
		name: string;
	};
	directions: {
		id: number;
		name: string;
	}[];
	modules: {
		id: number;
		name: string;
	}[];
	place: {
		id: number;
		name: string;
	};
	responsible: string;
	responsibles: {
		id: number;
		name: string;
	}[];
}

export interface EventPayload {
	id: number;
	name: string;
	date_start: string;
	date_end: string;
	description: string;
	level: number;
	corpus: number;
	directions: number[];
	modules: number[];
	place: number;
	responsible: string;
	responsibles: number[];
}

export interface Level {
	id: number;
	name: string;
}

export interface Corpus {
	id: number;
	name: string;
}

export interface Direction {
	id: number;
	name: string;
}

export interface Module {
	id: number;
	name: string;
}

interface EventsStore {
	events: Event[];
	levels: Level[];
	corpuses: Corpus[];
	directions: Direction[];
	modules: Module[];
}

export const useEventsStore = defineStore('events',{
	state: (): EventsStore => ({
		events: [],
		levels: [],
		corpuses: [],
		directions: [],
		modules: [],
	}),
	actions: {
		async requestEvents() {
			this.events = await api.getEvents();
		},
		async requestLevels() {
			const response = await api.getLevels();
			this.levels = response.levels;
			return response.levels;
		},
		async requestCorpuses() {
			const response = await api.getCorpuses();
			this.corpuses = response.corpuses;
			return response.corpuses;
		},
		async requestDirections() {
			const response = await api.getDirections();
			this.directions = response.directions;
			return response.directions;
		},
		async requestModules() {
			const response = await api.getModules();
			this.modules = response.modules;
			return response.modules;
		},
	}
})
