<script setup lang="ts">
import {computed, onMounted, ref, useTemplateRef} from "vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {type Student, useGroupsStore} from "@/stores/groups.ts";
import {storeToRefs} from "pinia";
import {api} from "@/api";
import InputText from "@/components/inputs/InputText.vue";
import {useModalsStore} from "@/stores/modals.ts";
import {useToastStore} from "@/stores/toast.ts";
import {onClickOutside} from "@vueuse/core";
import IconSVG from "@/components/shared/IconSVG.vue";

interface Props {
	event_id: number;
	participants: Student[]
}

const props = defineProps<Props>();
const emit = defineEmits(['onSubmit', 'onCancel']);

const { closeModal } = useModalsStore();
const { successMessage, errorMessage } = useToastStore();
const { groups } = storeToRefs(useGroupsStore());

const search = ref('');
const isFocus = ref(false);
const dropdown = useTemplateRef('participantsDropdown');

const participantsList = ref<Student[]>([ ...props.participants ]);
const participantsIds = ref<number[]>(props.participants.map(obj => obj.id));

const currentGroup = ref<number>(groups.value[1].id);
const students = ref<Student[]>([]);

const filteredStudents = computed(() => {
	return students.value.filter((student: Student) => {
		const fullName = `${student.surname} ${student.name} ${student.patronymic}`;
		return fullName.toLowerCase().includes(search.value.toLowerCase());
	});
})

function participantAdd(student: Student) {
	isFocus.value = false;
	search.value = '';

	if (participantsIds.value.includes(student.id))
		return;

	participantsIds.value.push(student.id);
	participantsList.value.push(student);
}

function participantDelete(id: number) {
	const index = participantsList.value.findIndex(participant => participant.id === id);

	if (index >= 0 && index < participantsIds.value.length) {
		participantsIds.value.splice(index, 1);
		participantsList.value.splice(index, 1);
	}
}

async function changeGroup() {
	if (!currentGroup.value) {
		students.value = [];
		return;
	}

	const response = await api.getStudentsByGroup(currentGroup.value);

	students.value = response.data;
}

async function onSubmit() {
	const response = await api.editEvent(props.event_id, {
		participants: participantsIds.value
	});

	if (!response.success) {
		errorMessage('Ошибка');
		return;
	}

	emit('onSubmit')
	closeModal('participants-modal');
	successMessage('Участники обновлены');
}

onClickOutside(dropdown, () => isFocus.value = false);

onMounted(async () => {
	await changeGroup();
})
</script>

<template>
	<form class="form" @submit.prevent="onSubmit">
		<div class="form__items">
			<DefaultSelect
				label="Группа"
				v-model="currentGroup"
				:options="groups"
				value-prop="id"
				label-prop="name"
				searchable
				class="form__item form__item--full"
				@change="changeGroup"
			/>
			<div class="participants-select form__item form__item--full">
				<InputText
					v-model="search"
					label="Участники"
					placeholder="Введите имя студента"
					@focusin="isFocus = true"
					@click="isFocus = true"
				/>

				<div v-if="isFocus" ref="participantsDropdown" class="participants-select__dropdown">
					<div class="participants-select__list">
						<div v-for="student in filteredStudents" :key="student.id" class="participants-select__item" @click="participantAdd(student)">
							{{ student.surname }} {{ student.name }} {{ student.patronymic }}
						</div>
						<span v-if="!filteredStudents.length">
							Студенты не найдены
						</span>
					</div>
				</div>
			</div>
			<div class="participants-list form__item form__item--full">
				<div v-for="participant in participantsList" :key="participant.id" class="participants-list__item" @click="participantDelete(participant.id)">
					<span class="participants-list__item-title">{{ participant.surname }} {{ participant.name }}</span>
					<IconSVG class="participants-list__item-delete" name="close" />
				</div>
			</div>
		</div>
		<div class="form__buttons">
			<button @click="emit('onCancel')" type="button" class="btn btn--secondary">
				<span class="btn__text">Отмена</span>
			</button>
			<button type="submit" class="btn">
				<span class="btn__text">Сохранить</span>
			</button>
		</div>
	</form>
</template>
