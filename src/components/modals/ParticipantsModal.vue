<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import IconSVG from "@/components/shared/IconSVG.vue";
import ParticipantsForm from "@/components/forms/ParticipantsForm.vue";
import type {Student} from "@/stores/groups.ts";

interface Props {
	event_id: number;
	participants: Student[];
}

defineProps<Props>();
const emit = defineEmits(['onSubmit']);
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="participants-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Добавление участников</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<ParticipantsForm :event_id :participants @on-submit="emit('onSubmit')" />
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
