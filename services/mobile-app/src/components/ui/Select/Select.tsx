import { Pressable, View } from "react-native";

import { useTheme } from "src/core/theme";

import { Typography } from "../Typography/Typography";

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  disabled?: boolean;
  items: SelectItem[];
  label?: string;
  onValueChange: (value: string) => void;
  value: string;
}

export function Select({
  disabled = false,
  items,
  label,
  onValueChange,
  value,
}: SelectProps) {
  const theme = useTheme();
  const selected = items.find((item) => item.value === value);

  return (
    <View>
      {label ? (
        <Typography color="textSecondary" variant="caption">
          {label}
        </Typography>
      ) : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((item) => {
          const isSelected = item.value === value;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={disabled}
              key={item.value}
              onPress={() => onValueChange(item.value)}
              style={({ pressed }) => ({
                backgroundColor: isSelected
                  ? theme.palette.primary
                  : "transparent",
                borderColor: isSelected
                  ? theme.palette.primary
                  : theme.palette.divider,
                borderRadius: 16,
                borderWidth: 1,
                margin: 4,
                opacity: pressed ? 0.7 : 1,
                paddingHorizontal: 12,
                paddingVertical: 6,
              })}
            >
              <Typography
                color={isSelected ? "textPrimary" : "textSecondary"}
                variant="body2"
              >
                {item.label}
              </Typography>
            </Pressable>
          );
        })}
      </View>
      {selected ? null : (
        <Typography color="textSecondary" variant="caption">
          {value}
        </Typography>
      )}
    </View>
  );
}