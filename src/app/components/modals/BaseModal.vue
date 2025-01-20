<script setup>
import {computed} from "vue";
import {useModalsStore} from "@/app/stores/modals.js";

const { isModalOpened, closeModal } = useModalsStore();

const props = defineProps({
	id: String,
})

const showModal = computed(() => isModalOpened(props.id));

function close() {
	closeModal(props.id);
}
</script>

<template>
	<teleport to="#modals-container">
		<Transition name="slide-fade">
			<div v-if="showModal" class="modal-window" :id="id" :class="{opened: showModal}">
				<slot name="default" :close="close" />
			</div>
		</Transition>
	</teleport>
</template>

<style lang="sass">
.modal-window
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 100vh
	display: flex
	justify-content: center
	align-items: center
	background-color: rgba(#000000, 0.3)
</style>
