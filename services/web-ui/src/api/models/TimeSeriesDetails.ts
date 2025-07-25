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
import type { TimeSeriesPointDetails } from './TimeSeriesPointDetails';
import {
    TimeSeriesPointDetailsFromJSON,
    TimeSeriesPointDetailsFromJSONTyped,
    TimeSeriesPointDetailsToJSON,
} from './TimeSeriesPointDetails';

/**
 * 
 * @export
 * @interface TimeSeriesDetails
 */
export interface TimeSeriesDetails {
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    createdAt: string;
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    aggregation: TimeSeriesDetailsAggregationEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof TimeSeriesDetails
     */
    labels: Array<string>;
    /**
     * 
     * @type {Array<TimeSeriesPointDetails>}
     * @memberof TimeSeriesDetails
     */
    points: Array<TimeSeriesPointDetails>;
    /**
     * 
     * @type {string}
     * @memberof TimeSeriesDetails
     */
    summary: TimeSeriesDetailsSummaryEnum;
}


/**
 * @export
 */
export const TimeSeriesDetailsAggregationEnum = {
    Hourly: 'hourly',
    Daily: 'daily',
    DayOfWeek: 'dayOfWeek',
    Weekly: 'weekly',
    Monthly: 'monthly',
    Yearly: 'yearly'
} as const;
export type TimeSeriesDetailsAggregationEnum = typeof TimeSeriesDetailsAggregationEnum[keyof typeof TimeSeriesDetailsAggregationEnum];

/**
 * @export
 */
export const TimeSeriesDetailsSummaryEnum = {
    Hourly: 'hourly',
    Daily: 'daily',
    DayOfWeek: 'dayOfWeek',
    Weekly: 'weekly',
    Monthly: 'monthly',
    Yearly: 'yearly',
    Total: 'total'
} as const;
export type TimeSeriesDetailsSummaryEnum = typeof TimeSeriesDetailsSummaryEnum[keyof typeof TimeSeriesDetailsSummaryEnum];


/**
 * Check if a given object implements the TimeSeriesDetails interface.
 */
export function instanceOfTimeSeriesDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "aggregation" in value;
    isInstance = isInstance && "labels" in value;
    isInstance = isInstance && "points" in value;
    isInstance = isInstance && "summary" in value;

    return isInstance;
}

export function TimeSeriesDetailsFromJSON(json: any): TimeSeriesDetails {
    return TimeSeriesDetailsFromJSONTyped(json, false);
}

export function TimeSeriesDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeSeriesDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': json['description'],
        'createdAt': json['createdAt'],
        'aggregation': json['aggregation'],
        'labels': json['labels'],
        'points': ((json['points'] as Array<any>).map(TimeSeriesPointDetailsFromJSON)),
        'summary': json['summary'],
    };
}

export function TimeSeriesDetailsToJSON(value?: TimeSeriesDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'createdAt': value.createdAt,
        'aggregation': value.aggregation,
        'labels': value.labels,
        'points': ((value.points as Array<any>).map(TimeSeriesPointDetailsToJSON)),
        'summary': value.summary,
    };
}

