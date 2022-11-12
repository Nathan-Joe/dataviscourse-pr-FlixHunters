class BarGraphView {

  globalApplicationState;
  width = 1500;
  height = 500;
  
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

    console.log(this.globalApplicationState.allMovieData)

    let DirectorGroup = d3.group(this.globalApplicationState.allMovieData, d => d.director)

    const mapSort1 = new Map([...DirectorGroup.entries()].sort((a, b) => b[1].length - a[1].length));
    console.log(mapSort1);
    
    const map1 = new Map();
    let count = 0;
    for (let [key, value] of mapSort1.entries()) {
      console.log(key, value);
      if(count<10 && key != ""){
        map1.set(key,value)
        count++
      }
      else if(key == "") {
        continue
      }
      else {
        break
      }
    }

    let maxCount = d3.max([...map1.values()].map(d => d.length))

    console.log(map1)

    this.xScale = d3.scaleLinear()
      .domain([0, maxCount])
      .range([0,this.height])
      .nice();
      
    d3.select('#xbar-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding+50}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale));

    this.yScale = d3.scaleBand()
      .domain([...map1.keys()].map(d => d))
      .range([0, this.height]);
    
    d3.select('#ybar-axis')
    .append('g')
    .attr('transform', `translate(${this.yAxisPadding+50},${-this.xAxisPadding})`)
    .call(d3.axisLeft(this.yScale))

    d3.select('#bars').selectAll('rect')
      .data(map1)
      .join('rect')
      .attr("x", 130)
      .attr("y", ([group, values]) => this.yScale(group)-30)
      .attr("width", ([group, values]) => this.xScale([values].map(d => d.length)))
      .attr("height", 15)
      .attr("fill", "#69b3a2")

  }

  adjustGraph(data){

 

  }

}
