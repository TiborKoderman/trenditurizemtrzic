<script setup>
import HomeGraf from '../components/HomeGraf.vue'
import TheGrafs from '../components/TheGrafs.vue'
import CategorySelection from '../components/CategorySelection.vue';

</script>

<template>
  <main>
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
    <HomeGraf :apidata="apidata" :selCategory="selCategory"/>
    <CategorySelection :categories="getAllCategories" @category-selected="catSelect">test</CategorySelection>
    <!-- <TheGrafs></TheGrafs> -->
  </main>
</template>

<script>
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
      selCategory: "all"
    }
  },
  async mounted() {
    //wait for this to finish before doing anything else
    await this.getApiData()
  },

  methods: {
    async getApiData() {
      fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=1000')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.apidata = data
        })
        .catch((error) => {
          console.error('Error fetching API data:', error)
        })
    },

    catSelect(category) {
      // console.log(category)
      return this.selCategory = category
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


</style>