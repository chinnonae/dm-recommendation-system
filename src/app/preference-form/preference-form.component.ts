import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PredictionService } from '../services/prediction.service'
import { MusicGenreInput, MovieGenreInput } from '../data-model'

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.css']
})
export class PreferenceFormComponent implements OnInit {

  @Input()
  inputTypes: string[]
  @Input()
  model: any
  @Output()
  prediction = new EventEmitter<{ type: string, prediction: string }>()

  readonly rates = [1, 2, 3, 4, 5]

  constructor(private predict: PredictionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.model)
  }

  onSelectionChange(inputType, num) {
    this.model[inputType] = num
  }

  onSubmit() {
    console.log(this.model)
    if (this.model instanceof MusicGenreInput) {
      console.log("music genre")
      this.predict.predictWithMusic(this.model).subscribe(data => {
        this.prediction.emit({ type: 'music', prediction: data })
      })
    } else if (this.model instanceof MovieGenreInput) {
      console.log("movie genre")
      this.predict.predictWithMovie(this.model).subscribe(data => {
        this.prediction.emit({ type: 'movie', prediction: data })
      })
    }
  }

}
