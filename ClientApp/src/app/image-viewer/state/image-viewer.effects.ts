import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WebcamService } from '../webcam.service';
import { loadHistory, loadHistoryError, loadHistorySuccess, loadNewImage, loadNewImageError, loadNewImageSuccess, loadQueueStatus, loadQueueStatusError, loadQueueStatusSuccess, updateImage, updateImageError, updateImageSuccess } from './image-viewer.actions';

@Injectable()
export class ImageViewerEffects {

  getNewImage$ = createEffect(() => this.actions$.pipe(
    ofType(loadNewImage),
    mergeMap(() => this.webcamService.getNewImage().pipe(
      map(x => loadNewImageSuccess({ currentImage: x })),
      catchError((x: HttpErrorResponse) => {
        this.snackBar.open(`Error loading new image!`, 'Check pi').onAction().subscribe(() => {
          this.router.navigateByUrl('image-viewer/queue-status');
        });
        return [loadNewImageError()]
      })
    ))
  ));

  getImageHistory$ = createEffect(() => this.actions$.pipe(
    ofType(loadHistory),
    mergeMap(() => this.webcamService.getHistory().pipe(
      map(x => loadHistorySuccess({ history: x })),
      catchError(x => [loadHistoryError()])
    ))
  ));

  updateImage$ = createEffect(() => this.actions$.pipe(
    ofType(updateImage),
    mergeMap(action => this.webcamService.patchGarageImage(action.garageImageId, action.partialImage).pipe(
      map(() => {
        this.snackBar.open('Saved!', undefined, { duration: 1000 });
        return updateImageSuccess({ garageImageId: action.garageImageId, partialImage: action.partialImage })
      }),
      catchError(() => [updateImageError()])
    ))
  ));

  getQueueStatus$ = createEffect(() => this.actions$.pipe(
    ofType(loadQueueStatus),
    mergeMap(() => this.webcamService.getQueueStatus().pipe(
      map(x => loadQueueStatusSuccess({ statusMessage: x })),
      catchError((x: HttpErrorResponse) => {
        return [loadQueueStatusError({ httpErrorResponse: x })]
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private webcamService: WebcamService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
}