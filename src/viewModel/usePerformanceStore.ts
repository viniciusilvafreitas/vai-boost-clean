import { useState, useCallback } from 'react';
import { 
  PerformanceMetricsSchema, 
  StorageScannerSchema, 
  ThermalStateSchema,
  NetworkTuningSchema,
  RamOptimizationSchema,
  BackgroundProcess
} from '../types';
import { CleanStorageUseCase } from '../domain/CleanStorageUseCase';
import { ThermalControlUseCase } from '../domain/ThermalControlUseCase';
import { InputDelayOptimizerUseCase } from '../domain/InputDelayOptimizerUseCase';
import { NetworkPingTuningUseCase } from '../domain/NetworkPingTuningUseCase';
import { MemoryContiguousFreeUseCase } from '../domain/MemoryContiguousFreeUseCase';

export function usePerformanceStore() {
  const [metrics, setMetrics] = useState<PerformanceMetricsSchema>({
    pingMs: 58,
    ramUsagePercent: 82,
    internetSpeedMbps: 45,
    inputDelayMs: 38,
    cpuTemperatureCelsius: 43.5,
    timestamp: Date.now()
  });

  const [storage, setStorage] = useState<StorageScannerSchema>({
    isScanning: false,
    totalFreedBytes: 0,
    categories: [
      { id: '1', name: 'WhatsApp Mídias Enviadas', path: 'WhatsApp/Media/Images/Sent', sizeBytes: 1540000000, isSentMedia: true, isSafeToClean: true, fileCount: 1450 },
      { id: '2', name: 'WhatsApp Mídias Recebidas', path: 'WhatsApp/Media/Images/', sizeBytes: 3200000000, isSentMedia: false, isSafeToClean: false, fileCount: 4200 },
      { id: '3', name: 'Thumbnails Ocultas', path: 'DCIM/.thumbnails', sizeBytes: 850000000, isSentMedia: false, isSafeToClean: true, fileCount: 10200 },
      { id: '4', name: 'Cache de Aplicativos', path: 'Android/data/*/cache', sizeBytes: 2100000000, isSentMedia: false, isSafeToClean: true, fileCount: 540 }
    ]
  });

  const [thermal, setThermal] = useState<ThermalStateSchema>({
    isCooling: false,
    backgroundProcesses: [
      { pid: 10234, packageName: 'com.social.media', cpuUsagePercent: 12, ramUsageMb: 350, isSystem: false },
      { pid: 10555, packageName: 'com.music.player', cpuUsagePercent: 8, ramUsageMb: 120, isSystem: false },
      { pid: 10892, packageName: 'com.android.systemui', cpuUsagePercent: 3, ramUsageMb: 200, isSystem: true }
    ],
    temperatureDroppedCelsius: 0
  });

  const [network, setNetwork] = useState<NetworkTuningSchema>({
    isTuning: false,
    activeDns: 'Default ISP',
    cacheFlushed: false
  });

  const [ramOpt, setRamOpt] = useState<RamOptimizationSchema>({
    isOptimizing: false,
    contiguousBlocksFreed: 0
  });

  const updateMetrics = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      pingMs: Math.max(12, prev.pingMs + (Math.random() * 6 - 3)),
      ramUsagePercent: Math.max(30, Math.min(98, prev.ramUsagePercent + (Math.random() * 2 - 1))),
      internetSpeedMbps: Math.max(10, prev.internetSpeedMbps + (Math.random() * 4 - 2)),
      inputDelayMs: Math.max(8, prev.inputDelayMs + (Math.random() * 2 - 1)),
      cpuTemperatureCelsius: Math.max(30, Math.min(50, prev.cpuTemperatureCelsius + (Math.random() * 1 - 0.5))),
      timestamp: Date.now()
    }));
  }, []);

  const executeThermalCooling = useCallback(() => {
    setThermal(prev => ({ ...prev, isCooling: true }));
    setTimeout(() => {
      const parasites = ThermalControlUseCase.identifyParasiteProcesses(thermal.backgroundProcesses);
      const tempDrop = ThermalControlUseCase.calculateTemperatureDrop(parasites.length);
      
      setThermal(prev => ({
        ...prev,
        isCooling: false,
        backgroundProcesses: prev.backgroundProcesses.filter(p => p.isSystem), // Keep only system
        temperatureDroppedCelsius: tempDrop
      }));
      setMetrics(prev => ({
        ...prev,
        cpuTemperatureCelsius: prev.cpuTemperatureCelsius - tempDrop
      }));
    }, 1500);
  }, [thermal.backgroundProcesses]);

  const executeInputCalibration = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      inputDelayMs: InputDelayOptimizerUseCase.calculateOptimalDelay(prev.inputDelayMs)
    }));
  }, []);

  const executeNetworkTuning = useCallback(() => {
    setNetwork(prev => ({ ...prev, isTuning: true }));
    setTimeout(() => {
      const bestDns = NetworkPingTuningUseCase.selectOptimalDns();
      setNetwork(prev => ({
        ...prev,
        isTuning: false,
        activeDns: bestDns,
        cacheFlushed: true
      }));
      setMetrics(prev => ({
        ...prev,
        pingMs: NetworkPingTuningUseCase.calculateOptimizedPing(prev.pingMs)
      }));
    }, 1200);
  }, []);

  const executeRamOptimization = useCallback(() => {
    setRamOpt(prev => ({ ...prev, isOptimizing: true }));
    setTimeout(() => {
      const totalRamMb = 8192; // 8GB example
      const freedBlocks = MemoryContiguousFreeUseCase.calculateFreedBlocks(metrics.ramUsagePercent, totalRamMb);
      setRamOpt(prev => ({
        ...prev,
        isOptimizing: false,
        contiguousBlocksFreed: freedBlocks
      }));
      setMetrics(prev => ({
        ...prev,
        ramUsagePercent: Math.max(30, prev.ramUsagePercent - 15) // Rough drop
      }));
    }, 1500);
  }, [metrics.ramUsagePercent]);

  const executeDeepClean = useCallback(() => {
    setStorage(prev => ({ ...prev, isScanning: true }));
    setTimeout(() => {
      const freed = CleanStorageUseCase.calculatePotentialMemoryGain(storage.categories);
      setStorage(prev => ({
        ...prev,
        isScanning: false,
        totalFreedBytes: freed,
        categories: prev.categories.map(c => c.isSafeToClean ? { ...c, sizeBytes: 0, fileCount: 0 } : c)
      }));
    }, 2000);
  }, [storage.categories]);


  return { 
    metrics, 
    storage, 
    thermal,
    network,
    ramOpt,
    updateMetrics, 
    executeThermalCooling,
    executeInputCalibration,
    executeNetworkTuning,
    executeRamOptimization,
    executeDeepClean
  };
}
