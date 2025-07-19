export interface FitnessData {
  provider: string;
  steps: number;
  calories: number;
  activeMinutes: number;
  lastSynced?: string;
}

export interface User {
  address: string | null;
  isConnected: boolean;
  fitnessData: FitnessData | null;
}
