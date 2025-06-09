<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import { api } from "@/api";
import { storeToRefs } from "pinia";
import { useBaseStore } from "@/stores/base.ts";
import { useToastStore } from "@/stores/toast.ts";
import { useModalsStore } from "@/stores/modals.ts";
import router from "@/router";
import IconSVG from "@/components/shared/IconSVG.vue";

const { token, userData } = storeToRefs(useBaseStore());
const { infoMessage, warningMessage } = useToastStore();
const { closeModal } = useModalsStore();

async function onSubmit() {
	const response = await api.resetPassword();

	if (response.success) {
		token.value = null;
		userData.value = null;
		infoMessage('Пароль сброшен, ожидайте новый пароль на почте');
		closeModal('password-modal');
		await router.push({ name: "Auth" });
	} else {
		warningMessage('Ошибка');
	}
}

</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="password-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Сбросить пароль</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="modal__content">
							<span>Вы уверены, что хотите сбросить пароль?</span>
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
