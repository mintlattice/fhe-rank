import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

const projectId = (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '').trim();

export const RAINBOW_PROJECT_ID = projectId;

export const config = getDefaultConfig({
  appName: 'Encrypted Ranking Portal',
  projectId: '00000000000000000000000000000000',
  chains: [sepolia],
  ssr: false,
});
