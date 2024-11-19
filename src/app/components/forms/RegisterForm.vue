<script setup>
import { useBaseStore } from "@/app/stores/base";
import InputText from "@/app/components/inputs/InputText.vue";
import InputPassword from "@/app/components/inputs/InputPassword.vue";
import { reactive } from "vue";
import router from "@/app/router/index.js";

const { setToken } = useBaseStore();

const formData = reactive({
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
});

async function onSubmit() {
  const promise = await fetch(`http://pgfrmrb-m1.wsr.ru/api/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const response = await promise.json();

  if (response.success) {
    setToken(response.token);
    await router.push({name: "Auth"});
  }
}
</script>

<template>
  <form action="/" class="form" @submit.prevent="onSubmit">
    <h1 class="form__title">Регистрация</h1>
    <div class="form__items">
      <div class="form__item">
        <InputText
          label="Имя"
          placeholder="Имя"
          v-model="formData.name"
          required
        />
      </div>
      <div class="form__item">
        <InputText
          label="Фамилия"
          placeholder="Фамилия"
          v-model="formData.surname"
          required
        />
      </div>
      <div class="form__item form__item--full">
        <InputText
          label="Отчество"
          placeholder="Отчество"
          v-model="formData.patronymic"
        />
      </div>
      <div class="form__item">
        <InputText
          label="Телефон"
          placeholder="+7"
          v-model="formData.phone"
          required
        />
      </div>
      <div class="form__item">
        <InputText
          label="E-mail"
          placeholder="E-mail"
          v-model="formData.email"
          required
        />
      </div>
      <div class="form__item form__item--full">
        <div class="default-input">
          <InputPassword
            label="Пароль"
            placeholder="Пароль"
            v-model="formData.password"
            required
          />
        </div>
      </div>
      <div class="form__item form__item--full">
        <div class="default-input">
          <InputPassword
            label="Пароль"
            placeholder="Пароль"
            v-model="formData.passwordRepeat"
            required
          />
        </div>
      </div>
    </div>
    <div class="form__bottom">
      <button class="btn">
        <span class="btn__text">Зарегистрироваться</span>
      </button>
      <router-link :to="{ name: 'Auth' }" class="link">Войти</router-link>
    </div>
  </form>
</template>
