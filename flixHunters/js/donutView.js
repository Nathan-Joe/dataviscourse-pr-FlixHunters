class DonutView {

  globalApplicationState;
  width = 500;
  height = 350;
  
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.setup();
  }

  setup(){
    let donutSVG = d3.select("#donutSVG");
  
    donutSVG
      .style('width',this.width)
      .style('height',this.height)

      this.adjustGraph(this.globalApplicationState.allMovieData);
    
  }

  adjustGraph(data){

 

  }

}
