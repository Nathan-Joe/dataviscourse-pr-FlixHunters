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
    let years = []
    for(let key in [...dataByYearAdded.keys()]) {
      years.push(parseInt([...dataByYearAdded.keys()][key]))
    }
    
    
    this.xScale = d3.scaleTime()
      .domain([d3.min(years), d3.max(years)])
      .range([0, this.width - this.yAxisPadding])

      console.log(this.xScale('2022'))

    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%Y'))
      );
    
  }

  adjustGraph(data){
    
    

  }

}
