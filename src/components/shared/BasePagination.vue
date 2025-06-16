<script setup lang="ts">
import {ref} from "vue";

interface Props {
	currentPage: number;
	pages: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['onChange'])

const currentPage = ref(props.currentPage);

function openPage(page: number) {
	currentPage.value = page;
	emit("onChange", page);
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
