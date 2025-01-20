<script setup>
import BaseModal from "@/app/components/modals/BaseModal.vue";
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="registration-modal">
			<template #default="{ close }">
				<div class="modal__body">
					<div class="modal__header">
						<h2>Тестовая модалка</h2>
						<button @click="close">close</button>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
