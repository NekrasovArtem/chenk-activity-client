<script setup>
import router from '@/app/router';
import { useBaseStore } from "@/app/stores/base.js";
import { onMounted, ref} from "vue";
import {getGroups, getStudents} from "@/app/api";

const { getToken } = useBaseStore();
const token = getToken();

if (!token) {
  router.push({ name: 'Auth' })
}

const groups = ref([]);
const students = ref([]);

onMounted(async () => {
  groups.value = await getGroups();
  students.value = await getStudents();
})
</script>

<template>
  <main>
    <h1>Добро пожаловать</h1>
    <h3>Группы:</h3>
    <ul>
      <li v-for="group in groups" :key="group.id">{{ group.name }}</li>
    </ul>
    <h3>Студенты:</h3>
    <ul>
      <li v-for="student in students" :key="student.id">{{ student.surname + ' ' + student.name }}</li>
    </ul>
  </main>
</template>
