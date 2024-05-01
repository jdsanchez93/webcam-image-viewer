import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GarageImage } from '../image.models';
import { SmartLightSettings, WebcamSettings } from '../settings/settings.models';

export const loadNewImage = createAction('[Image Viewer Api] Load New Image', props<{ webcamSettings: WebcamSettings, lightSettings: SmartLightSettings }>());
export const loadNewImageSuccess = createAction('[Image Viewer Api] Load New Image Success', props<{ currentImage: GarageImage }>());
export const loadNewImageError = createAction('[Image Viewer Api] Load New Image Error');

export const loadHistory = createAction('[Image Api] Load History');
export const loadHistorySuccess = createAction('[Image Api] Load History Success', props<{ history: GarageImage[] }>());
export const loadHistoryError = createAction('[Image Api] Load History Error');

export const updateImage = createAction('[Image Api] Update Image', props<{ garageImageId: number, partialImage: Partial<GarageImage> }>());
export const updateImageSuccess = createAction('[Image Api] Update Image Success', props<{ garageImageId: number, partialImage: Partial<GarageImage> }>());
export const updateImageError = createAction('[Image Api] Update Image Error');

export const softDeleteImage = createAction('[Image Api] Soft Delete Image', props<{ garageImageId: number }>());
export const softDeleteImageSuccess = createAction('[Image Api] Soft Delete Image Success', props<{ garageImageId: number }>());
export const softDeleteImageError = createAction('[Image Api] Soft Delete Image Error');

export const loadQueueStatus = createAction('[Image Api] Load Pi Status');
export const loadQueueStatusSuccess = createAction('[Image Api] Load Pi Status Success', props<{ statusMessage: string }>());
export const loadQueueStatusError = createAction('[Image Api] Load Pi Status Error', props<{ httpErrorResponse: HttpErrorResponse }>());

export const updateIsDeleteLastImage = createAction('[Image Viewer] Update Is Delete Last Image', props<{ isDeleteLastImage: boolean }>());