<script setup>
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getEventDetail} from "@/app/api/index.js";
import {useRoute} from "vue-router";
import BaseSection from "@/app/components/shared/BaseSection.vue";

const route = useRoute()
const eventId = route.params.id

let event = ref(null)

onMounted(async () => {
	event.value = await getEventDetail(eventId);
})
</script>

<template>
	<MainLayout :title="event?.name">
		<BaseSection>
			<div class="event">
				{{ event }}
			</div>
		</BaseSection>
	</MainLayout>
</template>
