/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signin_or_signup'
    // forgotPassword: 'B2C_1_reset_v3',
    // editProfile: 'B2C_1_edit_profile_v2',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://s4prj.b2clogin.com/s4prj.onmicrosoft.com/B2C_1_signin_or_signup'
    }
    // forgotPassword: {
    //     authority: 'https://s4prj.b2clogin.com/s4prj.onmicrosoft.com/B2C_1_reset_v3',
    // },
    // editProfile: {
    //     authority: 'https://s4prj.b2clogin.com/s4prj.onmicrosoft.com/b2c_1_edit_profile_v2',
    // },
  },
  authorityDomain: 's4prj.b2clogin.com'
};
