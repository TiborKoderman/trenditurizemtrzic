<script setup>
import HomeGraf from '../components/HomeGraf.vue'
import TheGrafs from '../components/TheGrafs.vue'
import CategorySelection from '../components/CategorySelection.vue'
</script>

<template>
  <main>
    <GMapMap
      :center="{ lat: 46.36206953456084, lng: 14.308336492747152 }"
      :zoom="13"
      style="width: 100vw; height: 100vh"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: mapStyles
      }"
    >
      <GMapMarker
        :key="place"
        v-for="place,k in places"
        :position="{ lat: place.lat, lng: place.lng }"
        :clickable="true"
        :draggable="false"
        :icon="{
          url: '../assets/marker.png',
        }"
      >
        <!-- draw a circle around the marker-->
        <GMapCircle
          :key="place"
          :center="{ lat: place.lat, lng: place.lng }"
          :radius="300"
          :options="{
            fillColor: '#84a07c',
            fillOpacity: 0.35,
            strokeWeight: 1
          }"
        >
        </GMapCircle>
        <GMapInfoWindow class="infoWindow"
        :opened = "true"
        :options="{
          pixelOffset: {
            width: 0,
            height: 20,
          },
          maxWidth: 100,
          maxHeigth: 50
        }"
        v-if="getPercentageOfTotalProfitsForEachPlace[k]"
        >
          <div>
            <h1 style="color:black; font-weight: bolder;">{{getPercentageOfTotalProfitsForEachPlace[k]}}</h1>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
    <HomeGraf :apidata="apidata" :selCategory="selCategory" />
    <CategorySelection :categories="getAllCategories" @category-selected="catSelect"
      >test</CategorySelection
    >
  </main>
</template>

<script>
import places_json from '../json/mesta.json'
import mapStyles from '../json/mapStyle.json'
import { color } from 'd3'

export default {
  name: 'HomeView',
  components: {
    HomeGraf,
    TheGrafs,
    CategorySelection
  },
  data() {
    return {
      apidata: null,
      selCategory: 'all',
      places: places_json,
      mapStyles: mapStyles
    }
  },
  async mounted() {
    //wait for this to finish before doing anything else
    await this.getApiData()
    // this.getAllPlaces()

    //get coordinates for all places
  },

  methods: {
    async getApiData() {
      var foundEmptyPage = false
      for (let i = 1; !foundEmptyPage; i++) {
        await fetch('https://trzic.musiclab.si/api/turisticnetakse?page=' + i + '&size=1000')
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if (data.results.length == 0) {
              console.log('empty page')
              foundEmptyPage = true
              return
            }
            if (this.apidata == null) {
              this.apidata = data
              return
            }
            this.apidata.results = this.apidata.results.concat(data.results)
          })
          .catch((error) => {
            console.error('Error fetching API data:', error)
          })
      }
    },

    catSelect(category) {
      // console.log(category)
      return (this.selCategory = category)
    },
    getAllPlaces() {
      //continue when data is loaded
      if (this.apidata == null) {
        return []
      }
      var places = []
      this.apidata.results.forEach((element) => {
        //remove stars at the end of the string
        places.push(element.place)
      })
      var uniquePlaces = [...new Set(places)]
      console.log(uniquePlaces)
      return uniquePlaces
    },

    async getAllCoordinates() {
      //writen in ./Mesta.json
      await fetch('./Mesta.json')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          return data
        })
        .catch((error) => {
          console.error('Error fetching API data:', error)
        })
    }
  },
  computed: {
    getAllCategories() {
      //continue when data is loaded
      if (this.apidata == null) {
        return []
      }
      var categories = []
      this.apidata.results.forEach((element) => {
        //remove stars at the end of the string
        categories.push(element.category.replace(/\*+$/, ''))
      })
      var uniqueCategories = [...new Set(categories)]
      console.log(uniqueCategories)
      return uniqueCategories
    },

    getPercentageOfTotalProfitsForEachPlace() {
      //continue when data is loaded
      if (this.apidata == null) {
        return []
      }
      console.log("Profits calculation debug");
      // console.log(this.apidata.results);
      var places = {}
      if(this.selCategory == 'all'){
        this.apidata.results.forEach((element) => {
          // console.log(element.place);
          if (places[element.place] == undefined) {
            places[element.place] = Number(element.taxes_total)
          } else {
            places[element.place] += Number(element.taxes_total)
          }
        })
      }
      else{
        this.apidata.results.forEach((element) => {
          if (places[element.place] == undefined && element.category.replace(/\*+$/, '') == this.selCategory) {
            places[element.place] = Number(element.taxes_total)
          } else if(element.category.replace(/\*+$/, '') == this.selCategory){
            places[element.place] += Number(element.taxes_total)
          }
        })
      }
      console.log(places)

      var total = 0
      for (const [key, value] of Object.entries(places)) {
        total += value
      }
      console.log(total)

      var percentages = {}
      for (const [key, value] of Object.entries(places)) {
        percentages[key] = ((value / total) * 100).toFixed(1) + '%'
      }
      console.log(percentages)
      return percentages
    }
  }
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.infowindow div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aquamarine;
  color:black;
}
</style>
