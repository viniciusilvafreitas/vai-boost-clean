export class InputDelayOptimizerUseCase {
  /**
   * Calculates the optimal touch latency reduction by analyzing the current delay.
   * Aims to bring delay closer to hardware limits (e.g., 10-15ms).
   */
  static calculateOptimalDelay(currentDelayMs: number): number {
    const hardwareLimit = 12; // Base hardware latency assumption
    if (currentDelayMs <= hardwareLimit + 2) return currentDelayMs;
    // Simulate a reduction of 40-60% of the overhead
    const overhead = currentDelayMs - hardwareLimit;
    const reduction = overhead * (0.4 + Math.random() * 0.2);
    return Math.max(hardwareLimit, Math.floor(currentDelayMs - reduction));
  }
}
