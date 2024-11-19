<script setup>
import InputText from "@/app/components/inputs/InputText.vue";
import InputPassword from "@/app/components/inputs/InputPassword.vue";
import {reactive} from "vue";
import router from "@/app/router/index.js";
import {useBaseStore} from "@/app/stores/base.js";
import axios from "axios";

const { setToken } = useBaseStore()

const formData = reactive({
  email: '',
  password: '',
})

async function onSubmit() {
  const promise = await axios.post('/authorization', {
    body: formData
  })

  const response = await promise.json();

  if (response.success) {
    setToken(response.token);
    await router.push({name: "Auth"});
  }
}
</script>

<template>
  <div class="form" @submit.prevent="onSubmit">
    <h1 class="form__title">Авторизация</h1>
    <div class="form__items">
      <div class="form__item form__item--full">
        <InputText
          label="email"
          placeholder="email"
          v-model="formData.email"
        />
      </div>
      <div class="form__item form__item--full">
        <div class="default-input">
          <InputPassword
            label="password"
            placeholder="password"
            v-model="formData.password"
          />
        </div>
      </div>
    </div>
    <div class="form__bottom">
      <button type="submit" class="btn" @click="onSubmit">
        <span class="btn__text">Войти</span>
      </button>
      <router-link :to="{ name: 'Register' }" class="link">Зарегистрироваться</router-link>
    </div>
  </div>
</template>
