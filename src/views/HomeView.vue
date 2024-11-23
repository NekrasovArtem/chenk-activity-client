<script setup>
import router from '@/app/router';
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";

const {getToken} = useBaseStore();
const token = getToken();

onMounted(async () => {
	if (!token) {
		await router.push({name: 'Auth'})
		return false;
	}
})
</script>

<template>
	<MainLayout>
		<section class="section">
			<h2>Мероприятия</h2>
		</section>
	</MainLayout>
</template>
