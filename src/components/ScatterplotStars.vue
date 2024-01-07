<template>
    <div id="scatterplotstars"></div>
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
        this.drawScatterplot();
    },
    methods: {
        drawScatterplot() {
            try {
                console.log("pridem sem")
                const data = this.data;
                console.log(data)

                /*for (const country in data) {
                    if (Object.prototype.hasOwnProperty.call(data, country)) {
                        const countryData = data[country];
                        const avgValue = countryData.avg;
                        const incomeValue = countryData.income;
                        // Use avgValue and incomeValue as needed
                    }
                }*/

                const margin = { top: 20, right: 20, bottom: 50, left: 50 };
                const width = 600 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                const svg = d3
                    .select('#scatterplotstars')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                const xScale = d3
                    .scaleLinear()
                    .domain([0, d3.max(Object.values(data), (d) => d.income)])
                    .range([0, width]);

                const yScale = d3
                    .scaleLinear()
                    .domain([0, d3.max(Object.values(data), (d) => d.avg)])
                    .range([height, 0]);

                const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Choose a color scale


                svg.selectAll('circle')
                    .data(Object.entries(data))
                    .enter()
                    .append('circle')
                    .attr('cx', (d) => xScale(d[1].income))
                    .attr('cy', (d) => yScale(d[1].avg))
                    .attr('r', 5)
                    .style('fill', (d) => colorScale(d[0]));

                svg.selectAll('text')
                    .data(Object.entries(data))
                    .enter()
                    .append('text')
                    .attr('x', (d) => xScale(d[1].income) + 5) // Adjust position for better visibility
                    .attr('y', (d) => yScale(d[1].avg))
                    .text((d) => d[0]) // Use country name as text
                    .style('font-size', '14px')
                    .style('fill', '#f0f0f0')


                svg.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale));

                svg.append('g')
                    .call(d3.axisLeft(yScale));

                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 0 - margin.left)
                    .attr('x', 0 - height / 2)
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text('Avg. Št. Zvezdic');

                svg.append('text')
                    .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
                    .style('text-anchor', 'middle')
                    .text('Avg. Dohodek na Prebivalca');
            } catch (error) {
                console.error('Error in drawScatterplot:', error);
            }
        },
    },

};
</script>
  
<style scoped>
</style>
  