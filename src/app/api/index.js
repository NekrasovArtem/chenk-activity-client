import axios from "axios";
import {useBaseStore} from "@/app/stores/base.js";

const {getToken} = useBaseStore()

const api = axios.create({
	baseURL: 'http://pgfrmrb-m1.wsr.ru/api',
	// baseURL: 'https://chenk-accounting/api',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${getToken()}`
	},

})

async function registration(formData) {
	return await api.post('/registration', formData);
}

async function authorization(formData) {
	return await api.post('/authorization', formData);
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
	getGroups,
	getGroupDetail,
	getStudents,
};
