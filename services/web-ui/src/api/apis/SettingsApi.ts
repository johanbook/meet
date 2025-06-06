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
  SettingsDetails,
} from '../models/index';
import {
    SettingsDetailsFromJSON,
    SettingsDetailsToJSON,
} from '../models/index';

export interface UpdateCurrentSettingsRequest {
    body: object;
}

/**
 * 
 */
export class SettingsApi extends runtime.BaseAPI {

    /**
     */
    async getCurrentSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SettingsDetails>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/settings`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SettingsDetailsFromJSON(jsonValue));
    }

    /**
     */
    async getCurrentSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SettingsDetails> {
        const response = await this.getCurrentSettingsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async updateCurrentSettingsRaw(requestParameters: UpdateCurrentSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateCurrentSettings.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/settings`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateCurrentSettings(requestParameters: UpdateCurrentSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateCurrentSettingsRaw(requestParameters, initOverrides);
    }

}
