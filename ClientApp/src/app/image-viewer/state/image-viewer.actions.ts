import { createAction, props } from '@ngrx/store';
import { GarageImage } from '../image.models';

export const loadNewImage = createAction('[Image Viewer Api] Load New Image');
export const loadNewImageSuccess = createAction('[Image Viewer Api] Load New Image Success', props<{ currentImage: GarageImage }>());
export const loadNewImageError = createAction('[Image Viewer Api] Load New Image Error');