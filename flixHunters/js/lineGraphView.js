class LineGraphView {

  globalApplicationState;
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
      .style('width','80%')
      .style('height',this.height)

    console.log(d3.select('#wrapper').clientWidth)
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
      .range([0, 1080 - this.yAxisPadding - 1])

    
    lineGraphSVG.select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%Y'))
      );

    lineGraphSVG.select('#x-axis')
      .append('text')
      .text('Year Added')
      .attr('x', 350)
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

  }

}
