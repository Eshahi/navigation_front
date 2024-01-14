import * as d3 from 'd3';

function drawFloorPlan() {
    // Define dimensions for the SVG canvas
    const width = 600, height = 400;

    // Create SVG element
    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Define room data with more attributes
    const rooms = [
        { id: 'room1', x: 50, y: 50, width: 200, height: 100, color: 'lightblue' },
        { id: 'room2', x: 300, y: 50, width: 150, height: 100, color: 'lightgreen' },
        // ...additional rooms
    ];

    // Define wall data
    const walls = [
        { x1: 50, y1: 50, x2: 250, y2: 50, color: 'darkgrey' },
        { x1: 250, y1: 50, x2: 250, y2: 150, color: 'darkgrey' },
        // ...additional walls
    ];

    // Draw rooms
    svg.selectAll('.room')
        .data(rooms)
        .enter().append('rect')
        .attr('class', 'room')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('stroke', 'black');

    // Draw walls
    svg.selectAll('.wall')
        .data(walls)
        .enter().append('line')
        .attr('class', 'wall')
        .attr('x1', d => d.x1)
        .attr('y1', d => d.y1)
        .attr('x2', d => d.x2)
        .attr('y2', d => d.y2)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 3);

    // ...additional features like doors, furniture, etc.

    // Add labels
    svg.selectAll('.label')
        .data(rooms)
        .enter().append('text')
        .attr('class', 'label')
        .attr('x', d => d.x + d.width / 2)
        .attr('y', d => d.y + d.height / 2)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(d => d.id);
}

// Call the function to draw the floor plan when the component mounts
export default drawFloorPlan;
