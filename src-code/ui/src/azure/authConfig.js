/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {LogLevel} from '@azure/msal-browser';
import {b2cPolicies} from './policies';
import apiConfig from './apiConfig';

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const firefox = ua.indexOf('Firefox');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

const msalConfig = {
    auth: {
        clientId: '83c799f9-dfff-4e4d-9c7f-ee758c3a9496',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '' || 'http://localhost:3000' || 'http://localhost:3000/booking' || 'http://localhost:3000/manage-booking',
        postLogoutRedirectUri: '/'
    },
    cache: {
        cacheLocation: 'localStorage', // This configures where your cache will be stored
        // If you wish to store cache items in cookies as well as browser cache, set this to "true".
        // Set this to "true" if you are having issues on IE11 or Edge
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        // console.error(message);
                        return;
                    case LogLevel.Info:
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        // console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ['openid', ...apiConfig.b2cScopes]
};

export const tokenRequest = {
    scopes: [...apiConfig.b2cScopes],
    forceRefresh: false
};

// /**
//  * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
//  */
// export const graphConfig = {
//   graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
// };

export const protectedResources = {
    todoListApi: {
        endpoint: 'http://localhost:8080/api-v1/guest/airport/getAll',
        scopes: [apiConfig.b2cScopes]
    }
};

export default msalConfig;
