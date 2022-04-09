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

  public patchGarageImage(garageImageId: number, partialImage: Partial<GarageImage>): Observable<any> {
    // TODO move this to central location
    // TODO consider fixing cast to any
    const patchObj = Object.keys(partialImage).map(key => (
      {
        'path': `/${key}`,
        'op': 'replace',
        'value': (partialImage as any)[key]
      })
    );
    return this.http.patch(`api/Webcam/${garageImageId}`, patchObj);
  }

  public getPiStatus(): Observable<string> {
    return this.http.get('api/Webcam/PiStatus', { responseType: "text" });
  }
}
