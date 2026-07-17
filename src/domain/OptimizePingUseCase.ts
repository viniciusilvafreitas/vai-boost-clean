export class OptimizePingUseCase {
  /**
   * Avalia a melhor rota de DNS com base no ping atual do ISP padrão.
   */
  static evaluateBestDNS(currentPing: number): { bestDns: string, expectedPing: number } {
    const cloudflarePing = Math.max(12, currentPing - 28);
    const googlePing = Math.max(15, currentPing - 20);
    
    if (cloudflarePing < googlePing) {
      return { bestDns: '1.1.1.1 (Cloudflare)', expectedPing: cloudflarePing };
    }
    return { bestDns: '8.8.8.8 (Google)', expectedPing: googlePing };
  }
}
