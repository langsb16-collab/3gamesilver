export enum GameType {
  BLUEBIRD = "BLUEBIRD",
  FIREFLY = "FIREFLY",
  SUNRISE = "SUNRISE",
}

export enum BreathPhase {
  INHALE = "INHALE",
  HOLD = "HOLD",
  EXHALE = "EXHALE",
}

export interface SessionRecord {
  id: number;
  date: string;
  game_type: GameType;
  duration: number;
  score: number;
}

export const COLORS = {
  sky: "#6FA8DC",
  sunset: "#F6A65A",
  night: "#1F2A44",
  bluebird: "#4A90E2",
  firefly: "#C6FF4D",
  sun: "#E94A3F",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
};

export const BREATH_TIMING = {
  INHALE: 4,
  HOLD: 1,
  EXHALE: 5,
};
