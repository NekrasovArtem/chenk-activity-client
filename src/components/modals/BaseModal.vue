<script setup lang="ts">
import { computed } from "vue";
import { useModalsStore } from "@/stores/modals.js";

const { isModalOpened, closeModal } = useModalsStore();

interface Props {
	id: string;
}

const props = defineProps<Props>()

const showModal = computed(() => isModalOpened(props.id));

function close() {
	closeModal(props.id);
}
</script>

<template>
	<teleport to="#modals-container" defer>
		<Transition name="slide-fade">
			<div v-if="showModal" class="modal-window" @keydown.esc="close" @mousedown.self="close" :id="id" :class="{opened: showModal}">
				<slot name="default" :close="close" />
			</div>
		</Transition>
	</teleport>
</template>

<style lang="sass">
.modal-window
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100vh
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	background-color: rgba(#000000, 0.3)
	z-index: 10
	overflow-y: auto
</style>
