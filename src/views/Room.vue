<template>
  <section class="container">
    <Notibar />
    <Nav />
    <Upload v-if="isUploadClicked" />
    <Chat />
  </section>
</template>

<script>
import Notibar from '@/components/Notibar.vue';
import Nav from '@/components/Nav.vue';
import Chat from '@/components/Room/Chat.vue';
import Upload from '@/components/Room/Upload.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Room',
  components: { Notibar, Nav, Chat, Upload },

  computed: {
    ...mapState({
      isUploadClicked: ({ uploadReducer }) => uploadReducer.isClicked,
    }),
  },

  mounted() {
    this.resetClickedAction();
  },

  methods: {
    ...mapActions('uploadReducer', ['resetClickedAction']),
  },
};
</script>

<style src="@/styles/container.scss" lang="scss" scoped />
