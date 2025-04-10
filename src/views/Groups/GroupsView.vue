<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import ImportStudentsModal from "@/components/modals/ImportStudentsModal.vue";
import CreateGroupModal from "@/components/modals/CreateGroupModal.vue";
import { onMounted } from "vue";
import { useModalsStore } from "@/stores/modals.js";
import { useGroupsStore } from "@/stores/groups.js";
import { storeToRefs } from "pinia";

const { groups } = storeToRefs(useGroupsStore());
const { requestGroups } = useGroupsStore();
const { openModal } = useModalsStore();

async function updateGroups() {
	await requestGroups();
}

onMounted( async () => {
	await requestGroups();
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection :title="'Список групп'" class="groups">
			<template #actions>
				<button class="btn" @click="openModal('import-students-modal')">Импорт студентов</button>
				<button class="btn" @click="openModal('create-group-modal')">Создать группу</button>
			</template>

			<template #default>
				<div class="groups__list">
					<div class="groups-item">
						<div class="groups-item__id">ID</div>
						<div class="groups-item__name">Наименование</div>
						<div class="groups-item__specialty">Специальность</div>
					</div>
					<div v-for="group in groups"  :key="group.id" class="groups-item">
						<div class="groups-item__id">{{ group.id }}</div>
						<div class="groups-item__name">{{ group.name }}</div>
						<div class="groups-item__specialty">{{ group.specialty.name }} ({{ group.specialty.qualification }})</div>
						<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: group.id } }"/>
					</div>
				</div>
			</template>
		</BaseSection>
	</MainLayout>

	<teleport to="#modals-container">
		<CreateGroupModal @update-groups="updateGroups" />
		<ImportStudentsModal />
	</teleport>
</template>
