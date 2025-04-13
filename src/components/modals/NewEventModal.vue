<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import InputText from "@/components/inputs/InputText.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputArea from "@/components/inputs/InputArea.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {computed, reactive} from "vue";
import {storeToRefs} from "pinia";
import {type Direction, type Module, useEventsStore} from "@/stores/events.ts";

const { levels, corpuses, directions, modules } = storeToRefs(useEventsStore());
const { BASE_URL } = import.meta.env;

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
const filteredDirections = computed(() => {
	return directions.value?.map((direction) => {
		return {
			value: direction.id,
			label: direction.name,
		}
	})
})
const filteredModules = computed(() => {
	return modules.value?.map((module) => {
		return {
			value: module.id,
			label: module.name,
		}
	})
})

interface EventForm {
	title: string;
	dateStart: string | null;
	dateEnd: string | null;
	description: string;
	level: number | null;
	corpus: number | null;
	responsible: string;
	directions: number[];
	modules: number[];
}

const formData = reactive<EventForm>({
	title: '',
	dateStart: null,
	dateEnd: null,
	description: '',
	level: null,
	corpus: null,
	responsible: '',
	directions: [],
	modules: [],
});

const selectedDirections = computed(() => {
	return directions.value?.filter((direction: Direction) => formData.directions.includes(direction.id)) || [];
})
const selectedModules = computed(() => {
	return modules.value?.filter((module: Module) => formData.modules.includes(module.id)) || [];
})

function deleteDirection(id: number) {
	const index = formData.directions.indexOf(id);
	formData.directions.splice(index, 1);
}
function deleteModule(id: number) {
	const index = formData.modules.indexOf(id);
	formData.modules.splice(index, 1);
}
function onSubmit() {

}
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
						<form @submit.prevent="onSubmit" class="form">
							<div class="form__items">
								<InputText
									label="Название"
									placeholder="Введите название"
									v-model="formData.title"
									required
									classes="form__item form__item--full"
								/>
							</div>
							<div class="form__items">
								<InputDate
									label="Дата начала"
									v-model="formData.dateStart"
									required
									classes="form__item"
								/>
								<InputDate
									label="Дата конца"
									v-model="formData.dateEnd"
									required
									classes="form__item"
								/>
							</div>
							<div class="form__items">
								<InputArea
									label="Описание"
									v-model="formData.description"
									classes="form__item form__item--full"
								/>
							</div>
							<div class="form__items">
								<DefaultSelect
									v-model="formData.corpus"
									label="Корпус"
									:options="filteredCorpuses"
									classes="form__item"
								/>
								<DefaultSelect
									v-model="formData.level"
									label="Уровень мероприятия"
									:options="filteredLevels"
									classes="form__item"
								/>
							</div>
							<div class="form__items">
								<div class="form__item">
									<DefaultSelect
										v-model="formData.directions"
										label="Нарпавления"
										mode="multiple"
										:options="filteredDirections"
									/>
									<div v-if="selectedDirections.length > 0" class="directions-list">
										<span v-for="(item, i) in selectedDirections" :key="i" class="directions-list__item">
											{{ item.name }}
											<img @click="deleteDirection(item.id)" class="directions-list__item-icon" :src="`${BASE_URL}img/close.svg`" alt="delete" />
										</span>
									</div>
								</div>
								<div class="form__item">
									<DefaultSelect
										v-model="formData.modules"
										label="Модули"
										mode="multiple"
										:options="filteredModules"
									/>
									<div v-if="selectedModules.length > 0" class="directions-list">
										<span v-for="(item, i) in selectedModules" :key="i" class="directions-list__item">
											{{ item.name }}
											<img @click="deleteModule(item.id)" class="directions-list__item-icon" :src="`${BASE_URL}img/close.svg`" alt="delete" />
										</span>
									</div>
								</div>
							</div>
							<div class="form__buttons">
								<button class="form__btn btn">
									<span class="btn__text">Создать</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
