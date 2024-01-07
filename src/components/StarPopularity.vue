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

        const margin = { top: 20, right: 20, bottom: 50, left: 50 }
        const width = 1000 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom

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

        svg
            .selectAll('rect')
            .data(Object.entries(data))
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d) => yScale(d[0]))
            .attr('width', (d) => xScale(d[1].cnt))
            .attr('height', yScale.bandwidth())
            .style('fill', '#4CAF50')

        svg
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '-.15em')
            .attr('transform', 'rotate(-45)')

        svg.append('g').call(d3.axisLeft(yScale))

        svg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Number of Stars')

        svg
            .append('text')
            .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Total Number of Nights')
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
