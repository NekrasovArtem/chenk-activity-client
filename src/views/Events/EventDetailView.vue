<script setup lang="ts">
import type { Event } from "@/stores/events.ts";
import BaseSection from "@/components/shared/BaseSection.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {onMounted, ref } from "vue";
import { api} from "@/api/index.ts";
import { useRoute} from "vue-router";
import InputText from "@/components/inputs/InputText.vue";
import {useToastStore} from "@/stores/toast.ts";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import InputDate from "@/components/inputs/InputDate.vue";

const { errorMessage } = useToastStore();
const route = useRoute();
const eventId: number = +route.params.id;

const oldEvent = ref<Event | null>()
const event = ref<Event | null>()
const isEdit = ref<boolean>(false)

function onReset() {
	isEdit.value = false

	event.value = <Event>{ ...oldEvent.value }
}
async function onSubmit() {
	if (!event.value) {
		return;
	}

	const response = await api.editEvent(eventId, event.value);

	if (!response.success) {
		errorMessage('Ошибка');
		return;
	}

	isEdit.value = false
	oldEvent.value = { ...response.data };
	event.value = { ...response.data };
}

onMounted( async () => {
	const response = await api.getEventDetail(eventId);

	oldEvent.value = { ...response.event };
	event.value = { ...response.event };
})
</script>

<template>
	<MainLayout>
		<BaseSection>
			<div v-if="event" class="event">
				<div class="event__form form">
					<div class="form__items">
						<InputText
							v-model="event.name"
							:readonly="!isEdit"
							class="form__item form__item--full"
						/>
						<InputText
							label="Ответсвенный"
							v-model="event.responsible"
							:readonly="!isEdit"
							class="form__item"
						/>
						<DefaultSelect
							v-model="event.place"
							label="Место"
							:options="[]"
							class="form__item"
							:readonly="!isEdit"
						/>
						<InputDate
							label="Дата начала"
							v-model="event.date_start"
							class="form__item"
							:readonly="!isEdit"
						/>
						<InputDate
							label="Дата конца"
							v-model="event.date_end"
							:readonly="!isEdit"
							class="form__item"
						/>
					</div>
					<div class="form__buttons">
						<button v-if="!isEdit" @click="isEdit = true" class="btn">Редактировать</button>
						<button v-if="isEdit" @click="onReset" class="btn btn--secondary">Отмена</button>
						<button v-if="isEdit" @click="onSubmit" class="btn">Сохранить</button>
					</div>
				</div>
			</div>
		</BaseSection>
	</MainLayout>
</template>
