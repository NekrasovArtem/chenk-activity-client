import axios from "axios";
import {useBaseStore} from "@/app/stores/base.js";

const { getToken } = useBaseStore()

const api = axios.create({
  baseURL: 'http://pgfrmrb-m1.wsr.ru/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  },
})

async function getGroups() {
  const promise = await api.get("/groups");
  const response = await promise.data;
  return await response.data;
}

async function getStudents() {
  const promise = await api.get("/students");
  const response = await promise.data;
  return await response.data;
}

export {
  getGroups,
  getStudents,
};
