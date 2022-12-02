// ******* DATA LOADING *******
async function loadData () {
  let imdbData = await d3.csv('data/imdb_titles.csv');

  //Filter to only have movies for now 
  imdbData = imdbData.filter(m => m.type == 'MOVIE');

  let movieData = await d3.csv('data/netflix_titles.csv');

  //Filter to only have movies for now 
  movieData = movieData.filter(m => m.type == 'Movie');

  let moviesWithRatings = [];

  //Clean up ratings N^2 algorithms are coolio : )
  for (const movie of movieData) {
  
    switch(movie.rating){

      case "PG-13":
      case "TV-14":
        movie.rating = "PG-13";
        break;
      
      case "TV-PG":      
      case "PG":
      case "TV-Y7":
        movie.rating = "PG";
        break;

      case "TV-G":
      case "G":
      case "TV-Y":
        movie.rating = "G";
        break;

      case "NC-17":
        movie.rating = "R"
        break;

      case "R":
      case "TV-MA":
        movie.rating = "R";
        break;

      case "NR":
      case "":
      case "UR":
      default:
        movie.rating = "R";
        break;

    }
   
    for(const movie2 of imdbData){
      if(movie2.title == movie.title){
          movie.score = movie2.imdb_score;
      if(movie.score != '' && movie.score != "" && movie.title != 'Connected')
        moviesWithRatings.push(movie);
      }
    }
    
  }
 
  return moviesWithRatings;
}

function adjustAllGraphs(){
  globalApplicationState.plotGraphView.adjustGraph();
  globalApplicationState.lineGraphView.adjustGraph();
  globalApplicationState.barGraphView.adjustGraph();
}

function toggleGraphs(){
  let graphToTurnOn = document.getElementById("graphToggle").value;
  if(graphToTurnOn == 'scatter'){
    d3.select('#scatterGraphSVG').style("display","initial");
    d3.select('#lineGraphSVG').style("display","none");
  }
  else{
    d3.select('#scatterGraphSVG').style("display","none");
    d3.select('#lineGraphSVG').style("display","initial");
  }
}


const globalApplicationState = {
  allMovieData : null,
  filteredMovieData: null,
  donutView  : null,
  barGraphView  : null,
  lineGraphView  : null,
  plotGraphView : null,
  colorScale: null,
  filteredMaturityList: [],
};


loadData().then((loadedData) => {
  // Store the loaded data into the globalApplicationState
  globalApplicationState.allMovieData = loadedData;
  globalApplicationState.filteredMovieData = structuredClone(globalApplicationState.allMovieData);


  let categories = new Set(loadedData.map(x => x.rating));
  globalApplicationState.colorScale = d3.scaleOrdinal([`#B2B09B`, `#28AFB0`, `#E50914`,   `#E3B505`, `#F4D6CC`])
    .domain(categories);

  for (const category of categories) {
    globalApplicationState.filteredMaturityList.push(category);
  }

  // Creates the view objects with the global state passed in 
  const barGraphView = new BarGraphView(globalApplicationState);
  const donutView = new DonutView(globalApplicationState);
  const lineGraphView = new LineGraphView(globalApplicationState);
  const plotGraphView = new PlotGraphView(globalApplicationState);
  

  globalApplicationState.barGraphView = barGraphView;
  globalApplicationState.donutView = donutView;
  globalApplicationState.lineGraphView = lineGraphView;
  globalApplicationState.plotGraphView = plotGraphView;

  
});



