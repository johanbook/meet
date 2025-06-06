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


import * as runtime from '../runtime';
import type {
  JournalDetails,
} from '../models/index';
import {
    JournalDetailsFromJSON,
    JournalDetailsToJSON,
} from '../models/index';

export interface GetCurrentOrganizationJournalRequest {
    from: Date;
    to: Date;
    skip?: number;
    top?: number;
}

export interface GetProfileJournalRequest {
    from: Date;
    to: Date;
    skip?: number;
    top?: number;
}

/**
 * 
 */
export class JournalApi extends runtime.BaseAPI {

    /**
     */
    async getCurrentOrganizationJournalRaw(requestParameters: GetCurrentOrganizationJournalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JournalDetails>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getCurrentOrganizationJournal.');
        }

        if (requestParameters.to === null || requestParameters.to === undefined) {
            throw new runtime.RequiredError('to','Required parameter requestParameters.to was null or undefined when calling getCurrentOrganizationJournal.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = (requestParameters.from as any).toISOString();
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = (requestParameters.to as any).toISOString();
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        if (requestParameters.top !== undefined) {
            queryParameters['top'] = requestParameters.top;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/journal/current-organization`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JournalDetailsFromJSON(jsonValue));
    }

    /**
     */
    async getCurrentOrganizationJournal(requestParameters: GetCurrentOrganizationJournalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JournalDetails> {
        const response = await this.getCurrentOrganizationJournalRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getProfileJournalRaw(requestParameters: GetProfileJournalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JournalDetails>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getProfileJournal.');
        }

        if (requestParameters.to === null || requestParameters.to === undefined) {
            throw new runtime.RequiredError('to','Required parameter requestParameters.to was null or undefined when calling getProfileJournal.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = (requestParameters.from as any).toISOString();
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = (requestParameters.to as any).toISOString();
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        if (requestParameters.top !== undefined) {
            queryParameters['top'] = requestParameters.top;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/journal/profile`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JournalDetailsFromJSON(jsonValue));
    }

    /**
     */
    async getProfileJournal(requestParameters: GetProfileJournalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JournalDetails> {
        const response = await this.getProfileJournalRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
