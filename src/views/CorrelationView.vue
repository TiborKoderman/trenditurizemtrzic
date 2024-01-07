<template>
  <main>
    <h1>Correlation</h1>
    <p>
      {{ get }}
    </p>
    <h2>Popularnost kvalitete ustanove</h2>
    <p>
      <!-- TODO: Make graphs -->
      {{ totalRatingsByStar }} 
    </p>
    <h2>Povprečna kvaliteta ustanove glede na državo</h2>
    <p>
      {{ averageStarsByCountry }}
    </p>
    <h2>
      Korelacija med povprečno kvaliteto ustanove in povprečnim dohodkom na prebivalca
    </h2>
    <p>
      {{ mapAvgStarsWithIncomeC }}
    </p>
  </main>
</template>

<script>
import { computed } from 'vue'
import median_income_json from '../json/median-income.json'
import countryNameTransl from '../json/countryNameTransl.json'
import { median } from 'd3'


export default {
  data() {
    return {
      apidata: null,
      median_income: median_income_json,
      countryNameTransl: countryNameTransl
    }
  },
  async mounted() {
    //wait for this to finish before doing anything else
    await this.getApiData()
    // this.getAllPlaces()
    this.getAllCountries()
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
    },

    getStarsByCountry() {

      var countries = {

      }
      if (this.apidata == null) {
        return countries
      }
      this.apidata.results.forEach((element) => {
        //count the stars in the string

        if(countries[element.country_name] == null){
          countries[element.country_name] = {
            1: { cnt: 0, sum: 0 },
            2: { cnt: 0, sum: 0 },
            3: { cnt: 0, sum: 0 },
            4: { cnt: 0, sum: 0 },
            5: { cnt: 0, sum: 0 }
          }
        }
        let stars = element.category.split('*').length;

        countries[element.country_name][stars].cnt += parseInt(element.nights_total)
        countries[element.country_name][stars].sum += parseFloat(element.taxes_total)
      })
      console.log(countries)

      return countries
    },
    getAverageStarsByCountry(){
      var totals = this.getStarsByCountry();

      var avgs = {}
      for (const [key, value] of Object.entries(totals)) {
        avgs[key] = (1*value[1].cnt + 2*value[2].cnt + 3*value[3].cnt + 4*value[4].cnt + 5*value[5].cnt)/(value[1].cnt + value[2].cnt + value[3].cnt + value[4].cnt + value[5].cnt)
      }
      console.log(avgs)
      return avgs
    },

    getCountryData(country){
      var data = this.median_income
      //find object where "country" property is equal to country
      var found = data.find(function(element) {
        return element.country == country;
      });

      return found
    },

    mapAvgStarsWithIncome(){
      if (this.apidata == null) {
        return {}
      }
      var avgs = this.getAverageStarsByCountry()
      var income = this.median_income
      var mapped = {}
      for (const [key, value] of Object.entries(avgs)) {
        let translatedKey = this.countryNameTransl[key]
        mapped[key] = {
          avg: value,
          income: this.getCountryData(translatedKey)?.medianIncomeByCountry_medianIncome
        }
      }
      console.log(mapped)
      return mapped
    },



    getAllYears() {
      //unique array of years
      var years = []
      this.apidata.results.forEach((element) => {
        years.push(element.year)
      })
      var uniqueYears = [...new Set(years)]
      //sort descending
      uniqueYears.sort(function (a, b) {
        return b - a
      })

      console.log(uniqueYears)
      return uniqueYears
    },

    getAllCountries() {
      //unique array of countries
      var countries = []
      this.apidata.results.forEach((element) => {
        countries.push(element.country_name)
      })
      var uniqueCountries = [...new Set(countries)]
      console.log(uniqueCountries)
      return uniqueCountries
    },

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

  },
  computed: {
    totalRatingsByStar: function () {
      return this.getTotalRatingsByStar()
    },
    starsByCountry: function () {
      return this.getStarsByCountry()
    },
    averageStarsByCountry: function(){
      return this.getAverageStarsByCountry()
    },

    mapAvgStarsWithIncomeC: function(){
      return this.mapAvgStarsWithIncome()
    }
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
