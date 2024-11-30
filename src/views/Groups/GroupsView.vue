<script setup>
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getGroups} from "@/app/api/index.js";
import BaseSection from "@/app/components/shared/BaseSection.vue";

let groups = ref(null)

onMounted(async () => {
	groups.value = await getGroups();
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection>
			<div class="groups-item" v-for="group in groups" :key="group.id">
				<div class="groups-item__id">{{ group.id }}</div>
				<div class="groups-item__name">{{ group.name }}</div>
				<div class="groups-item__specialty">{{ group.specialty.name }}</div>
				<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: group.id } }" />
			</div>
		</BaseSection>
	</MainLayout>
</template>
