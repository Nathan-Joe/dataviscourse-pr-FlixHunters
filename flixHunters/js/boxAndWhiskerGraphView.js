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
        let genreFreq = new Map()
        this.globalApplicationState.allMovieData.map(d => {
            let genres = d.listed_in.split(", ")
            genres.forEach(genre => {
                
                if(genreFreq.has(genre)) {
                    genreFreq.set(genre, genreFreq.get(genre) + 1)
                }
                else {
                    genreFreq.set(genre, 1)
                }
            });
            
        })
        console.log(genreFreq)
        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    }

    adjustGraph() {

    }
}