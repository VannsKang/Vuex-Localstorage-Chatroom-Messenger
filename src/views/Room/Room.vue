<template>
	<div>
		<Upload v-if="isUploadClicked" />
		<Chat />
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapState, mapActions } from 'vuex';
import { Chat, Upload } from '@/components';
import { UploadState } from '@/views/Room/typings';

interface VuexBindings {
	resetClickedAction: () => void;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'Room',

	components: { Chat, Upload },

	computed: {
		...mapState('uploadReducer', {
			isUploadClicked: (state) => (state as UploadState).isClicked,
		}),
	},

	mounted() {
		this.resetClickedAction();
	},

	methods: {
		...mapActions('uploadReducer', ['resetClickedAction']),
	},
});
</script>

<style src="@/styles/container.scss" lang="scss" scoped />
