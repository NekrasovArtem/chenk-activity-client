import axios from "axios";
import {useBaseStore} from "@/app/stores/base.js";

const {getToken} = useBaseStore()

// const api = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Accept': 'application/json',
// 	},
// 	responseType: 'json',
// })

class BaseApi {
	 _api = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		responseType: 'json',
	})

	async registration(formData) {
		return await this._api.post('/registration', formData);
	}

	async authorization(formData) {
		return await this._api.post('/authorization', formData);
	}

	async getEvents() {
		const promise = await this._api.get("/events", {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		const response = await promise.data;
		return await response.data;
	}

	async getEventDetail(id) {
		const promise = await this._api.get(`/events/${id}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		return await promise.data;
	}

	async exportEvents() {
		const promise = await this._api.post("/events/export", {
			headers: {
				Authorization: `Bearer ${getToken()}`
			},
			responseType: "blob"
		});
		return await promise.data;
	}

	async getSpecializations() {
		const promise = await this._api.get("/specialties", {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		return await promise.data.data;
	}

	async getGroups() {
		const promise = await this._api.get("/groups", {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		return await promise.data.data;
	}

	async getGroupDetail(id) {
		const promise = await this._api.get(`/groups/${id}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		return await promise.data;
	}

	async createGroups(data) {
		const promise = await this._api.post("/groups", data,{
			headers: {
				Authorization: `Bearer ${getToken()}`
			},
		});
		return await promise.data;
	}

	async getStudentsByGroup(groupId) {
		const promise = await this._api.get(`/students/group/${groupId}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		});
		return await promise.data;
	}

	async importStudents(formData) {
		return await this._api.post('/students/import', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${getToken()}`
			},
		});
	}
}

export const api = new BaseApi();
