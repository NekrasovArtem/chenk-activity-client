import {useToast} from "vue-toastification";
import {defineStore} from "pinia";


export const useToastStore = defineStore("toast", {
	state: () => ({
		toast: useToast()
	}),
	actions: {
		successMessage(message: string) {
			this.toast.success(message);
		},
		errorMessage(message: string) {
			this.toast.error(message);
		},
		infoMessage(message: string) {
			this.toast.info(message);
		},
		warningMessage(message: string) {
			this.toast.warning(message);
		}
	},
})
