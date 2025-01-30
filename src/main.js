import '@/styles/_index.sass'
import 'vue-toastification/dist/index.css';
import '@vueform/multiselect/themes/default.css'

import {createApp} from 'vue'
import { createPinia } from 'pinia'
import Toast, {POSITION} from "vue-toastification";

import App from '@/app/App.vue'
import router from '@/app/router'

const app = createApp(App)

const toastConfig = {
	position: POSITION.BOTTOM_LEFT,
}

app.use(createPinia())
app.use(router)
app.use(Toast, toastConfig)

app.mount('#app')
