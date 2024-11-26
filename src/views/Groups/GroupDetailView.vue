<script setup>
import router from '@/app/router/index.js';
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getGroupDetail} from "@/app/api/index.js";
import {useRoute} from "vue-router";
import BaseSection from "@/app/components/shared/BaseSection.vue";


const {getToken} = useBaseStore();
const token = getToken();

const route = useRoute()
const groupId = route.params.id

let group = ref(null)

onMounted(async () => {
	if (!token) {
		await router.push({name: 'Auth'})
		return false;
	}

	group.value = await getGroupDetail(groupId);
})
</script>

<template>
	<MainLayout :title="group?.name">
		<BaseSection>
			студенты
			<ul>
				<li v-for="student in group?.students" :key="student.id">{{ student.initials }}</li>
			</ul>
		</BaseSection>
	</MainLayout>
</template>
