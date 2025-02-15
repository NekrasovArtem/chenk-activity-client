<script setup lang="ts">
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {api} from "@/api/index.ts";
import {useRoute} from "vue-router";
import BaseSection from "@/components/shared/BaseSection.vue";

interface Group {
	name: string;
	students: {
		id: number;
		name: string;
		surname: string;
		patronymic: string;
		initials: string;
	}[];
}

const route = useRoute()
const groupId: number = +route.params.id

const group = ref<Group | null>(null)

onMounted(async () => {
	group.value = await api.getStudentsByGroup(groupId);
})
</script>

<template>
	<MainLayout :title="group?.name">
		<BaseSection :title="`Студенты группы ${group?.name}`" class="students">
			<template #default>
				<div class="students__list">
					<div class="students-item" v-for="student in group?.students" :key="student.id">
						<div class="students-item__surname">{{ student.surname }}</div>
						<div class="students-item__name">{{ student.name }}</div>
						<div class="students-item__patronymic">{{ student.patronymic }}</div>
					</div>
				</div>
			</template>
		</BaseSection>
	</MainLayout>
</template>
