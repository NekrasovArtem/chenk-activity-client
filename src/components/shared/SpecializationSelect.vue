<script setup lang="ts">
import Multiselect from "@vueform/multiselect";

interface Props {
	id?: string;
	title?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	classes?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	autocomplete?: string;
	searchable?: boolean;
	options?: {
		code: string;
		name: string;
		qualification: string;
	}[];
}

defineProps<Props>();

const modelValue = defineModel()
</script>

<template>
	<div class="specialization-select" :class="classes">
		<label :for="id">{{ label }}</label>

		<Multiselect
			:id
			:title
			:placeholder
			:name
			:required
			:readonly
			:disabled
			:autocomplete
			:searchable
			:options
			v-model="modelValue"
		>
			<template #option="{ option }">
				<div class="option">
					<div class="option__top">
						<div class="option__code">
							{{ option.code }}
						</div>
						<div class="option__qualification">
							{{ option.qualification }}
						</div>
					</div>
					<div class="option__name">
						{{ option.name }}
					</div>
				</div>
			</template>
		</Multiselect>
	</div>
</template>

<style lang="sass">
.specialization-select
	display: flex
	flex-direction: column
	gap: 4px

	.multiselect
		&-dropdown
			--ms-max-height: 300px

		&-option
			--ms-option-py: 20px

		.option
			width: 100%
			display: flex
			flex-direction: column
			gap: 12px

			&__top
				display: flex
				justify-content: space-between
				align-items: flex-start

			&__qualification
				font-size: 12px

			&__name
				font-size: 14px
</style>
