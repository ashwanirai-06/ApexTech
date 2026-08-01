import React, { useState } from 'react';
import { MessageSquare, Star, CheckCircle2, AlertTriangle, Lightbulb, Volume2, Sparkles, UserCheck, Building, Video, HelpCircle, XCircle } from 'lucide-react';
import { TtsAudioPlayer } from './TtsAudioPlayer';
import { openTopicVideo } from '../utils/videoUtils';

export interface HrWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  interviewContext?: string;
  starAnswer?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  hindiAnswer?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  interviewerTips?: string[];
  recruiterExpectations?: string[];
  commonMistakes?: string[];
  followUpQuestions?: string[];
  sampleAnswer?: string;
  keyTakeaways?: string[];
}

export const HrWorkspace: React.FC<HrWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  interviewContext = "This behavioral/HR question evaluates your past experience, communication skills, emotional intelligence, and leadership potential in high-stress engineering environments.",
  starAnswer = {
    situation: "During my engineering placement prep project, our cross-functional team had a 2-week deadline to deliver a complete web application.",
    task: "I was assigned the role of lead developer. Midway through, database locking issues endangered our timeline.",
    action: "I analyzed slow query logs, implemented query optimization and caching, and set up daily 10-minute standups to clear team blockers.",
    result: "We delivered the project 2 days ahead of schedule with 65% faster response times, achieving top evaluation marks."
  },
  hindiAnswer = {
    situation: "मेरे इंजीनियरिंग प्रोजेक्ट के दौरान, हमारी टीम के पास एक वेब एप्लिकेशन पूरा करने के लिए केवल 2 सप्ताह का समय था।",
    task: "मुझे मुख्य डेवलपर की भूमिका दी गई थी। बीच में, डेटाबेस में भारी देरी के कारण प्रोजेक्ट की समय-सीमा खतरे में आ गई।",
    action: "मैंने स्लो क्वेरीज़ को विश्लेषित किया, कैशिंग लागू की, और टीम के अवरोधों को दूर करने के लिए दैनिक 10 मिनट की बैठकें आयोजित कीं।",
    result: "हमने समय-सीमा से 2 दिन पहले प्रोजेक्ट पूरा किया और प्रदर्शन में 65% सुधार हासिल किया।"
  },
  interviewerTips = [
    "Structure your response using the STAR method (Situation, Task, Action, Result).",
    "Focus 70% of your time on 'Action'—highlighting your direct individual technical and behavioral contributions.",
    "Quantify your results with measurable metrics (e.g. percentages, saved hours, or team outcomes).",
    "Maintain positive body language, confident tone, and clear concise storytelling."
  ],
  recruiterExpectations = [
    "Clear structure and structured narrative without rambling",
    "Demonstration of ownership, accountability, and resilience",
    "Strong technical communication and team collaboration skills",
    "Self-awareness and ability to learn from setbacks"
  ],
  commonMistakes = [
    "Using generic answers without specific personal examples",
    "Blaming teammates or past organizations for failures",
    "Focusing too much on the problem rather than your action & solution",
    "Giving a hypothetical answer instead of a real past experience"
  ],
  followUpQuestions = [
    "How would you handle a situation where a team member disagrees with your approach?",
    "Can you give an example of how you prioritized tasks when multiple deadlines conflicted?",
    "What would you do differently if you faced the exact same challenge today?"
  ],
  sampleAnswer,
  keyTakeaways = [
    "Demonstrates engineering leadership & initiative",
    "Data-driven decision making under pressure",
    "Effective cross-functional communication",
    "Continuous feedback and optimization mindset"
  ]
}) => {
  const [activeTab, setActiveTab] = useState<'english' | 'hindi' | 'star' | 'rubric' | 'followup'>('english');

  const englishFullText = sampleAnswer || `Question: ${problemTitle}. Situation: ${starAnswer.situation} Task: ${starAnswer.task} Action: ${starAnswer.action} Result: ${starAnswer.result}`;

  const hindiFullText = `प्रश्न: ${problemTitle}। स्थिति: ${hindiAnswer.situation} कार्य: ${hindiAnswer.task} कार्रवाई: ${hindiAnswer.action} परिणाम: ${hindiAnswer.result}`;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. INTERVIEW CONTEXT BANNER */}
      <div className="p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">
          <MessageSquare className="h-5 w-5 text-purple-400 shrink-0" />
          <span>Behavioral & HR Interview Guide</span>
        </div>
        <h3 className="text-xl font-bold text-white font-mono">{problemTitle}</h3>
        
        {/* Interview Context */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-1">
          <span className="font-mono font-bold text-cyan-400 block uppercase text-[11px] tracking-wider">🎯 Interviewer Context & Core Evaluation:</span>
          <p>{interviewContext || problemDescription}</p>
        </div>
      </div>

      {/* 2. BILINGUAL AUDIO PLAYER */}
      <TtsAudioPlayer
        englishText={englishFullText}
        hindiText={hindiFullText}
        title={`Listen Professional Model Response: ${problemTitle}`}
      />

      {/* 3. VIDEO TUTORIAL SECTION */}
      <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-1.5 uppercase">
            <Video className="h-4 w-4 text-rose-400" />
            <span>Video Explanation Section</span>
          </span>
          <p className="text-xs text-slate-400">Watch expert video walkthroughs for this HR & Behavioral question.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openTopicVideo(`${problemTitle} HR interview answer English`)}
            className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            🇬🇧 English Video
          </button>
          <button
            onClick={() => openTopicVideo(`${problemTitle} HR interview answer Hindi`)}
            className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            🇮🇳 Hindi Video
          </button>
        </div>
      </div>

      {/* 4. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-mono flex-wrap">
        <button
          onClick={() => setActiveTab('english')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'english'
              ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🇬🇧 English Format</span>
        </button>

        <button
          onClick={() => setActiveTab('hindi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hindi'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🇮🇳 Hindi Format (हिंदी)</span>
        </button>

        <button
          onClick={() => setActiveTab('star')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'star'
              ? 'bg-purple-500 text-slate-950 font-extrabold shadow-md shadow-purple-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Star className="h-4 w-4" />
          <span>⭐ STAR Method</span>
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rubric'
              ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>📋 Expectations & Mistakes</span>
        </button>

        <button
          onClick={() => setActiveTab('followup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'followup'
              ? 'bg-indigo-500 text-slate-950 font-extrabold shadow-md shadow-indigo-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>❓ Follow-up Questions</span>
        </button>
      </div>

      {/* 5. TAB CONTENTS */}
      
      {/* ENGLISH FORMAT */}
      {activeTab === 'english' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl border border-cyan-500/30 bg-slate-950 space-y-4 shadow-lg">
            <h4 className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>English Model Response (STAR Framework)</span>
            </h4>

            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 block uppercase">Situation:</span>
                <p className="text-sm text-slate-200 leading-relaxed">{starAnswer.situation}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-purple-400 block uppercase">Task:</span>
                <p className="text-sm text-slate-200 leading-relaxed">{starAnswer.task}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">Action:</span>
                <p className="text-sm text-slate-200 leading-relaxed">{starAnswer.action}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">Result:</span>
                <p className="text-sm text-slate-200 leading-relaxed">{starAnswer.result}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HINDI FORMAT */}
      {activeTab === 'hindi' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl border border-amber-500/30 bg-slate-950 space-y-4 shadow-lg">
            <h4 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>हिंदी मॉडल उत्तर (स्थिति, कार्य, कार्रवाई, परिणाम)</span>
            </h4>

            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">स्थिति (Situation):</span>
                <p className="text-sm text-slate-200 leading-relaxed">{hindiAnswer.situation}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-purple-400 block uppercase">कार्य (Task):</span>
                <p className="text-sm text-slate-200 leading-relaxed">{hindiAnswer.task}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">कार्रवाई (Action):</span>
                <p className="text-sm text-slate-200 leading-relaxed">{hindiAnswer.action}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 block uppercase">परिणाम (Result):</span>
                <p className="text-sm text-slate-200 leading-relaxed">{hindiAnswer.result}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAR METHOD EXPLANATION */}
      {activeTab === 'star' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
          <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
              <span className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">S</span>
              <span>1. Situation (स्थिति)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-9">
              {starAnswer.situation}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-300">
              <span className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">T</span>
              <span>2. Task (कार्य)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-9">
              {starAnswer.task}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-300">
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">A</span>
              <span>3. Action (कार्रवाई)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-9">
              {starAnswer.action}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
              <span className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">R</span>
              <span>4. Result (परिणाम)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-9">
              {starAnswer.result}
            </p>
          </div>
        </div>
      )}

      {/* RECRUITER EXPECTATIONS & COMMON MISTAKES */}
      {activeTab === 'rubric' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          
          {/* Recruiter Expectations */}
          <div className="p-6 rounded-3xl border border-emerald-500/30 bg-slate-950 space-y-4">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Recruiter Expectations & Important Points</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {recruiterExpectations.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="p-6 rounded-3xl border border-rose-500/30 bg-slate-950 space-y-4">
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <XCircle className="h-4 w-4 text-rose-400" />
              <span>Common Mistakes to Avoid</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {commonMistakes.map((mis, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span className="leading-relaxed">{mis}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* FOLLOW-UP QUESTIONS */}
      {activeTab === 'followup' && (
        <div className="p-6 rounded-3xl border border-indigo-500/30 bg-slate-950 space-y-4 font-sans">
          <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-indigo-400" />
            <span>Common Recruiter Follow-Up Questions</span>
          </h4>

          <div className="space-y-3">
            {followUpQuestions.map((fq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 font-mono text-xs font-bold border border-indigo-800 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed pt-0.5">{fq}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
