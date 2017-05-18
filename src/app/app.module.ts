import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PredictionService } from './services/prediction.service';
import { PreferenceFormComponent } from './preference-form/preference-form.component'
import { RecommendationService } from './services/recommendation.service'

@NgModule({
  declarations: [
    AppComponent,
    PreferenceFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PredictionService,
    RecommendationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
