<template>
  <section class="upload">
    <ul class="upload_list">
      <li
        v-for="photo in photos"
        :key="photo.id"
        @click="uploadPhoto"
        class="upload_list_frame"
      >
        <img :src="photo.url" :alt="photo.id" :data-name="photo.url" />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getDateObject, checkTime, checkDay } from '@/config';

export default {
  name: 'Upload',
  data() {
    return {
      room: null,
      photo: '',
      chats: [],
    };
  },

  computed: {
    ...mapState({
      owner: ({ roomReducer }) => roomReducer.owner,
      logined: ({ userReducer }) => userReducer.logined,
      isUploadClicked: ({ uploadReducer }) => uploadReducer.isClicked,
      photos: ({ uploadReducer }) => uploadReducer.photos,
      roomlog: ({ chatReducer }) => chatReducer,
      chatLog: ({ chatReducer }) => chatReducer.chatLog,
    }),
  },

  mounted() {
    this.room = this.$route.params.id;
    if (this.chatLog.length !== this.chats.length || this.chatLog.length === 0)
      this.loadRoomLog();
    if (this.photos.length === 0) this.loadPhotoData();
  },

  updated() {
    if (this.roomlog[this.room]?.chats.length !== this.chats.length)
      this.loadRoomLog();
  },

  methods: {
    async uploadPhoto(e) {
      // NOTE select photo
      const { name } = e.target.dataset;
      this.photo = name;

      // NOTE same time checker
      const time = new Date();

      const chat = {
        name: this.logined,
        time: await getDateObject(time),
        message: 'picture',
        photo: this.photo,
        isSameTime: await checkTime(time, this.chats, this.logined),
        isSameDay: await checkDay(time, this.chats),
        isRead: false,
      };

      this.chats = [...this.chatLog, chat];

      const payload = {
        owner: this.owner,
        chats: this.chats,
      };

      await this.updateChatAction(payload);
      this.updateChatLogAction(this.chats);
    },

    async loadRoomLog() {
      if (this.roomlog[this.room]?.chats)
        this.chats = await this.roomlog[this.room]?.chats;
      this.updateChatLogAction(this.chats);
    },

    ...mapActions('uploadReducer', ['loadPhotoData']),
    ...mapActions('chatReducer', ['updateChatAction', 'updateChatLogAction']),
  },
};
</script>

<style src="@/styles/Room/Upload.scss" lang="scss" scoped />
