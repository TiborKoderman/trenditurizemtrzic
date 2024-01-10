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
                const data = this.data;
                const margin = { top: 50, right: 100, bottom: 60, left: 60 };
                const width = 800 - margin.left - margin.right;
                const height = 460 - margin.top - margin.bottom;

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

                const colorScale = d3.scaleOrdinal(d3.schemePastel1);


                // Add circles
                const circles = svg.selectAll('circle')
                    .data(Object.entries(data))
                    .enter()
                    .append('circle')
                    .attr('cx', (d) => xScale(d[1].income))
                    .attr('cy', (d) => yScale(d[1].avg))
                    .attr('r', 8)
                    .style('fill', (d) => colorScale(d[0]))
                    .style('transition', '0.2s ease-in-out'); // Add transition for a smooth effect

                // Add background rectangles
                const textBackgrounds = svg.selectAll('rect')
                    .data(Object.entries(data))
                    .enter()
                    .append('rect')
                    .attr('x', (d) => xScale(d[1].income) - 38)
                    .attr('y', (d) => yScale(d[1].avg) - 40)
                    .attr('width', (d) => d[0].length * 11 + 8) // Adjust the width based on the length of the country name
                    .attr('height', 30)
                    .attr('rx', 2) // Optional: round corners
                    .style('border', '1px solid #333')
                    .style('border-radius', '5px')
                    .style('fill', 'rgba(0, 0, 0, 0.8)') // Background color
                    .style('visibility', 'hidden'); // Initially hide the background

                // Add text
                const textLabels = svg.selectAll('text')
                    .data(Object.entries(data))
                    .enter()
                    .append('text')
                    .attr('x', (d) => xScale(d[1].income) - 35)
                    .attr('y', (d) => yScale(d[1].avg) - 20)
                    .text((d) => d[0])
                    .style('font-size', '18px')
                    .style('fill', '#f0f0f0')
                    .style('visibility', 'hidden'); // Initially hide the text

                // Handle mouse events
                circles.on('mouseover', function (event, d) {
                    d3.select(this)
                        .attr('r', 15) // Increase circle radius on hover
                        .style('fill', d3.color(colorScale(d[0])).darker(0.8)); // Darken the color
                    textLabels.filter((label) => label[0] === d[0]).style('visibility', 'visible');
                    textBackgrounds.filter((bg) => bg[0] === d[0]).style('visibility', 'visible');
                }).on('mouseout', function (event, d) {
                    d3.select(this)
                        .attr('r', 8) // Revert circle radius on mouseout
                        .style('fill', colorScale(d[0])); // Revert color
                    textLabels.filter((label) => label[0] === d[0]).style('visibility', 'hidden');
                    textBackgrounds.filter((bg) => bg[0] === d[0]).style('visibility', 'hidden');
                });

                // Add axes and labels (unchanged)
                svg.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .style('font-size', '12px')
                    .call(d3.axisBottom(xScale));

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

                svg.append('text')
                    .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
                    .style('text-anchor', 'middle')
                    .style('fill', '#fff')
                    .attr('dy', '0.8em')
                    .text('Povprečni dohodek na prebivalca');
            } catch (error) {
                console.error('Error in drawScatterplot:', error);
            }
        },
    },
};
</script>

<style scoped></style>
