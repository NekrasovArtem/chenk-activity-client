<script setup>
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getGroupDetail} from "@/app/api/index.js";
import {useRoute} from "vue-router";
import BaseSection from "@/app/components/shared/BaseSection.vue";

const route = useRoute()
const groupId = route.params.id

let group = ref(null)

onMounted(async () => {
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
