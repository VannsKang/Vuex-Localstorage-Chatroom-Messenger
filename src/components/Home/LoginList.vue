<template>
  <main class="users">
    <ul>
      <li
        v-for="user in users"
        @click="loginHandler"
        :key="user.id"
        :data-id="user.id"
        :data-name="user.name"
      >
        <div class="users_profile">
          <img :src="user.profile" alt="" />
        </div>
        <div class="users_preview">
          <div class="users_preview_name">{{ user.name }}</div>
          <div class="users_preview_message">Click here for Login! 😊</div>
        </div>
        <div class="users_noti">
          <FontAwesomeIcon
            :icon="['fas', 'sign-in-alt']"
            size="lg"
            color="var(--primary)"
          />
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginList',

  data() {
    return {};
  },

  computed: {
    ...mapState({
      users: ({ userReducer }) => userReducer.users,
    }),
  },

  methods: {
    loginHandler(e) {
      const { id, name } = e.currentTarget.dataset;
      const payload = {
        id,
        name,
      };
      this.updateLoginedAction(payload);
      this.$router.push('/list');
    },

    ...mapActions('userReducer', ['updateLoginedAction']),
  },
};
</script>

<style src="@/styles/Home/LoginList.scss" lang="scss" scoped />
