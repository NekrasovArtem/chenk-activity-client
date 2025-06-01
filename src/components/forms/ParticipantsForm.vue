<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {type Student, useGroupsStore} from "@/stores/groups.ts";
import {storeToRefs} from "pinia";
import {api} from "@/api";

interface Props {
	participants: number[]
}

const props = defineProps<Props>();

const { groups } = storeToRefs(useGroupsStore());

const participants = ref<number[]>(props.participants);

const currentGroup = ref<number>(groups.value[1].id);
const students = ref<Student[]>([]);

const filteredStudent = computed(() => {
	return students.value.filter((student: Student) => !participants.value.includes(student.id));
})

function addParticipant(id: number) {
	console.log(id);
	participants.value.push(id);
}

async function onSubmit() {

}

async function changeGroup() {
	const response = await api.getStudentsByGroup(currentGroup.value);

	students.value = response.data;
}

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
				:can-clear="false"
				:can-delete="false"
				class="form__item form__item--full"
				@change="changeGroup"
			/>
			<DefaultSelect
				label="Студенты"
				:options="filteredStudent"
				value-prop="id"
				label-prop="name"
				:can-clear="false"
				:can-delete="false"
				:close-on-select="false"
				class="form__item form__item--full"
			>
				<template #option="{ option }">
					<div class="option" @click="addParticipant(option.id)">
						<div class="option__name">
							{{ option.surname }} {{ option.name }} {{ option.patronymic }}
						</div>
					</div>
				</template>
			</DefaultSelect>
		</div>
		<div class="form__buttons">
			<button class="btn btn--secondary">
				<span class="btn__text">Отмена</span>
			</button>
			<button type="submit" class="btn">
				<span class="btn__text">Сохранить</span>
			</button>
		</div>
	</form>
</template>
