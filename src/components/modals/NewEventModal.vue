<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import InputText from "@/components/inputs/InputText.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputArea from "@/components/inputs/InputArea.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {computed, reactive} from "vue";
import {storeToRefs} from "pinia";
import {useEventsStore} from "@/stores/events.ts";

const { levels, corpuses } = storeToRefs(useEventsStore());

const filteredLevels = computed(() => {
	return levels.value?.map((level) => {
		return {
			value: level.id,
			label: level.name,
		}
	})
})
const filteredCorpuses = computed(() => {
	return corpuses.value?.map((corpus) => {
		return {
			value: corpus.id,
			label: corpus.name,
		}
	})
})

const formData = reactive({
	title: '',
	dateStart: null,
	dateEnd: null,
	description: '',
	level: null,
	corpus: null,
	responsible: '',
});

</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="new-event-modal">
			<template #default="{ close }">
				<div class="modal modal--wide">
					<div class="modal__head">
						<h2 class="modal__title">Создать мероприятие</h2>
						<img class="modal__close" src="/img/close.svg" alt="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="form">
							<div class="form__items">
								<InputText
									label="Название"
									placeholder="Введите название"
									v-model="formData.title"
									required
									:classes="'form__item form__item--full'"
								/>
							</div>
							<div class="form__items">
								<InputDate
									label="Дата начала"
									v-model="formData.dateStart"
									required
									:classes="'form__item'"
								/>
								<InputDate
									label="Дата конца"
									v-model="formData.dateEnd"
									required
									:classes="'form__item'"
								/>
							</div>
							<div class="form__items">
								<InputArea
									label="Описание"
									v-model="formData.description"
									:classes="'form__item form__item--full'"
								/>
							</div>
							<div class="form__items">
								<DefaultSelect
									v-model="formData.corpus"
									label="Корпус"
									:options="filteredCorpuses"
								/>
								<DefaultSelect
									v-model="formData.level"
									label="Уровень мероприятия"
									:options="filteredLevels"
								/>
							</div>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
