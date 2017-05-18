const fs = require('fs')

let raw = require('./movieDataSet.json')

let movieData = {}

for(let movie of raw) {
  let genres = movie.genres.split('|');
  for(let genre of genres) {
    movie.genres = genres
    if (movieData[genre] === undefined) {
      movieData[genre] = [movie]
      continue
    }
    movieData[genre].push(movie)
  }
}

fs.writeFileSync('./refinedMovieDataSet.json', JSON.stringify(movieData))

console.log('done')
