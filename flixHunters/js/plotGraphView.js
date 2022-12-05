class PlotGraphView {

  globalApplicationState;
  width = 1100;
  height = 500;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.setup();
  }

  setup(){
    let lineGraphSVG = d3.select("#scatterGraphSVG");
    this.yAxisPadding = 80;
    this.xAxisPadding = 50;
  
    lineGraphSVG
      .style('width','80%')
      .style('height',this.height)


   
      let anArray = this.globalApplicationState.allMovieData.map(d => parseFloat(d.release_year));
    
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(anArray))
      .range([0, this.width - this.xAxisPadding - 50]).nice();

    
    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
      .tickFormat(d3.format("d"))
      );

      lineGraphSVG.select('#x-axis')
      .append('text')
      .text('Year Released')
      .attr('x', 520)
      .attr('y', this.height - 10);
      

    lineGraphSVG.select('#y-axis')
      .append('text')
      .text('User Rating')
      .attr('x', -280)
      .attr('y', 30)
      .attr('transform', 'rotate(-90)');

    this.yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([this.height - this.xAxisPadding, 10])
      .nice();
    lineGraphSVG.select('#y-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding},0)`)
      .call(d3.axisLeft(this.yScale));
    
    this.adjustGraph(this.globalApplicationState.allMovieData);
  }

  adjustGraph(){

    d3.select("body").append("div").attr("id","tooltip")
    .style("opacity", 0);

    let data = this.globalApplicationState.filteredMovieData;

    let ratings = new Set();
    data.forEach(d => {
      ratings.add(d.rating)
    });

    d3.select("#scatterGraphSVG").selectAll('circle').data(data).join('circle')
              
    .attr('cx', (d) =>  this.xScale(parseFloat(d.release_year) + Math.random()/2 - .25))
    .attr('cy', (d) => this.yScale(parseFloat(d.score)))
    .attr('r',  (d) =>  2.5)
    .attr('transform', `translate(${this.yAxisPadding},0)`)
    .attr('fill', d => this.globalApplicationState.colorScale(d.rating))
    .attr("stroke-width","1")
    .attr("stroke","black")
    .on('mouseover', function(d,i) {
      d3.select("#tooltip").transition()
      .duration(150)
      .style("opacity", .9)
      d3.select("#tooltip")
      .html("<b>Title:</b> " + i.title + "<br>" + "<b>Director:</b> " + i.director + "<br>" + "<b>Casts:</b> " + i.cast + "<br>" + "<b>Country:</b> " + i.country + "<br>" + "<b>Duration:</b> " + i.duration + "<br>"
      + "<b>Rating:</b> " + i.rating + "<br>" + "<b>Score:</b> " + i.score + "<br>")
      .style("position", "absolute")
      .style("background","lightsteelblue")
      .style("text-align","center")
      .style("border-radius", "4px")
      .style("left", d.pageX + "px")
      .style("top", (d.pageY+15) + "px");
      console.log(i);
    })
    .on("mouseout", function(){
      d3.select("#tooltip").transition()
      .duration(300)
      .style("opacity", 0);
    });  

    let svg = d3.select("#scatterGraphSVG")

    let borderPath = svg.append("rect")
    .attr("x", 81)
    .attr("y", 345)
    .attr("height", 105)
    .attr("width", 100)
    .attr("stroke-width","1")
    .attr("stroke","black")
    .style("fill", "#F0FFFF")

    svg.selectAll("mydots")
    .data(ratings)
    .enter()
    .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 365 + i*25})
    .attr("r", 4)
    .style("fill", d => this.globalApplicationState.colorScale(d))
    .attr("stroke-width","1")
    .attr("stroke","black")

    svg.selectAll("mylabels")
    .data(ratings)
    .enter()
    .append("text")
    .attr("x", 120)
    .attr("y", function(d,i){ return 365 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", d => this.globalApplicationState.colorScale(d))
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")


  }

  // highlightRatings(rating){
  //   d3.select("#scatterGraphSVG").selectAll('circle')
  //     .attr('fill', d => d.rating == rating ?  this.globalApplicationState.colorScale(d.rating) : 'gray')
  //     .style("display", d => d.rating == rating ? 'initial' : 'none');
  // }

  // unHighlightRatings(){
  //   d3.select("#scatterGraphSVG").selectAll('circle')
  //   .attr('fill', d => this.globalApplicationState.colorScale(d.rating))
  //   .style("display", 'initial');

  // }

}
