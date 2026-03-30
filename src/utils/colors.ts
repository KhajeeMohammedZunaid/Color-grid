export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function generateSmartPalette(category: string = 'All'): string[] {
  // Aesthetically pleasing color generation for designers
  const rand = Math.random();
  let palette: string[] = [];

  const baseHue = Math.floor(Math.random() * 360);

  // Helper to generate a color with some jitter
  const genColor = (h: number, s: number, l: number) => {
    const jitterH = h + (Math.random() * 10 - 5);
    const jitterS = s + (Math.random() * 10 - 5);
    const jitterL = l + (Math.random() * 10 - 5);
    return hslToHex(
      (jitterH % 360 + 360) % 360, 
      Math.max(0, Math.min(100, jitterS)), 
      Math.max(0, Math.min(100, jitterL))
    );
  };

  if (rand < 0.25) {
    // 1. Pastel & Dreamy (Adorable)
    const hueOffset = 30 + Math.random() * 30;
    palette = [
      genColor(baseHue, 70, 85),
      genColor(baseHue + hueOffset, 75, 80),
      genColor(baseHue + hueOffset * 2, 70, 85),
      genColor(baseHue + hueOffset * 3, 80, 80),
      genColor(baseHue + hueOffset * 4, 65, 90),
    ];
  } else if (rand < 0.5) {
    // 2. Modern UI (1 dark, 1 light, 1 primary, 2 secondary/accents)
    palette = [
      genColor(baseHue, 15, 15), // Dark background/text
      genColor(baseHue, 10, 96),  // Light background
      genColor(baseHue, 85, 60), // Primary brand
      genColor(baseHue + 30, 75, 65), // Analogous secondary
      genColor(baseHue + 180, 85, 65), // Complementary accent
    ];
  } else if (rand < 0.75) {
    // 3. Monochromatic Elegance
    palette = [
      genColor(baseHue, 45, 15),
      genColor(baseHue, 55, 35),
      genColor(baseHue, 65, 55),
      genColor(baseHue, 55, 75),
      genColor(baseHue, 35, 92),
    ];
  } else {
    // 4. Earthy & Warm (Very trendy)
    const warmHue = 20 + Math.random() * 30; // 20 to 50 (Oranges, Browns, Yellows)
    palette = [
      genColor(warmHue, 45, 25), // Deep brown
      genColor(warmHue + 10, 55, 45), // Terracotta
      genColor(warmHue - 10, 50, 65), // Ochre
      genColor(warmHue, 35, 82), // Sand
      genColor(warmHue + 15, 25, 92), // Cream
    ];
  }

  return palette;
}

export function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace("#", "");
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split('').map(c => c + c).join('');
  }
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
}
