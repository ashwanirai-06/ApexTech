import React, { useState } from 'react';
import { AKTU_ACADEMIC_EVENTS } from '../data/aktuData';
import { AcademicEvent } from '../types';
import { Calendar as CalendarIcon, Clock, Plus, Filter, AlertCircle, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

export const AcademicCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<AcademicEvent[]>(AKTU_ACADEMIC_EVENTS as AcademicEvent[]);
  const [filterType, setFilterType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<AcademicEvent['eventType']>('Sessional Exam');
  const [newStartDate, setNewStartDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const eventTypes = ['All', 'Sessional Exam', 'Practical Viva', 'End Sem Theory', 'Assignment Deadline', 'University Holiday'];

  const filteredEvents = events.filter(e => 
    filterType === 'All' || e.eventType === filterType
  );

  const handleAddCustomEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newStartDate) return;

    const created: AcademicEvent = {
      id: 'evt-custom-' + Date.now(),
      title: newTitle,
      eventType: newType,
      startDate: newStartDate,
      semesterRange: 'My Semester',
      description: newDesc || 'Custom student target date.',
      isOfficialAKTU: false
    };

    setEvents([created, ...events]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewStartDate('');
  };

  const getEventBadge = (type: AcademicEvent['eventType']) => {
    switch (type) {
      case 'Sessional Exam':
        return 'bg-amber-950 border-amber-800 text-amber-300';
      case 'Practical Viva':
        return 'bg-cyan-950 border-cyan-800 text-cyan-300';
      case 'End Sem Theory':
        return 'bg-rose-950 border-rose-800 text-rose-300';
      case 'Assignment Deadline':
        return 'bg-purple-950 border-purple-800 text-purple-300';
      case 'University Holiday':
        return 'bg-emerald-950 border-emerald-800 text-emerald-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>AKTU University Academic Calendar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              Academic & Exam Schedule 2026-27
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Official AKTU sessional tests, end-semester practical vivas, theory examination schedules, and student countdown targets.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>Add Personal Exam Target</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="h-4 w-4 text-slate-500 shrink-0 mr-1" />
        {eventTypes.map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === t
                ? 'bg-cyan-500 text-slate-950 font-mono font-bold shadow-md shadow-cyan-500/20'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Event Timeline List */}
      <div className="space-y-4">
        {filteredEvents.map(evt => {
          const startDateObj = new Date(evt.startDate);
          const monthStr = startDateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
          const dayStr = startDateObj.getDate();

          return (
            <div
              key={evt.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-start gap-4">
                
                {/* Date Square */}
                <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shrink-0 font-mono">
                  <span className="text-[10px] uppercase font-bold tracking-wider">{monthStr}</span>
                  <span className="text-lg font-extrabold">{dayStr}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${getEventBadge(evt.eventType)}`}>
                      {evt.eventType}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      {evt.semesterRange}
                    </span>
                    {evt.isOfficialAKTU && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> Official AKTU Schedule
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-mono">{evt.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{evt.description}</p>
                </div>

              </div>

              {evt.endDate && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-slate-400 shrink-0">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Ends: {evt.endDate}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for Custom Event */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-mono text-cyan-300">Add Custom Exam Target</h3>
            
            <form onSubmit={handleAddCustomEvent} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. DBMS Lab Practical Preparation"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Event Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                >
                  <option value="Sessional Exam">Sessional Exam</option>
                  <option value="Practical Viva">Practical Viva</option>
                  <option value="End Sem Theory">End Sem Theory</option>
                  <option value="Assignment Deadline">Assignment Deadline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newStartDate}
                  onChange={e => setNewStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Notes or study target details..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white h-20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 rounded-xl border border-slate-700 bg-slate-950 py-2 text-xs text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-cyan-500 py-2 text-xs font-bold text-slate-950"
                >
                  Add Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
