<template>
  <main class="users">
    <!-- SECTION first load -->
    <ul v-if="sortedRooms.length === 0">
      <li
        v-for="room in rooms"
        @click="enterChat"
        :key="room.id"
        :data-id="room.id"
        :data-name="room.name"
      >
        <div class="users_profile">
          <img :src="room.profile" alt="" />
        </div>
        <div class="users_preview">
          <div class="users_preview_name">{{ room.name }}</div>
          <div v-if="chatLog[room.id]" class="users_preview_message">
            {{ showLast(room.id, 'message') }}
          </div>
        </div>
        <div class="users_noti">
          <div
            v-if="chatLog[room.id] && showLast(room.id, 'day') === today"
            class="users_noti_time"
          >
            {{ showLast(room.id, 'time') }}
          </div>
          <div
            v-if="chatLog[room.id] && showLast(room.id, 'day') !== today"
            class="users_noti_time"
          >
            {{ showLast(room.id, 'day') }}
          </div>
          <div v-if="!!showUnread(room.id)" class="users_noti_unread">
            <span>{{ showUnread(room.id) }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- SECTION sorted -->
    <ul v-else>
      <li
        v-for="room in sortedRooms"
        @click="enterChat"
        :key="room.id"
        :data-id="room.id"
        :data-name="room.name"
      >
        <div class="users_profile">
          <img :src="room.profile" alt="" />
        </div>
        <div class="users_preview">
          <div class="users_preview_name">{{ room.name }}</div>
          <div v-if="chatLog[room.id]" class="users_preview_message">
            {{ showLast(room.id, 'message') }}
          </div>
        </div>
        <div class="users_noti">
          <div
            v-if="chatLog[room.id] && showLast(room.id, 'day') === today"
            class="users_noti_time"
          >
            {{ showLast(room.id, 'time') }}
          </div>
          <div
            v-if="chatLog[room.id] && showLast(room.id, 'day') !== today"
            class="users_noti_time"
          >
            {{ showLast(room.id, 'day') }}
          </div>
          <div v-if="!!showUnread(room.id)" class="users_noti_unread">
            <span>{{ showUnread(room.id) }}</span>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { getDateObject } from '@/config';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Rooms',

  data() {
    return {
      today: '',
    };
  },

  computed: {
    ...mapState({
      rooms: ({ roomReducer }) => roomReducer.rooms,
      sortedRooms: ({ roomReducer }) => roomReducer.sortedRooms,
      chatLog: ({ chatReducer }) => chatReducer,
    }),
  },

  mounted() {
    this.today = getDateObject(new Date()).day;
    this.updateRoomData();
  },

  methods: {
    enterChat(e) {
      const { id, name } = e.currentTarget.dataset;
      const payload = {
        id,
        name,
      };
      this.updateOwnerAction(payload);
      this.$router.push(`/room/${id}`);
    },

    showLast(id, context) {
      const last = this.chatLog[id]?.chats[this.chatLog[id].chats.length - 1];

      if (this.chatLog[id].chats.length !== 0) {
        if (context === 'message') return last.message;
        if (context === 'time')
          return `${last.time.hours}:${last.time.minutes}`;
        if (context === 'day') return last.time.day;
      }
    },

    showUnread(id) {
      if (this.chatLog[id]) {
        const chats = this.chatLog[id]?.chats;
        const unreadChats = chats.filter((chat) => chat.isRead === false);
        return unreadChats ? unreadChats.length : false;
      }
    },

    getAbsoluteTime(id) {
      const last = this.chatLog[id]?.chats[this.chatLog[id].chats.length - 1];
      return last?.time.absoluteTime;
    },

    async updateRoomData() {
      if (this.rooms.length === 0) await this.loadRoomData();

      const newRooms = [...this.rooms];

      const unMessagedRooms = await newRooms.filter(
        (room) => !this.getAbsoluteTime(room.id)
      );
      const messagedRooms = await newRooms.filter(
        (room) => !!this.getAbsoluteTime(room.id)
      );

      const sortedRooms = await messagedRooms.sort((r2, r1) => {
        const timeR1 = this.chatLog[r1.id]?.chats[
          this.chatLog[r1.id].chats.length - 1
        ];
        const timeR2 = this.chatLog[r2.id]?.chats[
          this.chatLog[r2.id].chats.length - 1
        ];
        return timeR1?.time.absoluteTime - timeR2?.time.absoluteTime;
      });

      const newSortedRoom = [...sortedRooms, ...unMessagedRooms];
      this.updateSortedRoomsAction(newSortedRoom);
    },

    ...mapActions('roomReducer', [
      'loadRoomData',
      'updateOwnerAction',
      'updateSortedRoomsAction',
    ]),
  },
};
</script>

<style src="@/styles/List/Rooms.scss" lang="scss" scoped />
