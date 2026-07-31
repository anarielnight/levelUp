declare module 'fetch-network-simulator' {
  export interface NetworkSimulatorConfig {
    debug?: boolean;
    latency?: { enabled: boolean; delayMs: number };
    packetLoss?: { enabled: boolean; lossRate: number };
    retry?: { enabled: boolean; maxAttempts: number; retryDelayMs: number };
    staleResponse?: { enabled: boolean; staleProbability: number };
    burstControl?: { enabled: boolean; maxConcurrent: number };
    networkSpeed?: { enabled: boolean; kbps: number };
  }

  export function enableNetworkSimulator(config: NetworkSimulatorConfig): void;
  export function disableNetworkSimulator(): void;
}