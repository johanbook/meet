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
 * @interface NotificationDetails
 */
export interface NotificationDetails {
    /**
     * 
     * @type {string}
     * @memberof NotificationDetails
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationDetails
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationDetails
     */
    resourcePath: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationDetails
     */
    type: string;
}

/**
 * Check if a given object implements the NotificationDetails interface.
 */
export function instanceOfNotificationDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "message" in value;
    isInstance = isInstance && "resourcePath" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function NotificationDetailsFromJSON(json: any): NotificationDetails {
    return NotificationDetailsFromJSONTyped(json, false);
}

export function NotificationDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'message': json['message'],
        'resourcePath': json['resourcePath'],
        'type': json['type'],
    };
}

export function NotificationDetailsToJSON(value?: NotificationDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'message': value.message,
        'resourcePath': value.resourcePath,
        'type': value.type,
    };
}

