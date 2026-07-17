import { BackgroundProcess } from '../types';

export class ThermalControlUseCase {
  /**
   * Identifies background processes that are safe to kill and are consuming high CPU,
   * thus contributing to thermal throttling.
   */
  static identifyParasiteProcesses(processes: BackgroundProcess[]): BackgroundProcess[] {
    return processes.filter(p => !p.isSystem && p.cpuUsagePercent > 5);
  }

  /**
   * Simulates the calculation of temperature drop after killing processes.
   */
  static calculateTemperatureDrop(killedProcessesCount: number): number {
    return Number((killedProcessesCount * 0.4).toFixed(1)); // 0.4 degrees per process
  }
}
