import {
  sendPasswordResetEmail,
  signIn,
  signUp,
} from "supertokens-auth-react/recipe/emailpassword";

export async function resetPasswordByEmail(email: string) {
  return await sendPasswordResetEmail({
    formFields: [{ id: "email", value: email }],
  });
}

export async function login(email: string, password: string) {
  return await signIn({
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

export async function doSignup(email: string, password: string) {
  return await signUp({
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
