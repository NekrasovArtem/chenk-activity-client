import axios from "axios";
import {useBaseStore} from "@/app/stores/base.js";

const {getToken} = useBaseStore()

const api = axios.create({
	baseURL: 'http://pgfrmrb-m1.wsr.ru/api',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${getToken()}`
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
	const promise = await api.get("/events");
	const response = await promise.data;
	return await response.data;
}

async function getEventDetail(id) {
	const promise = await api.get(`/events/${id}`);
	return await promise.data;
}

async function exportEvents() {
	api.defaults.responseType = "blob"
	const promise = await api.post("/events/export");
	api.defaults.responseType = "json"
	return await promise.data;
}

async function getGroups() {
	const promise = await api.get("/groups");
	const response = await promise.data;
	return await response.data;
}

async function getGroupDetail(id) {
	const promise = await api.get(`/groups/${id}`);
	return await promise.data;
}

async function getStudents() {
	const promise = await api.get("/students");
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
