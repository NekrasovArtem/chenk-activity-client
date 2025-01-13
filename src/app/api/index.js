import axios from "axios";
import {useBaseStore} from "@/app/stores/base.js";

const {getToken} = useBaseStore()

const api = axios.create({
	baseURL: 'https://chenk-activity.ru/api',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	responseType: 'json',
})

async function registration(formData) {
	return await api.post('/registration', formData);
}

async function authorization(formData) {
	return await api.post('/authorization', formData);
}

async function getEvents() {
	const promise = await api.get("/events", {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	const response = await promise.data;
	return await response.data;
}

async function getEventDetail(id) {
	const promise = await api.get(`/events/${id}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return await promise.data;
}

async function exportEvents() {
	const promise = await api.post("/events/export", {
		headers: {
			Authorization: `Bearer ${getToken()}`
		},
		responseType: "blob"
	});
	return await promise.data;
}

async function getGroups() {
	const promise = await api.get("/groups", {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	const response = await promise.data;
	return await response.data;
}

async function getGroupDetail(id) {
	const promise = await api.get(`/groups/${id}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return await promise.data;
}

async function getStudents() {
	const promise = await api.get("/students", {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	const response = await promise.data;
	return await response.data;
}

export {
	registration,
	authorization,
	getEvents,
	getEventDetail,
	exportEvents,
	getGroups,
	getGroupDetail,
	getStudents,
};
