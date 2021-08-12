<template>
	<main class="users">
		<Rooms
			:rooms="sortedRooms ? sortedRooms : rooms"
			:roomLog="roomLog"
			:logined="logined"
			:enterChat="enterChat"
			:showLast="showLast"
			:showUnreadCount="showUnreadCount"
		/>
	</main>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapActions, mapState } from 'vuex';
import format from 'date-fns/format';
import cloneDeep from 'lodash/cloneDeep';

import { Rooms } from '@/components';
import { Logined, Nullable, UserState } from '@/views/Home/typings';
import { RoomState, Room } from '@/views/List/typings';
import { ChatState, Chat, RoomLog } from '@/views/Room/typings';

interface VuexBindings {
	rooms: Room[];
	sortedRooms: Room[];
	roomLog: RoomLog;
	logined: Logined;

	loadRoomData: () => Promise<void>;
	updateHostAction: () => void;
	updateSortedRoomsAction: () => void;
	enterChat: () => Promise<void>;
	showLast: (id: number, type: string) => string | null;
	showUnreadCount: (id: number) => number | null;
	updateRoomStatus: () => Promise<void>;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'List',

	components: { Rooms },

	computed: {
		...mapState('userReducer', {
			logined: (state) => (state as UserState).logined,
		}),

		...mapState('roomReducer', {
			rooms: (state) => (state as RoomState).rooms,
			sortedRooms: (state) => (state as RoomState).sortedRooms,
		}),
		...mapState('chatReducer', {
			roomLog: (state) => (state as ChatState).roomLog,
		}),
	},

	mounted() {
		// init setup
		this.updateRoomStatus();
	},

	methods: {
		...mapActions('roomReducer', ['loadRoomData', 'updateHostAction', 'updateSortedRoomsAction']),

		async enterChat(e: MouseEvent) {
			try {
				const selectedChat = e.currentTarget as HTMLLIElement;

				if (!selectedChat) throw new Error('Error: Impossible to enter the chat room');

				const { id, name } = selectedChat.dataset;

				const host = {
					id,
					name,
				};

				await this.updateHostAction(host);

				this.$router.push(`/room/${id}`);
			} catch (error) {
				console.error(error.message);
			}
		},

		showLast(id: number, type: string): string | Nullable {
			if (!this.roomLog[id] || !this.roomLog[id].chats || !this.roomLog[id].chats.length) return;

			const userRoomLog = this.roomLog[id].chats;
			const lastMessage = userRoomLog[userRoomLog.length - 1] as Chat;

			if (!lastMessage) return;

			switch (type) {
				case 'message':
					return lastMessage.message;

				case 'time':
					return format(new Date(lastMessage.time), 'H:mm');

				case 'day':
					return format(new Date(lastMessage.time), 'EEE');
			}
		},

		showUnreadCount(id: number): number | Nullable {
			if (!this.roomLog[id]) return null;

			const chats = this.roomLog[id].chats;
			const unreadChats = chats.filter((chat) => chat.isRead === false);

			return unreadChats ? unreadChats.length : null;
		},

		getLastMessageTime(id: number, roomLog: RoomLog) {
			if (!roomLog[id] || !roomLog[id].chats || !roomLog[id].chats.length) return null;

			const userRoomLog = roomLog[id].chats;
			const lastMessage = userRoomLog[userRoomLog.length - 1] as Chat;

			return lastMessage.time;
		},

		async updateRoomStatus(): Promise<void> {
			try {
				if (!this.rooms || !this.rooms.length) await this.loadRoomData();

				const newRooms = cloneDeep(this.rooms);

				const unMessagedRooms = newRooms.filter(
					(room) => !this.getLastMessageTime(room.id, this.roomLog)
				);
				const messagedRooms = newRooms.filter((room) =>
					this.getLastMessageTime(room.id, this.roomLog)
				);

				const orderedRooms = messagedRooms.sort((room2, room1) => {
					const roomlog1 = this.roomLog[room1.id].chats;
					const roomlog2 = this.roomLog[room2.id].chats;

					const lastMessageAbsoluteTimeRoom1 = new Date(
						roomlog1[roomlog1.length - 1].time
					).valueOf();
					const lastMessageAbsoluteTimeRoom2 = new Date(
						roomlog2[roomlog2.length - 1].time
					).valueOf();

					return lastMessageAbsoluteTimeRoom1 - lastMessageAbsoluteTimeRoom2;
				});

				const newSortedRoom = [...orderedRooms, ...unMessagedRooms];
				this.updateSortedRoomsAction(newSortedRoom);
			} catch (error) {
				console.error(error.message);
			}
		},
	},
});
</script>
