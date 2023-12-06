<template>
  <!-- <CategorySelection :categories="getAllCategories">test</CategorySelection> -->
  <div class="cont">
    <h2>Pregled Turizma v Tržiču</h2>
    <div class="categ" style="display: flex">
      <div class="categ1" @click="toggle_d = !toggle_d">
        {{ drzava_izbrana ?? 'Država' }}
      </div>
      <div class="dropdown" v-if="toggle_d">
        <a
          class="dropdownElement"
          v-for="drzava in getAllCountries"
          v-bind:key="drzava"
          @click="[(drzava_izbrana = drzava), (toggle_d = !toggle_d)]"
        >
          {{ drzava }}
        </a>
      </div>

      <div class="categ1" @click="toggle_leto">
        {{ leto_izbrano ?? 'Leto' }}
      </div>
      <div class="dropdown" v-if="toggle_l">
        <a
          class="dropdownElement"
          v-for="leto in getAllYears"
          v-bind:key="leto"
          @click="[(leto_izbrano = leto), toggle_leto()]"
        >
          {{ leto }}
        </a>
      </div>

      <!-- <div class="categ1">Kapaciteta (WIP)</div>
      <div class="categ1">...</div>
      <div class="categ1">...</div> -->
    </div>
    <!-- <h2>{{ selCategory }}</h2> -->
    <!-- Mesec: {{ Months[obj.month] }} Leto: {{ obj.year }}<br />
    Skupaj noči: {{ obj.nights_total }}<br />
    davki skupaj: {{ obj.taxes_total }}<br />
    kapaciteta: {{ obj.capacity }}<br />
    zasedenost: {{ obj.occupancy }} %<br />-->

    <div class="displayContent">
      <div style="flex=1;">
        <table v-if="drzava_izbrana != null && leto_izbrano != null" class="statisticalData">
          <tr>
            <td>Skupno število nočitev:</td>
            <td class="value">{{ totalNights(drzava_izbrana, leto_izbrano) }}</td>
          </tr>
          <tr>
            <td>Povprečna zasedenost:</td>
            <td class="value">{{ averageOccupancy(drzava_izbrana, leto_izbrano) }}%</td>
          </tr>
          <tr>
            <td>Vsota davkov:</td>
            <td class="value">{{ taxesTotal(drzava_izbrana, leto_izbrano) }} €</td>
          </tr>
          <tr>
            <td>Skupno število gostov:</td>
            <td class="value">{{ guestsTotal(drzava_izbrana, leto_izbrano) }}</td>
          </tr>
        </table>
      </div>

      <!-- ChartOverlay as an overlay -->
      <ChartOverlay :data="filterData" @close="hideChartOverlay" style="flex=1; " />
    </div>
  </div>
</template>

<script>
import CategorySelection from './CategorySelection.vue'
import ChartOverlay from './ChartOverlay.vue'
import * as d3 from 'd3'

export default {
  name: 'HomeGraf',
  components: { CategorySelection, ChartOverlay },
  data() {
    return {
      showOverlay: false,
      // apidata: null,
      Months: [
        '',
        'Januar',
        'Februar',
        'Marec',
        'April',
        'Maj',
        'Junij',
        'Julij',
        'Avgust',
        'September',
        'Oktober',
        'November',
        'December'
      ],
      obj: '',
      leto_izbrano: null,
      toggle_l: false,
      drzava_izbrana: null,
      toggle_d: false
      // data: null
      // filteredData: null
    }
  },
  props: {
    apidata: Object,
    selCategory: String
  },

  methods: {
    showChartOverlay() {
      // this.filteredData = this.filterData()
      this.showOverlay = true
      this.drawChart()
    },

    hideChartOverlay() {
      this.showOverlay = false
      // Optionally, you can perform any cleanup or reset logic here
    },

    drawChart() {
      // Implement D3.js chart drawing logic using this.apidata.results
      // Ensure this.apidata.results is not null or undefined
      if (this.apidata && this.apidata.results) {
        console.log('Drawing chart with data:', this.apidata.results)
      }
    },

    toggle_leto() {
      this.toggle_l = !this.toggle_l
    },

    getElements(drzava, leto) {
      var elements = []
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto && this.selCategory === 'all') {
          elements.push(element)
        }
      })
      return elements
    },

    totalNights(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto && this.selCategory === 'all') {
          total += Number(element.nights_total)
        } else if (
          element.country_name == drzava &&
          element.year == leto &&
          element.category.startsWith(this.selCategory)
        ) {
          total += Number(element.nights_total)
        }
      })
      return total.toFixed(0)
    },

    averageOccupancy(drzava, leto) {
      var total = 0
      var count = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto && this.selCategory === 'all') {
          total += Number(element.occupancy)
          count++
        } else if (
          element.country_name == drzava &&
          element.year == leto &&
          element.category.startsWith(this.selCategory)
        ) {
          total += Number(element.occupancy)
          count++
        }
      })
      return (total / count).toFixed(2)
    },

    taxesTotal(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto && this.selCategory === 'all') {
          total += Number(element.taxes_total)
        } else if (
          element.country_name == drzava &&
          element.year == leto &&
          element.category.startsWith(this.selCategory)
        ) {
          total += Number(element.taxes_total)
        }
      })
      return total.toFixed(2)
    },

    guestsTotal(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto && this.selCategory === 'all') {
          total += Number(element.guests_total)
        } else if (
          element.country_name == drzava &&
          element.year == leto &&
          element.category.startsWith(this.selCategory)
        ) {
          total += Number(element.guests_total)
        }
      })
      return total.toFixed(0)
    }
  },
  components: {
    ChartOverlay
  },
  computed: {
    barLen() {
      return {
        'background-color': 'aqua',
        'border-radius': '5px',
        height: '10px',
        width: Math.round(this.obj.occupancy) + 'px'
      }
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
    filterData() {
      if (this.apidata == null) return []
      if (this.drzava_izbrana || this.leto_izbrano) {
        // Filtriraj podatke glede na izbrano državo in leto
        return this.apidata.results.filter((element) => {
          if (this.selCategory === 'all') {
            if (this.drzava_izbrana === null) return element.year === this.leto_izbrano
            if (this.leto_izbrano === null) return element.country_name === this.drzava_izbrana
            return (
              element.country_name === this.drzava_izbrana && element.year === this.leto_izbrano
            )
          } else {
            // console.log(this.selCategory);
            if (this.drzava_izbrana === null)
              return (
                element.year === this.leto_izbrano && element.category.startsWith(this.selCategory)
              )
            if (this.leto_izbrano === null)
              return (
                element.country_name === this.drzava_izbrana &&
                element.category.startsWith(this.selCategory)
              )
            return (
              element.country_name === this.drzava_izbrana &&
              element.year === this.leto_izbrano &&
              element.category.startsWith(this.selCategory)
            )
          }
        })
      } else {
        // Če ni izbrana ne država ne leto, vrni celoten seznam podatkov
        return this.apidata.results
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  position: absolute;
  width: 50em;
  height: 35em;
  // border : 1px solid gray;
  background-blend-mode: darken;
  opacity: 100%;
  color: white;
  font-weight: bolder;
  top: 5vh;
  left: 5vw;
  // z-index: 999;
  margin: 4rem;
  padding: 2rem;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.374);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

h2 {
  margin: 2%;
  font-size: 46px;
}

.categ1 {
  flex: 1;
  font-size: large;
  font-weight: bold;
  border: 1px solid darkorange;
  padding: 2px 35px 2px 20px;
  background-color: darkorange;
  border-radius: 18px;
  margin: 10px;
}

.categ1:hover {
  background-color: white;
  color: darkorange;
  border: 1px solid darkorange;
  cursor: pointer;
}

//dropdown menu
.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10vh;
  left: 10vw;
  background-color: rgb(36, 36, 36);
  border: 1px solid orange;
  border-radius: 5px;
  padding: 10px;
  z-index: 999;

  //maxiumum height of dropdown and add scroll
  max-height: 20vh;
  overflow-y: scroll;
}

.dropdownElement {
  margin: 5px;
  padding: 5px;
  border: 1px solid darkorange;
  border-radius: 18px;
  background-color: darkorange;
  color: white;

  // //maxiumum height of dropdown and add scroll
  // max-height: 20vh;
  // overflow-y: scroll;
}

.categ {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.dropdownElement:hover {
  background-color: white;
  color: darkorange;
  border: 1px solid darkorange;
  cursor: pointer;
}

.statisticalData {
  padding: 10px;
  display: inline-block;

  //maxiumum height of dropdown and add scroll
  // max-height: 20vh;
  // overflow-y: scroll;
  font-weight: bold;
  color: white;
}

//align the text to the right
.statisticalData a {
  text-align: right;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  color: white;
}

.statisticalData td {
  margin: 5px;
  padding: 5px;
  font-weight: bold;
}
.statisticalData .value {
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  margin: 5px;
  border: 1px solid azure;
  border-radius: 18px;
  background-color: azure;
  color: black;
}
.chart {
  display: inline-block;
  //occupy all the space left
  flex: 1 1 auto;

  //maxiumum height of dropdown and add scroll
  // max-height: 20vh;
  // overflow-y: scroll;
}

.displayContent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
}
</style>
