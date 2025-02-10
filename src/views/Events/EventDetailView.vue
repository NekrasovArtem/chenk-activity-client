<script setup lang="ts">
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {api} from "@/api/index.ts";
import {useRoute} from "vue-router";
import BaseSection from "@/components/shared/BaseSection.vue";

const route = useRoute()
const eventId = route.params.id

const event = ref(null)

onMounted(async () => {
	event.value = await api.getEventDetail(eventId);
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
