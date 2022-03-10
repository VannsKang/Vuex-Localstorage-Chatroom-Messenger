<template>
	<div>
		<Upload
			v-if="isUploadClicked"
			:isUploadClicked="isUploadClicked"
			:host="host"
			:logined="logined"
			:roomLog="roomLog"
			:chatLog="chatLog"
			:roomNumer="roomNumber"
			:loadRoomLog="loadRoomLog"
			:updateMessageSendStatus="updateMessageSendStatus"
		/>
		<ChatView
			:host="host"
			:logined="logined"
			:roomLog="roomLog"
			:chatLog="chatLog"
			:roomNumer="roomNumber"
			:loadRoomLog="loadRoomLog"
			:updateMessageSendStatus="updateMessageSendStatus"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapState, mapActions } from 'vuex';
import { ChatView, Upload } from '@/components';
import cloneDeep from 'lodash/cloneDeep';

import {
	ChatViewLocalType,
	UploadLocalType,
	RoomLocalType,
	UploadState,
	ChatState,
	ChatBulk,
	Chat,
} from '@/views/Room/typings';
import { RoomState, Host } from '@/views/List/typings';
import { UserState, Logined } from '@/views/Home/typings';

export default (Vue as VueConstructor<Vue & RoomLocalType>).extend({
	name: 'RoomVue',

	components: { ChatView, Upload },

	computed: {
		...mapState('roomReducer', {
			host: (state) => (state as RoomState).host,
		}),
		...mapState('userReducer', {
			logined: (state) => (state as UserState).logined,
		}),
		...mapState('chatReducer', {
			roomLog: (state) => (state as ChatState).roomLog,
			chatLog: (state) => (state as ChatState).chatLog,
		}),
		...mapState('uploadReducer', {
			isUploadClicked: (state) => (state as UploadState).isClicked,
		}),

		roomNumber() {
			return parseInt(this.$route.params.id);
		},
	},

	mounted() {
		this.resetClickedAction();
	},

	methods: {
		...mapActions('uploadReducer', ['resetClickedAction']),
		...mapActions('chatReducer', [
			'resetChatLogAction',
			'updateRoomLogAction',
			'updateChatLogAction',
		]),

		loadRoomLog(component: Vue & ChatViewLocalType & UploadLocalType): void {
			try {
				// validation
				const validUserConversation = this.roomLog[this.logined.id];
				if (!validUserConversation) throw new Error('No conversation yet? Start to say hello 👋');

				const validRoom = validUserConversation[this.roomNumber];
				if (!validRoom) throw new Error('No conversation in this room');

				component.chats = validRoom.chats;
				this.updateChatLogAction(validRoom.chats);
			} catch (error) {
				// reset local chat if no valid roomlog
				component.chats = [];
				this.resetChatLogAction();
				console.warn((error as Error).message);
			}
		},

		updateMessageSendStatus(
			speaker: Logined | Host,
			receiver: Logined | Host,
			chats: Chat[]
		): void {
			let chatBulk: ChatBulk;

			if (this.roomLog[speaker.id]) {
				chatBulk = cloneDeep(this.roomLog[speaker.id]); //deep clone for avoding side effect

				chatBulk[receiver.id] = {
					host: receiver,
					chats,
				};
			} else {
				chatBulk = {
					logined: speaker,
					[receiver.id]: {
						host: receiver,
						chats,
					},
				};
			}

			this.updateRoomLogAction(chatBulk);
		},
	},
});
</script>

<style src="@/styles/container.scss" lang="scss" scoped />
