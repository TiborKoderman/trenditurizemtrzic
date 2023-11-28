<template>
  <div class="cont">
    <h2>Pregled Turizma v Tržiču</h2>
    <div class="categ" style="display: flex">
      <div class="categ1" @click="toggle_d = !toggle_d">{{ drzava_izbrana ?? 'Država' }}</div>
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

      <div class="categ1" @click="toggle_leto">{{ leto_izbrano ?? 'Leto' }}</div>
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

      <div class="categ1">Kapaciteta (WIP)</div>
      <div class="categ1">...</div>
      <div class="categ1">...</div>
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

      <div class="chart">
      </div>

    </div>
    <!-- <a href="https://trzic.musiclab.si/api/turisticnetakse?page=1&size=1000">Prenesi podatke</a> -->
    
    <!-- <div style="background-color: aliceblue; border-radius: 5px; height: 10px; width: 200px">
      <div :style="barLen"></div>
      <p>zasedenost za ta mesec</p>
      <p>...</p>
    </div> -->
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HomeGraf',
  data() {
    return {
      apidata: null,
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
    }
  },
  mounted() {
    this.getApiData()
  },
  methods: {
    getApiData() {
      //GET
      fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=1000')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // this.obj = data.results[0]
          this.data = data.results
          // console.log(this.obj)
        })
        .then((data) => {
          return data
        })
    },

    toggle_leto() {
      this.toggle_l = !this.toggle_l
    },

    getElements(drzava, leto) {
      var elements = []
      this.data.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          elements.push(element)
        }
      })
      return elements
    },

    totalNights(drzava, leto) {
      var total = 0
      this.data.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.nights_total)
        }
      })
      return total.toFixed(2)
    },

    averageOccupancy(drzava, leto) {
      var total = 0
      var count = 0
      this.data.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.occupancy)
          count++
        }
      })
      return (total / count).toFixed(2)
    },

    taxesTotal(drzava, leto) {
      var total = 0
      this.data.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.taxes_total)
        }
      })
      return total.toFixed(2)
    },

    guestsTotal(drzava, leto) {
      var total = 0
      this.data.forEach((element) => {
        if (element.country_name == drzava && element.year == leto) {
          total += Number(element.guests_total)
        }
      })
      return total.toFixed(0)
    }
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
      this.data.forEach((element) => {
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
      this.data.forEach((element) => {
        countries.push(element.country_name)
      })
      var uniqueCountries = [...new Set(countries)]
      console.log(uniqueCountries)
      return uniqueCountries
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
  background-color: white;
  border: 1px solid orange;
  border-radius: 18px;
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
</style>