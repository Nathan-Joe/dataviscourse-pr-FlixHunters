class LineGraphView {

  globalApplicationState;
  width = 1000;
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
      .style('width','75%')
      .style('height',this.height)

    let dataByYearAdded = d3.group(this.globalApplicationState.allMovieData, d => d.year_added)
    let dataByRating = d3.group(this.globalApplicationState.allMovieData.filter(d => d.rating != 'NR'), d => d.rating)
    
    let keys = [...dataByRating.keys()]
    
    let ratingYearCount = new Map()
    let maxByRating = []


    keys.forEach(key => {
      let byYear = d3.group(dataByRating.get(key), d => d.year_added)
      ratingYearCount.set(key, byYear)
      let maxByYear = []
      let ratingByYear = ratingYearCount.get(key)
      let years = [...ratingByYear.keys()]
      years.forEach(year => {
        let moviesThatYear = ratingByYear.get(year)
        maxByRating.push(moviesThatYear.length)
      })
    });

    let maxCountOfMovies = d3.max(maxByRating)
    

    
    this.xScale = d3.scaleTime()
      .domain(d3.extent([...dataByYearAdded.keys()].map(d => new Date(d))))
      .range([0, this.width - this.yAxisPadding - 1])

    
    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%Y'))
      );

    lineGraphSVG.select('#x-axis')
      .append('text')
      .text('Year Added')
      .attr('x', 520)
      .attr('y', this.height - 10);

    lineGraphSVG.select('#y-axis')
      .append('text')
      .text('Number of Movies')
      .attr('x', -280)
      .attr('y', 30)
      .attr('transform', 'rotate(-90)');

    // gets the length of the largest array of values
    let maxCount = d3.max([...dataByRating.values()].map(d => d.length))

    let test = [...dataByRating.values()].map( d => d3.group(d, n => n.year_added))
    
    this.yScale = d3.scaleLinear()
      .domain([0, maxCountOfMovies])
      .range([this.height - this.xAxisPadding, 10])
      .nice();
    lineGraphSVG.select('#y-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding},0)`)
      .call(d3.axisLeft(this.yScale));
    
    this.adjustGraph();
  }

  adjustGraph(){


    let data = d3.group(this.globalApplicationState.filteredMovieData.filter(d => d.rating != 'NR'), d => d.rating)
    let keys = [...data.keys()]
    
    let ratingYearCount = new Map()
    
    keys.forEach(key => {
      if(data.has('NR')) {
        data.delete('NR')
      }
      let byYear = d3.group(data.get(key), d => d.year_added)
      ratingYearCount.set(key, byYear)
    });
  

    d3.select('#lines').selectAll('path')
      .data(ratingYearCount)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', d => this.globalApplicationState.colorScale(d[0]))
      .attr('stroke-width', 3)
      .attr('d', ([group, values]) => {
        return d3.line()
          .x(d => this.xScale(new Date(d[0])) + this.yAxisPadding) 
        //.x(d => this.xScale(new Date(d.year)) + this.yAxisPadding)
          .y(d => this.yScale(d[1].length))
          (values)
      })

    d3.select('#lineGraphSVG').on('mousemove', (event) => {
      let x = d3.pointer(event)[0];
      if (x > 80 && x < 1082) 
      {
        const year = `${this.xScale.invert(x).getFullYear()}`;
        console.log(ratingYearCount)
        
        const sorted = new Map(Array.from(ratingYearCount.entries())
          .sort(([k1,v1], [k2,v2]) =>
            (v2.has(year) ? v2.get(year).length : 0) - (v1.has(year) ? v1.get(year).length : 0)));
        console.log(sorted)

        // Set the line position
        d3.select('#overlay')
          .select('line')
          .attr('stroke', 'black')
          .attr('x1', x)
          .attr('x2', x)
          .attr('y1', 450)
          .attr('y2', 0)
          .style("opacity",1);
    
        d3.select('#overlay')
          .selectAll('text')
          .data(sorted)
          .join('text')
          .attr('id','text_remove')
          .text(([group, values]) => `${group},${values.has(year)?values.get(year).length : ""}`)
          .attr('x', x)
          .attr('y', (d, i) => 20*i + 20)
          .attr('alignment-baseline', 'hanging')
          .attr('fill', (d) => this.globalApplicationState.colorScale(d[0]))
          .attr('text-anchor', x < 1200/2 ? "start" : "end")
          .style("opacity",1);
      }
      if(x > this.width)
      {
        d3.select("#overlay")
          .select('line')
          .style("opacity",0);
        d3.select("#overlay")
          .selectAll('text')
          .style("opacity",0);
      }
      });
  }

}
