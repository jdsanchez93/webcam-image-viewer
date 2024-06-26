import { createReducer, on } from "@ngrx/store"
import { GarageImage } from "../image.models";
import { QueueStatus } from "../queue-status/queue-status.models";
import * as ImageViewerActions from './image-viewer.actions';

export const imageViewerFeatureKey = 'imageViewer';

export interface ImageViewerState {
    loading: boolean,
    currentImage: GarageImage
    mostRecentImages: GarageImage[],
    queueStatus?: QueueStatus,
    isDeleteLastImage: boolean
}

export const initialState: ImageViewerState = {
    loading: false,
    currentImage: {
        garageImageId: 0
    },
    mostRecentImages: [],
    isDeleteLastImage: false
}

export const imageViewerReducer = createReducer(
    initialState,
    on(ImageViewerActions.loadNewImageSuccess, (state, { currentImage }) => ({
        ...state,
        loading: false,
        isDeleteLastImage: (state.currentImage.garageImageId === 0 ? true : state.isDeleteLastImage),
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
    on(ImageViewerActions.updateIsDeleteLastImage, (state, { isDeleteLastImage }) => {
        return { ...state, isDeleteLastImage: isDeleteLastImage }
    }),
    on(ImageViewerActions.softDeleteImage, (state, { garageImageId }) => {
        if (state.currentImage.garageImageId === garageImageId) {
            return { ...state, currentImage: { garageImageId: 0 } }
        }
        return { ...state };
    }),
)