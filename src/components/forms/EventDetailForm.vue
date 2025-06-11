<script setup lang="ts">
import { type Event, useEventsStore } from "@/stores/events.ts";
import InputText from "@/components/inputs/InputText.vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputArea from "@/components/inputs/InputArea.vue";
import ParticipantsModal from "@/components/modals/ParticipantsModal.vue";
import EventDeleteModal from "@/components/modals/EventDeleteModal.vue";
import { reactive, ref } from "vue";
import { useToastStore } from "@/stores/toast.ts";
import { storeToRefs } from "pinia";
import { useModalsStore } from "@/stores/modals.ts";
import { useBaseStore } from "@/stores/base.ts";
import { api } from "@/api";

interface Props {
	event: Event;
}

const props = defineProps<Props>();
const event = { ...props.event };
const { userData } = storeToRefs(useBaseStore());
const { places, levels, corpuses, directions, modules } = storeToRefs(useEventsStore());
const { successMessage, errorMessage } = useToastStore();
const { openModal } = useModalsStore();

const initialData = {
	id: event.id,
	name: event.name,
	responsible: event.responsible,
	place_id: event.place.id,
	date_start: event.date_start,
	date_end: event.date_end,
	description: event.description,
	level_id: event.level.id,
	corpus_id: event.corpus.id,
	directions: event.directions.map(obj => obj.id),
	modules: event.modules.map(obj => obj.id),
	responsibles: event.responsibles.map(obj => obj.id),
	participants: event.participants.map(obj => obj.id),
}
const formData = reactive({ ...initialData });
const isEdit = ref<boolean>(false)

const participants = ref(event.participants);

function onReset() {
	isEdit.value = false

	Object.assign(formData, initialData);
}
async function onSubmit() {
	if (!event) {
		return;
	}

	const response = await api.editEvent(event.id, formData);

	if (!response.success) {
		errorMessage('Ошибка');
		return;
	}

	isEdit.value = false
	Object.assign(initialData, formData);
	successMessage('Сохранено');
}
async function onParticipantsUpdate() {
	const response = await api.getEventDetail(event.id);

	if (!response.success) {
		errorMessage('Ошибка');
		return;
	}

	isEdit.value = false
	Object.assign(event, response.event);
	Object.assign(formData, initialData);
	participants.value = response.event.participants;
}
</script>

<template>
	<div class="event__view">
		<div class="event__form form">
			<div class="form__items">
				<InputText
					label="Название"
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
					v-model="formData.place_id"
					label="Место"
					:options="places"
					value-prop="id"
					label-prop="name"
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
					v-model="formData.corpus_id"
					label="Корпус"
					value-prop="id"
					label-prop="name"
					:options="corpuses"
					class="form__item"
					:disabled="!isEdit"
				/>
				<DefaultSelect
					v-model="formData.level_id"
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
					mode="tags"
					class="form__item"
					:disabled="!isEdit"
				/>
				<DefaultSelect
					v-model="formData.modules"
					label="Модули"
					value-prop="id"
					label-prop="name"
					:options="modules"
					mode="tags"
					class="form__item"
					:disabled="!isEdit"
				/>
			</div>
			<div v-if="participants.length" class="form__items">
				<span v-for="student in participants" :key="student.id" class="form__item form__item--full">
					{{ student.surname }} {{ student.name }} {{ student.patronymic }}
				</span>
			</div>
			<div v-else class="form__items">
				<span class="form__item form__item--full">
					К данному мероприятию не прикреплены участники
				</span>
			</div>
		</div>
		<div class="event__actions">
			<button v-if="!isEdit" @click="openModal('participants-modal')" class="btn">Добавить ответственных</button>
			<button v-if="!isEdit" @click="isEdit = true" class="btn">Редактировать</button>
			<button v-if="isEdit" @click="onSubmit" class="btn">Сохранить</button>
			<button v-if="isEdit" @click="onReset" class="btn btn--secondary">Отмена</button>
			<button
				v-if="!isEdit && userData?.role === 'admin'"
				@click="openModal('event-delete-modal')"
				class="btn btn--secondary"
			>
				Удалить
			</button>
		</div>
	</div>

	<ParticipantsModal :event_id="formData.id" :participants="event.participants" @on-submit="onParticipantsUpdate" />
	<EventDeleteModal :event-id="formData.id" />
</template>
