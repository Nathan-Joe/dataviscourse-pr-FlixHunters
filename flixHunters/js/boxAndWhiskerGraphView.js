class BoxAndWhiskerGraphView {
    globalApplicationState;
    width = 800
    height = 500

    constructor(globalApplicationState) {
        this.globalApplicationState = globalApplicationState;
        this.setup();
    }

    setup() {
        var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
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
        // append the svg object to the body of the page
        var svg = d3.select("#boxWhiskerSVG")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

        var y = d3.scaleLinear()
            .domain([0,10])
            .range([height, 0]);
            svg.call(d3.axisLeft(y))
    }

    adjustGraph() {

    }
}