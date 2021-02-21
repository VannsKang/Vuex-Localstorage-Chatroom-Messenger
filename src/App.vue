<template>
  <div id="app">
    <div class="_">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

._ {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  @include flexSet('center', 'center');
}
</style>
