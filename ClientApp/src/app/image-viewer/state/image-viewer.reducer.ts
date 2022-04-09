import { createReducer, on } from "@ngrx/store"
import { GarageImage } from "../image.models";
import { PiStatus } from "../pi-status/pi-status.models";
import * as ImageViewerActions from './image-viewer.actions';

export const imageViewerFeatureKey = 'imageViewer';

export interface ImageViewerState {
    loading: boolean,
    currentImage: GarageImage
    mostRecentImages: GarageImage[],
    piStatus?: PiStatus
}

export const initialState: ImageViewerState = {
    loading: false,
    currentImage: {
        garageImageId: 0
    },
    mostRecentImages: [],
}

export const imageViewerReducer = createReducer(
    initialState,
    on(ImageViewerActions.loadNewImageSuccess, (state, { currentImage }) => ({
        ...state,
        loading: false,
        currentImage: currentImage
    })),
    on(ImageViewerActions.loadNewImage, (state) => {
        return { ...state, loading: true }
    }),
    on(ImageViewerActions.loadHistorySuccess, (state, { history }) => {
        return { ...state, mostRecentImages: history }
    }),
    on(ImageViewerActions.updateImageSuccess, (state, { garageImageId, partialImage }) => {
        const updatedImages = state.mostRecentImages.map(i => {
            if (i.garageImageId === garageImageId) {
                return { ...i, ...partialImage }
            }
            return i;
        });
        return { ...state, mostRecentImages: updatedImages };
    }),
    on(ImageViewerActions.loadNewImageError, (state) => {
        return { ...state, loading: false }
    }),
    on(ImageViewerActions.loadPiStatus, (state) => {
        return { ...state, loading: true }
    }),
    on(ImageViewerActions.loadPiStatusSuccess, (state, { piStatus }) => {
        return { ...state, loading: false, piStatus: { message: piStatus, iconName: 'thumb_up' } }
    }),
    on(ImageViewerActions.loadPiStatusError, (state, { httpErrorResponse }) => {
        return { ...state, loading: false, piStatus: { message: httpErrorResponse.error, iconName: 'error' } }
    }),
)