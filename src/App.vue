<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <NavBar></NavBar>
  <head>
  </head>
  <GMapMap
      :center="{ lat: 46.3805589, lng: 14.172904 }"
      :zoom="12" 
      style="width: 100vw; height: 100vh"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      }"
    />
    <RouterView />
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
