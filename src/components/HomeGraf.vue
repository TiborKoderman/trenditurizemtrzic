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
    <h2></h2>
    <!-- Mesec: {{ Months[obj.month] }} Leto: {{ obj.year }}<br />
    Skupaj noči: {{ obj.nights_total }}<br />
    davki skupaj: {{ obj.taxes_total }}<br />
    kapaciteta: {{ obj.capacity }}<br />
    zasedenost: {{ obj.occupancy }} %<br />-->

    <div v-if="drzava_izbrana != null && leto_izbrano != null">
      <div class="statisticalData">
        <p>
          Skupno število nočitev:
          <a
            ><a>{{ totalNights(drzava_izbrana, leto_izbrano) }}</a></a
          >
        </p>
        <p>
          Povprečna zasedenost: <a>{{ averageOccupancy(drzava_izbrana, leto_izbrano) }}%</a>
        </p>
        <p>
          Vsota davkov: <a>{{ taxesTotal(drzava_izbrana, leto_izbrano) }} €</a>
        </p>
        <p>
          Skupno število gostov: <a>{{ guestsTotal(drzava_izbrana, leto_izbrano) }}</a>
        </p>
      </div>
    </div>
    <!-- <a href="https://trzic.musiclab.si/api/turisticnetakse?page=1&size=1000">Prenesi podatke</a> -->

    <!-- <div style="background-color: aliceblue; border-radius: 5px; height: 10px; width: 200px">
      <div :style="barLen"></div>
      <p>zasedenost za ta mesec</p>
      <p>...</p>
    </div> -->

    <div class="chart">
      <button @click="showChartOverlay">Prikaži Graf</button>
      <button @click="hideChartOverlay" v-if="showOverlay">Skrij Graf</button>
    </div>

    <!-- ChartOverlay as an overlay -->
    <ChartOverlay v-if="showOverlay" :data="filteredData" @close="hideChartOverlay" />
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
      toggle_d: false,
      // data: null
      filteredData: null
    }
  },
  props: {
    apidata: Object,
    selCategory: String
  },

  methods: {
    showChartOverlay() {
      this.filteredData = this.filterData()
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
    filterData() {
      if (this.drzava_izbrana && this.leto_izbrano) {
        // Filtriraj podatke glede na izbrano državo in leto
        return this.apidata.results.filter(
          (element) =>
            element.country_name === this.drzava_izbrana && element.year === this.leto_izbrano
        )
      } else {
        // Če ni izbrana ne država ne leto, vrni celoten seznam podatkov
        return this.apidata.results
      }
    },

    toggle_leto() {
      this.toggle_l = !this.toggle_l
    },

    getElements(drzava, leto) {
      var elements = []
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          elements.push(element)
        }
      })
      return elements
    },

    totalNights(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.nights_total)
        }
      })
      return total.toFixed(2)
    },

    averageOccupancy(drzava, leto) {
      var total = 0
      var count = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.occupancy)
          count++
        }
      })
      return (total / count).toFixed(2)
    },

    taxesTotal(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.taxes_total)
        }
      })
      return total.toFixed(2)
    },

    guestsTotal(drzava, leto) {
      var total = 0
      this.apidata.results.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
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
    getAllCategories() {
      //continue when data is loaded
      if (this.data == null) {
        return []
      }
      var categories = []
      this.data.forEach((element) => {
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
  z-index: 999;
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
  flex: 1 1 auto;
  font-size: large;
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

.categ{
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
.statisticalData p {
  margin: 5px;
  padding: 5px;
  font-weight: bold;
}
.statisticalData a {
  margin: 5px;
  padding: 5px;
  font-weight: bold;
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

.categoryContainer {
  //display at the top of the page
  position: absolute;
  top: 0;
  width: 100%;
  // height: 100px;
  // background-color: red;
  z-index: 999;

  //center the text
  text-align: center;
}
</style>
