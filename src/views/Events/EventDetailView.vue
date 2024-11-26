<script setup>
import router from '@/app/router/index.js';
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {getEventDetail} from "@/app/api/index.js";
import {useRoute} from "vue-router";
import BaseSection from "@/app/components/shared/BaseSection.vue";


const {getToken} = useBaseStore();
const token = getToken();

const route = useRoute()
const eventId = route.params.id

let event = ref(null)

onMounted(async () => {
	if (!token) {
		await router.push({name: 'Auth'})
		return false;
	}

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
