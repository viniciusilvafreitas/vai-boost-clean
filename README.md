# VAI Core - Performance Engine (VAI-BC-03)

## 🎯 PASSO 0: Memorial de Arquitetura & Visão de Produto Monumental

Este documento estabelece o norte técnico do **VAI Core**, utilitário Android de ultra-performance focado em jogos pesados e limpeza profunda operando sob uma interface **E-Paper Minimalista**. Projetado para máximo foco e eficiência, o sistema adota cores de papel e tons calmos, operando otimizações severas de hardware, CPU, rede e RAM.

### 📈 1. Visão de Produto & Métricas Norteadoras (North Star Metrics)
- **Latência de Rede (Δ Ping)**: Estabilização de pacotes via roteamento DNS Anycast e flush local (Target: < 20ms).
- **Temperatura de CPU**: Monitoramento ativo e suspensão de processos parasitas para evitar Thermal Throttling (Target: < 40°C).
- **Eficiência de RAM (GC)**: Alocação de blocos contíguos forçando limpezas preventivas de memória (Target: +500MB de Heap livre).
- **Delay de Entrada**: Ajustes cirúrgicos do digitizer para aceleração do toque em jogos (Target: < 15ms).
- **Limpeza Profunda**: Separação inteligente (fotos ENVIADAS apagadas, recebidas mantidas), expurgo de caches ocultos e thumbnails.

### 🏗️ 2. Arquitetura UDF (Unidirectional Data Flow)
A aplicação segue as Leis Inegociáveis da VAI:
- **LEI 1 (UDF & CLEAN)**: A UI é burra. Dados vêm do ViewModel (State). Domínio é isolado.
- **LEI 2 (Offline-First)**: Persistência via Single Source of Truth (SSOT) local em SQLite/Idb.
- **LEI 3 (Handoff no Termux/Acode)**: Tipagem estrita e sem pacotes NPM inúteis.

```text
[ GUI (React/Tailwind Minimalista) ] <--- (State) --- [ ViewModel (React Hooks) ]
       |                                                    |
   (Tap/Actions)                                       (Use Cases)
       |                                                    |
       v                                                    v
[ Intent Processors ] ---> [ Domain Layer (Storage, Thermal, Ping, Input, RAM) ]
                                                            |
                                                            v
                                              [ API Abstractions (Mock Native) ]
```

### 🛠️ 3. Handoff para Termux & Acode
Código estruturado em TypeScript estrito, com Zero Overhead.
