import { defineStore } from "pinia";
import { api } from "@/api/index.ts";
import type {Student} from "@/stores/groups.ts";

export interface Event {
	id: number;
	name: string;
	date_start: string;
	date_end: string;
	description: string;
	level: ReferenceItem;
	corpus: ReferenceItem;
	directions: ReferenceItem[];
	modules: ReferenceItem[];
	place: ReferenceItem;
	responsible: string;
	responsibles: ReferenceItem[];
	participants: Student[];
}

export interface EventPayload {
	id: number;
	name: string;
	date_start: string;
	date_end: string;
	description: string;
	level_id: number;
	corpus_id: number;
	directions: number[];
	modules: number[];
	place_id: number;
	responsible: string;
	responsibles: number[];
}

export interface ReferenceItem {
	id: number;
	name: string;
}

interface EventsStore {
	events: Event[];
	places: ReferenceItem[];
	levels: ReferenceItem[];
	corpuses: ReferenceItem[];
	directions: ReferenceItem[];
	modules: ReferenceItem[];
}

export const useEventsStore = defineStore('events',{
	state: (): EventsStore => ({
		events: [],
		places: [],
		levels: [],
		corpuses: [],
		directions: [],
		modules: [],
	}),
	actions: {
		async requestEvents() {
			this.events = await api.getEvents();
		},
		async requestPlaces() {
			const response = await api.getPlaces();
			this.places = response.places;
			return response.places;
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
