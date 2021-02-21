<template>
  <nav class="nav">
    <!-- SECTION nav left -->
    <div
      v-if="title === 'List' || title === 'Home'"
      class="nav_left"
      @click="backHome"
    >
      <img :src="Hamburger" alt="hamburger" />
    </div>
    <div v-else class="nav_left" @click="backList">
      <img :src="Back" alt="back" />
    </div>

    <!-- SECTION nav title -->
    <div v-if="title === 'List'" class="nav_title">Chat Room</div>
    <div v-if="title === 'Home'" class="nav_title">User List</div>
    <div v-if="title === 'Room'" class="nav_title">{{ roomTitle }}</div>

    <!-- SECTION nav right -->
    <div v-if="title === 'Home'" class="nav_right" @click="handleTheme">
      <span>
        <FontAwesomeIcon :icon="['fas', 'palette']" color="#fff" />
      </span>
    </div>
    <div v-if="title === 'List'" class="nav_right">
      <span>
        <img :src="Avatar" alt="avatar" />
      </span>
    </div>
    <div v-if="title === 'Room'" class="nav_right" @click="handleRighter">
      <span>
        <img :src="Upload" alt="upload" data-id="upload" />
      </span>
      <span>
        <img :src="Search" alt="search" data-id="search" />
      </span>
    </div>
  </nav>
</template>

<script>
import Hamburger from '@/assets/nav-hamburger/rectangle.svg';
import Avatar from '@/assets/nav-avatar/rectangle.svg';
import Back from '@/assets/nav-back/img-back.svg';
import Search from '@/assets/nav-search/img-search.svg';
import Upload from '@/assets/nav-upload/img-upload.svg';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Nav',

  data() {
    return {
      title: '',
      Hamburger,
      Avatar,
      Back,
      Search,
      Upload,
      isTheme: false,
    };
  },

  computed: {
    ...mapState({
      rooms: ({ roomReducer }) => roomReducer.rooms,
      roomTitle: ({ roomReducer }) => roomReducer.owner.name,
    }),
  },

  mounted() {
    this.title = this.$route.name;
  },

  methods: {
    backHome() {
      try {
        if (this.$route.name === 'Home')
          throw new Error('This is the first page');
        return this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },

    backList() {
      return this.$router.push('/list');
    },

    handleTheme() {
      const root = document.querySelector(':root');
      this.isTheme = !this.isTheme;

      this.isTheme
        ? root.style.setProperty('--primary', '#e1306c')
        : root.style.setProperty('--primary', '#3b5998');
    },

    handleRighter(e) {
      if (e.target.dataset.id === 'upload') return this.updateClickedAction();
    },

    ...mapActions('uploadReducer', ['updateClickedAction']),
  },
};
</script>

<style src="@/styles/Nav.scss" lang="scss" scoped />
