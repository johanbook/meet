import { ThemeEnum } from "./theme.enum";

interface Palette {
  primary: string;
  error: string;
  success: string;
}

const PALETTES: Record<ThemeEnum, Palette> = {
  default: {
    primary: "rgb(200,100,150)",
    success: "rgb(100,150,100)",
    error: "rgb(190,100,100)",
  },
  neon: {
    primary: "#00A3C0",
    success: "#389f00",
    error: "#FF2A04",
  },
};

export default PALETTES;
