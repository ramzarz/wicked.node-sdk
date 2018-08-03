'use strict';

/** @hidden */
const debug = require('debug')('wicked-sdk');
/** @hidden */
const qs = require('querystring');
/** @hidden */
const uuid = require('node-uuid');

import { WickedInitOptions, Callback, WickedGlobals, ErrorCallback, WickedAwaitOptions, WickedApiCollection, WickedApi, WickedCollection, WickedSubscription, WickedApiPlan, WickedApiPlanCollection, WickedGroupCollection, WickedUserShortInfo, WickedGetOptions, WickedUserCreateInfo, WickedUserInfo, WickedGetCollectionOptions, WickedApplicationCreateInfo, WickedApplication, WickedApplicationRole, WickedApplicationRoleType, WickedSubscriptionPatchInfo, WickedApproval, WickedVerification, WickedComponentHealth, WickedChatbotTemplates, WickedEmailTemplateType, WickedAuthServer, WickedWebhookListener, WickedEvent, WickedPoolMap, WickedPool, WickedNamespace, WickedGetRegistrationOptions, WickedRegistration, WickedRegistrationMap, WickedGrant, ExpressHandler, WickedSubscriptionInfo, WickedSubscriptionCreateInfo, OidcProfile, PassthroughScopeRequest, PassthroughScopeResponse, WickedSessionStoreType, WickedApiScopes, WickedApiSettings, WickedScopeGrant } from "./interfaces";
export { WickedInitOptions, Callback, WickedGlobals, ErrorCallback, WickedAwaitOptions, WickedApiCollection, WickedApi, WickedCollection, WickedSubscription, WickedApiPlan, WickedApiPlanCollection, WickedGroupCollection, WickedUserShortInfo, WickedGetOptions, WickedUserCreateInfo, WickedUserInfo, WickedGetCollectionOptions, WickedApplicationCreateInfo, WickedApplication, WickedApplicationRole, WickedApplicationRoleType, WickedSubscriptionPatchInfo, WickedApproval, WickedVerification, WickedComponentHealth, WickedChatbotTemplates, WickedEmailTemplateType, WickedAuthServer, WickedWebhookListener, WickedEvent, WickedPoolMap, WickedPool, WickedNamespace, WickedGetRegistrationOptions, WickedRegistration, WickedRegistrationMap, WickedGrant, ExpressHandler, WickedSubscriptionInfo, WickedSubscriptionCreateInfo, OidcProfile, PassthroughScopeRequest, PassthroughScopeResponse, WickedSessionStoreType, WickedApiScopes, WickedApiSettings, WickedScopeGrant } from "./interfaces";
export { WickedError } from './wicked-error';
export { KongApi, KongPlugin, KongService, KongRoute, ProtocolType, KongCollection, KongConsumer, KongGlobals, KongProxyListener, KongHttpDirective, KongStatus, KongPluginCorrelationId, KongPluginCors, KongPluginBotDetection, KongPluginCorrelationIdGeneratorType, KongPluginOAuth2, KongPluginRateLimiting, KongPluginRequestTransformer, KongPluginResponseTransformer, KongPluginWhiteBlackList, KongApiConfig, KongPluginHmacAuth } from './kong-interfaces';
export { kongServiceRouteToApi, kongApiToServiceRoute } from './kong';


/** @hidden */
import * as implementation from './implementation';

// ======= INITIALIZATION =======

/**
 * Initialize the wicked node SDK.
 * 
 * @param options SDK global options 
 * @param callback Returns an error or the content of the `globals.json` file (as second argument)
 */
export function initialize(options: WickedInitOptions, callback: Callback<WickedGlobals>): void {
    implementation._initialize(options, callback);
}

/**
 * Returns true if the wicked SDK is currently able to reach the wicked API.
 */
export function isApiReachable(): boolean {
    return implementation._isApiReachable();
}

/**
 * Returns true if the system is in "development mode". This usually means that transport is not secure
 * (not via https).
 */
export function isDevelopmentMode(): boolean {
    return implementation._isDevelopmentMode();
};

/**
 * Create a machine administrator user for a given service. This method can be used to get "backdoor"
 * access to the wicked API on behalf of a machine user. If you call this method, the machine user ID
 * will be stored internally in the SDK and will be used for any API calls using the SDK.
 * 
 * @param serviceId A unique service ID for the service to create a machine user for
 * @param callback Returns `null` if succeeded, or an error.
 */
export function initMachineUser(serviceId: string, callback: ErrorCallback): void {
    implementation._initMachineUser(serviceId, callback);
};

/**
 * Awaits return code `200` for the specified URL.
 * 
 * @param url The URL to wait for to return `200`
 * @param options Await options (see interface)
 * @param callback Returns `null` plus the returned content of the URL, or an error
 */
export function awaitUrl(url: string, options: WickedAwaitOptions, callback: Callback<any>): void {
    implementation._awaitUrl(url, options, callback);
};

/**
 * Convenience function to make sure the Kong Adapter is up and running.
 * 
 * @param awaitOptions Await options
 * @param callback Returns `null` plus the returned content of the URL, or an error
 */
export function awaitKongAdapter(awaitOptions: WickedAwaitOptions, callback: Callback<any>): void {
    implementation._awaitKongAdapter(awaitOptions, callback);
};

// ======= INFORMATION RETRIEVAL =======

/**
 * Returns the content of the `globals.json` file, with resolved environment variables, if applicable.
 */
export function getGlobals(): WickedGlobals {
    return implementation._getGlobals();
};

/**
 * Returns the current hash of the static configuration. This is used to check whether the static
 * configuration has changed, and if so, decide to restart/stop components like the mailer or the kong
 * adapter.
 */
export function getConfigHash(): string {
    return implementation._getConfigHash();
};

/**
 * Return the currently configured user facing schema (`http` or `https`). This information is contained
 * in the `globals.json`. 
 */
export function getSchema(): string {
    return implementation._getSchema();
};

/**
 * Returns the external portal host for the currently configured environment, e.g. `developer.mycompany.com`
 */
export function getExternalPortalHost(): string {
    return implementation._getExternalPortalHost();
};

/**
 * Returns the complete URL to the wicked portal UI, as seen from outside the deployment, e.g. `https://developer.mycompany.com`
 */
export function getExternalPortalUrl(): string {
    return implementation._getExternalPortalUrl();
};

/**
 * Returns the host name for the API Gateway for the currently configured environment, e.g. `api.mycompany.com`
 */
export function getExternalApiHost(): string {
    return implementation._getExternalGatewayHost();
};

/**
 * Returns the complete base URL to the API Gateway, as seen from outside the deployment. E.g., `https://api.mycompany.com`
 */
export function getExternalApiUrl(): string {
    return implementation._getExternalGatewayUrl();
};

/**
 * Returns the URL to the wicked API, as seen from *inside* the deployment
 */
export function getInternalApiUrl(): string {
    return implementation._getInternalApiUrl();
};

/**
 * Returns the full scope to the wicked API (all scope strings, space separated).
 */
export function getPortalApiScope(): string {
    return implementation._getPortalApiScope();
};

/**
 * Returns the full URL to the portal UI instance, e.g. `http://portal:3000`, as seen from inside the deployment.
 */
export function getInternalPortalUrl(): string {
    return implementation._getInternalPortalUrl();
}

/**
 * Returns the full URL to the admin port of the Kong instance(s), as seen from inside the deployment. E.g., `http://kong:8000`.
 */
export function getInternalKongAdminUrl(): string {
    return implementation._getInternalKongAdminUrl();
};

/**
 * Returns the full URL to the Kong Adapter, as seen from inside the deployment, e.g. `http://portal-kong-adapter:3002`
 */
export function getInternalKongAdapterUrl(): string {
    return implementation._getInternalKongAdapterUrl();
};

/**
 * Returns the full URL to the chatbot, as seen from inside the deployment, e.g. `http://portal-chatbot:3004`
 */
export function getInternalChatbotUrl(): string {
    return implementation._getInternalChatbotUrl();
};

/**
 * Returns the full URL to the mailer, as seen from inside the deployment, e.g. `http://portal-mailer:3003`
 */
export function getInternalMailerUrl(): string {
    return implementation._getInternalMailerUrl();
};

export function getInternalUrl(globalSettingsProperty: string): string {
    return implementation._getInternalUrl(globalSettingsProperty, null, 0);
};

/**
 * Returns the list of Kong plugins which the Kong Adapter will not touch.
 */
export function getKongAdapterIgnoreList(): string[] {
    return implementation._getKongAdapterIgnoreList();
}

/**
 * Returns the header name to use for key auth purposes. Defaults to `X-ApiKey`.
 */
export function getApiKeyHeader(): string {
    return implementation._getApiKeyHeader();
}

// ======= API FUNCTIONALITY =======

/**
 * General purpose `GET` operation on the wicked API; you do not use this directly usually, but use one of
 * the dedicated SDK functions.
 * 
 * @param urlPath relative URL path
 * @param userIdOrCallback user ID to perform the `GET` operation as, or `callback`
 * @param callback Callback containing an `err` (or `null` if success) and the `GET` returned content.
 */
export function apiGet(urlPath: string, userIdOrCallback, callback): void {
    let userId = userIdOrCallback;
    if (!callback && typeof (userIdOrCallback) === 'function') {
        callback = userIdOrCallback;
        userId = null;
    }
    implementation._apiGet(urlPath, userId, null, callback);
};

/**
 * General purpose `POST` operation on the wicked API; you do not use this directly usually, but use one of
 * the dedicated SDK functions.
 * 
 * @param urlPath relative URL path
 * @param postBody Body to post
 * @param userIdOrCallback user ID to perform the `GET` operation as, or `callback`
 * @param callback Callback containing an `err` (or `null` if success) and the `GET` returned content.
 */
export function apiPost(urlPath: string, postBody: object, userIdOrCallback, callback): void {
    let userId = userIdOrCallback;
    if (!callback && typeof (userIdOrCallback) === 'function') {
        callback = userIdOrCallback;
        userId = null;
    }
    implementation._apiPost(urlPath, postBody, userId, callback);
};

/**
 * General purpose `PUT` operation on the wicked API; you do not use this directly usually, but use one of
 * the dedicated SDK functions.
 * 
 * @param urlPath relative URL path
 * @param putBody Body to post
 * @param userIdOrCallback user ID to perform the `GET` operation as, or `callback`
 * @param callback Callback containing an `err` (or `null` if success) and the `GET` returned content.
 */
export function apiPut(urlPath: string, putBody: object, userIdOrCallback, callback): void {
    let userId = userIdOrCallback;
    if (!callback && typeof (userIdOrCallback) === 'function') {
        callback = userIdOrCallback;
        userId = null;
    }
    implementation._apiPut(urlPath, putBody, userId, callback);
};

/**
 * General purpose `PATCH` operation on the wicked API; you do not use this directly usually, but use one of
 * the dedicated SDK functions.
 * 
 * @param urlPath relative URL path
 * @param putBody Body to patch
 * @param userIdOrCallback user ID to perform the `GET` operation as, or `callback`
 * @param callback Callback containing an `err` (or `null` if success) and the `GET` returned content.
 */
export function apiPatch(urlPath: string, patchBody: object, userIdOrCallback, callback): void {
    let userId = userIdOrCallback;
    if (!callback && typeof (userIdOrCallback) === 'function') {
        callback = userIdOrCallback;
        userId = null;
    }
    implementation._apiPatch(urlPath, patchBody, userId, callback);
};

/**
 * General purpose `DELETE` operation on the wicked API; you do not use this directly usually, but use one of
 * the dedicated SDK functions.
 * 
 * @param urlPath relative URL path
 * @param userIdOrCallback user ID to perform the `GET` operation as, or `callback`
 * @param callback Callback containing an `err` (or `null` if success) and the `GET` returned content.
 */
export function apiDelete(urlPath: string, userIdOrCallback, callback): void {
    let userId = userIdOrCallback;
    if (!callback && typeof (userIdOrCallback) === 'function') {
        callback = userIdOrCallback;
        userId = null;
    }
    implementation._apiDelete(urlPath, userId, callback);
};

// ======= API CONVENIENCE FUNCTIONS =======

// APIS

/**
 * Returns a collection of API definitions (corresponds to the `apis.json`).
 * @param callback 
 * @category APIs
 */
export function getApis(callback: Callback<WickedApiCollection>): void {
    getApisAs(null, callback);
}

export function getApisAs(asUserId: string, callback: Callback<WickedApiCollection>): void {
    apiGet('apis', asUserId, callback);
}

/**
 * Return the generic APIs description (for all APIs). Returns markdown code.
 * @param callback 
 */
export function getApisDescription(callback: Callback<string>): void {
    getApisDescriptionAs(null, callback);
}

export function getApisDescriptionAs(asUserId: string, callback: Callback<string>): void {
    apiGet(`apis/desc`, asUserId, callback);
}

/**
 * Returns the API definition for a specific API.
 * 
 * @param apiId The id of the API to retrieve
 * @param callback 
 */
export function getApi(apiId: string, callback: Callback<WickedApi>): void {
    getApiAs(apiId, null, callback);
}

export function getApiAs(apiId: string, asUserId: string, callback: Callback<WickedApi>): void {
    apiGet(`apis/${apiId}`, asUserId, callback);
}

/**
 * Retrieve the (markdown) API description of a specific API.
 * 
 * @param apiId The id of the API to retrieve the description for
 * @param callback 
 */
export function getApiDescription(apiId: string, callback: Callback<string>): void {
    getApiDescriptionAs(apiId, null, callback);
}

export function getApiDescriptionAs(apiId: string, asUserId: string, callback: Callback<string>): void {
    apiGet(`apis/${apiId}/desc`, asUserId, callback);
}

/**
 * Retrieve the API specific Kong configuration for a specific API.
 * 
 * @param apiId The id of the API to retrieve the Kong config for
 * @param callback 
 */
export function getApiConfig(apiId: string, callback: Callback<any>): void {
    getApiConfigAs(apiId, null, callback);
}

export function getApiConfigAs(apiId: string, asUserId: string, callback: Callback<any>): void {
    apiGet(`apis/${apiId}/config`, asUserId, callback);
}

/**
 * Retrieve a JSON representation of the Swagger information for a specific API; contains authorization information (injected).
 * 
 * @param apiId The id of the API to retrieve the Swagger JSON for
 * @param callback 
 */
export function getApiSwagger(apiId: string, callback: Callback<object>): void {
    getApiSwaggerAs(apiId, null, callback);
}

export function getApiSwaggerAs(apiId: string, asUserId: string, callback: Callback<object>): void {
    apiGet(`apis/${apiId}/swagger`, asUserId, callback);
}

/**
 * Retrieve a list of subscriptions to a specific API.
 * 
 * @param apiId The id of the API to retrieve subscriptions for.
 * @param callback 
 */
export function getApiSubscriptions(apiId: string, callback: Callback<WickedCollection<WickedSubscription>>): void {
    getApiSubscriptionsAs(apiId, null, callback);
}

export function getApiSubscriptionsAs(apiId: string, asUserId: string, callback: Callback<WickedCollection<WickedSubscription>>): void {
    apiGet(`apis/${apiId}/subscriptions`, asUserId, callback);
}

// PLANS

/**
 * Retrieve a list of API Plans for a specific API.
 * 
 * @param apiId The id of the API to retrieve the associated plans for
 * @param callback 
 */
export function getApiPlans(apiId: string, callback: Callback<WickedApiPlan[]>): void {
    getApiPlansAs(apiId, null, callback);
}

export function getApiPlansAs(apiId: string, asUserId: string, callback: Callback<WickedApiPlan[]>): void {
    apiGet(`apis/${apiId}/plans`, asUserId, callback);
}

/**
 * Return a collection of all API plans, disregarding their association with APIs or not. This is an open
 * endpoint, so there is no `As` alternative.
 * @param callback 
 */
export function getPlans(callback: Callback<WickedApiPlanCollection>): void {
    apiGet('plans', null, callback);
}

// GROUPS

/**
 * Retrieve a collection of all wicked user groups. This is an open
 * endpoint, so there is no `As` alternative.
 * @param callback 
 */
export function getGroups(callback: Callback<WickedGroupCollection>): void {
    apiGet('groups', null, callback);
}

// USERS

/**
 * Retrieves user short info by custom id.
 * 
 * @param customId The custom id of the user to retrieve
 * @param callback 
 */
export function getUserByCustomId(customId: string, callback: Callback<WickedUserShortInfo[]>): void {
    apiGet(`users?customId=${qs.escape(customId)}`, null, callback);
}

/**
 * Retrieves user short info by email address.
 * 
 * @param email The email address of the user to retrieve
 * @param callback 
 */
export function getUserByEmail(email: string, callback: Callback<WickedUserShortInfo[]>): void {
    apiGet(`users?email=${qs.escape(email)}`, null, callback);
}

/**
 * Retrieve list of users matching the given options. Chances are good you will rather want to use
 * getRegistrations().
 * 
 * @param options Collection get options
 * @param callback 
 */
export function getUsers(options: WickedGetOptions, callback: Callback<WickedUserShortInfo[]>): void {
    getUsersAs(options, null, callback);
}

export function getUsersAs(options: WickedGetOptions, asUserId: string, callback: Callback<WickedUserShortInfo[]>): void {
    let o = implementation.validateGetOptions(options);
    let url = implementation.buildUrl('users', o);
    apiGet(url, asUserId, callback);
}

/**
 * Creates a new user from the given information. Returns a user information object also containing
 * the new internal ID of the user.
 * 
 * @param userCreateInfo The basic user info needed to create a user
 * @param callback 
 */
export function createUser(userCreateInfo: WickedUserCreateInfo, callback: Callback<WickedUserInfo>): void {
    createUserAs(userCreateInfo, null, callback);
}

export function createUserAs(userCreateInfo: WickedUserCreateInfo, asUserId: string, callback: Callback<WickedUserInfo>): void {
    apiPost('users', userCreateInfo, asUserId, callback);
}

/**
 * Deletes a user. This function will only succeed if the user does not have any associated applications.
 * If the user has applications, these have to be deleted or re-owned first.
 * 
 * @param userId ID of user to delete
 * @param callback 
 */
export function deleteUser(userId: string, callback: ErrorCallback): void {
    deleteUserAs(userId, null, callback);
}

export function deleteUserAs(userId: string, asUserId: string, callback: ErrorCallback) {
    apiDelete(`users/${userId}`, asUserId, callback);
}

/**
 * Retrieves user information for a specific user.
 * 
 * @param userId ID of user to retrieve
 * @param callback 
 */
export function getUser(userId: string, callback: Callback<WickedUserInfo>): void {
    getUserAs(userId, null, callback);
}

export function getUserAs(userId: string, asUserId: string, callback: Callback<WickedUserInfo>): void {
    apiGet(`users/${userId}`, asUserId, callback);
}

/**
 * Special function which deletes the password for a specific user; this user will no longer be able to
 * log in using username and password anymore.
 * 
 * @param userId ID of user to delete password for.
 * @param callback 
 */
export function deleteUserPassword(userId: string, callback: ErrorCallback): void {
    deleteUserPasswordAs(userId, null, callback);
}

export function deleteUserPasswordAs(userId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`users/${userId}/password`, asUserId, callback);
}

// APPLICATIONS

/**
 * Retrieves all registered wicked applications.
 * 
 * @param options Get options (filtering, paging)
 * @param callback 
 */
export function getApplications(options: WickedGetCollectionOptions, callback: Callback<WickedCollection<WickedApplication>>): void {
    getApplicationsAs(options, null, callback);
}

export function getApplicationsAs(options: WickedGetCollectionOptions, asUserId: string, callback: Callback<WickedCollection<WickedApplication>>): void {
    const o = implementation.validateGetCollectionOptions(options);
    const url = implementation.buildUrl('applications', o);
    apiGet(url, asUserId, callback);
}

/**
 * Creates a new wicked application based on the given information.
 * 
 * @param appCreateInfo Application information for new application
 * @param callback 
 */
export function createApplication(appCreateInfo: WickedApplicationCreateInfo, callback: Callback<WickedApplication>): void {
    createApplicationAs(appCreateInfo, null, callback);
}

export function createApplicationAs(appCreateInfo: WickedApplicationCreateInfo, asUserId: string, callback: Callback<WickedApplication>): void {
    apiPost('applications', appCreateInfo, asUserId, callback);
}

/**
 * Retrieves the list of (predefined) application roles.
 * 
 * @param callback 
 */
export function getApplicationRoles(callback: Callback<WickedApplicationRole[]>): void {
    apiGet('applications/roles', null, callback);
}

/**
 * Retrieve information on the given application.
 * 
 * @param appId ID of application to retrieve
 * @param callback 
 */
export function getApplication(appId: string, callback: Callback<WickedApplication>): void {
    getApplicationAs(appId, null, callback);
}

export function getApplicationAs(appId: string, asUserId: string, callback: Callback<WickedApplication>): void {
    apiGet(`applications/${appId}`, asUserId, callback);
}

/**
 * Patch an application, e.g. change it's name or redirect URL, or whether it's confidential or not.
 * 
 * @param appId ID of application to patch
 * @param appPatchInfo Patch body
 * @param callback 
 */
export function patchApplication(appId: string, appPatchInfo: WickedApplicationCreateInfo, callback: Callback<WickedApplication>): void {
    patchApplicationAs(appId, appPatchInfo, null, callback);
}

export function patchApplicationAs(appId: string, appPatchInfo: WickedApplicationCreateInfo, asUserId: string, callback: Callback<WickedApplication>): void {
    apiPatch(`applications/${appId}`, appPatchInfo, asUserId, callback);
}

/**
 * Delete an application entirely.
 * 
 * @param appId ID of application to delete
 * @param callback 
 */
export function deleteApplication(appId: string, callback: ErrorCallback): void {
    deleteApplicationAs(appId, null, callback);
}

export function deleteApplicationAs(appId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`applications/${appId}`, asUserId, callback);
}

/**
 * Add an owner to a specific application.
 * 
 * @param appId ID of application to add an owner for
 * @param email Email address of additional owner
 * @param role The role of the additional owner
 * @param callback 
 */
export function addApplicationOwner(appId: string, email: string, role: WickedApplicationRoleType, callback: Callback<WickedApplication>): void {
    addApplicationOwnerAs(appId, email, role, null, callback);
}

export function addApplicationOwnerAs(appId: string, email: string, role: WickedApplicationRoleType, asUserId: string, callback: Callback<WickedApplication>): void {
    const body = {
        email: email,
        role: role
    };
    apiPost(`applications/${appId}/owners`, body, asUserId, callback);
}

/**
 * Delete an owner from an application.
 * 
 * @param appId ID of application to delete the owner from
 * @param email Email address of owner to delete from application
 * @param callback 
 */
export function deleteApplicationOwner(appId: string, email: string, callback: Callback<WickedApplication>): void {
    deleteApplicationOwnerAs(appId, email, null, callback);
}

export function deleteApplicationOwnerAs(appId: string, email: string, asUserId: string, callback: Callback<WickedApplication>): void {
    apiDelete(`applications/${appId}/owners?email=${qs.escape(email)}`, asUserId, callback);
}

// SUBSCRIPTIONS

/**
 * Retrieve all API subscriptions for a specific application.
 * 
 * @param appId ID of application to retrieve subscriptions for
 * @param callback 
 */
export function getSubscriptions(appId: string, callback: Callback<WickedSubscription[]>): void {
    getSubscriptionsAs(appId, null, callback);
}

export function getSubscriptionsAs(appId: string, asUserId: string, callback: Callback<WickedSubscription[]>): void {
    apiGet(`applications/${appId}/subscriptions`, asUserId, callback);
}

/**
 * Retrieve subscription information for an application based on an OAuth2 client ID and a given API.
 * 
 * @param clientId OAuth2 client ID of application
 * @param apiId ID of API
 * @param callback 
 */
export function getSubscriptionByClientId(clientId: string, apiId: string, callback: Callback<WickedSubscriptionInfo>): void {
    getSubscriptionByClientIdAs(clientId, apiId, null, callback);
}

export function getSubscriptionByClientIdAs(clientId: string, apiId: string, asUserId: string, callback: Callback<WickedSubscriptionInfo>): void {
    implementation._getSubscriptionByClientId(clientId, apiId, asUserId, callback);
}

/**
 * Create a new API subscription for an application.
 * 
 * @param appId ID of application to create a subscription for
 * @param subsCreateInfo Subscription create info (see type)
 * @param callback 
 */
export function createSubscription(appId: string, subsCreateInfo: WickedSubscriptionCreateInfo, callback: Callback<WickedSubscription>): void {
    createSubscriptionAs(appId, subsCreateInfo, null, callback);
}

export function createSubscriptionAs(appId: string, subsCreateInfo: WickedSubscriptionCreateInfo, asUserId: string, callback: Callback<WickedSubscription>): void {
    apiPost(`applications/${appId}/subscriptions`, subsCreateInfo, asUserId, callback);
}

/**
 * Retrieve a specific application API subscription.
 * 
 * @param appId ID of application to retrieve subscription for
 * @param apiId ID of API to which the subscription applies
 * @param callback 
 */
export function getSubscription(appId: string, apiId: string, callback: Callback<WickedSubscription>): void {
    getSubscriptionAs(appId, apiId, null, callback);
}

export function getSubscriptionAs(appId: string, apiId: string, asUserId: string, callback: Callback<WickedSubscription>): void {
    apiGet(`applications/${appId}/subscriptions/${apiId}`, asUserId, callback);
}

/**
 * Patch a subscriptions. This function is only used for approval workflows: Use this
 * to patch the subscription to be approved.
 * 
 * @param appId ID of application of which to patch the subscription
 * @param apiId ID of API
 * @param patchInfo Patch information (see type)
 * @param callback 
 */
export function patchSubscription(appId: string, apiId: string, patchInfo: WickedSubscriptionPatchInfo, callback: Callback<WickedSubscription>): void {
    patchSubscriptionAs(appId, apiId, patchInfo, null, callback);
}

export function patchSubscriptionAs(appId: string, apiId: string, patchInfo: WickedSubscriptionPatchInfo, asUserId: string, callback: Callback<WickedSubscription>): void {
    apiPatch(`applications/${appId}/apis/${apiId}`, patchInfo, asUserId, callback);
}

// APPROVALS

/**
 * Retrieve a list of all pending subscription approvals.
 * 
 * @param callback 
 */
export function getApprovals(callback: Callback<WickedApproval[]>): void {
    getApprovalsAs(null, callback);
}

export function getApprovalsAs(asUserId: string, callback: Callback<WickedApproval[]>): void {
    apiGet('approvals', asUserId, callback);
}

/**
 * Retrieve a specific approval request by ID.
 * 
 * @param approvalId ID of approval to retrieve
 * @param callback 
 */
export function getApproval(approvalId: string, callback: Callback<WickedApproval>): void {
    getApprovalAs(approvalId, null, callback);
}

export function getApprovalAs(approvalId: string, asUserId: string, callback: Callback<WickedApproval>): void {
    apiGet(`approvals/${approvalId}`, asUserId, callback);
}

// VERIFICATIONS

/**
 * Creates a verification record; depending on the type of the verification record, this may trigger
 * certain workflows, such as the "lost password" or "verify email address" workflow, given that the
 * wicked mailer is correctly configured and deployed.
 * 
 * @param verification Verification information to create a verification record for
 * @param callback 
 */
export function createVerification(verification: WickedVerification, callback: ErrorCallback): void {
    createVerificationAs(verification, null, callback);
}

export function createVerificationAs(verification: WickedVerification, asUserId: string, callback: ErrorCallback): void {
    apiPost('verifications', verification, asUserId, callback);
}

/**
 * Retrieve all pending verifications.
 * 
 * @param callback 
 */
export function getVerifications(callback: Callback<WickedVerification[]>): void {
    getVerificationsAs(null, callback);
}

export function getVerificationsAs(asUserId: string, callback: Callback<WickedVerification[]>): void {
    apiGet('verificaations', asUserId, callback);
}

/**
 * Retrieve a specific verification by its ID.
 * 
 * @param verificationId ID of verification to retrieve.
 * @param callback 
 */
export function getVerification(verificationId, callback: Callback<WickedVerification>): void {
    getVerificationAs(verificationId, null, callback);
}

export function getVerificationAs(verificationId, asUserId: string, callback: Callback<WickedVerification>): void {
    apiGet(`verifications/${verificationId}`, asUserId, callback);
}

/**
 * Delete a verification by ID.
 * 
 * @param verificationId ID of verification to delete.
 * @param callback 
 */
export function deleteVerification(verificationId: string, callback: ErrorCallback): void {
    deleteVerificationAs(verificationId, null, callback);
}

export function deleteVerificationAs(verificationId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`verifications/${verificationId}`, asUserId, callback);
}

// SYSTEM HEALTH

export function getSystemHealth(callback: Callback<WickedComponentHealth[]>): void {
    getSystemHealthAs(null, callback);
}

export function getSystemHealthAs(asUserId: string, callback: Callback<WickedComponentHealth[]>): void {
    apiGet('systemhealth', asUserId, callback);
}

// TEMPLATES

export function getChatbotTemplates(callback: Callback<WickedChatbotTemplates>): void {
    getChatbotTemplatesAs(null, callback);
}

export function getChatbotTemplatesAs(asUserId: string, callback: Callback<WickedChatbotTemplates>): void {
    apiGet('templates/chatbot', asUserId, callback);
}

export function getEmailTemplate(templateId: WickedEmailTemplateType, callback: Callback<string>): void {
    getEmailTemplateAs(templateId, null, callback);
}

export function getEmailTemplateAs(templateId: WickedEmailTemplateType, asUserId: string, callback: Callback<string>): void {
    apiGet(`templates/email/${templateId}`, asUserId, callback);
}

// AUTH-SERVERS

/**
 * Retrieve a string list of registered authorization servers. This just returns a list of names, to
 * get further information, use getAuthServer().
 * @param callback 
 */
export function getAuthServerNames(callback: Callback<string[]>): void {
    getAuthServerNamesAs(null, callback);
}

export function getAuthServerNamesAs(asUserId: string, callback: Callback<string[]>): void {
    apiGet('auth-servers', asUserId, callback);
}

/**
 * Retrieve information on a specific authorization server.
 * 
 * @param serverId ID of authorization server to retrieve information on.
 * @param callback 
 */
export function getAuthServer(serverId: string, callback: Callback<WickedAuthServer>): void {
    getAuthServerAs(serverId, null, callback);
}

export function getAuthServerAs(serverId: string, asUserId: string, callback: Callback<WickedAuthServer>): void {
    apiGet(`auth-servers/${serverId}`, asUserId, callback);
}

// WEBHOOKS

/**
 * Retrieve a list of all currently registered webhook listeners.
 * 
 * @param callback 
 */
export function getWebhookListeners(callback: Callback<WickedWebhookListener[]>): void {
    getWebhookListenersAs(null, callback);
}

export function getWebhookListenersAs(asUserId: string, callback: Callback<WickedWebhookListener[]>): void {
    apiGet('webhooks/listeners', asUserId, callback);
}

/**
 * Insert or update data of a specific webhook listener. After upserting the information of
 * a new webhook listener, the wicked API will start to accumulate events for this webhook
 * listener. These events can be retrieved using `getWebhookEvents` and deleted via
 * `deleteWebhookEvents`.
 * 
 * @param listenerId ID of listener to insert or update
 * @param listener Data of listener to insert or update
 * @param callback 
 */
export function upsertWebhookListener(listenerId: string, listener: WickedWebhookListener, callback: ErrorCallback): void {
    upsertWebhookListenerAs(listenerId, listener, null, callback);
}

export function upsertWebhookListenerAs(listenerId: string, listener: WickedWebhookListener, asUserId: string, callback: ErrorCallback): void {
    apiPut(`webhooks/listeners/${listenerId}`, listener, asUserId, callback);
}

/**
 * Delete a specific webhook listener.
 * 
 * @param listenerId ID of webhook listener to delete
 * @param callback 
 */
export function deleteWebhookListener(listenerId: string, callback: ErrorCallback): void {
    deleteWebhookListenerAs(listenerId, null, callback);
}

export function deleteWebhookListenerAs(listenerId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`webhooks/listeners/${listenerId}`, asUserId, callback);
}

/**
 * Retrieve all pending webhook events for a specific webhook listener. This operation is idempotent.
 * To delete the webhook events, subsequently call deleteWebhookEvent.
 * 
 * @param listenerId ID of webhook listener to retrieve pending events for
 * @param callback 
 */
export function getWebhookEvents(listenerId: string, callback: Callback<WickedEvent[]>): void {
    getWebhookEventsAs(listenerId, null, callback);
}

export function getWebhookEventsAs(listenerId: string, asUserId: string, callback: Callback<WickedEvent[]>): void {
    apiGet(`webhooks/events/${listenerId}`, asUserId, callback);
}

/**
 * Flush/delete all pending webhook events for a specific webhook listener.
 * 
 * @param listenerId ID of webhook listener to flush all events for.
 * @param callback 
 */
export function flushWebhookEvents(listenerId: string, callback: ErrorCallback): void {
    flushWebhookEventsAs(listenerId, null, callback);
}

export function flushWebhookEventsAs(listenerId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`webhooks/events/${listenerId}`, asUserId, callback);
}

/**
 * Delete a specific webhook event for a specific webhook listener from the event queue.
 * 
 * @param listenerId ID of webhook listener to delete an event for
 * @param eventId ID of event to delete
 * @param callback 
 */
export function deleteWebhookEvent(listenerId: string, eventId: string, callback: ErrorCallback): void {
    deleteWebhookEventAs(listenerId, eventId, null, callback);
}

export function deleteWebhookEventAs(listenerId: string, eventId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`webhooks/events/${listenerId}/${eventId}`, asUserId, callback);
}

// REGISTRATION POOLS

/**
 * Retrieve a map of registration pools and registration pool information.
 * 
 * @param callback 
 */
export function getRegistrationPools(callback: Callback<WickedPoolMap>): void {
    getRegistrationPoolsAs(null, callback);
}

export function getRegistrationPoolsAs(asUserId: string, callback: Callback<WickedPoolMap>): void {
    apiGet('pools', asUserId, callback);
}

/**
 * Retrieve information on a specific registration pool.
 * 
 * @param poolId ID of pool to retrieve information on
 * @param callback 
 */
export function getRegistrationPool(poolId: string, callback: Callback<WickedPool>): void {
    getRegistrationPoolAs(poolId, null, callback);
}

export function getRegistrationPoolAs(poolId: string, asUserId: string, callback: Callback<WickedPool>): void {
    apiGet(`pools/${poolId}`, asUserId, callback);
}

// NAMESPACES

/**
 * Retrieve a collection of namespaces for a given registration pool (`poolId`). **Note**: The registration pool
 * must have the `requireNamespace` option set for the namespace functions to be valid to call.
 * 
 * @param poolId ID of pool to retrieve namespaces for
 * @param options Get retrieval options (paging, filtering)
 * @param callback 
 */
export function getPoolNamespaces(poolId: string, options: WickedGetCollectionOptions, callback: Callback<WickedCollection<WickedNamespace>>): void {
    getPoolNamespacesAs(poolId, options, null, callback);
}

export function getPoolNamespacesAs(poolId: string, options: WickedGetCollectionOptions, asUserId: string, callback: Callback<WickedCollection<WickedNamespace>>): void {
    const o = implementation.validateGetCollectionOptions(options);
    const url = implementation.buildUrl(`pools/${poolId}/namespaces`, options);
    apiGet(url, asUserId, callback);
}

/**
 * Retrieve information on a specific namespace of a specific registration pool. Namespaces are usually
 * mapped to things like "tenants", so the description of a namespace can be a tenant name or similar.
 * 
 * @param poolId ID of pool to retrieve a namespace for
 * @param namespaceId ID of namespace to retrieve
 * @param callback 
 */
export function getPoolNamespace(poolId: string, namespaceId: string, callback: Callback<WickedNamespace>): void {
    getPoolNamespaceAs(poolId, namespaceId, null, callback);
}

export function getPoolNamespaceAs(poolId: string, namespaceId: string, asUserId: string, callback: Callback<WickedNamespace>): void {
    apiGet(`pools/${poolId}/namespaces/${namespaceId}`, asUserId, callback);
}

/**
 * Upsert a namespace in a specific registration pool. In order to create registrations for a specific
 * namespace, this function has to have been called for the namespace which is to be used.
 * 
 * @param poolId ID of pool to which the namespace to upsert belongs
 * @param namespaceId Id of namespace to upsert
 * @param namespaceInfo New namespace data to store for this namespace
 * @param callback 
 */
export function upsertPoolNamespace(poolId: string, namespaceId: string, namespaceInfo: WickedNamespace, callback: ErrorCallback): void {
    upsertPoolNamespaceAs(poolId, namespaceId, namespaceInfo, null, callback);
}

export function upsertPoolNamespaceAs(poolId: string, namespaceId: string, namespaceInfo: WickedNamespace, asUserId: string, callback: ErrorCallback): void {
    apiPut(`pools/${poolId}/namespaces/${namespaceId}`, namespaceInfo, asUserId, callback);
}

/**
 * Delete a registration pool namespace. Subsequently, it cannot be used to create or enumerate
 * registrations.
 * 
 * @param poolId ID of pool to which the namespace to delete belongs
 * @param namespaceId ID of namespace to delete
 * @param callback 
 */
export function deletePoolNamespace(poolId: string, namespaceId: string, callback: ErrorCallback): void {
    deletePoolNamespaceAs(poolId, namespaceId, null, callback);
}

export function deletePoolNamespaceAs(poolId: string, namespaceId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`pools/${poolId}/namespaces/${namespaceId}`, asUserId, callback);
}

// REGISTRATIONS

/**
 * Retrieve all registrations for a specific registration pool; use the `namespace` filtering inside the `options`
 * parameter to retrieve registrations for specific namespaces. Please note that the `namespace` option is required
 * for registration pools which requires namespaces, and is forbidden for registration pools which do not require
 * namespaces.
 * 
 * @param poolId ID of registration pool to retrieve registrations for
 * @param options Get options, e.g. namespace filtering, generic filtering and paging
 * @param callback 
 */
export function getPoolRegistrations(poolId: string, options: WickedGetRegistrationOptions, callback: Callback<WickedCollection<WickedRegistration>>): void {
    getPoolRegistrationsAs(poolId, options, null, callback);
}

export function getPoolRegistrationsAs(poolId: string, options: WickedGetRegistrationOptions, asUserId: string, callback: Callback<WickedCollection<WickedRegistration>>): void {
    const o = implementation.validateGetCollectionOptions(options) as WickedGetRegistrationOptions;
    if (options.namespace)
        o.namespace = options.namespace;
    const url = implementation.buildUrl(`registrations/pools/${poolId}`, o);
    apiGet(url, asUserId, callback);
}

/**
 * Retrieve a collection of user registrations for a specific registration pool id. This can
 * be a collection of 0 or more registration objects; it's valid for a user to have multiple
 * registrations for a single registration pool in case the registration pool requires
 * namespaces (but only one registration per namespace). In case the registration pool does not
 * require/support namespaces, the result will be an array of eiher 0 or 1 elements.
 * 
 * @param poolId ID of pool for which to retrieve a user's registrations
 * @param userId ID of user to retrieve registrations for
 * @param callback 
 */
export function getUserRegistrations(poolId: string, userId: string, callback: Callback<WickedCollection<WickedRegistration>>): void {
    getUserRegistrationsAs(poolId, userId, null, callback);
}

export function getUserRegistrationsAs(poolId: string, userId: string, asUserId: string, callback: Callback<WickedCollection<WickedRegistration>>): void {
    apiGet(`registrations/pools/${poolId}/users/${userId}`, asUserId, callback);
}

/**
 * Upsert a user registration. Note that if the registration pool requires the use of namespaces
 * the `userRegistration` object **must** contain a `namespace` property. Vice versa, if the registration
 * pool does not require/support namespaces, the `userRegistration` object must **not** contain
 * a `namespace` property.
 * 
 * @param poolId ID of pool to upsert a user registration for
 * @param userId ID of user to upsert a registration for
 * @param userRegistration User registration data.
 * @param callback 
 */
export function upsertUserRegistration(poolId: string, userId: string, userRegistration: WickedRegistration, callback: ErrorCallback): void {
    upsertUserRegistrationAs(poolId, userId, userRegistration, null, callback);
}

export function upsertUserRegistrationAs(poolId: string, userId: string, userRegistration: WickedRegistration, asUserId: string, callback: ErrorCallback): void {
    apiPut(`registrations/pools/${poolId}/users/${userId}`, userRegistration, asUserId, callback);
}

/**
 * Delete a specific user registration for a given registration pool (and optionally namespace).
 * 
 * @param poolId ID of registration pool to delete a user registration from
 * @param userId ID of user to delete a registration for
 * @param namespaceId Namespace to delete registration for; for registration pools not requiring a namespace, this must be `null`, otherwise it must be specified
 * @param callback 
 */
export function deleteUserRegistration(poolId: string, userId: string, namespaceId: string, callback: ErrorCallback): void {
    deleteUserRegistrationAs(poolId, userId, namespaceId, null, callback);
}

export function deleteUserRegistrationAs(poolId: string, userId: string, namespaceId: string, asUserId: string, callback: ErrorCallback): void {
    const o = {} as any;
    if (namespaceId)
        o.namespace = namespaceId;
    const url = implementation.buildUrl(`registrations/pools/${poolId}/users/${userId}`, o);
    apiDelete(url, asUserId, callback);
}

/**
 * Retrieve a map of all registrations, across all registration pools, a user has.
 * 
 * @param userId ID of user to retrieve all registrations for.
 * @param callback 
 */
export function getAllUserRegistrations(userId: string, callback: Callback<WickedRegistrationMap>): void {
    getAllUserRegistrationsAs(userId, null, callback);
}

export function getAllUserRegistrationsAs(userId: string, asUserId: string, callback: Callback<WickedRegistrationMap>): void {
    apiGet(`registrations/users/${userId}`, asUserId, callback);
}

// GRANTS

/**
 * Retrieve all grants a user has allowed to any application for accessing any API.
 * 
 * @param userId ID of user to retrieve grants for
 * @param options Get options (filtering, paging,...)
 * @param callback 
 */
export function getUserGrants(userId: string, options: WickedGetOptions, callback: Callback<WickedCollection<WickedGrant>>): void {
    getUserGrantsAs(userId, options, null, callback);
}

export function getUserGrantsAs(userId: string, options: WickedGetOptions, asUserId: string, callback: Callback<WickedCollection<WickedGrant>>): void {
    const o = implementation.validateGetOptions(options);
    const url = implementation.buildUrl(`grants/${userId}`, o);
    apiGet(url, asUserId, callback);
}

/**
 * Delete all grants a user has made to any application to access APIs on behalf of himself. After calling this
 * method, any non-trusted application will need to ask permission to the user again to access the user's data on
 * behalf of the user.
 * 
 * @param userId ID of user to delete all grants for.
 * @param callback 
 */
export function deleteAllUserGrants(userId: string, callback: ErrorCallback): void {
    deleteAllUserGrantsAs(userId, null, callback);
}

export function deleteAllUserGrantsAs(userId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`grants/${userId}`, asUserId, callback);
}

/**
 * Retrieve a specific access grant for a specific, user, application and API.
 * 
 * @param userId ID of user to retrieve a grant for
 * @param applicationId ID of application to retrieve a grant for
 * @param apiId ID of API for which to retrieve the grant
 * @param callback 
 */
export function getUserGrant(userId: string, applicationId: string, apiId: string, callback: Callback<WickedGrant>): void {
    getUserGrantAs(userId, applicationId, apiId, null, callback);
}

export function getUserGrantAs(userId: string, applicationId: string, apiId: string, asUserId: string, callback: Callback<WickedGrant>): void {
    apiGet(`grants/${userId}/applications/${applicationId}/apis/${apiId}`, asUserId, callback);
}

/**
 * Upsert a grant information for a user, so that a given application can access the given API
 * with a specific set of scopes on the user's behalf. This method is foremost used automatically
 * by the Authorization Server after it has asked the user whether a certain application is allowed
 * to access the user's data on the user's behalf.
 * 
 * @param userId ID of user to upsert a grant for
 * @param applicationId ID of application to upsert a grant for
 * @param apiId ID of API to upsert a grant for
 * @param grantInfo Grant information to store
 * @param callback 
 */
export function upsertUserGrant(userId: string, applicationId: string, apiId: string, grantInfo: WickedGrant, callback: ErrorCallback): void {
    upsertUserGrantAs(userId, applicationId, apiId, grantInfo, null, callback);
}

export function upsertUserGrantAs(userId: string, applicationId: string, apiId: string, grantInfo: WickedGrant, asUserId: string, callback: ErrorCallback): void {
    apiPut(`grants/${userId}/applications/${applicationId}/apis/${apiId}`, grantInfo, asUserId, callback);
}

/**
 * Delete a user's grant of access to a specific application and API.
 * 
 * @param userId ID of user of which to delete a grant
 * @param applicationId ID of application of which to delete a grant
 * @param apiId ID of API to delete a grant for
 * @param callback 
 */
export function deleteUserGrant(userId: string, applicationId: string, apiId: string, callback: ErrorCallback): void {
    deleteUserGrantAs(userId, applicationId, apiId, null, callback);
}

export function deleteUserGrantAs(userId: string, applicationId: string, apiId: string, asUserId: string, callback: ErrorCallback): void {
    apiDelete(`grants/${userId}/applications/${applicationId}/apis/${apiId}`, asUserId, callback);
}

// ======= CORRELATION ID HANDLER =======

/**
 * Express middleware implementation of a correlation ID handler; it inserts
 * a header `Correlation-Id` if it's not already present and passes it on to the 
 * wicked API. In case a header is already present, it re-uses the content. The
 * usual format of the correlation ID is a UUID.
 * 
 * Usage: `app.use(wicked.correlationIdHandler());`
 */
export function correlationIdHandler(): ExpressHandler {
    return function (req, res, next) {
        const correlationId = req.get('correlation-id');
        if (correlationId) {
            debug('Picking up correlation id: ' + correlationId);
            req.correlationId = correlationId;
        } else {
            req.correlationId = uuid.v4();
            debug('Creating a new correlation id: ' + req.correlationId);
        }
        implementation.wickedStorage.correlationId = correlationId;
        return next();
    };
}
