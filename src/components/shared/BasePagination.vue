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

<style scoped lang="sass">
@use '@/styles/base/mixins' as *

.pagination
	&__list
		display: flex
		align-items: center
		gap: 8px

	&__item
		width: 32px
		height: 32px
		display: flex
		align-items: center
		justify-content: center
		border-radius: 8px
		box-shadow: 0 0 5px 0 #0000001A
		transition: color .3s, background-color .3s
		cursor: pointer

		@include hover
			background-color: var(--color-neutral-200)

		&.is-active
			color: var(--color-neutral-100)
			background-color: var(--color-primary-500)
</style>
