<script setup lang="ts">
import InputText from "@/components/inputs/InputText.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputArea from "@/components/inputs/InputArea.vue";
import { reactive, ref } from "vue";
import {type Event, useEventsStore} from "@/stores/events.ts";
import {api} from "@/api";
import {useToastStore} from "@/stores/toast.ts";
import {storeToRefs} from "pinia";

interface Props {
	event?: Event;
}

const { event } = defineProps<Props>();
const { levels, corpuses, directions, modules } = storeToRefs(useEventsStore());
const { errorMessage } = useToastStore();

const initialData = {
	name: event?.name,
	responsible: event?.responsible,
	place: event?.place,
	date_start: event?.date_start,
	date_end: event?.date_end,
	description: event?.description,
	level: event?.level.id,
	corpus: event?.corpus.id,
	directions: event?.directions,
	modules: event?.modules,
}
const formData = reactive({ ...initialData });
const isEdit = ref<boolean>(false)

function onReset() {
	isEdit.value = false

	Object.assign(formData, initialData);
}
async function onSubmit() {
	if (!event) {
		return;
	}

	const response = await api.editEvent(event.id, event);

	if (!response.success) {
		errorMessage('Ошибка');
		return;
	}

	isEdit.value = false
	Object.assign(initialData, formData);
}
</script>

<template>
	<div class="event__form form">
		<div class="form__items">
			<InputText
				v-model="formData.name"
				:disabled="!isEdit"
				class="form__item form__item--full"
			/>
			<InputText
				label="Ответсвенный"
				v-model="formData.responsible"
				:disabled="!isEdit"
				class="form__item"
			/>
			<DefaultSelect
				v-model="formData.place"
				label="Место"
				:options="[]"
				class="form__item"
				:disabled="!isEdit"
			/>
			<InputDate
				label="Дата начала"
				v-model="formData.date_start"
				class="form__item"
				:disabled="!isEdit"
			/>
			<InputDate
				label="Дата конца"
				v-model="formData.date_end"
				:disabled="!isEdit"
				class="form__item"
			/>
			<InputArea
				v-model="formData.description"
				label="Описание"
				class="form__item form__item--full"
				:disabled="!isEdit"
			/>
			<DefaultSelect
				v-model="formData.corpus"
				label="Корпус"
				value-prop="id"
				label-prop="name"
				:options="corpuses"
				class="form__item"
				:disabled="!isEdit"
			/>
			<DefaultSelect
				v-model="formData.level"
				label="Уровень"
				value-prop="id"
				label-prop="name"
				:options="levels"
				class="form__item"
				:disabled="!isEdit"
			/>
			<DefaultSelect
				v-model="formData.directions"
				label="Направления"
				value-prop="id"
				label-prop="name"
				:options="directions"
				class="form__item"
				:disabled="!isEdit"
			/>
			<DefaultSelect
				v-model="formData.modules"
				label="Модули"
				value-prop="id"
				label-prop="name"
				:options="modules"
				class="form__item"
				:disabled="!isEdit"
			/>
		</div>
		<div class="form__buttons">
			<button v-if="!isEdit" @click="isEdit = true" class="btn">Редактировать</button>
			<button v-if="isEdit" @click="onReset" class="btn btn--secondary">Отмена</button>
			<button v-if="isEdit" @click="onSubmit" class="btn">Сохранить</button>
		</div>
	</div>
</template>

<style scoped lang="sass">

</style>
