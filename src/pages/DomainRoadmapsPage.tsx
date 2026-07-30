import React, { useState, useEffect } from 'react';
import { DOMAIN_ROADMAPS } from '../data/aktuData';
import { openTopicVideo } from '../utils/videoUtils';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import {
  Code,
  Brain,
  Server,
  Smartphone,
  Shield,
  Compass,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BookOpen,
  Layers,
  Video,
  Calendar,
  Clock,
  Play,
  Check,
  AlertCircle
} from 'lucide-react';

interface DomainRoadmapsPageProps {
  onStartViva?: (subjectCode: string, topic?: string) => void;
}

export const DomainRoadmapsPage: React.FC<DomainRoadmapsPageProps> = ({ onStartViva }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('fullstack');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Video Modal State
  const [playingVideo, setPlayingVideo] = useState<{
    title: string;
    query: string;
    educator?: string;
  } | null>(null);

  // Target Date Tracker State (Persisted in localStorage)
  const [milestoneDates, setMilestoneDates] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('apextech_milestone_dates');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  const [milestoneStatus, setMilestoneStatus] = useState<Record<string, 'Scheduled' | 'In Progress' | 'Completed'>>(() => {
    const saved = localStorage.getItem('apextech_milestone_status');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  const handleDateChange = (key: string, newDate: string) => {
    const updated = { ...milestoneDates, [key]: newDate };
    setMilestoneDates(updated);
    localStorage.setItem('apextech_milestone_dates', JSON.stringify(updated));
  };

  const handleStatusToggle = (key: string) => {
    const current = milestoneStatus[key] || 'Scheduled';
    const next = current === 'Scheduled' ? 'In Progress' : current === 'In Progress' ? 'Completed' : 'Scheduled';
    const updated = { ...milestoneStatus, [key]: next };
    setMilestoneStatus(updated);
    localStorage.setItem('apextech_milestone_status', JSON.stringify(updated));
  };

  // Helper to calculate days remaining until target date
  const getTargetDateDiff = (targetDateStr: string) => {
    if (!targetDateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categories = ['All', 'Software', 'AI & Data', 'Infrastructure', 'Mobile & Security'];

  const filteredDomains = DOMAIN_ROADMAPS.filter(d => 
    activeCategory === 'All' || d.category === activeCategory
  );

  const selectedDomain = DOMAIN_ROADMAPS.find(d => d.id === selectedDomainId) || DOMAIN_ROADMAPS[0];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-6 w-6 text-cyan-400" />;
      case 'Brain': return <Brain className="h-6 w-6 text-purple-400" />;
      case 'Server': return <Server className="h-6 w-6 text-emerald-400" />;
      case 'Smartphone': return <Smartphone className="h-6 w-6 text-indigo-400" />;
      case 'Shield': return <Shield className="h-6 w-6 text-rose-400" />;
      default: return <Compass className="h-6 w-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Compass className="h-48 w-48 text-cyan-400" />
        </div>
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>KalamVerse Domain Mastery Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            Industry Tech Domain Roadmaps
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Detailed step-by-step career roadmaps, skill milestones, project ideas, and YouTube channels tailored for AKTU engineering students.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Domain Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDomains.map(domain => {
          const isSelected = domain.id === selectedDomain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomainId(domain.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-500 bg-slate-900 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950">
                    {getDomainIcon(domain.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
                    {domain.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-mono">{domain.domainName}</h3>
                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono font-medium">{domain.averageSalaryPackage}</span>
                <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Domain View */}
      {selectedDomain && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-6 shadow-2xl">
          
          {/* Domain Top Overview */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400">
                {getDomainIcon(selectedDomain.iconName)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">{selectedDomain.domainName}</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedDomain.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-xs font-mono font-semibold">
                Avg Package: {selectedDomain.averageSalaryPackage}
              </div>
            </div>
          </div>

          {/* Target Job Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Target Engineering Roles</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDomain.jobRoles.map((role, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-Step Target Date & Study Schedule Tracker */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span>Domain Milestone Progress Tracker</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Set target completion dates for each milestone and track countdowns for tech placements.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Schedule Sync Active</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedDomain.phases.map((phase, pIdx) => {
                const milestoneKey = `${selectedDomain.id}_phase_${pIdx}`;
                const currentDate = milestoneDates[milestoneKey] || '';
                const currentStatus = milestoneStatus[milestoneKey] || 'Scheduled';
                const diffDays = getTargetDateDiff(currentDate);

                // Default suggested date if none set
                const defaultDaysAhead = (pIdx + 1) * 30;
                const suggestedDateObj = new Date();
                suggestedDateObj.setDate(suggestedDateObj.getDate() + defaultDaysAhead);
                const suggestedDateStr = suggestedDateObj.toISOString().split('T')[0];

                return (
                  <div
                    key={pIdx}
                    className={`rounded-2xl border p-5 space-y-4 transition-all ${
                      currentStatus === 'Completed'
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : currentStatus === 'In Progress'
                        ? 'border-cyan-500/50 bg-cyan-950/20'
                        : 'border-slate-800 bg-slate-950/80'
                    }`}
                  >
                    {/* Phase Header with Status & Date Picker */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-cyan-300">
                            Milestone Phase {pIdx + 1}: {phase.phaseName}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            Est: {phase.durationMonths}
                          </span>
                        </div>
                      </div>

                      {/* Status Toggle & Target Date Picker Control */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Button */}
                        <button
                          onClick={() => handleStatusToggle(milestoneKey)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                            currentStatus === 'Completed'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                              : currentStatus === 'In Progress'
                              ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {currentStatus === 'Completed' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                          {currentStatus === 'In Progress' && <Clock className="h-3.5 w-3.5 text-cyan-400 animate-spin" />}
                          {currentStatus === 'Scheduled' && <Calendar className="h-3.5 w-3.5 text-slate-400" />}
                          <span>{currentStatus}</span>
                        </button>

                        {/* Date Picker Input */}
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-xl">
                          <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                          <label className="text-[10px] font-mono text-slate-400 font-bold">Target Date:</label>
                          <input
                            type="date"
                            value={currentDate || suggestedDateStr}
                            onChange={(e) => handleDateChange(milestoneKey, e.target.value)}
                            className="bg-transparent text-xs font-mono font-bold text-cyan-300 focus:outline-none cursor-pointer"
                          />
                        </div>

                        {/* Preset Buttons */}
                        {!currentDate && (
                          <button
                            onClick={() => handleDateChange(milestoneKey, suggestedDateStr)}
                            className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-1 rounded-lg hover:bg-cyan-900"
                          >
                            Set +{defaultDaysAhead}d
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Target Countdown Indicator */}
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {currentStatus === 'Completed' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" /> Milestone Completed On Schedule!
                          </span>
                        ) : diffDays !== null && diffDays > 0 ? (
                          <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-cyan-400" /> ⏰ {diffDays} Days Remaining
                          </span>
                        ) : diffDays === 0 ? (
                          <span className="text-amber-300 font-bold flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-amber-400" /> 🎯 Target Deadline Today!
                          </span>
                        ) : diffDays !== null && diffDays < 0 ? (
                          <span className="text-rose-400 font-bold flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-rose-400" /> ⚠️ Overdue by {Math.abs(diffDays)} Days
                          </span>
                        ) : (
                          <span className="text-slate-400">Target Date: {suggestedDateStr}</span>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400">
                        Target Date: <strong className="text-slate-200">{currentDate || suggestedDateStr}</strong>
                      </span>
                    </div>

                    {/* Topics Covered with Video Explanation Launchers */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Topics & Video Tutorials:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.topics.map((top, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between p-2 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-300 hover:border-cyan-500/40 transition-colors">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span className="font-medium">{top}</span>
                            </div>
                            <button
                              onClick={() => setPlayingVideo({
                                title: `${selectedDomain.domainName}: ${top}`,
                                query: `${selectedDomain.domainName} ${top} full tutorial hindi`,
                                educator: 'Top Educator Masterclass'
                              })}
                              className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-md transition-all shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold cursor-pointer"
                              title={`Watch Video Tutorial for ${top}`}
                            >
                              <Play className="h-3 w-3 fill-rose-300" />
                              <span>Watch</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Tools */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2">Key Tools:</span>
                      {phase.keyTools.map((tool, toolIdx) => (
                        <span key={toolIdx} className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-slate-700 bg-slate-800 text-cyan-300">
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Recommended Capstone Projects */}
                    {phase.suggestedProjects && phase.suggestedProjects.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/60">
                        <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">Recommended Projects:</span>
                        <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                          {phase.suggestedProjects.map((proj, projIdx) => (
                            <li key={projIdx} className="text-slate-300">{proj}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended YouTube Creators for this domain */}
          {selectedDomain.recommendedChannels && selectedDomain.recommendedChannels.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400">
                Recommended YouTube Learning Creators
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDomain.recommendedChannels.map((ch, chIdx) => (
                  <a
                    key={chIdx}
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 transition-all group"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{ch.name}</p>
                      <p className="text-[11px] text-slate-400">{ch.note}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Video Modal Player */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          videoTitle={playingVideo.title}
          videoQuery={playingVideo.query}
          educator={playingVideo.educator || 'Expert Educator'}
        />
      )}

    </div>
  );
};
