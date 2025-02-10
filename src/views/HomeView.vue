<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
</script>

<template>
	<MainLayout :title="'Главная'">
		<BaseSection :title="'Предстоящие мероприяти'"></BaseSection>
		<BaseSection :title="'Последние мероприятия'"></BaseSection>
	</MainLayout>
</template>
