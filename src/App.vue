<script setup lang="ts">
import { RouterView } from 'vue-router'
import {storeToRefs} from "pinia";
import {useBaseStore} from "@/stores/base.ts";
import MobileMenu from "@/components/shared/MobileMenu.vue";
import MainHeader from "@/components/shared/MainHeader.vue";
import AuthHeader from "@/components/shared/AuthHeader.vue";

const { userData } = storeToRefs(useBaseStore());
</script>

<template>
	<AuthHeader v-if="!userData" />
	<MainHeader v-else />

	<MobileMenu v-if="userData" />

	<RouterView />
	<div id="modals-container"></div>
</template>
