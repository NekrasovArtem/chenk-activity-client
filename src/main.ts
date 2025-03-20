import '@/styles/_index.sass'
import 'vue-toastification/dist/index.css';
import '@vueform/multiselect/themes/default.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, {POSITION} from "vue-toastification";
const toastConfig = {
	position: POSITION.BOTTOM_LEFT,
}

import App from './App.vue'
import router from './router'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia)
app.use(router)
app.use(Toast, toastConfig)

app.mount('#app')
