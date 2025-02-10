<script setup lang="ts">
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import {useModalsStore} from "@/stores/modals.js";
import ImportStudentsModal from "@/components/modals/ImportStudentsModal.vue";
import CreateGroupModal from "@/components/modals/CreateGroupModal.vue";
import {useGroupsStore} from "@/stores/groups.js";

const { getGroups, setGroups } = useGroupsStore();
const { openModal } = useModalsStore();


const groups = ref(null)

async function updateGroups() {
	await setGroups();
	groups.value = getGroups();
}

onMounted( () => {
	updateGroups();
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection :title="'Список групп'" class="groups">
			<template #actions>
				<button class="btn" @click="openModal('import-students-modal')">Импорт</button>
				<button class="btn" @click="openModal('create-group-modal')">Создать группу</button>
			</template>

			<template #default>
				<div class="groups__list">
					<div v-for="group in groups"  :key="group.id" class="groups-item">
						<div class="groups-item__id">{{ group.id }}</div>
						<div class="groups-item__name">{{ group.name }}</div>
						<div class="groups-item__specialty">{{ group.specialty }}</div>
						<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: group.id } }"/>
					</div>
				</div>
			</template>
		</BaseSection>
	</MainLayout>

	<CreateGroupModal @update-groups="updateGroups" />
	<ImportStudentsModal />
</template>
