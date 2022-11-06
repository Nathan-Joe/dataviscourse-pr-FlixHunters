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
    
    barGraphSVG
      .style('width',this.width)
      .style('height',this.height)

    this.adjustGraph(this.globalApplicationState.allMovieData);
    
  }

  adjustGraph(data){

 

  }

}
