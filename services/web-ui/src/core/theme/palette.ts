interface Palette {
  primary: string;
  error: string;
  success: string;
}

const PALETTES: Record<string, Palette> = {
  faded: {
    primary: "rgb(200,100,150)",
    success: "rgb(120,180,130)",
    error: "rgb(210,120,120)",
  },
  neon: {
    primary: "#00A3C0",
    success: "#389f00",
    error: "#FF2A04",
  },
};

export default PALETTES["faded"];
