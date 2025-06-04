<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import { api } from "@/api";
import { storeToRefs } from "pinia";
import { useBaseStore } from "@/stores/base.ts";
import { useToastStore } from "@/stores/toast.ts";
import { useModalsStore } from "@/stores/modals.ts";
import router from "@/router";
import IconSVG from "@/components/shared/IconSVG.vue";

interface Props {
	eventId: number;
}

const props = defineProps<Props>();

const { successMessage, errorMessage } = useToastStore();
const { closeModal } = useModalsStore();

async function onSubmit() {
	const response = await api.deleteEvent(props.eventId);

	if (!response.success) {
		errorMessage('Ошибка');
		return;

	}

	successMessage('Мероприятие удалено');
	closeModal('event-delete-modal');
	await router.push({ name: "Events" });
}

</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="event-delete-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Удаление мероприятия</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="modal__content">
							<span>Вы уверены, что хотите удалить мероприятие?</span>
						</div>
						<div class="modal__actions">
							<button class="btn btn--secondary" @click="close">Отмена</button>
							<button class="btn" @click="onSubmit">Подтвердить</button>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>

<style lang="sass">

</style>
