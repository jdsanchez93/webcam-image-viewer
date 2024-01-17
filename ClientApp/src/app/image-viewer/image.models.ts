export interface GarageImage {
    garageImageId: number;
    s3Key?: string;
    imageDate?: Date;
    numberOfCars?: number;
    presignedUrl?: string;
    isDelete?: boolean;
}