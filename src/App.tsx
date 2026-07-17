import React, { useEffect } from 'react';
import { Activity, Thermometer, Cpu, Wifi, MousePointer2, HardDrive, Trash2, Zap, Server, Shield, Layers } from 'lucide-react';
import { usePerformanceStore } from './viewModel/usePerformanceStore';

export default function App() {
  const { 
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
  } = usePerformanceStore();

  useEffect(() => {
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2A29] font-sans overflow-x-hidden selection:bg-[#8BA888] selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DFD3] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E5DFD3] flex items-center justify-center">
            <Activity size={18} className="text-[#2C2A29]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">VAI Core</h1>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65] font-medium">Motor de Performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#736E65]">
          <span className="text-xs font-medium bg-[#E5DFD3] px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8BA888] animate-pulse"></span>
            ATIVO
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-8 pb-20">
        
        {/* METRICS GRID */}
        <section>
          <h2 className="text-sm font-bold text-[#736E65] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity size={14} /> Telemetria do Sistema
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard 
              title="Ping" 
              value={`${Math.round(metrics.pingMs)} ms`} 
              icon={<Wifi size={16} />}
              status={metrics.pingMs > 40 ? 'aviso' : 'bom'}
            />
            <MetricCard 
              title="Uso de RAM" 
              value={`${Math.round(metrics.ramUsagePercent)}%`} 
              icon={<Cpu size={16} />}
              status={metrics.ramUsagePercent > 85 ? 'perigo' : 'bom'}
            />
            <MetricCard 
              title="Temp. da CPU" 
              value={`${metrics.cpuTemperatureCelsius.toFixed(1)}°C`} 
              icon={<Thermometer size={16} />}
              status={metrics.cpuTemperatureCelsius > 45 ? 'aviso' : 'bom'}
            />
            <MetricCard 
              title="Atraso de Entrada" 
              value={`${Math.round(metrics.inputDelayMs)} ms`} 
              icon={<MousePointer2 size={16} />}
              status={metrics.inputDelayMs > 25 ? 'aviso' : 'bom'}
            />
          </div>
        </section>

        {/* ACTIONS */}
        <section>
          <h2 className="text-sm font-bold text-[#736E65] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap size={14} /> Ações Táticas
          </h2>
          <div className="space-y-3">
            
            {/* Action 1: Deep Clean */}
            <ActionRow 
              icon={<Trash2 size={20} />}
              title="Limpeza Profunda"
              description="Expurgar mídias enviadas e caches ocultos"
              isActive={storage.isScanning}
              onClick={executeDeepClean}
              statusText={storage.totalFreedBytes > 0 ? `Liberado ${(storage.totalFreedBytes / 1024 / 1024).toFixed(0)} MB` : undefined}
            />

            {/* Action 2: Thermal Control */}
            <ActionRow 
              icon={<Thermometer size={20} />}
              title="Resfriamento Térmico"
              description="Suspender tarefas pesadas em 2º plano"
              isActive={thermal.isCooling}
              onClick={executeThermalCooling}
              statusText={thermal.temperatureDroppedCelsius > 0 ? `Reduziu ${thermal.temperatureDroppedCelsius.toFixed(1)}°C` : undefined}
            />

            {/* Action 3: RAM Optimizer */}
            <ActionRow 
              icon={<Cpu size={20} />}
              title="RAM Contígua"
              description="Forçar GC e compactação de heap"
              isActive={ramOpt.isOptimizing}
              onClick={executeRamOptimization}
              statusText={ramOpt.contiguousBlocksFreed > 0 ? `Liberado ${Math.round(ramOpt.contiguousBlocksFreed)} MB` : undefined}
            />

            {/* Action 4: DNS Flush */}
            <ActionRow 
              icon={<Server size={20} />}
              title="Ajuste de DNS da Rede"
              description="Limpar cache e rotear para Anycast"
              isActive={network.isTuning}
              onClick={executeNetworkTuning}
              statusText={network.cacheFlushed ? `Ativo: ${network.activeDns}` : undefined}
            />

            {/* Action 5: Input Calibrate */}
            <ActionRow 
              icon={<MousePointer2 size={20} />}
              title="Calibrar Toque"
              description="Reduzir atraso de entrada do digitalizador"
              isActive={false}
              onClick={executeInputCalibration}
            />

          </div>
        </section>

        {/* ARCHITECTURE NOTICE */}
        <section className="bg-[#F4EFE6] rounded-2xl p-5 border border-[#E5DFD3]">
           <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#736E65] flex items-center gap-1.5">
                <Layers size={14} className="text-[#8BA888]" /> Arquitetura Limpa
              </h4>
              <span className="text-[10px] text-[#A69F91] font-medium bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E5DFD3]">Padrão UDF</span>
           </div>
           <p className="text-xs text-[#736E65] leading-relaxed">
             A lógica da UI é totalmente desacoplada. Todas as ações acionam casos de uso de domínio puros que modificam o armazenamento de estado centralizado (SSOT).
           </p>
        </section>

      </main>
    </div>
  );
}

function MetricCard({ title, value, icon, status }: { title: string, value: string, icon: React.ReactNode, status: 'bom' | 'aviso' | 'perigo' }) {
  const getStatusColor = () => {
    switch (status) {
      case 'bom': return 'text-[#8BA888]';
      case 'aviso': return 'text-[#D9A05B]';
      case 'perigo': return 'text-[#C2847A]';
      default: return 'text-[#2C2A29]';
    }
  };

  return (
    <div className="bg-[#F4EFE6] p-4 rounded-2xl border border-[#E5DFD3] flex flex-col justify-between h-28 relative overflow-hidden group hover:border-[#D0C9B6] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[#736E65] bg-[#E5DFD3] p-1.5 rounded-lg">{icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${getStatusColor()}`}>
          {status}
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-[#2C2A29]">{value}</div>
        <div className="text-xs font-medium text-[#736E65] mt-0.5">{title}</div>
      </div>
    </div>
  );
}

function ActionRow({ 
  icon, 
  title, 
  description, 
  isActive, 
  onClick, 
  statusText 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  isActive: boolean, 
  onClick: () => void,
  statusText?: string
}) {
  return (
    <button 
      onClick={onClick}
      disabled={isActive}
      className="w-full text-left bg-[#F4EFE6] hover:bg-[#E5DFD3] transition-colors p-4 rounded-2xl border border-[#E5DFD3] flex items-center justify-between group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-[#8BA888] text-white animate-pulse' : 'bg-[#FAF7F2] text-[#2C2A29] group-hover:bg-[#F4EFE6]'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#2C2A29]">{title}</h3>
          <p className="text-xs text-[#736E65] mt-0.5">{statusText || description}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full border border-[#D0C9B6] flex items-center justify-center group-hover:bg-[#2C2A29] group-hover:text-[#FAF7F2] group-hover:border-transparent transition-all">
        {isActive ? (
           <div className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <span className="text-lg leading-none">+</span>
        )}
      </div>
    </button>
  );
}
