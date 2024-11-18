<script setup>
function logout() {
  console.log("Logout success");
}
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <a class="header__logo" href="/">
        <img class="header__logo-image" src="" alt="alt" />
      </a>
      <nav class="header__menu">
        <a href="#" @click="logout">Выйти</a>
      </nav>
    </div>
  </header>
</template>
