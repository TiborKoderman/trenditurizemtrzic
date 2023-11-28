<template>
    <div class="cont">
        <div>
            <p>Zasedenost skozi mesece</p>
            <svg width="300" height="150" ref="chart"></svg>
        </div>
    </div>
  </template>
  
  <script>
import * as d3 from 'd3';

export default {
  name: 'TheGrafs',
  data() {
    return {
      apidata: null,
      obj: '',
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    getApiData() {
  fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=1000')
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the entire API response
      this.apidata = data;
      this.drawChart();
    })
    .catch((error) => {
      console.error('Error fetching API data:', error);
    });
},
    drawChart() {
    
      const svg = d3.select(this.$refs.chart);
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      const occupancyData = this.apidata.results;
      console.log(occupancyData[100])
      const xScale = d3
        .scaleTime()
        .range([0, width])
        .domain(d3.extent(occupancyData, (d) => new Date(`${d.year}-${d.month}`)));

      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(occupancyData, (d) => +d.occupancy)]);


      const line = d3
        .line()
        .x((d) => xScale(new Date(`${d.year}-${d.month}`)))
        .y((d) => yScale(+d.occupancy));


        const path = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .append('path')
        .data([occupancyData])
        .attr('class', 'line')
        .attr('d', line)
        .attr('stroke', 'orange') // Set the stroke color here
        .attr('stroke-dasharray', function () {
          const length = this.getTotalLength();
          return `${length} ${length}`;
        })
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength();
        })
        .transition()
        .duration(2000) // Adjust the duration as needed
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    },
    computed: {
    },
  },
};
  
  function getApiData() {
    fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
  </script>
  
  <style lang="scss" scoped>
  .cont {
    position: absolute;
    width: 25em;
    height: 17em;
    // border : 1px solid gray;
    background-blend-mode: darken;
    opacity: 100%;
    color: white;
    font-weight: bolder;
    top: 50vh;
    left: 35vw;
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

  svg {
  width: 100%;
  height: 100%;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
  
  </style>
  