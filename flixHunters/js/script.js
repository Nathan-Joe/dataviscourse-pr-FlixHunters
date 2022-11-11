// ******* DATA LOADING *******
async function loadData () {
  let movieData = await d3.csv('data/netflix_titles.csv');

  //Filter to only have movies for now 
  movieData = movieData.filter(m => m.type == 'Movie');

  //Clean up ratings
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
        movie.rating = "X"
        break;

      case "R":
      case "TV-MA":
        movie.rating = "R";
        break;

      case "NR":
      case "":
      case "UR":
      default:
        movie.rating = "NR";
        break;

    }
  }

  return movieData;
}


const globalApplicationState = {
  allMovieData : null,
  donutView  : null,
  barGraphView  : null,
  lineGraphView  : null,
  colorScale: null
};


loadData().then((loadedData) => {
  // Store the loaded data into the globalApplicationState
  globalApplicationState.allMovieData = loadedData;

  let categories = new Set(loadedData.map(x => x.rating));
  globalApplicationState.colorScale = d3.scaleOrdinal(d3.schemeDark2)
    .domain(categories);



  // Creates the view objects with the global state passed in 
  const barGraphView = new BarGraphView(globalApplicationState);
  const donutView = new DonutView(globalApplicationState);
  const lineGraphView = new LineGraphView(globalApplicationState);
  

  globalApplicationState.barGraphView = barGraphView;
  globalApplicationState.donutView = donutView;
  globalApplicationState.barGraphView = lineGraphView;
  
});



