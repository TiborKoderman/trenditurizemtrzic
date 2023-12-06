<!-- ChartOverlay.vue -->
<template>
    <div class="chart-overlay">
      <h3>Graf Podatkov</h3>
      <div class="chart">
      <svg width="300" height="150" ref="chart"></svg>
    </div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    props: {
      data: Array, // Pass data to the overlay
    },
    watch: {
        data: 'drawChart', // Watch for changes in data prop and trigger drawChart method
    },
    mounted() {
      this.drawChart();
    },
    methods: {
       updateChart(newData) {
            // Update the chart when data changes
            this.drawChart(newData);
        },
        
      drawChart() {
        // Your D3.js chart drawing logic here
      // You can access the data using this.apidata.results
      const svg = d3.select(this.$refs.chart);
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
      const height = 150;

      let occupancyData = this.data;

      if (this.drzava && this.leto) {
        // Če sta izbrani država in leto, filtrirajte podatke
        occupancyData = occupancyData.filter(d => d.country_name === this.drzava && d.year === this.leto);
        }
      
      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(occupancyData.map(d => `${d.year}-${d.month}`))
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(occupancyData, d => +d.occupancy)]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.selectAll('*').remove(); // Clear previous chart

      svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      g.append('g')
        .call(yAxis);

      g.selectAll('.bar')
        .data(occupancyData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(`${d.year}-${d.month}`))
        .attr('y', d => yScale(+d.occupancy))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(+d.occupancy))
        .attr('fill', 'steelblue');
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-overlay {
    position: fixed;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 5px;
    border: 2px solid #333;
    border-radius: 20px;
    z-index: 1000;
  }
  
  .chart-overlay h3 {
    margin-bottom: 10px;
  }
  </style>
  