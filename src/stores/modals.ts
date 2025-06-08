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
			this.lockBody();
		},
		closeModal(modalId: string) {
			if (!this.isModalOpened(modalId)) {
				return;
			}

			this.openedModals.delete(modalId);
			this.unlockBody();
		},
		lockBody() {
			document.body.classList.add('modal-lock');
		},
		unlockBody() {
			document.body.classList.remove('modal-lock');
		},
	}
})
