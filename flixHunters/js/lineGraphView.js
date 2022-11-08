class LineGraphView {

  globalApplicationState;
  width = 700;
  height = 500;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.setup();
  }

  setup(){
    let lineGraphSVG = d3.select("#lineGraphSVG");
    this.yAxisPadding = 80;
    this.xAxisPadding = 50;
  
    lineGraphSVG
      .style('width',this.width)
      .style('height',this.height)

    
    let dataByYearAdded = d3.group(this.globalApplicationState.allMovieData, d => d.year_added)

    this.adjustGraph(dataByYearAdded);
    
    this.xScale = d3.scaleTime()
      .domain(d3.extent([...dataByYearAdded.keys()].map(d => new Date(d))))
      .range([0, this.width - this.yAxisPadding])

    
    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%Y'))
      );

    // gets the length of the largest array of values
    let maxCount = d3.max([...dataByYearAdded.values()].map(d => d.length))
    
    this.yScale = d3.scaleLinear()
      .domain([0, maxCount])
      .range([this.height - this.xAxisPadding, 10])
      .nice();
    lineGraphSVG.select('#y-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding},0)`)
      .call(d3.axisLeft(this.yScale));
    
  }

  adjustGraph(data){
    
    

  }

}
