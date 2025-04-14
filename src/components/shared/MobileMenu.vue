<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBaseStore } from "@/stores/base.ts";
import IconSVG from "@/components/shared/IconSVG.vue";

const { isMenuActive } = storeToRefs(useBaseStore());

function close() {
	isMenuActive.value = false;
}
</script>

<template>
	<div class="mobile-menu" :class="{ active: isMenuActive }">
		<IconSVG class="mobile-menu__close" name="close" @click="close" />
		<nav class="mobile-menu__nav">
			<router-link @click="close" :to="{ name: 'Home' }" class="mobile-menu__nav-item link">Главная</router-link>
			<router-link @click="close" :to="{ name: 'Events' }" class="mobile-menu__nav-item link">Мероприятия</router-link>
			<router-link @click="close" :to="{ name: 'Groups' }" class="mobile-menu__nav-item link">Группы</router-link>
			<router-link @click="close" :to="{ name: 'About' }" class="mobile-menu__nav-item link">О системе</router-link>
		</nav>
	</div>
</template>

<style scoped lang="sass">

</style>
