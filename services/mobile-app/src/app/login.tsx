import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Button } from "src/components/ui/Button/Button";
import { TextField } from "src/components/ui/TextField/TextField";
import { Typography } from "src/components/ui/Typography/Typography";
import {
  AuthError,
  hasSession,
  isManualCookieTransport,
  resendVerificationEmail,
  signIn,
} from "src/core/authentication";
import { useForm, required } from "src/core/forms";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    redirectTarget?: string;
    verify?: string;
  }>();
  const snackbar = useSnackbar();
  const theme = useTheme();
  const { height: windowHeight } = useWindowDimensions();

  const redirectTarget = params.redirectTarget || "/";
  const needsVerification = params.verify === "1";

  const form = useForm<LoginFormValues>(
    { email: "", password: "" },
    {
      email: required<LoginFormValues>(),
      password: required<LoginFormValues>(),
    },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  async function handleSubmit(): Promise<void> {
    const { data, isValid } = form.validate();

    if (!isValid) {
      console.log("Data not valid");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      await signIn(data.email, data.password);

      // Without a captured session the next guarded request would 401 and
      // bounce straight back here; surface that instead of silently looping.
      if (isManualCookieTransport() && !hasSession()) {
        setErrorMessage(
          "Signed in, but the session could not be stored on this " +
            "device. Try again, or contact support with the console output.",
        );

        return;
      }

      router.replace(redirectTarget);
    } catch (error) {
      if (error instanceof AuthError && error.status === 401) {
        setErrorMessage("Incorrect email or password");
      } else {
        // Browsers report CORS rejections and connection failures both as
        // fetch TypeErrors with no visible console output; make it visible.
        console.error("Sign in failed", error);

        if (Platform.OS === "web") {
          setErrorMessage(
            "Unable to sign in from the web preview - browsers block " +
              "cross-origin API calls (CORS). Use the iOS simulator or a " +
              "device instead.",
          );
        } else {
          setErrorMessage(
            "Unable to sign in. Check your connection and try again.",
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendVerification(): Promise<void> {
    setIsResending(true);

    try {
      await resendVerificationEmail();
      snackbar.success("Verification email sent");
    } catch {
      snackbar.error("Unable to send verification email");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <View style={{ backgroundColor: theme.palette.background.main, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, width: "100%" }}
      >
        {/* flex: 1 keeps short content vertically centered while the
            minHeight fallback guarantees centering on platforms where the
            scroll content container does not grow. Taller content overflows
            and scrolls. */}
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            minHeight: windowHeight,
            padding: 32,
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderRadius: 32,
              height: 64,
              justifyContent: "center",
              marginBottom: 12,
              width: 64,
            }}
          >
            <Text
              style={{
                color: theme.palette.primary,
                fontSize: 32,
                lineHeight: 32,
              }}
            >
              {"\u2665"}
            </Text>
          </View>
          <Typography variant="h5">Meet</Typography>
          <Typography color="textSecondary" variant="body2">
            Sign in to continue
          </Typography>

          {needsVerification ? (
            <View
              style={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.info,
                borderRadius: 8,
                borderWidth: 1,
                marginTop: 20,
                padding: 12,
                width: "100%",
              }}
            >
              <Typography color="textSecondary" variant="body2">
                {"Your email address has not been verified yet. Check your inbox, or send a new verification email."}
              </Typography>
              <Button
                disabled={isResending}
                loading={isResending}
                onPress={() => handleResendVerification()}
                variant="text"
              >
                Send new verification email
              </Button>
            </View>
          ) : null}

          <View
            style={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: 16,
              borderWidth: 1,
              elevation: 2,
              gap: 16,
              marginTop: 28,
              maxWidth: 400,
              padding: 24,
              width: "100%",
            }}
          >
            {errorMessage ? (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            ) : null}
            <TextField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              label="Email"
              onValueChange={(value) => form.setValue({ email: value })}
              value={form.state.email.value}
            />
            <TextField
              label="Password"
              onValueChange={(value) => form.setValue({ password: value })}
              secureTextEntry
              value={form.state.password.value}
            />
            <Button
              color="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Sign in
            </Button>
          </View>

          <View style={{ marginTop: 24 }}>
            <Typography color="textSecondary" variant="caption">
              {
                "New accounts are created on the web at this domain's login page."
              }
            </Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
