<template>
    <div id="tax-bar-chart">{{ taxBarChart }}</div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    async mounted() {
      this.drawTaxBarChart();
    },
    methods: {
      async drawTaxBarChart() {
        try {
          if(!this.data) {
            return "";
          }
          const data = this.data;
  
          const margin = { top: 20, right: 20, bottom: 50, left: 50 };
          const width = 600 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;
          if (document.getElementById('tax-bar-chart').innerHTML != '') {
            document.getElementById('tax-bar-chart').innerHTML = '';
          }
          const svg = d3
            .select('#tax-bar-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
  
          const xScale = d3
            .scaleBand()
            .domain(Object.keys(data))
            .range([0, width])
            .padding(0.1);
  
          const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(Object.values(data), (d) => d.sum)])
            .range([height, 0]);
  
          svg.selectAll('rect')
            .data(Object.entries(data))
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d[0]))
            .attr('y', (d) => yScale(d[1].sum))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => height - yScale(d[1].sum))
            .style('fill', '#4CAF50');
  
          svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '-.15em')
            .attr('transform', 'rotate(-45)');
  
          svg.append('g')
            .call(d3.axisLeft(yScale));
  
          svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Total Taxes');
  
          svg.append('text')
            .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Stars');
            return "svg";
        } catch (error) {
          // console.error('Error in drawTaxBarChart:', error);
        }
      },
    },
    computed: {
      taxBarChart() {
        return this.drawTaxBarChart();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  