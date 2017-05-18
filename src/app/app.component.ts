import { Component } from '@angular/core';

import { PredictionService } from './services/prediction.service'
import { RecommendationService } from './services/recommendation.service'
import { MusicGenreInput, MovieGenreInput } from './data-model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!'
  inputTypes: any
  inputModel: any

  topic: string

  recommendationMovie: any
  recommendationGenre: any

  constructor(private predictor: PredictionService, private recommend: RecommendationService) {
    this.setUp()
  }

  ngAfterViewInit() {

  }

  onPrediction(prediction) {
    this.topic = undefined
    console.log(prediction)
    let recommendMovie = this.recommend.getMovieRecommendation(prediction.prediction)
    console.log(recommendMovie)
    this.recommendationMovie = recommendMovie.movies
    this.recommendationGenre = recommendMovie.genres
  }

  private setUp() {
    this.topic = 'music'
    this.inputTypes = this.predictor.genre
    this.inputModel = new MusicGenreInput
  }
}
