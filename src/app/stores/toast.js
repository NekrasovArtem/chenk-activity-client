import {useToast} from "vue-toastification";
import {defineStore} from "pinia";


export const useToastStore = defineStore("toast", {
	state: () => ({
		toast: useToast()
	}),
	actions: {
		successMessage(message) {
			this.toast.success(message);
		},
		errorMessage(message) {
			this.toast.error(message);
		},
		infoMessage(message) {
			this.toast.info(message);
		},
		warningMessage(message) {
			this.toast.warning(message);
		}
	},
})
