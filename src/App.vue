<template>
	<div id="app">
		<div :class="`_ ${isBrowser ? 'back-gradient' : null}`">
			<section v-if="isBrowser" class="neon-title title">
				Vuex Localstorage Chatroom Messenger
			</section>
			<Loading v-if="isLoading" />
			<section class="container">
				<Notibar />
				<Appbar />
				<router-view />
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapState } from 'vuex';
import { Notibar, Appbar, Loading } from '@/components';
import { UserState } from './views/Home/typings';

interface LocalBindings {
	isLoading: boolean;
}

export default (Vue as VueConstructor<Vue & LocalBindings>).extend({
	name: 'App',

	components: {
		Notibar,
		Appbar,
		Loading,
	},

	computed: {
		...mapState('userReducer', {
			isLoading: (state) => (state as UserState).isLoading,
		}),

		isBrowser() {
			return screen.width > 1023;
		},
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

.back-gradient {
	background: rgb(63, 94, 251);
	background: linear-gradient(90deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
}

.title {
	position: absolute;
	font-size: 2rem;
	top: 3rem;
}

.neon-title {
	font-family: 'Vibur', cursive;
	color: #fff;
	text-shadow: 0 0 7px rgb(63, 94, 251), 0 0 10px rgb(63, 94, 251), 0 0 21px rgb(63, 94, 251),
		0 0 42px rgb(63, 94, 251);
	animation: flicker 2s infinite alternate;
}
</style>
