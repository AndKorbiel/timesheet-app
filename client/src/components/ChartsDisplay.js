import React from 'react';
import * as d3 from 'd3';

export default class ChartsDisplay extends React.Component {
    myRef = React.createRef();

    componentDidMount = () => {
        this.generateChart(this.props.data, this.props.sorting)
    }

    generateChart = (data, sorting) => {
        const width = 1400;
        const height = 450;

        const margin = { top: 50, bottom: 50, left: 50, right: 50 };
        const svg = d3.select(this.myRef.current)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, (d3.max(data.map(function(d) { return Math.round(d.value) })) + 10 )])
            .range([height - margin.bottom, margin.top])

        const colors = d3.scaleLinear()
            .domain([0, data.length * .33, data.length * .66, data.length])
            .range(['#5A7112', '#789227', '#97B43D','#B5D552'])

        svg
            .append("g")

            .selectAll("rect")
            .data(data.sort((a, b) => d3.descending(a[sorting], b[sorting])))
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.value))
            .attr('title', (d) => d.value)
            .attr("class", "rect")
            .attr("height", d => y(0) - y(d.value))
            .attr("fill", function(d, i) {
                return colors(i);
            })
            .attr("width", x.bandwidth());

        const yAxis = (g) => {
            g.attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.value))
                .attr("font-size", '14px')
        }

        const xAxis = (g) => {
            g.attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => data[i].date))
                .attr("font-size", '14px')
        }

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);

        svg.selectAll("text.bar")
            .data(data)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
            .attr("y", function(d) { return y(d.value) - 5; })
            .text(function(d) {
                return d.value;
            })
    }

    render() {
        return (
            <div ref={this.myRef}>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}