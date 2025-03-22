<script setup lang="ts">
import { useBaseStore } from "@/stores/base.js";
import { storeToRefs } from "pinia";

const { userData, isMenuActive } = storeToRefs(useBaseStore());

function openMenu() {
	isMenuActive.value = true;
}
</script>

<template>
	<header class="header">
		<div class="header__wrapper">
			<router-link :to="{ name: 'Home' }" class="header__logo">
				<img class="header__logo-image" src="/img/logo.png" alt="alt"/>
			</router-link>
			<nav class="header__nav">
				<router-link :to="{ name: 'Home' }" class="link header__nav-item">Главная</router-link>
				<router-link :to="{ name: 'Events' }" class="link header__nav-item">Мероприятия</router-link>
				<router-link :to="{ name: 'Groups' }" class="link header__nav-item">Группы</router-link>
				<router-link :to="{ name: 'About' }" class="link header__nav-item">О системе</router-link>
			</nav>
			<router-link :to="{ name: 'Profile' }" class="link header__user">
				<img class="header__user-img" src="/img/profile.webp" alt="alt" />
				<span class="header__user-name">{{ userData?.surname }} {{ userData?.name }}</span>
			</router-link>
			<div class="header__menu" @click="openMenu">
				<span class="header__menu-item"></span>
				<span class="header__menu-item"></span>
				<span class="header__menu-item"></span>
			</div>
		</div>
	</header>
</template>
