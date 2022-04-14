import { createReducer, on } from "@ngrx/store"
import { GarageImage } from "../image.models";
import { QueueStatus } from "../queue-status/queue-status.models";
import { WebcamSettings } from "../webcam-settings/webcam-settings.model";
import * as ImageViewerActions from './image-viewer.actions';

export const imageViewerFeatureKey = 'imageViewer';

export interface ImageViewerState {
    loading: boolean,
    currentImage: GarageImage
    mostRecentImages: GarageImage[],
    queueStatus?: QueueStatus,
    webcamSettings: WebcamSettings
}

export const initialState: ImageViewerState = {
    loading: false,
    currentImage: {
        garageImageId: 0
    },
    mostRecentImages: [],
    webcamSettings: {
        brightness: 100,
        contrast: 32
    }
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
    on(ImageViewerActions.loadQueueStatus, (state) => {
        return { ...state, loading: true }
    }),
    on(ImageViewerActions.loadQueueStatusSuccess, (state, { statusMessage }) => {
        return { ...state, loading: false, queueStatus: { message: statusMessage, iconName: 'thumb_up' } }
    }),
    on(ImageViewerActions.loadQueueStatusError, (state, { httpErrorResponse }) => {
        return { ...state, loading: false, queueStatus: { message: httpErrorResponse.error, iconName: 'error' } }
    }),
    on(ImageViewerActions.updateWebcamSettings, (state, { webcamSettings }) => {
        return { ...state, webcamSettings: webcamSettings }
    })
)