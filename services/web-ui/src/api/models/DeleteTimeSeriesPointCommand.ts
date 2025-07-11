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
 * @interface DeleteTimeSeriesPointCommand
 */
export interface DeleteTimeSeriesPointCommand {
    /**
     * 
     * @type {string}
     * @memberof DeleteTimeSeriesPointCommand
     */
    pointId: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteTimeSeriesPointCommand
     */
    timeSeriesId: string;
}

/**
 * Check if a given object implements the DeleteTimeSeriesPointCommand interface.
 */
export function instanceOfDeleteTimeSeriesPointCommand(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "pointId" in value;
    isInstance = isInstance && "timeSeriesId" in value;

    return isInstance;
}

export function DeleteTimeSeriesPointCommandFromJSON(json: any): DeleteTimeSeriesPointCommand {
    return DeleteTimeSeriesPointCommandFromJSONTyped(json, false);
}

export function DeleteTimeSeriesPointCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteTimeSeriesPointCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pointId': json['pointId'],
        'timeSeriesId': json['timeSeriesId'],
    };
}

export function DeleteTimeSeriesPointCommandToJSON(value?: DeleteTimeSeriesPointCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pointId': value.pointId,
        'timeSeriesId': value.timeSeriesId,
    };
}

