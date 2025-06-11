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
	participants: number[];
}

export interface EventParticipantsPayload {
	event_id: number;
	participants: number[];
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
	pages: number;
}

export const useEventsStore = defineStore('events',{
	state: (): EventsStore => ({
		events: [],
		places: [],
		levels: [],
		corpuses: [],
		directions: [],
		modules: [],
		pages: 0,
	}),
	actions: {
		async requestEvents(page: number = 1) {
			const response = await api.getEvents(page);
			this.events = await response.data;
			this.pages = await response.meta.last_page;
		},
		async requestPlaces() {
			const response = await api.getPlaces();
			this.places = response.data;
			return response.data;
		},
		async requestLevels() {
			const response = await api.getLevels();
			this.levels = response.data;
			return response.data;
		},
		async requestCorpuses() {
			const response = await api.getCorpuses();
			this.corpuses = response.data;
			return response.data;
		},
		async requestDirections() {
			const response = await api.getDirections();
			this.directions = response.data;
			return response.data;
		},
		async requestModules() {
			const response = await api.getModules();
			this.modules = response.data;
			return response.data;
		},
	}
})
