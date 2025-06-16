<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import {computed, ref} from "vue";
import IconSVG from "@/components/shared/IconSVG.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";

const emit = defineEmits(['onSubmit']);

const today = new Date();
const currentYear = today.getFullYear();

const selectedYear = ref<number>(currentYear - 1)
const years = computed(() => {
	const startYear = 2010;
	const years = [];

	for (let i = 0; i < currentYear - startYear; i++) {
		const fromYear = startYear + i;
		const toYear = fromYear + 1;
		const schoolYear = `${fromYear}/${toYear}`;
		years.push({
			label: schoolYear,
			value: fromYear,
		});
	}

	return years;
})
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="events-export-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Экспорт мероприятий</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="form">
							<div class="form__items">
								<DefaultSelect
									class="form__item form__item--full"
									label="Учбеный год"
									placeholder="Выберите учебный год"
									v-model="selectedYear"
									:options="years"
								/>
							</div>
							<div class="form__bottom">
								<button class="btn" @click="emit('onSubmit', selectedYear)">Экспорт</button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
