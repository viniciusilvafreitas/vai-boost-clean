/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StorageCategory {
  id: string;
  name: string;
  path: string;
  sizeBytes: number;
  isSentMedia: boolean;
  isSafeToClean: boolean;
  fileCount: number;
}

export interface StorageScannerSchema {
  isScanning: boolean;
  totalFreedBytes: number;
  categories: StorageCategory[];
}

export interface PerformanceMetricsSchema {
  pingMs: number;
  ramUsagePercent: number;
  internetSpeedMbps: number;
  inputDelayMs: number;
  cpuTemperatureCelsius: number;
  timestamp: number;
}

export interface BackgroundProcess {
  pid: number;
  packageName: string;
  cpuUsagePercent: number;
  ramUsageMb: number;
  isSystem: boolean;
}

export interface ThermalStateSchema {
  isCooling: boolean;
  backgroundProcesses: BackgroundProcess[];
  temperatureDroppedCelsius: number;
}

export interface NetworkTuningSchema {
  isTuning: boolean;
  activeDns: string;
  cacheFlushed: boolean;
}

export interface RamOptimizationSchema {
  isOptimizing: boolean;
  contiguousBlocksFreed: number;
}

