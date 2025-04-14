<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import EventCreateForm from "@/components/forms/EventCreateForm.vue";
import IconSVG from "@/components/shared/IconSVG.vue";
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="new-event-modal">
			<template #default="{ close }">
				<div class="modal modal--wide">
					<div class="modal__head">
						<h2 class="modal__title">Создать мероприятие</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<EventCreateForm />
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
