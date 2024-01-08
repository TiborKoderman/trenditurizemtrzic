<template>
    <div id="bar-chart"></div>
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
        this.drawBarChart();
    },
    methods: {
        drawBarChart() {
            try {
                const data = this.data;
                console.log('Data:', data);

                const margin = { top: 20, right: 20, bottom: 120, left: 60 };
                const width = 1000 - margin.left - margin.right;
                const height = 500 - margin.top - margin.bottom;

                const svg = d3
                    .select('#bar-chart')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                const yScale = d3
                    .scaleLinear()
                    .domain([0, d3.max(Object.values(data))])  // Adjusted yScale domain
                    .range([height, 0]);

                const xScale = d3
                    .scaleBand()
                    .domain(Object.keys(data))
                    .range([0, width])
                    .padding(0.1);

                // Dodajte spodnji del kode v vašo komponento črtastega grafa (bar-chart)

                // Ustvarite tooltip element
                const tooltip = d3.select('#bar-chart')
                    .append('div')
                    .style('position', 'absolute')
                    .style('visibility', 'hidden')
                    .style('background-color', 'rgba(0, 0, 0, 0.8)')
                    .style('padding', '5px')
                    .style('border', '1px solid #333')
                    .style('border-radius', '5px');

                svg.selectAll('rect')
                    .data(Object.entries(data))
                    .enter()
                    .append('rect')
                    .attr('x', (d) => xScale(d[0])) // Bars start from the left side
                    .attr('y', (d) => yScale(d[1]))
                    .attr('width', xScale.bandwidth())
                    .attr('height', (d) => height - yScale(d[1]))
                    .style('fill', '#84a07c')
                    .on('mouseover', function (event, d) {
                        // Dodajte kvadratek ob premiku miške
                        d3.select(this)
                            .style('fill', 'rgba(68, 90, 61, 0.8)');

                        const [country, stars] = d;

                        tooltip.html(`${country}: ${stars.toFixed(3)}`)
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


                svg.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale))
                    .selectAll('text')
                    .style('text-anchor', 'end')
                    .style('font-size', '12px')
                    .style('fill', '#fff')
                    .attr('dx', '-.8em')
                    .attr('dy', '-.35em')
                    .attr('transform', 'rotate(-45)');

                svg.append('g')
                    .style('font-size', '12px')
                    .call(d3.axisLeft(yScale));

                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 0 - margin.left)
                    .attr('x', 0 - height / 2)
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .style('fill', '#fff')
                    .text('Povprečno število zvezdic');

            } catch (error) {
                console.error('Error in drawBarChart:', error);
            }
        },
    },

};
</script>

<style scoped>
/* Add styles if needed */
</style>
