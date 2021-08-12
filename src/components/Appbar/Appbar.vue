<template>
	<nav class="nav">
		<!-- SECTION nav left -->
		<div v-if="viewTitle === 'Home'" class="nav_left" @click="backwardView">
			<Hamburger />
		</div>
		<div v-else class="nav_left" @click="backwardView">
			<Back />
		</div>

		<!-- SECTION nav title -->
		<div v-if="viewTitle === 'Home'" class="nav_title">User List</div>
		<div v-if="viewTitle === 'List'" class="nav_title">Chat Room</div>
		<div v-if="viewTitle === 'Room'" class="nav_title">{{ host.name }}</div>

		<!-- SECTION nav right -->
		<div v-if="viewTitle === 'Home'" class="nav_right" @click="changeThemeColor">
			<span>
				<FontAwesomeIcon :icon="['fas', 'palette']" color="#fff" />
			</span>
		</div>
		<div v-if="viewTitle === 'List'" class="nav_right">
			<span>
				<Avatar />
			</span>
		</div>
		<div v-if="viewTitle === 'Room'" class="nav_right">
			<span @click="updateClickedAction">
				<Upload />
			</span>
			<span>
				<Search />
			</span>
		</div>
	</nav>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Hamburger, Avatar, Back, Search, Upload } from '@/assets';
import { mapActions, mapState } from 'vuex';
import { RoomState, Host } from '@/views/List/typings';

interface VuexBindings {
	host: Host;
	backwardView: () => void;
	changeThemeColor: () => void;
	handleRightMenu: () => void;
	updateClickedAction: () => void;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'Appbar',

	components: {
		Hamburger,
		Avatar,
		Back,
		Search,
		Upload,
	},

	computed: {
		...mapState('roomReducer', {
			host: (state) => (state as RoomState).host,
		}),

		viewTitle() {
			return this.$route.name;
		},
	},

	data: () => ({
		isTheme: false as boolean,
	}),

	methods: {
		...mapActions('uploadReducer', ['updateClickedAction']),

		backwardView() {
			try {
				switch (this.viewTitle) {
					case 'Home':
						throw new Error('Error: Impossible to backward');
					case 'List':
						this.$router.push('/');
						break;
					case 'Room':
						this.$router.push('/list');
						break;

					default:
						break;
				}
			} catch (error) {
				console.error(error.message);
			}
		},

		changeThemeColor() {
			const root = document.querySelector(':root') as HTMLElement;
			this.isTheme = !this.isTheme;

			this.isTheme
				? root.style.setProperty('--primary', '#e1306c')
				: root.style.setProperty('--primary', '#3b5998');
		},
	},
});
</script>

<style src="./Appbar.scss" lang="scss" scoped />
