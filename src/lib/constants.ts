// Circuit-themed design constants
export const CIRCUIT_COLORS = {
  // Primary circuit board colors
  board: {
    dark: '#0a192f',
    medium: '#112240',
    light: '#1d3a5f',
  },
  // Trace colors (copper/gold tones)
  trace: {
    primary: '#64ffda',
    secondary: '#ffd700',
    copper: '#b87333',
    dim: 'rgba(100, 255, 218, 0.3)',
  },
  // Component colors
  component: {
    resistor: '#8b4513',
    capacitor: '#4169e1',
    led: '#ff6b6b',
    chip: '#2d2d2d',
  },
  // Status indicators
  status: {
    active: '#64ffda',
    inactive: '#495670',
    warning: '#ffd700',
    error: '#ff6b6b',
  },
  // Text colors
  text: {
    primary: '#ccd6f6',
    secondary: '#8892b0',
    accent: '#64ffda',
  },
} as const;

export const CIRCUIT_SPACING = {
  grid: 8, // Base grid unit in pixels
  trace: 2, // Trace line width
  pad: 6, // Solder pad diameter
  via: 4, // Via hole diameter
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  trace: 1500, // For trace drawing animations
  pulse: 2000, // For LED pulse effects
} as const;

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  C: '#555555',
  'C++': '#f34b7d',
  Rust: '#dea584',
  Verilog: '#b2b7f8',
  VHDL: '#adb2cb',
  Assembly: '#6e4c13',
  Makefile: '#427819',
  Shell: '#89e051',
  default: '#8892b0',
};

export const PROJECT_CATEGORIES = [
  { id: 'embedded', label: 'Embedded Systems', icon: 'chip' },
  { id: 'power-systems', label: 'Power Systems', icon: 'zap' },
  { id: 'pcb-design', label: 'PCB Design', icon: 'layout' },
  { id: 'firmware', label: 'Firmware', icon: 'cpu' },
  { id: 'simulation', label: 'Simulation', icon: 'activity' },
  { id: 'iot', label: 'IoT', icon: 'wifi' },
  { id: 'robotics', label: 'Robotics', icon: 'cog' },
  { id: 'dsp', label: 'DSP', icon: 'waveform' },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
