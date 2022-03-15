import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { WebcamService } from '../webcam.service';
import { loadNewImage, loadNewImageError, loadNewImageSuccess } from './image-viewer.actions';

@Injectable()
export class ImageViewerEffects {

  getNewImage$ = createEffect(() => this.actions$.pipe(
    ofType(loadNewImage),
    mergeMap(() => this.webcamService.getNewImage().pipe(
      map(x => loadNewImageSuccess({ currentImage: x })),
      catchError(x => [loadNewImageError()])
    ))
  ));

  constructor(
    private actions$: Actions,
    private webcamService: WebcamService
  ) { }
}