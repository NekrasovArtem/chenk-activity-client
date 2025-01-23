<script setup>
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getGroups} from "@/app/api/index.js";
import BaseSection from "@/app/components/shared/BaseSection.vue";
import {useModalsStore} from "@/app/stores/modals.js";
import ImportStudentsModal from "@/app/components/modals/ImportStudentsModal.vue";

const { openModal } = useModalsStore();

let groups = ref(null)

onMounted(async () => {
	groups.value = await getGroups();
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection>
			<div class="groups__actions">
				<button class="btn" @click="openModal('import-students-modal')">Импорт</button>
			</div>

			<template v-if="groups?.value?.status === 200">
				<div v-for="group in groups"  :key="group.id" class="groups-item">
					<div class="groups-item__id">{{ group.id }}</div>
					<div class="groups-item__name">{{ group.name }}</div>
					<div class="groups-item__specialty">{{ group.specialty.name }}</div>
					<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: group.id } }"/>
				</div>
			</template>

			<span>Группы не найдены</span>
		</BaseSection>
	</MainLayout>
	<ImportStudentsModal />
</template>
