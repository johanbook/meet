import { TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "src/core/theme";

import { Typography } from "../Typography/Typography";

interface TextFieldProps {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: TextInputProps["autoCorrect"];
  disabled?: boolean;
  error?: string | undefined;
  keyboardType?: TextInputProps["keyboardType"];
  label?: string;
  minRows?: number;
  multiline?: boolean;
  onValueChange?: TextInputProps["onChangeText"];
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: "default" | "number";
  value: string;
}

const INPUT_HEIGHT = 56;

export function TextField({
  autoCapitalize,
  autoCorrect,
  disabled = false,
  error,
  keyboardType,
  label,
  minRows,
  multiline = false,
  onValueChange,
  placeholder,
  secureTextEntry = false,
  type = "default",
  value,
}: TextFieldProps) {
  const theme = useTheme();
  const borderColor = error ? theme.palette.error : theme.palette.divider;
  const height = multiline
    ? Math.max(INPUT_HEIGHT, (minRows ?? 2) * 20)
    : INPUT_HEIGHT;

  return (
    <View style={{ width: "100%" }}>
      {label ? (
        <Typography color="textSecondary" variant="caption">
          {label}
        </Typography>
      ) : null}
      <TextInput
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={!disabled}
        keyboardType={type === "number" ? "number-pad" : keyboardType}
        multiline={multiline}
        onChangeText={onValueChange}
        placeholder={placeholder}
        placeholderTextColor={theme.palette.text.secondary}
        secureTextEntry={secureTextEntry}
        style={{
          backgroundColor: theme.palette.background.paper,
          borderColor,
          borderRadius: 4,
          borderWidth: 1,
          color: theme.palette.text.primary,
          fontSize: 16,
          height,
          paddingHorizontal: 12,
          textAlignVertical: "top",
          width: "100%",
        }}
        value={value}
      />
      {error ? (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      ) : null}
    </View>
  );
}
