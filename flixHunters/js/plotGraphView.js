class PlotGraphView {

  globalApplicationState;
  width = 700;
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
      .style('width',this.width)
      .style('height',this.height)


   
      let anArray = this.globalApplicationState.allMovieData.map(d => parseFloat(d.release_year));
    
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(anArray))
      .range([0, this.width - this.xAxisPadding]).nice();

    
    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
      .tickFormat(d3.format("d"))
      );

      lineGraphSVG.select('#x-axis')
      .append('text')
      .text('Year Released')
      .attr('x', 350)
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

  adjustGraph(data){
   
    d3.select("#scatterGraphSVG").selectAll('circle').data(data).join('circle')
              
    .attr('cx', (d) =>  this.xScale(parseFloat(d.release_year) + Math.random()/2 - .25))
    .attr('cy', (d) => this.yScale(parseFloat(d.score)))
    .attr('r',  (d) =>  2)
    .attr('transform', `translate(${this.yAxisPadding},0)`)
    .attr('fill', d => this.globalApplicationState.colorScale(d.rating))
    .on('mouseover', function(d,i) {
      console.log(i);
    })
  ;


    

  }

}
