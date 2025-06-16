<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import ImportStudentsModal from "@/components/modals/ImportStudentsModal.vue";
import CreateGroupModal from "@/components/modals/CreateGroupModal.vue";
import {onMounted, ref} from "vue";
import { useModalsStore } from "@/stores/modals.js";
import { useGroupsStore } from "@/stores/groups.js";
import { storeToRefs } from "pinia";
import BasePagination from "@/components/shared/BasePagination.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import GroupItem from "@/views/Groups/GroupItem.vue";
import InputText from "@/components/inputs/InputText.vue";

const { groups, pages } = storeToRefs(useGroupsStore());
const { requestGroups } = useGroupsStore();
const { openModal } = useModalsStore();
const route = useRoute()

const search = ref<string>('');

async function updateGroups() {
	await requestGroups(+route.params.page);
}

function onChangePage(page: number) {
	requestGroups(page, search.value);
	router.push({ name: 'GroupsPagination', params: { page } });
}

function onSearch() {
	requestGroups(1, search.value);
}

onMounted( async () => {
	await requestGroups(+route.params.page || 1);
})
</script>

<template>
	<MainLayout :title="'Группы'">
		<BaseSection :title="'Список групп'" class="groups">
			<template #actions>
				<form @submit.prevent="onSearch" class="events__search">
					<InputText
						v-model="search"
						placeholder="Поиск по названию"
					/>
					<button class="btn">Поиск</button>
				</form>
				<button class="btn" @click="openModal('import-students-modal')">Импорт студентов</button>
				<button class="btn" @click="openModal('create-group-modal')">Создать группу</button>
			</template>

			<div v-if="groups.length" class="groups__list">
				<GroupItem v-for="group in groups"  :key="group.id" :item="group" />
			</div>

			<div v-else class="groups__list">
				<span>Группы не найдены</span>
			</div>

			<BasePagination
				v-if="pages > 1"
				:current-page="+route.params.page || 1"
				:pages
				@on-change="onChangePage"
			/>
		</BaseSection>
	</MainLayout>

	<teleport to="#modals-container">
		<CreateGroupModal @update-groups="updateGroups" />
		<ImportStudentsModal />
	</teleport>
</template>
