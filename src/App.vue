<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <!-- <NavBar></NavBar> -->
  <head>
  </head>
  <RouterView />
  <NavBar></NavBar>
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
