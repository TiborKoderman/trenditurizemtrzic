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
                if (!this.data) {
                    return "";
                }
                const data = this.data;

                const margin = { top: 50, right: 30, bottom: 60, left: 100 };
                const width = 600 - margin.left - margin.right;
                const height = 500 - margin.top - margin.bottom;
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

                const tooltip = d3.select('#tax-bar-chart')
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
                    .attr('x', (d) => xScale(d[0]))
                    .attr('y', (d) => yScale(d[1].sum))
                    .attr('width', xScale.bandwidth())
                    .attr('height', (d) => height - yScale(d[1].sum))
                    .style('fill', '#84a07c')
                    .on('mouseover', function (event, d) {
                        // Dodajte kvadratek ob premiku miške
                        d3.select(this)
                            .style('fill', 'rgba(68, 90, 61, 0.8)');

                        tooltip.html(`Skupno davki: ${d[1].sum.toFixed(0)}`)
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
                    .style('font-size', '16px')
                    .attr('dy', '1.15em');

                svg.append('g')
                    .style('font-size', '14px')
                    .call(d3.axisLeft(yScale));

                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 0 - margin.left)
                    .attr('x', 0 - height / 2)
                    .attr('dy', '1em')
                    .style('fill', '#fff')
                    .style('text-anchor', 'middle')
                    .text('Skupne takse');

                svg.append('text')
                    .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
                    .style('text-anchor', 'middle')
                    .style('fill', '#fff')
                    .attr('dy', '-1em')
                    .text('Zvezdice');
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
  