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
	events: Event[] | null;
	levels: Level[] | null;
	corpuses: Corpus[] | null;
	directions: Direction[] | null;
	modules: Module[] | null;
}

export const useEventsStore = defineStore('events',{
	state: (): EventsStore => ({
		events: null,
		levels: null,
		corpuses: null,
		directions: null,
		modules: null,
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
