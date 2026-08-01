import React, { useState } from 'react';
import { Server, Network, Layers, ShieldCheck, Database, Cpu, Zap, Activity, HardDrive, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TtsAudioPlayer } from './TtsAudioPlayer';

export interface SystemDesignWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  architectureDetails?: {
    qps?: string;
    storagePerDay?: string;
    bandwidth?: string;
    components?: { name: string; role: string; tech: string }[];
    tradeoffs?: string[];
  };
  explanation?: string;
}

export const SystemDesignWorkspace: React.FC<SystemDesignWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  architectureDetails = {
    qps: '50,000 Write QPS / 500,000 Read QPS',
    storagePerDay: '1.2 TB / Day (Compressed)',
    bandwidth: '4.8 GB/s Peak Throughput',
    components: [
      { name: 'DNS & CDN', role: 'Global Static Content & Edge Caching', tech: 'Cloudflare / AWS CloudFront' },
      { name: 'Load Balancer (ALB)', role: 'SSL Termination & Traffic Distribution', tech: 'NGINX / HAProxy' },
      { name: 'API Gateway', role: 'Authentication, Rate Limiting & Routing', tech: 'Kong / Envoy' },
      { name: 'Stateless App Servers', role: 'Business Logic Execution', tech: 'Node.js / Go Microservices' },
      { name: 'In-Memory Cache', role: 'Hot Data & Read Latency Reduction', tech: 'Redis Cluster' },
      { name: 'Primary DB & Replicas', role: 'Persistent Data Storage with Read Sharding', tech: 'PostgreSQL + CockroachDB' },
      { name: 'Event Queue', role: 'Async Task Processing & Decoupling', tech: 'Apache Kafka / RabbitMQ' }
    ],
    tradeoffs: [
      'CAP Theorem Choice: Chosen Eventual Consistency (AP) for feed reads, Strong Consistency (CP) for transactions.',
      'Caching Strategy: Write-Through Cache to ensure zero cache-invalidation stale reads.',
      'Database Partitioning: Consistent Hashing based on User_ID to balance shard loads across 32 nodes.'
    ]
  },
  explanation
}) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'estimations' | 'tradeoffs'>('diagram');
  const [selectedComponent, setSelectedComponent] = useState<number | null>(null);

  const englishSystemDesignText = explanation || `System Design Architecture for ${problemTitle}: Target capacity throughput is ${architectureDetails.qps}. We utilize edge CDN caching, load balancers, and decoupled microservices with Redis L1 cache and sharded database clusters for minimal read/write latency.`;

  const hindiSystemDesignText = `${problemTitle} का सिस्टम डिज़ाइन आर्किटेक्चर: लक्षित क्षमता ${architectureDetails.qps} है। हम CDN, लोड बैलेंसर, माइक्रोसर्विसेज तथा Redis कैशिंग का उपयोग करके न्यून लेटेंसी प्राप्त करते हैं।`;

  return (
    <div className="space-y-4 font-mono">
      {/* Bilingual Audio Synthesizer */}
      <TtsAudioPlayer
        englishText={englishSystemDesignText}
        hindiText={hindiSystemDesignText}
        title={`Listen Model Response: ${problemTitle}`}
      />

      {/* Workspace Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'diagram'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Network className="h-4 w-4" />
            <span>📐 High-Level Architecture Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('estimations')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'estimations'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>⚡ Capacity Math & QPS</span>
          </button>

          <button
            onClick={() => setActiveTab('tradeoffs')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tradeoffs'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>⚖️ Trade-offs & CAP Theorem</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE ARCHITECTURE DIAGRAM */}
      {activeTab === 'diagram' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                <Server className="h-4 w-4" /> Scalable Distributed Architecture Blueprint
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                ● High Availability (99.999% SLA)
              </span>
            </div>

            {/* Visual Node Flow Diagram */}
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {architectureDetails.components?.slice(0, 4).map((comp, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedComponent(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedComponent === idx
                        ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{comp.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{comp.role}</p>
                    <span className="text-[9px] text-cyan-300 font-bold block mt-1.5">Tech: {comp.tech}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-1">
                <span className="text-xs text-slate-500 font-bold">⬇ Decoupled Data & Caching Tier ⬇</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {architectureDetails.components?.slice(4).map((comp, idx) => {
                  const actualIdx = idx + 4;
                  return (
                    <div
                      key={actualIdx}
                      onClick={() => setSelectedComponent(actualIdx)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedComponent === actualIdx
                          ? 'border-purple-400 bg-purple-950/40 ring-1 ring-purple-500'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{comp.name}</span>
                        <Database className="h-3.5 w-3.5 text-purple-400" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{comp.role}</p>
                      <span className="text-[9px] text-purple-300 font-bold block mt-1.5">Tech: {comp.tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Details Box */}
            {selectedComponent !== null && architectureDetails.components && (
              <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-xs text-slate-300 space-y-1">
                <span className="text-cyan-300 font-bold block">
                  🔍 Focused Node: {architectureDetails.components[selectedComponent].name}
                </span>
                <p>Role: {architectureDetails.components[selectedComponent].role}</p>
                <p>Recommended Stack: <strong className="text-white">{architectureDetails.components[selectedComponent].tech}</strong></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CAPACITY ESTIMATIONS */}
      {activeTab === 'estimations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Estimated QPS</span>
              <span className="text-lg font-bold text-white block">{architectureDetails.qps}</span>
              <p className="text-[10px] text-slate-400">Peak traffic load sizing</p>
            </div>

            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-2">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Daily Storage Math</span>
              <span className="text-lg font-bold text-white block">{architectureDetails.storagePerDay}</span>
              <p className="text-[10px] text-slate-400">Requires multi-region DB sharding</p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Network Bandwidth</span>
              <span className="text-lg font-bold text-white block">{architectureDetails.bandwidth}</span>
              <p className="text-[10px] text-slate-400">CDN offloads 80% static egress</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRADEOFFS & CAP THEOREM */}
      {activeTab === 'tradeoffs' && (
        <div className="space-y-4 font-sans">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-400" /> Critical Engineering Trade-offs & Bottlenecks
            </h4>

            <div className="space-y-2 font-mono text-xs">
              {architectureDetails.tradeoffs?.map((tradeoff, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tradeoff}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
