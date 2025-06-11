<script setup lang="ts">
import router from "@/router";
import {useEventsStore} from "@/stores/events.ts";

interface Props {
	currentPage: number;
	pages: number;
}

defineProps<Props>();

const { requestEvents } = useEventsStore();

function openPage(page: number) {
	router.push({ name: 'EventsPagination', params: { page } });
	requestEvents(page);
}
</script>

<template>
	<div class="pagination">
		<div class="pagination__list">
			<div v-for="page in pages" :key="page" class="pagination__item" :class="{ 'is-active': currentPage === page }" @click="openPage(page)">
				{{ page }}
			</div>
		</div>
	</div>
</template>
