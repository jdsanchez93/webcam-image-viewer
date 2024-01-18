import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WebcamService } from '../webcam.service';
import { softDeleteImage, loadHistory, loadHistoryError, loadHistorySuccess, loadNewImage, loadNewImageError, loadNewImageSuccess, loadQueueStatus, loadQueueStatusError, loadQueueStatusSuccess, updateImage, updateImageError, updateImageSuccess, softDeleteImageError } from './image-viewer.actions';
import { selectCurrentImage, selectLightSettings, selectWebcamSettings } from './image-viewer.selectors';

@Injectable()
export class ImageViewerEffects {

  getNewImage$ = createEffect(() => this.actions$.pipe(
    ofType(loadNewImage),
    concatLatestFrom(() => [
      this.store.select(selectWebcamSettings),
      this.store.select(selectLightSettings),
      this.store.select(selectCurrentImage)
    ]),
    // TODO make this more readable
    mergeMap(([action, webcamSettings, lightSettings, currentImage]) => this.webcamService.postNewImage({ webcamSettings, lightSettings, lastImageId: ((action.deleteLastImage && !!currentImage.garageImageId) ? currentImage.garageImageId : undefined) }).pipe(
      map(x => loadNewImageSuccess({ currentImage: x })),
      catchError((x: HttpErrorResponse) => {
        this.snackBar.open(`Error loading new image!`, 'Check status', { duration: 5000 }).onAction().subscribe(() => {
          this.router.navigateByUrl('image-viewer/status');
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

  softDeleteImage$ = createEffect(() => this.actions$.pipe(
    ofType(softDeleteImage),
    mergeMap(action => this.webcamService.patchGarageImage(action.garageImageId, { garageImageId: action.garageImageId, isDelete: true }).pipe(
      map(() => {
        this.snackBar.open('Deleted', undefined, { duration: 1000 });
        return loadHistory();
      }),
      catchError(() => [softDeleteImageError()])
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
    private router: Router,
    private store: Store
  ) { }
}