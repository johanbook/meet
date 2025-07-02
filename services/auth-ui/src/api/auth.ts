import {
  getResetPasswordTokenFromURL as supertokensGetResetPasswordTokenFromURL,
  sendPasswordResetEmail as supertokensSendPasswordResetEmail,
  signIn as supertokensSignIn,
  signUp as supertokensSignUp,
  submitNewPassword as supertokensSubmitNewPassword,
} from "supertokens-auth-react/recipe/emailpassword";

export { signOut as logOut } from "supertokens-auth-react/recipe/emailpassword";
export {
  getEmailVerificationTokenFromURL,
  sendVerificationEmail,
  verifyEmail,
} from "supertokens-auth-react/recipe/emailverification";
export { attemptRefreshingSession } from "supertokens-auth-react/recipe/session";

export async function submitNewPassword(newPassword: string) {
  return await supertokensSubmitNewPassword({
    formFields: [{ id: "password", value: newPassword }],
  });
}

export function getResetPasswordTokenFromURL() {
  return supertokensGetResetPasswordTokenFromURL();
}

export async function sendPasswordResetEmail(email: string) {
  return await supertokensSendPasswordResetEmail({
    formFields: [{ id: "email", value: email }],
  });
}

export async function login(email: string, password: string) {
  return await supertokensSignIn({
    formFields: [
      {
        id: "email",
        value: email,
      },
      {
        id: "password",
        value: password,
      },
    ],
  });
}

export async function signUp(email: string, password: string) {
  return await supertokensSignUp({
    formFields: [
      {
        id: "email",
        value: email,
      },
      {
        id: "password",
        value: password,
      },
    ],
  });
}
