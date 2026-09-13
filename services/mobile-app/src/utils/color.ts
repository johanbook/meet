function parseColor(color: string): {
  red: number;
  green: number;
  blue: number;
} {
  const trimmed = color.trim();

  if (trimmed.startsWith("#") && trimmed.length === 7) {
    const red = parseInt(trimmed.slice(1, 3), 16);
    const green = parseInt(trimmed.slice(3, 5), 16);
    const blue = parseInt(trimmed.slice(5, 7), 16);

    return { red, green, blue };
  }

  const rgb = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/.exec(trimmed);

  if (rgb) {
    return {
      red: parseInt(rgb[1]),
      green: parseInt(rgb[2]),
      blue: parseInt(rgb[3]),
    };
  }

  return { red: 0, green: 0, blue: 0 };
}

/** Converts a #rgb or rgb() color to rgba() with the given opacity. */
export function alpha(color: string, opacity: number): string {
  const { red, green, blue } = parseColor(color);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
