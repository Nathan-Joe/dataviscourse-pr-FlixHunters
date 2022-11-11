class DonutView {

  globalApplicationState;
  width = 500;
  height = 350;
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
        .value(d => d.count);
 

  }

}
