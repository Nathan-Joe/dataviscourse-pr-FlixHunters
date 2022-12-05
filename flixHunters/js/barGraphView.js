class BarGraphView {

  globalApplicationState;
  //width = ;
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
      .style('width','50%')
      .style('height',this.height)

    //console.log(this.globalApplicationState.allMovieData)

    let DirectorGroup = d3.group(this.globalApplicationState.allMovieData, d => d.director)

    const mapSort1 = new Map([...DirectorGroup.entries()].sort((a, b) => b[1].length - a[1].length));
    //console.log(mapSort1);
    
    const map1 = new Map();
    let count = 0;
    for (let [key, value] of mapSort1.entries()) {
      //console.log(key, value);
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
      .range([this.yAxisPadding, this.height])
      .padding(0.2);
    
    d3.select('#ybar-axis')
    .append('g')
    .attr('transform', `translate(${this.yAxisPadding+50},${-this.xAxisPadding})`)
    .call(d3.axisLeft(this.yScale))

    d3.select('#xbar-axis')
      .append('text')
      .text('Number of movies')
      .attr('x', 350)
      .attr('y', this.height - 10);

    d3.select('#ybar-axis')
      .append('text')
      .text('Directors')
      .attr('x', -250)
      .attr('y', 20)
      .attr('transform', 'rotate(-90)');

    console.log(map1)

    d3.select('#bars').selectAll('rect')
      .data(map1)
      .join('rect')
      .attr("x", 130)
      .attr("y", ([group, values]) => this.yScale(group)-this.xAxisPadding)
      .attr("width", ([group, values]) => this.xScale([values].map(d => d.length)))
      .attr("height", this.yScale.bandwidth())
      .attr("fill", "#E50914")
      .attr("stroke-width","1")
      .attr("stroke","black")
      .on('mouseover', function(d,i) {
        let title_rates = ""
        i[1].forEach(element => {
          title_rates = title_rates + element.title + " <b>("+ element.rating + ")</b>" + "<br>" 
          //console.log(stemp)
        });
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.7')
        d3.select("#tooltip").transition()
          .duration(150)
          .style("opacity", .9)
        d3.select("#tooltip")
          .html("<b>Movies made by the Director:</b> " + "<br>" + title_rates)
          .style("position", "absolute")
          .style("background","lightsteelblue")
          .style("text-align","center")
          .style("border-radius", "4px")
          .style("left", d.pageX + "px")
          .style("top", (d.pageY+15) + "px")
          //console.log(i)
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '1');
        d3.select("#tooltip").transition()
        .duration(300)
        .style("opacity", 0);
      })

  }

  adjustGraph(data){

 

  }

}
