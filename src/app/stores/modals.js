import {defineStore} from "pinia";

export const useModalsStore = defineStore("modals", {
	state: () => ({
		openedModals: new Set()
	}),
	actions: {
		isModalOpened(modalId) {
			return this.openedModals.has(modalId);
		},
		openModal(modalId) {
			if (this.isModalOpened(modalId)) {
				return;
			}

			this.openedModals.add(modalId);
		},
		closeModal(modalId) {
			if (!this.isModalOpened(modalId)) {
				return;
			}

			this.openedModals.delete(modalId);
		}
	}
})
