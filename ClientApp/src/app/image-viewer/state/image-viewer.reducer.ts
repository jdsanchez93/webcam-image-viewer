import { createReducer, on } from "@ngrx/store"
import { GarageImage } from "../image.models";
import * as ImageViewerActions from './image-viewer.actions';

export const imageViewerFeatureKey = 'imageViewer';

export interface ImageViewerState {
    loading: boolean,
    currentImage: GarageImage
}

export const initialState: ImageViewerState = {
    loading: false,
    currentImage: {
        garageImageId: 0
    }
}

export const imageViewerReducer = createReducer(
    initialState,
    on(ImageViewerActions.loadNewImageSuccess, (state, { currentImage }) => ({
        loading: false,
        currentImage: currentImage
    })),
    on(ImageViewerActions.loadNewImage, (state) => {
        return { ...state, loading: true }
    })
)