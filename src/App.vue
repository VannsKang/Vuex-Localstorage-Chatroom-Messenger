<template>
	<div id="app">
		<div class="_">
			<section class="container">
				<Notibar />
				<Appbar />
				<router-view />
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Notibar, Appbar } from '@/components';

export default Vue.extend({
	name: 'App',

	components: {
		Notibar,
		Appbar,
	},

	created() {
		this.initConsole();
	},

	methods: {
		initConsole(): void {
			const consoleStyle = `
				font-family: -apple-system, sans-serif;
				font-size: 2.5em; 
				font-weight: 300;
				border-radius: 5px;
				padding: 15px;
				background: #1D222B;
				color: #fff;
				text-shadow:
						0 0 7px #bc13fe,
						0 0 10px #B4F8C8,
						0 0 21px #A0E7E5
			`;

			console.info('%c  🍩  Github.com/VannsKang  ', consoleStyle);
		},
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

._ {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	@include flexSet('center', 'center');
}

section.container {
	width: 23.438rem;
	height: 41.688rem;
	background-color: $white;
	border: 1px solid $cool-grey;
}
</style>
