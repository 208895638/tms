<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  position: absolute;
  top: 35px; /* navbar + tags-view = 50 +34 */
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>

