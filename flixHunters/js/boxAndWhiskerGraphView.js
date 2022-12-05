class BoxAndWhiskerGraphView {
    globalApplicationState;
    width = 700
    height = 500

    constructor(globalApplicationState) {
        this.globalApplicationState = globalApplicationState;
        this.setup();
    }

    setup() {
        var margin = {top: 10, right: 30, bottom: 30, left: 40};
        let genreFreq = {}
        this.globalApplicationState.allMovieData.map(d => {
            let genres = d.listed_in.split(", ")
            genres.forEach(genre => {
                
                if(genre in genreFreq) {
                    let scoreArray = genreFreq[genre] 
                    scoreArray.push(parseFloat(d.score))
                    genreFreq[genre] = scoreArray                 
                }
                else {
                    let scoreArray = new Array()
                    scoreArray.push(parseFloat(d.score))
                    genreFreq[genre] = scoreArray                    
                }
            });
            
        })
        let boxPlots = []

        Object.keys(genreFreq).forEach(genre => {
            genreFreq[genre].sort(d3.ascending)
            let data = genreFreq[genre]
            let boxPlot = {}
            boxPlot.genre = genre
            boxPlot.q1 = d3.quantile(data, 0.25)
            boxPlot.median = d3.quantile(data, 0.5)
            boxPlot.q3 = d3.quantile(data, 0.75)
            boxPlot.min = d3.min(data)
            boxPlot.max = d3.max(data)

            boxPlots.push(boxPlot)
        })
        console.log(boxPlots)
        let subArray = []
        subArray.push(boxPlots[2])
        subArray.push(boxPlots[5])
        subArray.push(boxPlots[7])
        subArray.push(boxPlots[9])
        subArray.push(boxPlots[10])
        //boxPlots.slice(0, 5)
        console.log(subArray)
        var svg = d3.select("#boxWhiskerSVG")
            .attr("width", '50%')
            .attr("height", this.height)

        let yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([this.height - margin.bottom, 10])
            .nice();
    
        svg.select('#y-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        let xScale = d3.scaleBand()
            .domain(subArray.map(d => d.genre))
            .range([margin.left, this.width - margin.right])

        svg.select('#x-axis')
            .attr('transform', `translate(0, ${this.height - margin.bottom})`)
            .call(d3.axisBottom(xScale))

        svg.select("#plots").attr('transform', `translate(${margin.left + 27}, 0)`)


        svg.select("#plots").selectAll("line")
            .data(subArray)
            .join("line")
            .attr("x1", d => xScale(d.genre))
            .attr("x2", d => xScale(d.genre))
            .attr("y1", d => yScale(d.min) )
            .attr("y2", d => yScale(d.max) )
            .attr("stroke", "black")

        svg.select("#plots").selectAll("rect")
            .data(subArray)
            .join("rect")
            .attr("x", d => xScale(d.genre) - 50)
            .attr("y", d => yScale(d.q3))
            .attr("height", d => (yScale(d.q1)-yScale(d.q3)) )
            .attr("width", 100)
            .attr("stroke", "black")
            .style("fill", "#28AFB0")

        svg.select("#plots").selectAll("minMaxMedian")
            .data(subArray)
            .join("line")
            .attr("x1", d => xScale(d.genre) - 50)
            .attr("x2", d => xScale(d.genre) + 50)
            .attr("y1", d => yScale(d.max))
            .attr("y2", d => yScale(d.max))
            .attr("stroke", "black")

        svg.select("#plots").selectAll("minMaxMedian")
            .data(subArray)
            .join("line")
            .attr("x1", d => xScale(d.genre) - 50)
            .attr("x2", d => xScale(d.genre) + 50)
            .attr("y1", d => yScale(d.median))
            .attr("y2", d => yScale(d.median))
            .attr("stroke", "black")

        svg.select("#plots").selectAll("minMaxMedian")
            .data(subArray)
            .join("line")
            .attr("x1", d => xScale(d.genre) - 50)
            .attr("x2", d => xScale(d.genre) + 50)
            .attr("y1", d => yScale(d.min))
            .attr("y2", d => yScale(d.min))
            .attr("stroke", "black")

        svg
            .append('text')
            .text('IMDB Rating')
            .attr('x', -280)
            .attr('y', 12)
            .attr('transform', 'rotate(-90)');

    }

    adjustGraph() {

    }
}