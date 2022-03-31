import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GarageImage } from './image.models';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  constructor(private http: HttpClient) { }

  public getNewImage(): Observable<GarageImage> {
    return this.http.get<GarageImage>(`api/Webcam`);
  }

  public getHistory(): Observable<GarageImage[]> {
    return this.http.get<GarageImage[]>(`api/Webcam/History`);
  }
}
