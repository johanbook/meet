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
 * @interface VapidDetails
 */
export interface VapidDetails {
    /**
     * 
     * @type {string}
     * @memberof VapidDetails
     */
    key: string;
}

/**
 * Check if a given object implements the VapidDetails interface.
 */
export function instanceOfVapidDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "key" in value;

    return isInstance;
}

export function VapidDetailsFromJSON(json: any): VapidDetails {
    return VapidDetailsFromJSONTyped(json, false);
}

export function VapidDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): VapidDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
    };
}

export function VapidDetailsToJSON(value?: VapidDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
    };
}

