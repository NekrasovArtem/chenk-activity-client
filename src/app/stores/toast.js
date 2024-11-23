import {useToast} from "vue-toastification";
import {defineStore} from "pinia";


export const useToastStore = defineStore("toast", () => {
	const toast = useToast();

	function successMessage(message) {
		toast.success(message);
	}

	function errorMessage(message) {
		toast.error(message);
	}

	function infoMessage(message) {
		toast.info(message);
	}

	function warningMessage(message) {
		toast.warning(message);
	}

	return {
		successMessage,
		errorMessage,
		infoMessage,
		warningMessage,
	}
})
