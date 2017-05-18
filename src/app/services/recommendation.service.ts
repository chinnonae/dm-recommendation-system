import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { PredictionService } from './prediction.service'

@Injectable()
export class RecommendationService {

  private movieData = {}
  private centroids

  constructor(private http: Http, private predict: PredictionService) {
    this.retrieveMovieDataset()
    this.centroids = predict.getCentroids()
  }

  getMovieRecommendation(cluster: string) {
    let centroid = this.predict.getCentroids()[cluster]
    let topGenres = this.top3Max(centroid)

    let movies = []
    console.log(topGenres)
    for (let genre of topGenres) {
      for (let i = 0; i < 3; i++) {
        if (this.movieData[genre])
          movies.push(this.movieData[genre][i])
      }
      // movies.push(this.movieData[genre][0])
    }

    return {
      movies: movies,
      genres: topGenres
    }
  }

  private top3Max(centroid: {}) {
    let max = []
    for(let dataType in centroid) {
      if (this.predict.movieType.indexOf(dataType) < 0) continue;
      if (max.length < 3) {
        max.push(dataType)
      } else {
        let min = Number.MAX_SAFE_INTEGER
        let minOfMax = null;
        for(let exist of max) {
          if (centroid[exist] < min) {
            minOfMax = exist
            min = centroid[exist]
          }
        }
        if(min < centroid[dataType]) {
          let index = max.indexOf(minOfMax)
          max[index] = dataType
        }
      }
    }
    return max
  }

  private retrieveMovieDataset() {
    this.http.get('/assets/data/refinedMovieDataSet.json').subscribe(data => {
      this.movieData = data.json()
      console.log('movie data retrieve')
    })
  }

}
