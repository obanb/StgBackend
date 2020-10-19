import {getNow} from './dateUtils';

export const withCreatedAndUpdated = <A extends {createdAt?: Date; lastUpdate?: Date}>(obj: A) => {
    const now = getNow();
    obj.createdAt = now;
    obj.lastUpdate = now;
    return obj;
};