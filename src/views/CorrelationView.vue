<template>
  <main>
    <h1>Correlation</h1>
    <p>
      {{ getTotalRatingsByStar }}
    </p>
  </main>
</template>

<script>
import { computed } from 'vue'

export default {
  data() {
    return {
      apidata: null
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
    getTotalRatingsByStar: function () {
      var totals = {
        1: { cnt: 0, sum: 0 },
        2: { cnt: 0, sum: 0 },
        3: { cnt: 0, sum: 0 },
        4: { cnt: 0, sum: 0 },
        5: { cnt: 0, sum: 0 }
      }
      if (this.apidata == null) {
        return totals
      }
      this.apidata.results.forEach((element) => {
        //count the stars in the string
        let stars = element.category.split('*').length;

        totals[stars].cnt += parseInt(element.nights_total)
        totals[stars].sum += parseFloat(element.taxes_total)
      })
      console.log(totals)

      return totals
    }
  },
  computed: {
    
  }
}
</script>

<style lang="css" scoped>
/* style like an article*/
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 18px;
  display: flex;
  line-height: 1.5;
  color: #fff;
}
</style>
