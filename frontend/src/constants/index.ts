// Fitness tracker providers
export const FITNESS_PROVIDERS = [
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: '/fitbit.svg',
    color: '#00B0B9',
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    icon: '/google-fit.svg',
    color: '#4285F4',
  },
  {
    id: 'apple-health',
    name: 'Apple Health',
    icon: '/apple-health.svg',
    color: '#000000',
  },
];

// Navigation links
export const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
];

// Environment variables
export const ENV = {
  INFURA_ID: import.meta.env.VITE_INFURA_ID || '',
  FIT_TOKEN_ADDRESS: import.meta.env.VITE_FIT_TOKEN_ADDRESS || '',
  FITBIT_CLIENT_ID: import.meta.env.VITE_FITBIT_CLIENT_ID || '',
  GOOGLE_FIT_CLIENT_ID: import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID || '',
};
