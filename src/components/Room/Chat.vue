<template>
  <section class="chat">
    <ul class="chat_contents" ref="contents">
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
            {{ chat.time.year }} / {{ chat.time.month }} /
            {{ chat.time.date }}
          </div>
          <div class="chat_contents_message_date_divider"></div>
        </div>

        <!-- SECTION current user's message -->
        <div
          v-if="logined.id === chat.name.id"
          class="chat_contents_message_speaker"
        >
          <div
            v-if="!chat.isSameTime"
            class="chat_contents_message_speaker_time"
          >
            {{ chat.time.hours }}:{{ chat.time.minutes }}
          </div>
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
          <div
            v-if="!chat.isSameTime"
            class="chat_contents_message_listner_time"
          >
            {{ chat.time.hours }}:{{ chat.time.minutes }}
          </div>
        </div>
      </li>
    </ul>

    <!-- SECTION form -->
    <form @submit.prevent="sendMessage" class="chat_input">
      <input
        type="text"
        placeholder="Put message here."
        v-model.lazy="message"
      />
      <button type="submit">
        <img :src="Send" alt="send" />
      </button>
    </form>
  </section>
</template>

<script>
import Send from '@/assets/chat-send/img-send.svg';
import { getDateObject, checkTime, checkDay } from '@/config';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Chat',

  data() {
    return {
      room: null,
      message: '',
      chats: [],
      Send,
    };
  },

  computed: {
    ...mapState({
      owner: ({ roomReducer }) => roomReducer.owner,
      logined: ({ userReducer }) => userReducer.logined,
      roomlog: ({ chatReducer }) => chatReducer,
      chatLog: ({ chatReducer }) => chatReducer.chatLog,
    }),
  },

  mounted() {
    this.room = this.$route.params.id;
    if (this.chatLog.length !== this.chats.length || this.chatLog.length === 0)
      this.loadRoomLog();
    this.autoScroll();
  },

  updated() {
    if (this.chatLog.length !== this.chats.length) this.loadRoomLog();
    if (this.room === this.logined.id && !!this.owner) this.readMessage();
    this.autoScroll();
  },

  methods: {
    async sendMessage() {
      try {
        if (this.message === '') throw new Error('Type the message!');

        const time = new Date();

        const chat = {
          name: this.logined,
          time: getDateObject(time),
          message: this.message,
          isSameTime: checkTime(time, this.chats, this.logined),
          isSameDay: checkDay(time, this.chats),
          isRead: false,
        };

        this.chats = [...this.chats, chat];

        const payload = {
          owner: this.owner,
          chats: this.chats,
        };

        this.updateChatAction(payload);

        // NOTE reset
        this.message = '';
      } catch (error) {
        console.log(error);
      }
    },

    async loadRoomLog() {
      if (this.roomlog[this.room]?.chats)
        this.chats = await this.roomlog[this.room]?.chats;
      this.updateChatLogAction(this.chats);
    },

    autoScroll() {
      const contents = this.$refs.contents;
      contents.scrollTop = contents.scrollHeight;
    },

    readMessage() {
      this.chats.forEach((chat) => (chat.isRead = true));
      const payload = {
        owner: this.owner,
        chats: this.chats,
      };

      this.updateChatAction(payload);
    },

    ...mapActions('chatReducer', ['updateChatAction', 'updateChatLogAction']),
  },
};
</script>

<style src="@/styles/Room/Chat.scss" lang="scss" scoped />
