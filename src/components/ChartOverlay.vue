<!-- ChartOverlay.vue -->
<template>
  <div class="chart-overlay">
    <!-- <h3>Graf Podatkov</h3> -->
    <div class="chart">
      <svg width="350" height="200" ref="chart"></svg>
      <div class="chart-description">
      </div>
    </div>
  </div>
</template>
  
<script>
import * as d3 from 'd3';

export default {
  props: {
    data: Array, // Pass data to the overlay
    leto_izbrano: String,
    drzava_izbrana: String

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
      const margin = { top: 20, right: 10, bottom: 30, left: 30 };
      const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
      const height = 200;


      let occupancyData = this.data;
      console.log('drzava: ', this.drzava_izbrana);
      console.log('leto: ', this.leto_izbrano);

      if (this.drzava_izbrana && this.leto_izbrano) {
        console.log("imam podatke države in leta")
        // Če sta izbrani država in leto, filtrirajte podatke
        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(occupancyData.map(d => `${d.year}-${d.month}`))
          .padding(0.1);

        const yScale = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(occupancyData, d => +d.occupancy)]);

        let xAxis = d3.axisBottom(xScale).tickFormat(d => {
          const [year, month] = d.split('-');
          // Construct a valid date string using ISO format
          const dateString = `${year}-${month.padStart(2, '0')}-01`;
          const date = new Date(dateString);
          return date.toLocaleString('default', { month: 'short' });
        });

        const yAxis = d3.axisLeft(yScale);

        svg.selectAll('*').remove(); // Clear previous chart

        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
        // svg.attr('stroke', 'orange')
        svg.attr('fill', '#b7dbad')


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
          .attr('y', height)
          .attr('width', xScale.bandwidth())
          .attr('height', 0)
          .attr('fill', '#b7dbad')
          .transition()
          .duration(2000)
          .attr('y', d => yScale(+d.occupancy))
          .attr('height', d => height - yScale(+d.occupancy));


      } else if (!this.leto_izbrano) {
        const uniqueYears = Array.from(new Set(occupancyData.map(d => d.year)));
        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(occupancyData.map(d => `${d.year}-${d.month}`))
          .padding(0.1);

        const yScale = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(occupancyData, d => +d.occupancy)]);

        let xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => {
          const [year, month] = d.split('-'); // Splitting the string into year and month
          return i % Math.ceil(xScale.domain().length / uniqueYears.length) === 0 || uniqueYears.includes(+year);
        }))
          .tickFormat(d => {
            const [year, month] = d.split('-'); // Splitting the string into year and month
            const date = new Date(year, +month - 1); // Month is 0-indexed in JavaScript Date
            return date.toLocaleString('default', { year: 'numeric' });
          });

        const yAxis = d3.axisLeft(yScale);

        svg.selectAll('*').remove(); // Clear previous chart

        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
        // svg.attr('stroke', 'orange')
        svg.attr('fill', '#b7dbad')


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
          .attr('y', height)
          .attr('width', xScale.bandwidth())
          .attr('height', 0)
          .attr('fill', '#b7dbad')
          .transition()
          .duration(2000)
          .attr('y', d => yScale(+d.occupancy))
          .attr('height', d => height - yScale(+d.occupancy));
      } else {
        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(occupancyData.map(d => `${d.year}-${d.month}`))
          .padding(0.1);

        const yScale = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(occupancyData, d => +d.occupancy)]);

        let xAxis = d3.axisBottom(xScale).tickFormat(d => {
          const [year, month] = d.split('-');
          // Construct a valid date string using ISO format
          const dateString = `${year}-${month.padStart(2, '0')}-01`;
          const date = new Date(dateString);
          return date.toLocaleString('default', { month: 'short' });
        });

        const yAxis = d3.axisLeft(yScale);

        svg.selectAll('*').remove(); // Clear previous chart

        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
        // svg.attr('stroke', 'orange')
        svg.attr('fill', '#b7dbad')


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
          .attr('y', height)
          .attr('width', xScale.bandwidth())
          .attr('height', 0)
          .attr('fill', '#b7dbad')
          .transition()
          .duration(2000)
          .attr('y', d => yScale(+d.occupancy))
          .attr('height', d => height - yScale(+d.occupancy));

      }


    },
  },
};
</script>
  
<style scoped>
.chart-overlay {
  /* display: inline-block; */
  color: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 20px;
  /* align to the right */
}

.chart h3 {
  margin-bottom: 10px;
}

.chart-description {
  text-align: center;
}
</style>
  