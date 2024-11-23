<script setup>
function logout() {
	console.log("Logout success");
}
</script>

<template>
	<header class="header">
		<div class="header__wrapper">
			<a class="header__logo" href="/">
				<img class="header__logo-image" src="/img/logo.png" alt="alt"/>
			</a>
			<nav class="header__nav">
				<a class="link header__nav-item " href="#" @click="logout">Выйти</a>
			</nav>
		</div>
	</header>
</template>
