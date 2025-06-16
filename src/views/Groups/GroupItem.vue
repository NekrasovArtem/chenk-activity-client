<script setup lang="ts">

import type {Group} from "@/stores/groups.ts";

interface Props {
	item: Group;
}

defineProps<Props>();
</script>

<template>
	<div class="groups-item">
		<div class="groups-item__head">
			<div class="groups-item__title">{{ item.name }}</div>
			<div class="groups-item__count">Студентов: {{ item.students.length }}</div>
		</div>
		<div class="groups-item__specialty">
			<div class="groups-item__specialty-code">{{ item.specialty.code }}</div>
			<div class="groups-item__specialty-name">{{ item.specialty.name }}</div>
			<div class="groups-item__specialty-qualification">{{ item.specialty.qualification }}</div>
		</div>
		<router-link class="groups-item__link" :to="{ name: 'GroupDetail', params: { id: item.id } }"/>
	</div>
</template>

<style scoped lang="sass">

</style>
