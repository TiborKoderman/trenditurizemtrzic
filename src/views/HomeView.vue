<script setup>
import HomeGraf from '../components/HomeGraf.vue'
import TheGrafs from '../components/TheGrafs.vue'
import CategorySelection from '../components/CategorySelection.vue'
import percentageIncreaseFromZero from '../components/percentageIncreaseFromZero.vue'
import numberIncreaseFromZero from '../components/numberIncreaseFromZero.vue'
</script>

<template>
  <main>
    <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace"
      style="position: absolute; z-index: 2; font-size: medium; top: 10%; right: 10%; padding: 1%">
    </GMapAutocomplete>
    <GMapMap :center="{ lat: 46.36206953456084, lng: 14.245336492747152 }" :zoom="13" style="width: 100vw; height: 100vh"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: mapStyles
      }">
      <GMapMarker :key="place" v-for="(place, k) in places" :position="{ lat: place.lat, lng: place.lng }"
        :clickable="true" :draggable="false" :icon="{
          url: markerImg
        }">
        <!-- draw a circle around the marker-->
        <GMapCircle :key="place" :center="{ lat: place.lat, lng: place.lng }" :radius="300" :options="{
          fillColor: '#84a07c',
          fillOpacity: 0.35,
          strokeWeight: 1
        }" v-if="getPercentageOfTotalProfitsForEachPlace[k]">
        </GMapCircle>
        <GMapInfoWindow class="infoWindow" :opened="true" :options="{
          pixelOffset: {
            width: 0,
            height: -10
          },
          maxWidth: 110,
          maxHeigth: 50
        }" v-if="getPercentageOfTotalProfitsForEachPlace[k]">
          <percentageIncreaseFromZero :number="getPercentageOfTotalProfitsForEachPlace[k]"
            style="color: black; font-weight: bolder">
            <!-- <h1 style="color:black; font-weight: bolder;">{{getPercentageOfTotalProfitsForEachPlace[k]}}</h1> -->
          </percentageIncreaseFromZero>
          <p style="font-size: smaller;">
            <numberIncreaseFromZero :number="totals[k]" style="color: black;">
            </numberIncreaseFromZero>
          </p>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
    <HomeGraf :apidata="apidata" :selCategory="selCategory" @leto-izbrano="(val) => {
      leto_izbrano = val
      console.log(leto_izbrano)
    }
      " @drzava-izbrana="(val) => {
    drzava_izbrana = val
    console.log(drzava_izbrana)
  }
    " />
    <CategorySelection :categories="getAllCategories" @category-selected="catSelect">test</CategorySelection>
  </main>
</template>

<script>
import { ref } from 'vue';
import places_json from '../json/mesta.json'
import mapStyles from '../json/mapStyle.json'
import markerImg from '../assets/marker.png'

const places = ref(places_json);
const selectedLocation = ref(null);

export default {
  name: 'HomeView',
  components: {
    HomeGraf,
    TheGrafs,
    CategorySelection,
    percentageIncreaseFromZero,
    numberIncreaseFromZero
  },
  data() {
    return {
      apidata: null,
      selCategory: 'all',
      places: places_json,
      mapStyles: mapStyles,
      openMarkers: [],
      leto_izbrano: null,
      drzava_izbrana: null,
      totals: {}
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

    openAllMarkers() {
      this.openMarkers = []
      places.value.forEach((place) => {
        this.openMarkers.push(place.name)
      })
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
    },
    setPlace(place) {
      console.log(place)
      // Postavitev lokacije na podlagi izbranega kraja
      place.lat = place.geometry.location.lat();
      place.lng = place.geometry.location.lng();

      // Poišči izbrane podatke o mestu iz mesta.json
      const selectedPlaceData = places.value[place.name];

      // Posodobi seznam mest, da vsebuje le izbrano lokacijo
      places.value = [{ name: place.name, lat: selectedPlaceData.lat, lng: selectedPlaceData.lng }];

      console.log(places.value);
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
      // console.log('Profits calculation debug')
      // console.log(this.apidata.results);
      var places = {}

      var results = this.apidata.results

      if (this.leto_izbrano != null) {
        results = results.filter((d) => d.year === this.leto_izbrano)
      }
      if (this.drzava_izbrana != null) {
        results = results.filter((d) => d.country_name === this.drzava_izbrana)
      }

      if (this.selCategory == 'all') {
        results.forEach((element) => {
          // console.log(element.place);
          if (places[element.place] == undefined) {
            places[element.place] = Number(element.taxes_total)
          } else {
            places[element.place] += Number(element.taxes_total)
          }
        })
      } else {
        results.forEach((element) => {
          if (
            places[element.place] == undefined &&
            element.category.replace(/\*+$/, '') == this.selCategory
          ) {
            places[element.place] = Number(element.taxes_total)
          } else if (element.category.replace(/\*+$/, '') == this.selCategory) {
            places[element.place] += Number(element.taxes_total)
          }
        })
      }
      console.log(places)

      var total = 0
      for (const [key, value] of Object.entries(places)) {
        total += value
      }
      // console.log(total)

      var percentages = {}
      for (const [key, value] of Object.entries(places)) {
        percentages[key] = Number((value / total) * 100).toFixed(1)
      }
      var totals = {}
      for (const [key, value] of Object.entries(places)) {
        totals[key] = Number(value).toFixed(1)
      }
      this.totals = totals
      // console.log(percentages)
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

.infowindow div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aquamarine;
  color: black;
}
</style>
