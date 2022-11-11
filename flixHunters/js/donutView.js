/* some parts of this code adapted from https://d3-graph-gallery.com/graph/donut_label.html */
class DonutView {

  globalApplicationState;
  width = 500;
  height = 500;
  margin = 45;
  radius = 0;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.radius = Math.min(this.width,this.height)/2 - this.margin;
    this.setup();
  }

  setup(){
    let donutSVG = d3.select("#donutSVG");
  
    donutSVG
      .style('width',this.width)
      .style('height',this.height)
      .append('g')
      .attr('transform','translate(' + this.width/2 + ',' + this.height/2 + ")");

      this.adjustGraph(this.globalApplicationState.allMovieData);
    
  }

  adjustGraph(data){

     //transform data
    let groupedData = d3.group(data, d => d.rating );


    let pie = d3.pie()
      .value(d =>d[1].length);

    let pieConverted = pie(groupedData);


    let arc = d3.arc()
      .innerRadius(this.radius * 0.5)
      .outerRadius(this.radius * 0.8);
    
    let outerArc = d3.arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius (this.radius * 0.9);

    let pieSVG = d3.select('#donutSVG').select('g');

    pieSVG
    .selectAll('allSlices')
    .data(pieConverted)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => this.globalApplicationState.colorScale(d.data[0]))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .attr("opacity", 1)
    .on('mouseover', function (d, i) {
      /*
      Interactive element here!
      this.globalApplicationState.lineGraph.DoSomething();
      */
      d3.select(this).transition()
             .duration('50')
             .attr('opacity', '.7');
    })
    .on('mouseout', function (d, i) {
      /*
      Interactive element here!
      this.globalApplicationState.lineGraph.DoSomething();
      */
      d3.select(this).transition()
      .duration('50')
      .attr('opacity', '1');
    })

    let that = this;

    pieSVG
    .selectAll('allPolylines')
    .data(pieConverted)
    .join('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function(d) {
        const posA = arc.centroid(d) // line insertion in the slice
        const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = that.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        if(d.data[0] == 'NR')
        {
          posC[0] = -posC[0];
        }
        return [posA, posB, posC]
      })

    pieSVG
    .selectAll('allLabels')
    .data(pieConverted)
    .join('text')
      .text(d => d.data[0])
      .attr('transform', function(d) {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = that.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          if(d.data[0] == 'NR')
        {
          pos[0] = -pos[0] + 20;
        }

          return `translate(${pos})`;
      })
      .style('text-anchor', function(d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
      })

    pieSVG.append('text').text(data.length)
    .attr('transform','translate(-50,15)')
    .attr('font-size','3em');


    
 

  }

}
