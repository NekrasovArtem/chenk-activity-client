<script setup lang="ts">
import InputText from "@/components/inputs/InputText.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputArea from "@/components/inputs/InputArea.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {computed, reactive} from "vue";
import {storeToRefs} from "pinia";
import {type Direction, type Module, useEventsStore} from "@/stores/events.ts";
import IconSVG from "@/components/shared/IconSVG.vue";
import {api} from "@/api";
import {useToastStore} from "@/stores/toast.ts";
import {useModalsStore} from "@/stores/modals.ts";

const { levels, corpuses, directions, modules } = storeToRefs(useEventsStore());
const { requestEvents } = useEventsStore();
const { successMessage, errorMessage } = useToastStore();
const { closeModal } = useModalsStore();

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
	place: number | null;
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
	place: null,
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
async function onSubmit() {
	const response = await api.createEvent(formData);

	if (response.success) {
		successMessage('Мероприятие создано');
	} else {
		errorMessage('Ошибка');
	}

	closeModal('new-event-modal');
	await requestEvents();
}
</script>

<template>
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
			<InputText
				label="Ответсвенный"
				v-model="formData.responsible"
				required
				classes="form__item"
			/>
			<DefaultSelect
				v-model="formData.place"
				label="Место"
				:options="[
					{
						value: 1,
						label: 'Колледж',
					},
				]"
				classes="form__item"
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
						<IconSVG @click="deleteDirection(item.id)" class="directions-list__item-icon" name="close" />
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
						<IconSVG @click="deleteModule(item.id)" class="directions-list__item-icon" name="close" />
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
</template>

<style scoped lang="sass">

</style>
