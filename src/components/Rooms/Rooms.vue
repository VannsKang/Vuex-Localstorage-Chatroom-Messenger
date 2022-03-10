<template>
	<ul>
		<!-- SECTION first load -->
		<li
			v-for="room in rooms"
			@click="enterChat"
			:data-id="room.id"
			:data-name="room.name"
			:key="room.id"
		>
			<div class="users_profile">
				<img :src="room.profile" :alt="room.name" />
			</div>

			<!-- left -->
			<div class="users_preview">
				<div v-if="room.name === logined.name" class="users_preview_name">My Chat Room 🍩</div>
				<div v-else class="users_preview_name">{{ room.name }}</div>

				<!-- last message -->
				<div v-if="showLast(room.id, 'message')" class="users_preview_message">
					{{ showLast(room.id, 'message') }}
				</div>
			</div>

			<!-- right -->
			<div v-if="showLast(room.id, 'time')" class="users_noti">
				<!-- time or day -->
				<div v-if="showLast(room.id, 'day') === todayOfWeek" class="users_noti_time">
					{{ showLast(room.id, 'time') }}
				</div>
				<div v-else class="users_noti_time">
					{{ showLast(room.id, 'day') }}
				</div>

				<!-- unread count -->
				<div v-if="showUnreadCount(room.id)" class="users_noti_unread">
					<span>{{ showUnreadCount(room.id) }}</span>
				</div>
			</div>
		</li>
	</ul>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from 'vue';
import format from 'date-fns/format';

import { Room } from '@/views/List/typings';
import { RoomLog } from '@/views/Room/typings';
import { Logined } from '@/views/Home/typings';

interface LocalBindings {
	todayOfWeek: string;
}

export default (Vue as VueConstructor<Vue & LocalBindings>).extend({
	name: 'RoomsVue',

	props: {
		rooms: {
			type: Array as PropType<Room[]>,
			default: null,
		},

		enterChat: {
			type: Function as PropType<() => Promise<void>>,
			default: null,
		},

		showLast: {
			type: Function as PropType<(id: number, type: string) => string>,
			default: null,
		},

		roomLog: {
			type: Object as PropType<RoomLog>,
			default: null,
		},

		logined: {
			type: Object as PropType<Logined>,
			default: null,
		},

		showUnreadCount: {
			type: Function as PropType<(id: number) => number>,
			default: null,
		},
	},

	computed: {
		todayOfWeek() {
			return format(new Date(), 'EEE');
		},
	},
});
</script>

<style src="./Rooms.scss" lang="scss" scoped />
