<template>
  <section class="container">
    <Notibar />
    <Nav />
    <Rooms />
  </section>
</template>

<script>
import Notibar from "@/components/Notibar.vue";
import Nav from "@/components/Nav.vue";
import Rooms from "@/components/List/Rooms.vue";

export default {
  name: "List",
  components: { Notibar, Nav, Rooms }
};
</script>

<style src="@/styles/container.scss" lang="scss" scoped />
