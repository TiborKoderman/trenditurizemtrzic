<template>
  <div class="cont">
    <h2>Pregled Turizma v Tržiču</h2>
    <div class="categ" style="display:flex">
            <div class="categ1">Leto</div>
            <div class="categ1">Država</div>
            <div class="categ1">Kapaciteta</div>
            <div class="categ1">...</div>
            <div class="categ1">...</div>
    </div>
    <h2></h2>
        Mesec: {{obj.month}}  Leto: {{ obj.year }}<br>
        Skupaj noči: {{ obj.nights_total }}<br>
        davki skupaj: {{ obj.taxes_total }}<br>
        kapaciteta: {{ obj.capacity }}<br>
        zasedenost: {{ obj.occupancy }} %<br>
    <h2></h2>
        
    <!-- <div id="mydataviz">
      {{ drawPercentOccupancy(obj.occupancy) }}
    </div> -->

    <div style="background-color:aliceblue; border-radius: 5px; height: 10px; width: 200px;">
        <div :style="barLen"></div>
        <p>zasedenost za ta mesec</p>
        <p>...</p>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HomeGraf',
  data() {
    return {
      apidata: null,
      obj: ''
    }
  },
  mounted() {
    this.getApiData()
  },
  methods: {
    getApiData() {
      //GET
      //'https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100'
      //return data
      fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.obj = data.results[0]
          console.log(this.obj)
        })
        .then((data) => {
          return data
        })
    },
    drawPercentOccupancy(percentage) {
      //use d3 to draw a piechart
      var svg = document
        .createElement('svg')
        .attr('width', 100)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

      var data = { occ: 3, nocc: 97 }
      var color = d3
        .scaleOrdinal()
        .domain(data)
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

      var pie = d3.pie().value(function (d) {
        return d.value
      })
      var data_ready = pie(d3.entries(data))

      svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

      return svg
    }
  },
  computed: {
    monthName(number) {},
    barLen(){
        return{
            "background-color": "aqua",
            "border-radius": "5px",
            "height": "10px",
            "width": Math.round(this.obj.occupancy) + "px"
        }
    },
    occupancy2decimals(){
        let frmt = (this.obj.occupancy).toFixed(2);
        return frmt;
    }
  }
}

function getApiData() {
  //GET
  //'https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100'
  //return data
  fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
    .then((response) => response.json())
    .then((data) => console.log(data))
}
</script>

<style lang="scss" scoped>
.cont {
  position: absolute;
  width: 50em;
  height: 35em;
  // border : 1px solid gray;
  background-blend-mode: darken;
  opacity: 90%;
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

h2{
    margin: 2%;
    font-size: 46px;
}

.categ1{
    flex: 1 1 auto;
    font-size: large;
    border: 1px solid orange;
    padding: 2px 35px 2px 20px;
    background-color: orange;
    border-radius: 18px;
    margin: 10px;
}

</style>
