import axios from "axios";
import {useBaseStore} from "@/stores/base.js";
import {storeToRefs} from "pinia";

const { token } = storeToRefs(useBaseStore());

class BaseApi {
	 _api = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		responseType: 'json',
	})

	async registration(formData: object) {
		return await this._api.post('/registration', formData);
	}

	async authorization(formData: object) {
		return await this._api.post('/authorization', formData);
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
		const promise = await this._api.get(`/groups/${id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});
		return await promise.data;
	}

	async createGroups(data: object) {
		const promise = await this._api.post("/groups", data,{
			headers: {
				Authorization: `Bearer ${token.value}`
			},
		});
		return await promise.data;
	}

	async getStudentsByGroup(groupId: number) {
		const promise = await this._api.get(`/students/group/${groupId}`, {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
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
