<template>
	<section class="upload">
		<ul class="upload_list">
			<li
				v-for="photo in photos"
				@click="uploadPhoto"
				:data-name="photo.url"
				class="upload_list_frame"
				:key="photo.id"
			>
				<img :src="photo.url" :alt="photo.id" />
			</li>
		</ul>
	</section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapActions, mapState } from 'vuex';
import isEqual from 'date-fns/isEqual';
import format from 'date-fns/format';

import { Chat, RoomLog, ChatBulk, ChatState, UploadState } from '@/views/Room/typings';
import { Host, RoomState } from '@/views/List/typings';
import { Logined, UserState } from '@/views/Home/typings';

interface VuexBindings {
	host: Host;
	logined: Logined;
	roomlog: RoomLog;
	chatLog: Chat[];
	roomNumber: number;

	photo: string;
	chats: Chat[];
	loadPhotoData: () => Promise<void>;
	uploadPhoto: () => void;
	updateRoomLogAction: (chatbulk: ChatBulk) => void;
	updateChatLogAction: (chats: Chat[]) => void;
	loadRoomLog: () => void;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'Upload',

	computed: {
		...mapState('roomReducer', {
			host: (state) => (state as RoomState).host,
		}),
		...mapState('userReducer', {
			logined: (state) => (state as UserState).logined,
		}),
		...mapState('chatReducer', {
			roomlog: (state) => (state as ChatState).roomLog,
			chatLog: (state) => (state as ChatState).chatLog,
		}),
		...mapState('uploadReducer', {
			isUploadClicked: (state) => (state as UploadState).isClicked,
			photos: (state) => (state as UploadState).photos,
		}),

		roomNumber() {
			return parseInt(this.$route.params.id);
		},
	},

	data: () => ({
		photo: '' as string,
		chats: [] as Chat[],
	}),

	mounted() {
		if (this.chatLog.length !== this.chats.length || !this.chatLog.length) this.loadRoomLog();
		if (this.photos.length === 0) this.loadPhotoData();
	},

	updated() {
		if (this.roomlog[this.roomNumber]?.chats.length !== this.chats.length) this.loadRoomLog();
	},

	methods: {
		...mapActions('uploadReducer', ['loadPhotoData']),
		...mapActions('chatReducer', ['updateRoomLogAction', 'updateChatLogAction']),

		async uploadPhoto(e: MouseEvent) {
			try {
				const selectedPhoto = e.currentTarget as HTMLLIElement;
				if (!selectedPhoto) throw new Error('Error: Nothing to send');

				const photo = selectedPhoto.dataset.name as string;
				this.photo = photo;

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
					message: 'picture',
					photo,
					isRead: false,
					isSameTime,
					isSameDay,
				};

				// new chat
				const chats = [...this.chats, newMessage] as Chat[];
				this.chats = chats;

				const chatBulk = {
					host: this.host,
					chats,
				};

				await this.updateRoomLogAction(chatBulk);
				this.updateChatLogAction(chats);
			} catch (error) {
				console.error(error.message);
			}
		},

		loadRoomLog() {
			try {
				// validation
				const validRoom = this.roomlog[this.roomNumber];
				if (!validRoom) throw new Error('Warning: No conversation');

				this.chats = validRoom.chats;
				this.updateChatLogAction(validRoom.chats);
			} catch (error) {
				console.warn(error.message);
			}
		},
	},
});
</script>

<style src="./Upload.scss" lang="scss" scoped />
