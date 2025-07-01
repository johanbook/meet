import {
  sendPasswordResetEmail as superTokensSendPasswordResetEmail,
  signIn as supertokensSignIn,
  signUp as supertokensSignUp,
} from "supertokens-auth-react/recipe/emailpassword";

export async function sendPasswordResetEmail(email: string) {
  return await superTokensSendPasswordResetEmail({
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
