// ******* DATA LOADING *******
async function loadData () {
  let movieData = await d3.csv('data/netflix_titles.csv');

  //Filter to only have movies for now 
  movieData = movieData.filter(m => m.type == 'Movie');

  return movieData;
}


const globalApplicationState = {
  allMovieData : null,
  donutView  : null,
  barGraphView  : null,
  lineGraphView  : null
};


loadData().then((loadedData) => {
  // Store the loaded data into the globalApplicationState
  globalApplicationState.allMovieData = loadedData;


  // Creates the view objects with the global state passed in 
  const barGraphView = new BarGraphView(globalApplicationState);
  const donutView = new DonutView(globalApplicationState);
  const lineGraphView = new LineGraphView(globalApplicationState);
  

  globalApplicationState.barGraphView = barGraphView;
  globalApplicationState.donutView = donutView;
  globalApplicationState.barGraphView = lineGraphView;
  
});



