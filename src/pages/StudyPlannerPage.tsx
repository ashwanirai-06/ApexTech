import React, { useState } from 'react';
import { StudyPlanTask } from '../types';
import { Calendar, Clock, CheckSquare, Square, RefreshCw, BookOpen, Code2, Mic, RotateCcw } from 'lucide-react';

export const StudyPlannerPage: React.FC = () => {
  const [subject, setSubject] = useState('Data Structures (KCS301)');
  const [examDate, setExamDate] = useState('2026-08-28');
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [tasks, setTasks] = useState<StudyPlanTask[]>([
    {
      id: 't1',
      dayNumber: 1,
      date: '2026-07-29',
      topic: 'Asymptotic Notations & Big-O Bounds',
      taskType: 'Theory',
      durationMinutes: 90,
      completed: true,
      notes: 'Review upper/lower bounds proof'
    },
    {
      id: 't2',
      dayNumber: 1,
      date: '2026-07-29',
      topic: 'Array Address Calculation Formulas',
      taskType: 'Coding Task',
      durationMinutes: 60,
      completed: true,
      notes: 'Implement row-major & column-major order'
    },
    {
      id: 't3',
      dayNumber: 2,
      date: '2026-07-30',
      topic: 'Stack ADT & Infix-to-Postfix',
      taskType: 'Theory',
      durationMinutes: 90,
      completed: false,
      notes: 'Practice precedence operator stack'
    },
    {
      id: 't4',
      dayNumber: 2,
      date: '2026-07-30',
      topic: 'Stack AI Viva Room Session',
      taskType: 'AI Viva Practice',
      durationMinutes: 30,
      completed: false
    },
    {
      id: 't5',
      dayNumber: 3,
      date: '2026-07-31',
      topic: 'Queue & Circular Queue Implementation',
      taskType: 'Coding Task',
      durationMinutes: 90,
      completed: false
    },
    {
      id: 't6',
      dayNumber: 4,
      date: '2026-08-01',
      topic: 'Unit 1 & 2 Revision Checkpoint',
      taskType: 'Revision Checkpoint',
      durationMinutes: 120,
      completed: false
    }
  ]);

  const handleGenerateSchedule = () => {
    const today = new Date();
    const newTasks: StudyPlanTask[] = [
      {
        id: 'gen-1',
        dayNumber: 1,
        date: new Date(today.setDate(today.getDate())).toISOString().split('T')[0],
        topic: `${subject} - Unit 1 Core Definitions & Proofs`,
        taskType: 'Theory',
        durationMinutes: Math.min(hoursPerDay * 30, 90),
        completed: false,
        notes: `Focus on fundamentals for target exam date ${examDate}`
      },
      {
        id: 'gen-2',
        dayNumber: 1,
        date: new Date().toISOString().split('T')[0],
        topic: `${subject} - Unit 1 Implementation Lab`,
        taskType: 'Coding Task',
        durationMinutes: Math.min(hoursPerDay * 30, 60),
        completed: false
      },
      {
        id: 'gen-3',
        dayNumber: 2,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        topic: `${subject} - Unit 2 Advanced Concepts`,
        taskType: 'Theory',
        durationMinutes: Math.min(hoursPerDay * 30, 90),
        completed: false
      },
      {
        id: 'gen-4',
        dayNumber: 2,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        topic: `${subject} - AI Viva Practice Session`,
        taskType: 'AI Viva Practice',
        durationMinutes: 30,
        completed: false
      },
      {
        id: 'gen-5',
        dayNumber: 3,
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        topic: `${subject} - Previous Year 10-Mark Questions`,
        taskType: 'Revision Checkpoint',
        durationMinutes: Math.min(hoursPerDay * 40, 120),
        completed: false
      }
    ];
    setTasks(newTasks);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3 py-1 text-xs text-indigo-300 mb-1">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            <span>AI Study Planner Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white font-mono">
            Personalized Daily Exam Schedule
          </h1>
        </div>

        <button
          onClick={handleGenerateSchedule}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Generate Schedule</span>
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Target Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Daily Hours: {hoursPerDay} hrs</label>
          <input
            type="range"
            min="1"
            max="8"
            value={hoursPerDay}
            onChange={e => setHoursPerDay(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white">Planner Progress</span>
          <span className="font-mono text-indigo-300 font-bold">{progressPercent}% ({completedCount} / {tasks.length} tasks)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
              task.completed
                ? 'border-emerald-500/30 bg-emerald-950/10 text-slate-400'
                : 'border-slate-800 bg-slate-900/60 text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTask(task.id)} className="text-slate-400 hover:text-emerald-400">
                {task.completed ? <CheckSquare className="h-5 w-5 text-emerald-400" /> : <Square className="h-5 w-5" />}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">Day {task.dayNumber} ({task.date})</span>
                  <span className={`rounded-md px-2 py-0.5 text-[9px] font-mono font-bold ${
                    task.taskType === 'AI Viva Practice' ? 'bg-purple-950 text-purple-300 border border-purple-500/30' :
                    task.taskType === 'Coding Task' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                    task.taskType === 'Revision Checkpoint' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {task.taskType}
                  </span>
                </div>

                <h4 className={`text-xs font-bold mt-1 ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                  {task.topic}
                </h4>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>{task.durationMinutes}m</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
