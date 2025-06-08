<script setup lang="ts">
import type { Group } from "@/stores/groups.ts";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/api/index.ts";

const route = useRoute()
const groupId: number = +route.params.id

const group = ref<Group | null>(null)

onMounted(async () => {
	const response = await api.getGroupDetail(groupId);

	if (response.success) {
		group.value = response.group;
	}
})
</script>

<template>
	<MainLayout back :title="`Группа ${group?.name || ''}`">
		<BaseSection title="Список студентов" class="students">
			<template #default>
				<div class="students__list" v-if="group?.students?.length">
					<div class="students-item" v-for="student in group.students" :key="student.id">
						<div class="students-item__surname">{{ student.surname }}</div>
						<div class="students-item__name">{{ student.name }}</div>
						<div class="students-item__patronymic">{{ student.patronymic }}</div>
					</div>
				</div>
				<div v-else class="students__empty">
					В этой группе не добавлены студенты
				</div>
			</template>
		</BaseSection>
	</MainLayout>
</template>
