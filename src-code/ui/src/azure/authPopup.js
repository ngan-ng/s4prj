import { InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';
import { b2cPolicies } from './policies';
import { apiConfig } from './apiConfig';
const { msalConfig, loginRequest, tokenRequest } = require('./authConfig');

const myMSALObj = new PublicClientApplication(msalConfig);

let accountId = '';

function setAccount(account) {
  accountId = account.homeAccountId;
}

export function selectAccount() {
  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts.length < 1) {
    return;
  } else if (currentAccounts.length > 1) {
    /**
     * Due to the way MSAL caches account objects, the auth response from initiating a user-flow
     * is cached as a new account, which results in more than one account in the cache. Here we make
     * sure we are selecting the account with homeAccountId that contains the sign-up/sign-in user-flow,
     * as this is the default flow the user initially signed-in with.
     */
    const accounts = currentAccounts.filter(
      (acc) =>
        acc.homeAccountId.toLowerCase().includes(b2cPolicies.names.signUpSignIn.toLowerCase()) &&
        acc.idTokenClaims.iss.toLowerCase().includes(b2cPolicies.authorityDomain.toLowerCase()) &&
        acc.idTokenClaims.aud === msalConfig.auth.clientId
    );

    if (accounts.length > 1) {
      if (accounts.every((acc) => acc.localAccountId === accounts[0].localAccountId)) {
        // All accounts belong to the same user
        return accounts[0];
      } else {
        signOut();
      }
    } else if (accounts.length === 1) {
      return accounts[0];
    }
  } else if (currentAccounts.length === 1) {
    return currentAccounts[0];
  }
}

// in case of page refresh
selectAccount();

export function handleResponse(response) {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  if (response !== null) {
    setAccount(response.account);
  } else {
    selectAccount();
  }
  return response;
}

export function signIn() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */
  return myMSALObj
    .loginPopup(loginRequest)
    .then((response) => {
      handleResponse(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
export function signOut() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  const logoutRequest = {
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri
  };

  myMSALObj.logoutPopup(logoutRequest);
}

export async function getTokenPopup(request) {
  /**
   * See here for more information on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = myMSALObj.getAccountByHomeId(accountId);

  try {
    const response = await myMSALObj.acquireTokenSilent(request);
    // In case the response from B2C server has an empty accessToken field
    // throw an error to initiate token acquisition
    if (!response.accessToken || response.accessToken === '') {
      throw new InteractionRequiredAuthError();
    }
    return response;
  } catch (error) {
    console.log('Silent token acquisition fails. Acquiring token using popup. \n', error);
    if (error instanceof InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      return myMSALObj
        .acquireTokenPopup(request)
        .then((resp_in_catch) => {
          console.log(resp_in_catch);
          return resp_in_catch;
        })
        .catch((error_in_catch) => {
          console.log(error_in_catch);
        });
    } else {
      console.log(error);
    }
  }
}

export function callApi(endpoint, token) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers
  };
  console.log('Calling to web API . . .');

  fetch(endpoint, options)
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp) {
        console.log('Web API responsed: ' + resp.names);
      }
      return resp;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function passTokenToApi() {
  getTokenPopup(tokenRequest).then((resp) => {
    if (resp) {
      console.log('access_token acquired at: ' + new Date().toString());
      try {
        callApi(apiConfig.webApi, resp.accessToken);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

export async function checkSession() {
  console.log('Before: ');
  const response = await getTokenPopup(tokenRequest);
  console.log('fdsfdsfdsfdsa: ', response);
  return response;
}
// /**
//  * To initiate a B2C user-flow, simply make a login request using
//  * the full authority string of that user-flow e.g.
//  * https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile_v2
//  */
// export function editProfile() {
//     const editProfileRequest = b2cPolicies.authorities.editProfile;
//     editProfileRequest.loginHint =
//       myMSALObj.getAccountByHomeId(accountId).username;
//     myMSALObj.loginPopup(editProfileRequest).catch((error) => {
//       console.log(error);
//     });
//   }
