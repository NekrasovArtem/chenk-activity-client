import axios from "axios";
import { useBaseStore } from "@/stores/base.js";
import { storeToRefs } from "pinia"
import type { EventPayload } from "@/stores/events.ts";

const { token } = storeToRefs(useBaseStore());

class BaseApi {
	_api = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		responseType: 'json',
		validateStatus: function () {
			return true;
		}
	})

	async registration(formData: object) {
		const response = await this._api.post('/registration', formData, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async authorization(formData: object) {
		return await this._api.post('/authorization', formData);
	}

	async getUserData(id: string) {
		return await this._api.get(`/user/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
	}

	async resetPassword() {
		const response = await this._api.post('/password/reset', {}, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getPlaces() {
		const response = await this._api.get("/places", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getLevels() {
		const response = await this._api.get("/levels", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getCorpuses() {
		const response = await this._api.get("/corpuses", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getDirections() {
		const response = await this._api.get("/directions", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getModules() {
		const response = await this._api.get("/modules", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return response.data;
	}

	async getEvents(page: number = 1, search: string = '') {
		const response = await this._api.get(`/events?page=${page}&search=${search}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await response.data;
	}

	async getEventsUpcoming(date: string) {
		const promise = await this._api.get(`/events?start=${date}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		const response = await promise.data;
		return await response.data;
	}

	async getEventsPast(date: string) {
		const promise = await this._api.get(`/events?end=${date}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		const response = await promise.data;
		return await response.data;
	}

	async getEventDetail(id: number) {
		const response = await this._api.get(`/events/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await response.data;
	}

	async createEvent(data: object) {
		const response = await this._api.post("/events/create", data, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await response.data;
	}

	async deleteEvent(id: number) {
		const response = await this._api.delete(`/events/${id}`,{
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await response.data;
	}

	async editEvent(id: number, data: EventPayload | { participants: number[] }) {
		const response = await this._api.put(`/events/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await response.data;
	}

	async exportEvents(year: number) {
		const response = await this._api.post("/events/export",
		{
			year,
		},
		{
			headers: {
				Authorization: `Bearer ${token.value}`
			},
			responseType: "blob"
		});
		return await response.data;
	}

	async getSpecializations() {
		const response = await this._api.get("/specialties", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await response.data.data;
	}

	async getGroups(page: number = 1, search: string = '') {
		const response = await this._api.get(`/groups?page=${page}&search=${search}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await response.data;
	}

	async getGroupDetail(id: number) {
		const response = await this._api.get(`/groups/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});

		return response.data;
	}

	async createGroups(data: object) {
		const response = await this._api.post("/groups", data, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await response.data;
	}

	async importStudents(formData: object) {
		return await this._api.post('/students/import', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token.value}`
			},
		});
	}

	async getStudentsByGroup(id: number) {
		const response = await this._api.get(`/students/group/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		})

		return response.data;
	}
}

export const api = new BaseApi();
