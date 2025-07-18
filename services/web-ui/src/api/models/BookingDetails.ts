// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/**
 * Meet API
 * The Meet API can be used to interact with Meet
 *
 * The version of the OpenAPI document: latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BookingDetails
 */
export interface BookingDetails {
    /**
     * 
     * @type {string}
     * @memberof BookingDetails
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof BookingDetails
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof BookingDetails
     */
    endTime: Date;
    /**
     * 
     * @type {string}
     * @memberof BookingDetails
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof BookingDetails
     */
    profileId: number;
    /**
     * 
     * @type {Date}
     * @memberof BookingDetails
     */
    startTime: Date;
}

/**
 * Check if a given object implements the BookingDetails interface.
 */
export function instanceOfBookingDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "endTime" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "profileId" in value;
    isInstance = isInstance && "startTime" in value;

    return isInstance;
}

export function BookingDetailsFromJSON(json: any): BookingDetails {
    return BookingDetailsFromJSONTyped(json, false);
}

export function BookingDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): BookingDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'endTime': (new Date(json['endTime'])),
        'name': json['name'],
        'profileId': json['profileId'],
        'startTime': (new Date(json['startTime'])),
    };
}

export function BookingDetailsToJSON(value?: BookingDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'description': value.description,
        'endTime': (value.endTime.toISOString()),
        'name': value.name,
        'profileId': value.profileId,
        'startTime': (value.startTime.toISOString()),
    };
}

