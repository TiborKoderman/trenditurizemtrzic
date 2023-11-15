<script setup>
import HomeGreet from '../components/HomeGreet.vue'
import HomeGraf from '../components/HomeGraf.vue'
import GoogleMaps from '../components/GoogleMaps.vue'
</script>

<template>
  <main>
    <GoogleMaps />
    <HomeGraf style="z-index: 999;"/>
  </main>
</template>
