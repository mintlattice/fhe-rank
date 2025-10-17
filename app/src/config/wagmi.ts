import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// No environment variables in frontend
export const RAINBOW_PROJECT_ID = '00000000000000000000000000000000';

export const config = getDefaultConfig({
  appName: 'Encrypted Ranking Portal',
  projectId: RAINBOW_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
