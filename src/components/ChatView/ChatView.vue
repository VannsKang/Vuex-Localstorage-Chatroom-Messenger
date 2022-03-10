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
					<div v-if="chat.photo" class="chat_contents_message_speaker_photo">
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
				<FontAwesomeIcon :icon="['fas', 'envelope']" size="xl" color="#fff" />
			</button>
		</form>
	</section>
</template>

<script lang="ts">
import Vue, { VueConstructor, PropType } from 'vue';
import { mapActions } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import format from 'date-fns/format';

import { Chat, RoomLog, ChatViewLocalType } from '@/views/Room/typings';
import { Host } from '@/views/List/typings';
import { Logined } from '@/views/Home/typings';

export default (Vue as VueConstructor<Vue & ChatViewLocalType>).extend({
	name: 'ChatViewVue',

	props: {
		host: {
			type: Object as PropType<Host>,
			default: null,
		},
		logined: {
			type: Object as PropType<Logined>,
			default: null,
		},
		roomLog: {
			type: Object as PropType<RoomLog>,
			default: null,
		},
		chatLog: {
			type: Array as PropType<Chat[]>,
			default: null,
		},
		loadRoomLog: {
			type: Function as PropType<(component: Vue) => void>,
			default: null,
		},
		updateMessageSendStatus: {
			type: Function as PropType<
				(speaker: Logined | Host, receiver: Logined | Host, chats: Chat[]) => void
			>,
			default: null,
		},
		roomNumber: {
			type: Number,
			default: null,
		},
	},

	filters: {
		showYMD(date: string): string {
			return format(new Date(date), 'yyyy-MM-dd');
		},

		showHM(date: string): string {
			return format(new Date(date), 'a h:mm');
		},
	},

	data: () => ({
		message: '' as string,
		chats: [] as Chat[],
	}),

	watch: {
		chatLog: {
			handler: function (chats) {
				this.chats = chats;
			},
			deep: true,
		},
	},

	mounted() {
		this.initSetup();
	},

	updated() {
		this.autoScollToLatest();
	},

	methods: {
		...mapActions('chatReducer', ['updateRoomLogAction', 'updateChatLogAction']),

		async initSetup() {
			try {
				if (!this.chats.length) await this.loadRoomLog(this);
				await this.updateChatLogAction(this.chats);
				this.readMessage();
				this.autoScollToLatest();
			} catch (error) {
				console.error((error as Error).message);
			}
		},

		autoScollToLatest() {
			if (!this.$refs || !this.$refs.content) return;
			const chatElement = this.$refs.content as HTMLUListElement;
			chatElement.scrollTop = chatElement.scrollHeight;
		},

		async sendMessage() {
			try {
				if (!this.message.length) throw new Error('Error: Nothing to send');

				// new message: template
				const sendAt = new Date();
				let isSameTime: boolean;
				let isSameDay: boolean;

				if (this.chats.length) {
					const latestMessage = this.chats[this.chats.length - 1];
					const latestMessageOwnerId = latestMessage.name.id;
					const latestMessageTime = new Date((latestMessage as Chat).time);
					isSameTime = format(sendAt, 'H:mm') === format(latestMessageTime, 'H:mm');
					isSameDay = format(sendAt, 'yyyy-MM-dd') === format(latestMessageTime, 'yyyy-MM-dd');
					// if lastmessage is sametime and same senders, change to sametime status
					if (isSameTime && latestMessageOwnerId === this.logined.id)
						latestMessage.isSameTime = true;
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
					isSameTime: false, // new message always show the send time
					isSameDay,
				};

				// new chat
				const chats = [...this.chats, newMessage];
				this.chats = chats;

				this.updateChatLogAction(chats);
				// * update my chatlog
				this.updateMessageSendStatus(this.logined, this.host, chats);
				// * update opponent chatlog
				this.updateMessageSendStatus(this.host, this.logined, chats);

				// reset
				this.message = '';
			} catch (error) {
				console.error((error as Error).message);
			}
		},

		readMessage(): void {
			try {
				if (!this.chats || !this.chats.length || !this.roomLog[this.logined.id])
					throw new Error('Nothing to read');

				// if anyone read who is not message senders, here should be the receiver
				const updatedChat = this.chats;
				updatedChat.forEach((chat) => {
					if (chat.name.id !== this.logined.id) chat.isRead = true;
				});

				// * update my chatlog
				this.updateMessageReadStatus(this.logined, this.host, updatedChat);
				// * update opponent chatlog
				this.updateMessageReadStatus(this.host, this.logined, updatedChat);
			} catch (error) {
				console.error((error as Error).message);
			}
		},

		updateMessageReadStatus(
			speaker: Logined | Host,
			receiver: Logined | Host,
			chats: Chat[]
		): void {
			const newChatBulk = cloneDeep(this.roomLog[speaker.id]); //deep clone for avoding side effect

			newChatBulk[receiver.id] = {
				host: this.host,
				chats,
			};

			this.updateRoomLogAction(newChatBulk);
		},
	},
});
</script>

<style src="./ChatView.scss" lang="scss" scoped />
