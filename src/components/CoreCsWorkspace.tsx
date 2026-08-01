import React, { useState } from 'react';
import { Cpu, Database, Network, Box, FileText, CheckCircle2, Play, Terminal, Layers } from 'lucide-react';

export interface CoreCsWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  subtopic?: string;
  solution?: string;
  diagramNotes?: string;
}

export const CoreCsWorkspace: React.FC<CoreCsWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  subtopic = 'DBMS',
  solution = `// Core Subject Architectural Analysis & Solution Pattern
1. Primary Concept: Detailed breakdown of system primitives and memory layout.
2. Tradeoffs: Evaluation of space vs time complexity and lock contention.
3. Production Best Practice: Enforce structural invariants and isolation guarantees.`,
  diagramNotes
}) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'visualizer' | 'notes'>('concepts');
  const [selectedProcess, setSelectedProcess] = useState<number>(0);

  const isDbms = subtopic.toLowerCase().includes('dbms') || subtopic.toLowerCase().includes('sql');
  const isOs = subtopic.toLowerCase().includes('operating') || subtopic.toLowerCase().includes('os');
  const isCn = subtopic.toLowerCase().includes('network') || subtopic.toLowerCase().includes('cn');
  const isOops = subtopic.toLowerCase().includes('oops') || subtopic.toLowerCase().includes('object');

  return (
    <div className="space-y-4 font-mono">
      {/* Workspace Subtopic Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'concepts'
                ? 'bg-purple-500 text-slate-950 font-extrabold shadow-md shadow-purple-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>📖 Architectural Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {isDbms && <Database className="h-4 w-4" />}
            {isOs && <Cpu className="h-4 w-4" />}
            {isCn && <Network className="h-4 w-4" />}
            {isOops && <Box className="h-4 w-4" />}
            {!isDbms && !isOs && !isCn && !isOops && <Layers className="h-4 w-4" />}
            <span>
              {isDbms ? '📊 ER & Execution Plan' : isOs ? '⚡ CPU Scheduling Visualizer' : isCn ? '🌐 Packet & Protocol Flow' : '🏗️ UML & Class Blueprint'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>🎯 Placement High-Yield Notes</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-400 bg-purple-950/30 px-2.5 py-1 rounded-lg border border-purple-500/30">
          <Cpu className="h-3.5 w-3.5" />
          <span>Core CS Subject Engine</span>
        </div>
      </div>

      {/* Problem Description Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
          📘 Core Topic: {problemTitle} ({subtopic})
        </h3>
        <p className="text-xs text-slate-200 leading-relaxed font-sans">
          {problemDescription}
        </p>
      </div>

      {/* TAB 1: CONCEPTS & ANALYSIS */}
      {activeTab === 'concepts' && (
        <div className="space-y-4 font-sans">
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl p-4">
            <h4 className="text-xs font-mono font-bold text-purple-300 mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-purple-400" /> Technical Synthesis & Detailed Solution
            </h4>
            <div className="text-xs font-sans text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              {solution}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBJECT SPECIFIC VISUALIZER */}
      {activeTab === 'visualizer' && (
        <div className="space-y-4 font-sans">
          {/* DBMS Visualizer */}
          {isDbms && (
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-4">
              <h4 className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Database className="h-4 w-4 text-cyan-400" /> Database Execution Plan & ER Relational Mapping
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                  <span className="text-cyan-400 font-bold block">1. Index Scan & Costs</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Cost-Based Optimizer selects B+ Tree index lookup over Sequential Table Scan. Estimated I/O Cost: 0.04 ms.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                  <span className="text-emerald-400 font-bold block">2. Lock Isolation Level</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Uses Repeatable Read / Snapshot Isolation to prevent Dirty Reads and Non-Repeatable Reads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* OS CPU Scheduling Visualizer */}
          {isOs && (
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-4">
              <h4 className="text-xs font-mono font-bold text-purple-300 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-400" /> CPU Gantt Chart & Process Scheduling Visualizer
              </h4>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {[
                    { pid: 'P1', burst: 5, color: 'bg-cyan-500 text-slate-950' },
                    { pid: 'P2', burst: 3, color: 'bg-purple-500 text-white' },
                    { pid: 'P3', burst: 8, color: 'bg-emerald-500 text-slate-950' },
                    { pid: 'P4', burst: 4, color: 'bg-amber-500 text-slate-950' }
                  ].map((proc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedProcess(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border border-slate-800 ${proc.color} ${
                        selectedProcess === idx ? 'ring-2 ring-white scale-105' : 'opacity-80'
                      }`}
                    >
                      {proc.pid} ({proc.burst}ms)
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 leading-relaxed font-mono">
                  ⚡ <strong>Context Switch Analysis:</strong> Process P{selectedProcess + 1} state saved to PCB (Process Control Block) register. Turnaround Time: {(selectedProcess + 1) * 4}ms.
                </div>
              </div>
            </div>
          )}

          {/* CN Visualizer */}
          {isCn && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-4">
              <h4 className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-2">
                <Network className="h-4 w-4 text-emerald-400" /> Protocol Packet Flow & TCP 3-Way Handshake
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-1">
                  <span className="text-cyan-400 font-bold block">1. SYN Packet</span>
                  <span className="text-[10px] text-slate-400 block">Seq = 100, CTL = SYN</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-1">
                  <span className="text-purple-400 font-bold block">2. SYN-ACK Packet</span>
                  <span className="text-[10px] text-slate-400 block">Seq = 300, Ack = 101</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-1">
                  <span className="text-emerald-400 font-bold block">3. ACK Packet</span>
                  <span className="text-[10px] text-slate-400 block">Seq = 101, Ack = 301</span>
                </div>
              </div>
            </div>
          )}

          {/* OOPs Visualizer */}
          {isOops && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-4">
              <h4 className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                <Box className="h-4 w-4 text-amber-400" /> OOPs Class Blueprint & VTABLE Inheritance Structure
              </h4>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-amber-200 space-y-2">
                <div>[Base Class: Shape] ── (VTABLE Pointer) ──► [Virtual area()]</div>
                <div className="pl-6 font-bold text-cyan-300">├── [Derived: Circle] (Overridden area = π * r²)</div>
                <div className="pl-6 font-bold text-emerald-300">└── [Derived: Rectangle] (Overridden area = l * w)</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Essential Interview Takeaways
            </h4>
            <ul className="space-y-2 font-mono text-xs text-slate-300">
              <li className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0"></span>
                <span>Understand theoretical trade-offs and memory layout guarantees.</span>
              </li>
              <li className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400 shrink-0"></span>
                <span>Focus on concurrency, locking mechanisms, and resource contention.</span>
              </li>
              <li className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Be prepared to draw protocol diagrams or state transitions during technical vivas.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
