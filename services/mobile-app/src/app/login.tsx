import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Button } from "src/components/ui/Button/Button";
import { TextField } from "src/components/ui/TextField/TextField";
import { Typography } from "src/components/ui/Typography/Typography";
import { AuthError, resendVerificationEmail, signIn } from "src/core/authentication";
import { useForm, required } from "src/core/forms";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { config } from "src/config";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ redirectTarget?: string; verify?: string }>();
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  async function handleSubmit(): Promise<void> {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      await signIn(data.email, data.password);
      router.replace(redirectTarget);
    } catch (error) {
      if (error instanceof AuthError && error.status === 401) {
        setErrorMessage("Incorrect email or password");
      } else {
        setErrorMessage("Unable to sign in. Check the connection and try again.");
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
        {/* The minHeight keeps short forms vertically centered while longer
            content still scrolls. */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: windowHeight,
            padding: 32,
          }}
        >
          <Typography variant="h4">Meet</Typography>
          <Typography color="textSecondary" variant="body2">
            Sign in to continue
          </Typography>
          {needsVerification ? (
            <View
              style={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.info,
                borderRadius: 4,
                borderWidth: 1,
                marginTop: 16,
                padding: 12,
              }}
            >
              <Text style={{ color: theme.palette.text.primary, fontSize: 14 }}>
                Your email address has not been verified yet. Check your inbox,
                or send a new verification email.
              </Text>
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
          <Typography color="textSecondary" variant="caption">
            {"New accounts are created on the web at this domain's login page."}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            API: {config.API.BASE_URL}
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
}