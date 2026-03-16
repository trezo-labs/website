"use client";

import { create, EvmChains } from "@trezo/evm";
import { TaskManagerAbi } from "../abi";

export const evmConfig = create({
  address: "0x60Ad5b7dFb1bbf0D91c44D4cA80422B68213AABD",
  abi: [...TaskManagerAbi] as const,
  chains: [EvmChains.optimismSepolia, EvmChains.optimism],
  rpcUrl: "https://optimism-sepolia-public.nodies.app", // "wss://optimism-sepolia.drpc.org",
  kit: {
    name: "connectkit",
    config: {
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
      metadata: {
        appName: "Trezo",
        appIcon: "https://trezo.xyz/logo.svg",
        appDescription: "Trezo is a task management dapp on Optimism Sepolia",
        appUrl: "http://localhost:3000",
      },
    },
  },
});

export const { ConnectButton, Provider } = evmConfig;
