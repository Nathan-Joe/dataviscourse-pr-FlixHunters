class BarGraphView {

  globalApplicationState;
  width = 1500;
  height = 350;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.setup();
  }

  setup(){
    let barGraphSVG = d3.select("#barGraphSVG");
    this.yAxisPadding = 80;
    this.xAxisPadding = 50;
    
    barGraphSVG
      .style('width',this.width)
      .style('height',this.height)

    //console.log(this.globalApplicationState.allMovieData)
    let CopyData = []
    let i = 0
    this.globalApplicationState.allMovieData.forEach(d => {
      if(i<3){
        CopyData.push(d)
        i++
      }
    });
    let DirectorGroup = d3.group(CopyData, d => d.director)
    let DirectorGroup2 = d3.group(this.globalApplicationState.allMovieData, d => d.director)

    let maxCount = d3.max([...DirectorGroup2.values()].map(d => d.length))
    //console.log(maxCount)

    this.xScale = d3.scaleLinear()
      .domain([0, maxCount])
      .range([10,this.height])
      .nice();
      
    d3.select('#xbar-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale));

    this.yScale = d3.scaleBand()
      .domain([...DirectorGroup.keys()].map(d => d))
      .range([0, this.height])
      .padding(0.2);
    
    d3.select('#ybar-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding},0)`)
      .call(d3.axisLeft(this.yScale))


  }

  adjustGraph(data){

 

  }

}
