export interface User {
    _id: string;
    email: string;
    admin: boolean;
}

export interface AppState {
    price: number;
    priceDisplay: number;
    freeTrialDays: number;
    freeTrialsEnabled: boolean;
}

export const APP_STATE_DEFAULT = {
    price: 19.99,
    priceDisplay: 149.99,
    freeTrialDays: 3,
    freeTrialsEnabled: false,
};
