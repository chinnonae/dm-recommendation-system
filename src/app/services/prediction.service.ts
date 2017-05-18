import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { Observable } from 'rxjs'

@Injectable()
export class PredictionService {

  readonly genre: string[] = ['Dance', 'Folk', 'Country', 'Classical music',
      'Pop', 'Rock', 'Metal or Hardrock', 'Punk', 'Hiphop, Rap', 'Reggae, Ska',
      'Swing, Jazz', 'Rock n roll', 'Alternative', 'Latino', 'Techno, Trance', 'Opera',]
  readonly movieType: string[] = ['Musical', 'Horror', 'Thriller', 'Comedy',
      'Romantic', 'Sci-fi', 'War', 'Fantasy/Fairy tales', 'Animated',
      'Documentary', 'Western', 'Action']

  private centroids: {}

  constructor(private http: Http) {
    this.retrieveCentroids()
  }

  getCentroids() {
    return this.centroids
  }

  private retrieveCentroids() {
    return this.http.get('assets/data/centroid.json').subscribe(data => {
      this.centroids = data.json()
      console.log(this.centroids)
    });
  }

  predictWithMusic(input: {}): Observable<string> {
    return new Observable(observer => {
      observer.next(this.nearestCluster(this.centroids, input, this.genre))
    })
  }

  predictWithMovie(input: {}): Observable<string> {
    return new Observable(observer => {
      observer.next(this.nearestCluster(this.centroids, input, this.movieType))
    })
  }

  private euclideanDistance(clusterCentroid: {}, input: {}, dataTypes: string[]): number {
    let sum = 0
    for (let dataType of dataTypes) {
      let centroidSubscribeN = clusterCentroid[dataType]
      let inputSubscribeN = input[dataType]
      sum += Math.pow(centroidSubscribeN - inputSubscribeN, 2)
    }
    return Math.sqrt(sum)
  }

  private nearestCluster(clusterCentroids: {}, input: {}, dataTypes: string[]): string {
    let minDistance = Number.MAX_SAFE_INTEGER
    let nearestCluster = null;
    for(let cluster in clusterCentroids) {
      let clusterCentroid = clusterCentroids[cluster]
      let distance = this.euclideanDistance(clusterCentroid, input, dataTypes)
      if (distance < minDistance) {
        minDistance = distance
        nearestCluster = cluster
      }
    }
    return nearestCluster;
  }








}
