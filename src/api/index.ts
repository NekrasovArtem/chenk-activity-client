import axios from "axios";
import { useBaseStore } from "@/stores/base.js";
import { storeToRefs } from "pinia";

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
		return await this._api.post('/registration', formData);
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
		return await this._api.post('/password/reset', {}, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
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

	async getEvents() {
		const promise = await this._api.get("/events", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		const response = await promise.data;
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
		const promise = await this._api.get(`/events/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await promise.data;
	}

	async exportEvents() {
		const promise = await this._api.post("/events/export", {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
			responseType: "blob"
		});
		return await promise.data;
	}

	async getSpecializations() {
		const promise = await this._api.get("/specialties", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await promise.data.data;
	}

	async getGroups() {
		const promise = await this._api.get("/groups", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await promise.data.data;
	}

	async getGroupDetail(id: number) {
		return await this._api.get(`/groups/detail/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
	}

	async createGroups(data: object) {
		const promise = await this._api.post("/groups", data, {
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await promise.data;
	}

	async importStudents(formData: object) {
		return await this._api.post('/students/import', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token.value}`
			},
		});
	}
}

export const api = new BaseApi();
