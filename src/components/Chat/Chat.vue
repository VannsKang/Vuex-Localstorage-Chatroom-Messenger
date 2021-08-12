<template>
	<section class="chat">
		<ul class="chat_contents" ref="content">
			<li
				class="chat_contents_message"
				v-for="(chat, idx) in chatLog"
				:key="idx"
				:data-id="chat.name.id"
			>
				<!-- SECTION date divider -->
				<div v-if="!chat.isSameDay" class="chat_contents_message_date">
					<div class="chat_contents_message_date_divider"></div>
					<div class="chat_contents_message_date_time">
						<!-- {{ chat.time.year }} / {{ chat.time.month }} /
						{{ chat.time.date }} -->
						{{ chat.time | showYMD }}
					</div>
					<div class="chat_contents_message_date_divider"></div>
				</div>

				<!-- SECTION current user's message -->
				<div v-if="logined.id === chat.name.id" class="chat_contents_message_speaker">
					<!-- time -->
					<div v-if="!chat.isSameTime" class="chat_contents_message_speaker_time">
						<!-- {{ chat.time.hours }}:{{ chat.time.minutes }} -->
						{{ chat.time | showHM }}
					</div>

					<!-- is photo included or not-->
					<div v-if="!!chat.photo" class="chat_contents_message_speaker_photo">
						<img :src="chat.photo" :alt="chat.photo" />
					</div>
					<div v-else class="chat_contents_message_speaker_text">
						{{ chat.message }}
					</div>
				</div>

				<!-- SECTION others' message -->
				<div v-else class="chat_contents_message_listner">
					<div v-if="!!chat.photo" class="chat_contents_message_listner_photo">
						<img :src="chat.photo" :alt="chat.photo" />
					</div>
					<div v-else class="chat_contents_message_listner_text">
						{{ chat.message }}
					</div>

					<!-- time -->
					<div v-if="!chat.isSameTime" class="chat_contents_message_listner_time">
						<!-- {{ chat.time.hours }}:{{ chat.time.minutes }} -->
						{{ chat.time | showHM }}
					</div>
				</div>
			</li>
		</ul>

		<!-- SECTION form -->
		<form @submit.prevent="sendMessage" class="chat_input">
			<input type="text" placeholder="Send Hello 👋" v-model.lazy="message" />
			<button type="submit">
				<Send />
			</button>
		</form>
	</section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapActions, mapState } from 'vuex';
import isEqual from 'date-fns/isEqual';
import format from 'date-fns/format';

import { Send } from '@/assets';
import { ChatState, Chat, ChatBulk, RoomLog } from '@/views/Room/typings';
import { RoomState, Host } from '@/views/List/typings';
import { UserState, Logined } from '@/views/Home/typings';

interface VuexBindings {
	host: Host;
	logined: Logined;
	roomLog: RoomLog;
	chatLog: Chat[];
	roomNumber: number;

	message: string;
	chats: Chat[];
	autoScollToLatest: () => void;
	updateRoomLogAction: (chatBulk: ChatBulk) => void;
	updateChatLogAction: (chats: Chat[]) => void;
	loadRoomLog: () => void;
	readMessage: () => void;
	resetChatLogAction: () => void;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'Chat',

	components: {
		Send,
	},

	filters: {
		showYMD(date: string): string {
			return format(new Date(date), 'yyyy-MM-dd');
		},

		showHM(date: string): string {
			return format(new Date(date), 'H:mm');
		},
	},

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

		roomNumber() {
			return parseInt(this.$route.params.id);
		},
	},

	data: () => ({
		message: '' as string,
		chats: [] as Chat[],
	}),

	mounted() {
		if (this.chatLog.length !== this.chats.length || !this.chatLog.length) this.loadRoomLog();
		this.autoScollToLatest();
	},

	updated() {
		if (this.chatLog.length !== this.chats.length) this.loadRoomLog();
		if (this.roomNumber === this.logined.id && !!this.host) this.readMessage();
		this.autoScollToLatest();
	},

	methods: {
		...mapActions('chatReducer', [
			'updateRoomLogAction',
			'updateChatLogAction',
			'resetChatLogAction',
		]),

		async sendMessage() {
			try {
				if (!this.message.length) throw new Error('Error: Nothing to send');

				// new message: template
				const sendAt = new Date();

				let latestMessage: Chat;
				let latestMessageTime: Date;
				let isSameTime: boolean;
				let isSameDay: boolean;

				if (this.chats.length) {
					latestMessage = this.chats[this.chats.length - 1];
					latestMessageTime = new Date((latestMessage as Chat).time);
					isSameTime = isEqual(sendAt, latestMessageTime);
					isSameDay = format(sendAt, 'yyyy-MM-dd') === format(latestMessageTime, 'yyyy-MM-dd');
				} else {
					isSameTime = false;
					isSameDay = false;
				}

				const newMessage: Chat = {
					name: this.logined,
					time: sendAt,
					message: this.message,
					photo: null,
					isRead: false,
					isSameTime,
					isSameDay,
				};

				// new chat
				const chats = [...this.chats, newMessage];

				this.chats = chats;

				const chatBulk = {
					host: this.host,
					chats,
				};

				this.updateRoomLogAction(chatBulk);

				// reset
				this.message = '';
			} catch (error) {
				console.error(error.message);
			}
		},

		loadRoomLog() {
			try {
				// validation
				const validRoom = this.roomLog[this.roomNumber];
				if (!validRoom) throw new Error('No conversation in this room');

				this.chats = validRoom.chats;
				this.updateChatLogAction(validRoom.chats);
			} catch (error) {
				// reset local chat if no valid roomlog
				this.chats = [];
				this.resetChatLogAction();
				console.warn(error.message);
			}
		},

		autoScollToLatest() {
			if (!this.$refs || !this.$refs.content) return;
			const chatElement = this.$refs.content as HTMLUListElement;
			chatElement.scrollTop = chatElement.scrollHeight;
		},

		readMessage() {
			this.chats.forEach((chat) => (chat.isRead = true));

			const chatBulk = {
				host: this.host,
				chats: this.chats,
			};

			this.updateRoomLogAction(chatBulk);
		},
	},
});
</script>

<style src="./Chat.scss" lang="scss" scoped />
