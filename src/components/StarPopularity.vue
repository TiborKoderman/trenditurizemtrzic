<template>
  <div id="star-popularity-chart">{{ starPopularityChart }}</div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.drawStarPopularityChart();
  },
  methods: {
    drawStarPopularityChart() {
      try {
        if (!this.data) {
          return ''
        }
        const data = this.data
        console.log('Data:', data)

        const margin = { top: 20, right: 20, bottom: 60, left: 50 }
        const width = 900 - margin.left - margin.right
        const height = 480 - margin.top - margin.bottom

        //create svg element
        // var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');

        if (document.getElementById('star-popularity-chart').innerHTML != '') {
          document.getElementById('star-popularity-chart').innerHTML = ''
        }

        const svg = d3
          .select('#star-popularity-chart')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`)
        const xScale = d3
          .scaleLinear()
          .domain([0, d3.max(Object.entries(data), ([stars, { cnt }]) => cnt)])
          .range([0, width])

        const yScale = d3.scaleBand().domain(Object.keys(data)).range([0, height]).padding(0.1)

        const tooltip = d3.select('#tax-bar-chart')
          .append('div')
          .style('position', 'absolute')
          .style('visibility', 'hidden')
          .style('background-color', 'rgba(0, 0, 0, 0.8)')
          .style('padding', '5px')
          .style('border', '1px solid #333')
          .style('border-radius', '5px');

        svg
          .selectAll('rect')
          .data(Object.entries(data))
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', (d) => yScale(d[0]))
          .attr('width', (d) => xScale(d[1].cnt))
          .attr('height', yScale.bandwidth())
          .style('fill', '#84a07c')
          .on('mouseover', function (event, d) {
            // Dodajte kvadratek ob premiku miške
            d3.select(this)
              .style('fill', 'rgba(68, 90, 61, 0.8)');

            tooltip.html(`Skupno št. noči: ${d[1].cnt}`)
              .style('visibility', 'visible');
          })
          .on('mousemove', function (event) {
            // Premikajte tooltip z miško
            tooltip.style('top', (event.pageY - 10) + 'px')
              .style('left', (event.pageX + 10) + 'px');
          })
          .on('mouseout', function () {
            // Odstranite kvadratek in skrijte tooltip ob premiku miške
            d3.select(this)
              .style('fill', '#84a07c');

            tooltip.style('visibility', 'hidden');
          });

        svg
          .append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(xScale))
          .selectAll('text')
          .style('font-size', '13px')
          .style('text-anchor', 'end')
          .attr('dx', '1.5em')
          .attr('dy', '1.15em')

        svg.append('g')
          .call(d3.axisLeft(yScale))
          .style('font-size', '14px')

        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - height / 2)
          .attr('dy', '1em')
          .style('fill', '#fff')
          .style('text-anchor', 'middle')
          .text('Število zvezdic')

        svg
          .append('text')
          .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
          .attr('dy', '0.8em')
          .style('text-anchor', 'middle')
          .style('fill', '#fff')
          .text('Skupno število noči')
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
  },
  computed: {
    starPopularityChart() {
      return this.drawStarPopularityChart()
    }
  }
}
</script>

<style scoped>
/* Add styles if needed */
</style>
