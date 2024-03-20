import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';


export default function XAxis() {
  const axisRef = useRef();

  useEffect(() => {
    const svg = d3.select(axisRef.current);

    // Get today's date and set start/end times for the axis
    const today = new Date();
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0);
    const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours

    // Define time scale for the x-axis
    const xScale = d3.scaleTime()
                     .domain([startTime, endTime])
                     .range([0, 3500]);

    // Create axis element using d3.axisTop
    const xAxis = d3.axisTop(xScale)
                    .ticks(d3.timeHour.every(1)) // Show ticks for every hour
                    .tickFormat(d3.timeFormat("%Hh   %d/%m")); // Format tick labels with hours:minutes

    svg.append('g')
       .attr('transform', `translate(35, 30)`)
       .call(xAxis)
       .selectAll('text') // Select all text elements within the axis
       .attr('font-size', '12px') 
       .attr('class', 'font-semibold tracking-[1px]');

  }, []);

  return (
    <div className='container mx-auto mt-3 h-9 px-0.5' >
      <svg
        ref={axisRef}
        className="w-full bg-slate-200 h-9"
      />
    </div>
  );
};


