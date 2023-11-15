<template>
  <div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8997.367228582554!2d14.308242324951097!3d46.36314213753995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477abc9e827f96bf%3A0x6435fdbcbafad10e!2zNDI5MCBUcsW-acSN!5e0!3m2!1sen!2ssi!4v1700068788966!5m2!1sen!2ssi" width="100vw" height="100vh" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <!-- <div id="map"></div> -->
</template>

<script setup>
import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js'




// initMap()
</script>

<style lang="scss" scoped>
/* 
 * Always set the map height explicitly to define the size of the div element
 * that contains the map. 
 */
#map {
  height: 100%;
}

/* 
 * Optional: Makes the sample page fill the window. 
 */
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
