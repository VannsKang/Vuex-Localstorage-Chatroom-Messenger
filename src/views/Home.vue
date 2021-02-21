<template>
  <section class="container">
    <Notibar />
    <Nav />
    <LoginList />
  </section>
</template>

<script>
import Notibar from "@/components/Notibar.vue";
import Nav from "@/components/Nav.vue";
import LoginList from "@/components/Home/LoginList.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: { Notibar, Nav, LoginList },
  mounted() {
    this.loadUserData();
  },
  methods: {
    ...mapActions("userReducer", ["loadUserData"])
  }
};
</script>

<style src="@/styles/container.scss" lang="scss" scoped />
