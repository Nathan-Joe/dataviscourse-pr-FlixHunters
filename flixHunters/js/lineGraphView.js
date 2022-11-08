class LineGraphView {

  globalApplicationState;
  width = 1000;
  height = 350;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.setup();
  }

  setup(){
    let lineGraphSVG = d3.select("#lineGraphSVG");
  
    lineGraphSVG
      .style('width',this.width)
      .style('height',this.height)

    this.adjustGraph(this.globalApplicationState.allMovieData);
    

    
  }

  adjustGraph(data){

    console.log(data)

  }

}
