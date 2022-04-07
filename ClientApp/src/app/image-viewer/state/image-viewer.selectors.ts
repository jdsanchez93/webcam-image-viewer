import { createSelector, createFeatureSelector } from '@ngrx/store';
import { imageViewerFeatureKey, ImageViewerState } from './image-viewer.reducer';


export const selectImageViewerFeature = createFeatureSelector<ImageViewerState>(imageViewerFeatureKey);
export const selectCurrentImage = createSelector(
  selectImageViewerFeature,
  state => state.currentImage
);

export const selectIsLoading = createSelector(
  selectImageViewerFeature,
  state => state.loading
);

export const selectHistory = createSelector(
  selectImageViewerFeature,
  state => state.mostRecentImages
);