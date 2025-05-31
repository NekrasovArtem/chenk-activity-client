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
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const { levels, corpuses, directions, modules } = storeToRefs(useEventsStore());
const { requestEvents } = useEventsStore();
const { successMessage, errorMessage } = useToastStore();
const { closeModal } = useModalsStore();
const { withMessage } = helpers;

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

const rules = computed(() => ({
	formData: {
		title: {
			required: withMessage('Впишите название мероприятия', required)
		},
		place: {
			required: withMessage('Выберите место проведения', required)
		},
		dateStart: {
			required: withMessage('Выберите дату начала', required)
		},
		dateEnd: {
			required: withMessage('Выберите дату окончания', required)
		},
		level: {
			required: withMessage('Выберите уровень', required)
		},
		corpus: {
			required: withMessage('Выберите корпус', required)
		},
		directions: {
			required: withMessage('Выберите направления', required)
		},
		modules: {
			required: withMessage('Выберите модули', required)
		},
		responsible: {
			required: withMessage('Впишите ответственных', required)
		},
	}
}))

const v$ = useVuelidate(rules, { formData })

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
	const validation = await v$.value.formData.$validate();

	if (!validation)
		return;

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
				class="form__item form__item--full"
				:error="v$.formData.title.$errors"
			/>
		</div>
		<div class="form__items">
			<InputText
				label="Ответсвенный"
				v-model="formData.responsible"
				required
				class="form__item"
				:error="v$.formData.responsible.$errors"
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
				class="form__item"
				:error="v$.formData.place.$errors"
			/>
		</div>
		<div class="form__items">
			<InputDate
				label="Дата начала"
				v-model="formData.dateStart"
				required
				class="form__item"
				:error="v$.formData.dateStart.$errors"
			/>
			<InputDate
				label="Дата конца"
				v-model="formData.dateEnd"
				required
				class="form__item"
				:error="v$.formData.dateEnd.$errors"
			/>
		</div>
		<div class="form__items">
			<InputArea
				label="Описание"
				v-model="formData.description"
				class="form__item form__item--full"
			/>
		</div>
		<div class="form__items">
			<DefaultSelect
				v-model="formData.corpus"
				label="Корпус"
				:options="filteredCorpuses"
				class="form__item"
				:error="v$.formData.corpus.$errors"
			/>
			<DefaultSelect
				v-model="formData.level"
				label="Уровень мероприятия"
				:options="filteredLevels"
				class="form__item"
				:error="v$.formData.level.$errors"
			/>
		</div>
		<div class="form__items">
			<div class="form__item">
				<DefaultSelect
					v-model="formData.directions"
					label="Нарпавления"
					mode="tags"
					:options="filteredDirections"
					:error="v$.formData.directions.$errors"
				/>
			</div>
			<div class="form__item">
				<DefaultSelect
					v-model="formData.modules"
					label="Модули"
					mode="tags"
					:options="filteredModules"
					:error="v$.formData.modules.$errors"
				/>
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
