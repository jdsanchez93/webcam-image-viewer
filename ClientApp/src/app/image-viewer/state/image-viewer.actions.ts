import { createAction, props } from '@ngrx/store';
import { GarageImage } from '../image.models';

export const loadNewImage = createAction('[Image Viewer Api] Load New Image');
export const loadNewImageSuccess = createAction('[Image Viewer Api] Load New Image Success', props<{ currentImage: GarageImage }>());
export const loadNewImageError = createAction('[Image Viewer Api] Load New Image Error');

export const loadHistory = createAction('[Image Api] Load History');
export const loadHistorySuccess = createAction('[Image Api] Load History Success', props<{ history: GarageImage[] }>());
export const loadHistoryError = createAction('[Image Api] Load History Error');

export const updateImage = createAction('[Image Api] Update Image', props<{garageImageId: number, partialImage: Partial<GarageImage>}>());
export const updateImageSuccess = createAction('[Image Api] Update Image Success', props<{garageImageId: number, partialImage: Partial<GarageImage>}>());
export const updateImageError = createAction('[Image Api] Update Image Error');