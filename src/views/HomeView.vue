<script setup>
import router from '@/app/router';

let token = localStorage.getItem('token')

if (token == null) {
  router.push({ name: 'Auth' })
}
</script>

<template>
  <main>
    <h1>Добро пожаловать</h1>
  </main>
</template>
