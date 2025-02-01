<script setup>
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {api} from "@/app/api/index.js";
import BaseSection from "@/app/components/shared/BaseSection.vue";
import {useModalsStore} from "@/app/stores/modals.js";
import ImportStudentsModal from "@/app/components/modals/ImportStudentsModal.vue";
import CreateGroupModal from "@/app/components/modals/CreateGroupModal.vue";

const { openModal } = useModalsStore();

let groups = ref(null)

onMounted(async () => {
	groups.value = await api.getGroups();

	// console.log(groups.value);
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection>
			<div class="groups__actions">
				<button class="btn" @click="openModal('import-students-modal')">Импорт</button>
				<button class="btn" @click="openModal('create-group-modal')">Создать группу</button>
			</div>

			<div v-for="group in groups"  :key="group.id" class="groups-item">
				<div class="groups-item__id">{{ group.id }}</div>
				<div class="groups-item__name">{{ group.name }}</div>
				<div class="groups-item__specialty">{{ group.specialty }}</div>
				<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: group.id } }"/>
			</div>

		</BaseSection>
	</MainLayout>

	<CreateGroupModal />
	<ImportStudentsModal />
</template>
