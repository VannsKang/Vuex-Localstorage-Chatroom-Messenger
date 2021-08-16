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
		<div v-if="viewTitle === 'Home'" class="nav_right">
			<span data-name="deleteAll" @click="homeMenuHandler">
				<FontAwesomeIcon :icon="['fas', 'trash-alt']" color="#fff" />
			</span>
			<span data-name="themeChange" @click="homeMenuHandler">
				<FontAwesomeIcon :icon="['fas', 'palette']" color="#fff" />
			</span>
		</div>
		<div v-if="viewTitle === 'List'" class="nav_right">
			<span @click="userInfoHandler">
				<Avatar />
			</span>
		</div>
		<div v-if="viewTitle === 'Room'" class="nav_right">
			<span @click="activeUploadMenuAction">
				<Upload />
			</span>
			<span @click="underConstructionHandler">
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
import { POSITION } from 'vue-toastification';
import { Logined, UserState } from '@/views/Home/typings';

interface AppbarLocalType {
	host: Host;
	logined: Logined;

	backwardView: () => void;
	homeMenuHandler: () => void;
	handleRightMenu: () => void;
	activeUploadMenuAction: () => void;
	resetAllChatsAction: () => void;
	underConstructionHandler: () => void;
}

export default (Vue as VueConstructor<Vue & AppbarLocalType>).extend({
	name: 'Appbar',

	components: {
		Hamburger,
		Avatar,
		Back,
		Search,
		Upload,
	},

	computed: {
		...mapState('userReducer', {
			logined: (state) => (state as UserState).logined,
		}),
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
		...mapActions('chatReducer', ['resetAllChatsAction']),
		...mapActions('uploadReducer', ['activeUploadMenuAction']),

		backwardView() {
			try {
				switch (this.viewTitle) {
					case 'Home':
						this.$toast.warning(' First Page: Impossible to backward 🚫 ', {
							position: POSITION.TOP_CENTER,
						});
						throw new Error(' Error: Impossible to backward 🚫 ');
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

		homeMenuHandler(e: MouseEvent | PointerEvent) {
			const selectedMenu = (e.currentTarget as HTMLDivElement).dataset.name;
			const root = document.querySelector(':root') as HTMLElement;

			switch (selectedMenu) {
				case 'deleteAll':
					this.resetAllChatsAction();

					// show noti
					this.$toast.error(' Chat History Deleted 🗑 ', {
						position: POSITION.TOP_CENTER,
					});

					console.log(
						'%c Chat History Deleted 🗑 ',
						`
						color: #e1306c;
						font-size: 1rem;
						font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
						`
					);
					break;
				case 'themeChange':
					this.isTheme = !this.isTheme;

					this.isTheme
						? root.style.setProperty('--primary', '#e1306c')
						: root.style.setProperty('--primary', '#3b5998');

					// show noti
					this.$toast.success(' Theme Changed 🎨  ', {
						position: POSITION.TOP_CENTER,
					});

					console.log(
						'%c Theme Changed 🎨 ',
						`
						color: #3b5998;
						font-size: 1rem;
						font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
						`
					);
					break;
			}
		},

		userInfoHandler() {
			this.$toast.info(` You are logined as ${this.logined.name} 👍🏻 `, {
				position: POSITION.TOP_CENTER,
			});

			console.log(
				`%c You are logined as ${this.logined.name} 👍🏻 `,
				`
				color: #f72;
				font-size: 1rem;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				`
			);
		},

		underConstructionHandler() {
			this.$toast.warning(` Under construction... 🔨 `, {
				position: POSITION.TOP_CENTER,
			});

			console.log(
				`%c Under construction... 🔨 `,
				`
				color: #b38;
				font-size: 1rem;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				`
			);
		},
	},
});
</script>

<style src="./Appbar.scss" lang="scss" scoped />
