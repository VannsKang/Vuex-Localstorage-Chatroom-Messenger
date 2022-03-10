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

interface ListLocalType {
	rooms: Room[];
	sortedRooms: Room[];
	roomLog: RoomLog;
	logined: Logined;

	loadRoomData: () => Promise<void>;
	updateHostAction: () => void;
	updateSortedRoomsAction: () => void;
	enterChat: () => Promise<void>;
	showLast: (hostID: number, LoginId: number, type: string) => string | null;
	showUnreadCount: (id: number) => number | null;
	updateRoomStatus: () => Promise<void>;
}

export default (Vue as VueConstructor<Vue & ListLocalType>).extend({
	name: 'ListVue',

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
				console.error((error as Error).message);
			}
		},

		showLast(id: number, type: string): string | Nullable {
			let validUserConversation = this.roomLog[this.logined.id];
			if (!validUserConversation) return;

			let validRoom = validUserConversation[id];
			if (!validRoom) return;

			const userChats = validRoom?.chats;
			if (!userChats || !userChats.length) return;

			const lastMessage = userChats[userChats.length - 1] as Chat;

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
			let validUserConversation = this.roomLog[this.logined.id];
			if (!validUserConversation) return;

			let validRoom = validUserConversation[id];
			if (!validRoom) return;

			const chats = validRoom.chats;
			const unreadChats = chats.filter(
				(chat) => chat.isRead === false && chat.name.id !== this.logined.id
			);

			return unreadChats ? unreadChats.length : null;
		},

		getLastMessageTime(hostId: number, LoginId: number, roomLog: RoomLog) {
			if (!roomLog[LoginId] || !roomLog[LoginId][hostId] || !roomLog[LoginId][hostId].chats.length)
				return null;

			const userChatHistory = roomLog[LoginId][hostId].chats;
			const lastMessage = userChatHistory[userChatHistory.length - 1] as Chat;

			return lastMessage.time;
		},

		async updateRoomStatus(): Promise<void> {
			try {
				if (!this.rooms || !this.rooms.length) await this.loadRoomData();

				const newRooms = cloneDeep(this.rooms);

				const unMessagedRooms = newRooms.filter(
					(room) => !this.getLastMessageTime(room.id, this.logined.id, this.roomLog)
				);
				const messagedRooms = newRooms.filter((room) =>
					this.getLastMessageTime(room.id, this.logined.id, this.roomLog)
				);

				const orderedRooms = messagedRooms.sort((room2, room1) => {
					const loginUserRooms = this.roomLog[this.logined.id];
					const roomlog1 = loginUserRooms[room1.id].chats;
					const roomlog2 = loginUserRooms[room2.id].chats;

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
				console.error((error as Error).message);
			}
		},
	},
});
</script>
