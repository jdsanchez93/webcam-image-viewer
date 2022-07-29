export interface WebcamSettings {
    brightness?: number;
    contrast?: number;
}

export interface SmartLightSettings {
    isOn?: boolean;
    colorString?: string;
    colorCode?: string;
}

export interface QueueMessage {
    webcamSettings: WebcamSettings
    lightSettings?: SmartLightSettings
}