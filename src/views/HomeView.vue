<script setup>
import router from '@/app/router';
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/app/components/shared/BaseSection.vue";

const {getToken} = useBaseStore();
const token = getToken();

onMounted(async () => {
	if (!token) {
		await router.replace({name: 'Auth'})
		return false;
	}
})
</script>

<template>
	<MainLayout :title="'Главная'">
		<BaseSection :title="'Предстоящие мероприяти'"></BaseSection>
		<BaseSection :title="'Последние мероприятия'"></BaseSection>
	</MainLayout>
</template>
