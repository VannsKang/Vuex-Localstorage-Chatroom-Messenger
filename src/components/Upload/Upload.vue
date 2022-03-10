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
import Vue, { VueConstructor, PropType } from 'vue';
import { mapActions, mapState } from 'vuex';
import format from 'date-fns/format';

import { Chat, RoomLog, UploadState, UploadLocalType } from '@/views/Room/typings';
import { Host } from '@/views/List/typings';
import { Logined } from '@/views/Home/typings';

export default (Vue as VueConstructor<Vue & UploadLocalType>).extend({
	name: 'UploadVue',

	props: {
		isUploadClicked: {
			type: Boolean,
			default: false,
		},
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

	computed: {
		...mapState('uploadReducer', {
			photos: (state) => (state as UploadState).photos,
		}),
	},

	data: () => ({
		photo: '' as string,
		chats: [] as Chat[],
	}),

	mounted() {
		this.initSetup();
	},

	methods: {
		...mapActions('uploadReducer', ['loadPhotoData', 'resetClickedAction']),
		...mapActions('chatReducer', ['updateChatLogAction']),

		async initSetup() {
			try {
				if (!this.photos.length) await this.loadPhotoData();
				if (!this.chats.length) await this.loadRoomLog(this);
				await this.updateChatLogAction(this.chats);
			} catch (error) {
				console.error((error as Error).message);
			}
		},

		async uploadPhoto(e: MouseEvent) {
			try {
				const selectedPhoto = e.currentTarget as HTMLLIElement;
				if (!selectedPhoto) throw new Error('Error: Nothing to send');

				const photo = selectedPhoto.dataset.name as string;
				this.photo = photo;

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
					message: 'picture',
					photo,
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
				this.resetClickedAction();
			} catch (error) {
				console.error((error as Error).message);
			}
		},
	},
});
</script>

<style src="./Upload.scss" lang="scss" scoped />
