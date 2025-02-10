import {defineStore} from "pinia";

export const useModalsStore = defineStore("modals", {
	state: () => ({
		openedModals: new Set()
	}),
	actions: {
		isModalOpened(modalId: string) {
			return this.openedModals.has(modalId);
		},
		openModal(modalId: string) {
			if (this.isModalOpened(modalId)) {
				return;
			}

			this.openedModals.add(modalId);
		},
		closeModal(modalId: string) {
			if (!this.isModalOpened(modalId)) {
				return;
			}

			this.openedModals.delete(modalId);
		}
	}
})
