import React, { useState, useEffect } from 'react';
import { AKTU_SUBJECTS, AKTU_BRANCHES, AKTU_LABS, AKTU_MARKING_SCHEME, AKTUSubject } from '../data/aktuData';
import { BookOpen, Mic, Map, Video, Search, AlertCircle, Plus, Calculator, FileText, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface SubjectsPageProps {
  studentBranch: string;
  studentSemester: number;
  onStartViva: (subjectCode: string, topic?: string) => void;
  onGenerateRoadmap: (subjectCode: string) => void;
  onSearchVideos: (topic: string) => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({
  studentBranch,
  studentSemester,
  onStartViva,
  onGenerateRoadmap,
  onSearchVideos
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'labs' | 'marking' | 'pyqs'>('theory');
  const [selectedBranch, setSelectedBranch] = useState(studentBranch || 'Information Technology');
  const [selectedSemester, setSelectedSemester] = useState(studentSemester || 3);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<AKTUSubject | null>(AKTU_SUBJECTS[0]);

  // SGPA Calculator State
  const [subject1Grade, setSubject1Grade] = useState(10); // O
  const [subject2Grade, setSubject2Grade] = useState(9);  // A+
  const [subject3Grade, setSubject3Grade] = useState(8);  // A
  const [subject4Grade, setSubject4Grade] = useState(8);  // A
  const [lab1Grade, setLab1Grade] = useState(10);       // O
  const [calculatedSgpa, setCalculatedSgpa] = useState<number | null>(null);

  // Custom Topic Modal State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [customTopicName, setCustomTopicName] = useState('');

  // Filter subjects
  const filteredSubjects = AKTU_SUBJECTS.filter(s => {
    const semMatches = s.semester === selectedSemester;
    const searchMatches = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Branch matching
    if (s.branchId === 'common' || s.branchId === 'all') return semMatches && searchMatches;
    
    const b = selectedBranch.toLowerCase();
    const sb = s.branchId.toLowerCase();

    const isCsItBranch = b.includes('computer') || b.includes('information') || b.includes('ai') || b.includes('data');
    const isSubjectCsIt = sb === 'it' || sb === 'cse' || sb === 'cse_ai' || sb === 'cse_ds' || sb === 'aiml';

    let branchMatches = false;
    if (isCsItBranch && isSubjectCsIt) {
      branchMatches = true;
    } else if (b.includes('electronics') && sb === 'ece') {
      branchMatches = true;
    } else if (b.includes('electrical') && sb === 'ee') {
      branchMatches = true;
    } else if (b.includes('mechanical') && sb === 'me') {
      branchMatches = true;
    } else if (b.includes('civil') && sb === 'ce') {
      branchMatches = true;
    } else if (sb === b) {
      branchMatches = true;
    }

    return semMatches && branchMatches && searchMatches;
  });

  // Keep selected subject valid when branch/semester filters change
  useEffect(() => {
    if (filteredSubjects.length > 0) {
      if (!selectedSubject || !filteredSubjects.some(s => s.id === selectedSubject.id)) {
        setSelectedSubject(filteredSubjects[0]);
      }
    }
  }, [selectedBranch, selectedSemester, searchQuery, filteredSubjects]);

  const filteredLabs = AKTU_LABS.filter(l => l.semester === selectedSemester);

  const calculateSgpa = () => {
    // 4 theory subjects (4 credits each) + 1 lab (1.5 credits)
    const totalCredits = 4 * 4 + 1.5;
    const totalPoints = (subject1Grade * 4) + (subject2Grade * 4) + (subject3Grade * 4) + (subject4Grade * 4) + (lab1Grade * 1.5);
    const sgpa = totalPoints / totalCredits;
    setCalculatedSgpa(Number(sgpa.toFixed(2)));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSubjectName || !customTopicName) return;
    setShowCustomModal(false);
    onStartViva(customSubjectName, customTopicName);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            <span>AKTU Academic Syllabus, Labs & Marking Scheme</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified unit-wise curriculum, practical lab manuals, and SGPA/CGPA evaluation guidelines.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 hover:bg-cyan-900/40 transition-all font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Subject / Topic</span>
        </button>
      </div>

      {/* Primary Section Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
            activeTab === 'theory'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Theory Syllabus (5 Units)</span>
        </button>

        <button
          onClick={() => setActiveTab('labs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
            activeTab === 'labs'
              ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20'
              : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Practical Lab Manuals & Viva</span>
        </button>

        <button
          onClick={() => setActiveTab('marking')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
            activeTab === 'marking'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>Marking Scheme & SGPA</span>
        </button>

        <button
          onClick={() => setActiveTab('pyqs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
            activeTab === 'pyqs'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>PYQs & Important 10-Mark Questions</span>
        </button>
      </div>

      {/* TAB 1: THEORY SYLLABUS */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          
          {/* Domain & Semester Selector Hub */}
          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
            
            {/* Domain / Branch Filter Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Select AKTU Engineering Branch / Domain</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Current: <strong className="text-cyan-300">{selectedBranch}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {AKTU_BRANCHES.map(b => {
                  const isActive = selectedBranch.toLowerCase() === b.name.toLowerCase();
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBranch(b.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400'
                          : 'border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {b.code} - {b.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Semester Quick Buttons Row */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Select Semester (Sem 1 - 8)</span>
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => {
                  const isActive = selectedSemester === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSemester(s)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-bold transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/25 border border-purple-400'
                          : 'border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      Sem {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input Bar */}
            <div>
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search subject code or name (e.g., KCS301, Data Structures, Operating Systems, BAS101)..."
                  className="w-full rounded-2xl border border-slate-700/80 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all shadow-inner font-mono"
                />
              </div>
            </div>

          </div>

          {/* Subject Master Detail Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Subjects List */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Configured AKTU Subjects</span>
                <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30 font-semibold">{filteredSubjects.length} Found</span>
              </h2>

              {filteredSubjects.map(subj => {
                const isSelected = selectedSubject?.id === subj.id;
                return (
                  <div
                    key={subj.id}
                    onClick={() => setSelectedSubject(subj)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] ${
                      isSelected
                        ? 'border-cyan-500 bg-slate-900 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-500/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-950/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-cyan-950/80 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                        {subj.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{subj.credits} Credits • {subj.category}</span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-white font-mono">{subj.name}</h3>
                    <p className="mt-1 text-[11px] text-slate-400">{subj.units.length} Units • {subj.units.reduce((a, b) => a + b.topics.length, 0)} Topics</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Subject Details */}
            {selectedSubject && (
              <div className="md:col-span-2 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-xs font-mono font-bold text-cyan-300">
                        {selectedSubject.code}
                      </span>
                      <h2 className="text-lg font-bold text-white font-mono">{selectedSubject.name}</h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Semester {selectedSubject.semester} • {selectedSubject.credits} Credits • Official AKTU Curriculum
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartViva(selectedSubject.code, selectedSubject.units[0]?.topics[0])}
                      className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all font-mono"
                    >
                      <Mic className="h-3.5 w-3.5" />
                      <span>Start AI Viva</span>
                    </button>

                    <button
                      onClick={() => onGenerateRoadmap(selectedSubject.code)}
                      className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-900/40 transition-all font-mono"
                    >
                      <Map className="h-3.5 w-3.5" />
                      <span>Roadmap</span>
                    </button>
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Unit-wise Syllabus Breakdown (5 Units)</h3>

                  {selectedSubject.units.map(unit => (
                    <div key={unit.unitNumber} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
                      <h4 className="text-xs font-bold font-mono text-cyan-300">
                        Unit {unit.unitNumber}: {unit.unitName}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {unit.topics.map((t, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-slate-200"
                          >
                            <span className="truncate pr-2">{t}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => onStartViva(selectedSubject.code, t)}
                                className="p-1 text-cyan-400 hover:text-cyan-300"
                                title="Start AI Viva for this topic"
                              >
                                <Mic className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => onSearchVideos(t)}
                                className="p-1 text-indigo-400 hover:text-indigo-300"
                                title="View recommended videos"
                              >
                                <Video className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Questions */}
                {selectedSubject.importantQuestions.length > 0 && (
                  <div className="mt-6 border-t border-slate-800 pt-4">
                    <h3 className="text-xs font-mono font-bold text-amber-400 mb-2">AKTU High-Yield Previous Year Questions (PYQs)</h3>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {selectedSubject.importantQuestions.map((q, i) => (
                        <li key={i} className="leading-relaxed">{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: LAB MANUALS & PRACTICAL VIVAS */}
      {activeTab === 'labs' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <span>AKTU Semester Practical Labs & Viva Experiments</span>
            </h2>
            <p className="text-xs text-slate-400">
              Verified practical experiment list, code commands, and external professor viva questions.
            </p>

            <div className="space-y-6 pt-2">
              {filteredLabs.length === 0 ? (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-400">
                  Select Semester 1, 3, or 5 in the theory tab to view associated semester labs.
                </div>
              ) : (
                filteredLabs.map(lab => (
                  <div key={lab.id} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono font-bold mr-2">
                          {lab.labCode}
                        </span>
                        <span className="text-sm font-bold text-white font-mono">{lab.labName}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{lab.credits} Credits • Sem {lab.semester}</span>
                    </div>

                    <div className="space-y-3">
                      {lab.experiments.map(exp => (
                        <div key={exp.expNumber} className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-cyan-300 font-mono">
                              Exp #{exp.expNumber}: {exp.title}
                            </h4>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => onSearchVideos(lab.labName + ' ' + exp.title)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-950/40 text-rose-300 text-[11px] font-bold hover:bg-rose-900/50 transition-all font-mono"
                              >
                                <Video className="h-3 w-3 text-rose-400" />
                                <span>Watch Lab Video</span>
                              </button>

                              <button
                                onClick={() => onStartViva(lab.labCode, exp.title)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-[11px] font-bold hover:bg-cyan-900/50 transition-all font-mono"
                              >
                                <Mic className="h-3 w-3" />
                                <span>Practice Lab Viva</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300"><span className="text-slate-400 font-semibold">Objective:</span> {exp.objective}</p>

                          <div className="rounded-lg bg-slate-950 p-2.5 font-mono text-[11px] text-cyan-400 border border-slate-800">
                            <code>{exp.keyCommandsOrCode}</code>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-amber-400 block mb-1">External Viva Questions:</span>
                            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                              {exp.vivaQuestions.map((vq, vqIdx) => (
                                <li key={vqIdx}>{vq}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MARKING SCHEME & SGPA CALCULATOR */}
      {activeTab === 'marking' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Official AKTU Marking Rules */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>AKTU Official Marking & Evaluation Rules</span>
            </h2>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <h4 className="font-bold text-cyan-300 font-mono">1. Theory Subjects (100 Marks Total)</h4>
                <p>• <span className="font-semibold text-white">Internal Sessional (30 Marks):</span> Sessional 1 (15 Marks) + Sessional 2 (15 Marks) + Teacher Assessment / Attendance.</p>
                <p>• <span className="font-semibold text-white">External Written Exam (70 Marks):</span> Conducted at university exam centers.</p>
                <p>• <span className="font-semibold text-emerald-400">Passing Criteria:</span> Minimum 30% in External Theory (21/70) AND 40% aggregate overall (40/100).</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <h4 className="font-bold text-purple-300 font-mono">2. Practical / Lab Subjects (100 Marks Total)</h4>
                <p>• <span className="font-semibold text-white">Internal Lab (50 Marks):</span> Lab file, attendance & internal viva.</p>
                <p>• <span className="font-semibold text-white">External Practical Viva (50 Marks):</span> External AKTU professor examination.</p>
                <p>• <span className="font-semibold text-emerald-400">Passing Criteria:</span> Minimum 50% in External Practical Viva (25/50).</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <h4 className="font-bold text-amber-300 font-mono">3. Percentage Formula</h4>
                <p className="font-mono text-cyan-300">Percentage = (CGPA - 0.75) × 10</p>
                <p className="text-[11px] text-slate-400">Official AKTU ordinance formula for converting CGPA to percentage.</p>
              </div>
            </div>
          </div>

          {/* Interactive SGPA Calculator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Calculator className="h-5 w-5 text-cyan-400" />
              <span>Interactive SGPA & CGPA Estimator</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Data Structures (KCS301) - 4 Credits</label>
                <select value={subject1Grade} onChange={e => setSubject1Grade(Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white">
                  <option value={10}>O (Outstanding 90-100%) - Grade Point 10</option>
                  <option value={9}>A+ (Excellent 80-89%) - Grade Point 9</option>
                  <option value={8}>A (Very Good 70-79%) - Grade Point 8</option>
                  <option value={7}>B+ (Good 60-69%) - Grade Point 7</option>
                  <option value={6}>B (Above Avg 50-59%) - Grade Point 6</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">COA (KCS302) - 4 Credits</label>
                <select value={subject2Grade} onChange={e => setSubject2Grade(Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white">
                  <option value={10}>O (Outstanding 90-100%) - Grade Point 10</option>
                  <option value={9}>A+ (Excellent 80-89%) - Grade Point 9</option>
                  <option value={8}>A (Very Good 70-79%) - Grade Point 8</option>
                  <option value={7}>B+ (Good 60-69%) - Grade Point 7</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">DSTL (KCS303) - 4 Credits</label>
                <select value={subject3Grade} onChange={e => setSubject3Grade(Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white">
                  <option value={10}>O (Outstanding 90-100%) - Grade Point 10</option>
                  <option value={9}>A+ (Excellent 80-89%) - Grade Point 9</option>
                  <option value={8}>A (Very Good 70-79%) - Grade Point 8</option>
                  <option value={7}>B+ (Good 60-69%) - Grade Point 7</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technical Comm (BAS301) - 4 Credits</label>
                <select value={subject4Grade} onChange={e => setSubject4Grade(Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white">
                  <option value={10}>O (Outstanding 90-100%) - Grade Point 10</option>
                  <option value={9}>A+ (Excellent 80-89%) - Grade Point 9</option>
                  <option value={8}>A (Very Good 70-79%) - Grade Point 8</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Data Structures Lab (KCS351) - 1.5 Credits</label>
                <select value={lab1Grade} onChange={e => setLab1Grade(Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white">
                  <option value={10}>O (Outstanding 90-100%) - Grade Point 10</option>
                  <option value={9}>A+ (Excellent 80-89%) - Grade Point 9</option>
                </select>
              </div>

              <button
                onClick={calculateSgpa}
                className="w-full rounded-xl bg-cyan-500 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 font-mono"
              >
                Calculate Estimated SGPA & Percentage
              </button>

              {calculatedSgpa !== null && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-center space-y-1">
                  <span className="text-[11px] text-emerald-300 font-mono font-semibold uppercase">Estimated Semester SGPA</span>
                  <p className="text-3xl font-extrabold text-white font-mono">{calculatedSgpa} / 10</p>
                  <p className="text-xs text-emerald-400 font-mono">
                    Estimated Percentage: {((calculatedSgpa - 0.75) * 10).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: PREVIOUS YEAR PAPERS & HIGH YIELD 10-MARK QUESTIONS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-slate-950/90 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-400" />
                  <span>AKTU Previous Year Papers (PYQs) & 10-Mark High-Yield Question Bank</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Unit-wise 10-mark repeated exam questions (2021-2025) with Gateway Classes & EduRudram video explanation links.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {AKTU_SUBJECTS.slice(0, 6).map(sub => (
                <div key={sub.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 hover:border-amber-500/40 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono font-bold mr-2">
                        {sub.code}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">{sub.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Sem {sub.semester}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">Repeated 10-Mark Questions (2021 - 2025):</span>
                    <ul className="space-y-1.5 text-slate-300">
                      {sub.units.map(u => {
                        const questionText = u.topics[0] || sub.importantQuestions[0] || 'Explain key concepts & university exam derivations.';
                        return (
                          <li key={u.unitNumber} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                            <span className="font-bold text-cyan-300 font-mono">U{u.unitNumber}:</span> {questionText}
                            <div className="mt-1 flex items-center gap-2">
                              <button
                                onClick={() => onStartViva(sub.code, questionText)}
                                className="text-[10px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                              >
                                <Mic className="h-2.5 w-2.5" />
                                <span>Practice Answer Viva</span>
                              </button>
                              <button
                                onClick={() => onSearchVideos(`${sub.name} ${questionText} Gateway Classes`)}
                                className="text-[10px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                              >
                                <Video className="h-2.5 w-2.5" />
                                <span>Watch One-Shot Video</span>
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Topic Entry Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 uppercase tracking-wider font-mono">Practice Custom Subject / Topic</h3>
            
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={customSubjectName}
                  onChange={e => setCustomSubjectName(e.target.value)}
                  placeholder="e.g. Cloud Computing / Cyber Security"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Name</label>
                <input
                  type="text"
                  required
                  value={customTopicName}
                  onChange={e => setCustomTopicName(e.target.value)}
                  placeholder="e.g. AWS Lambda & Serverless Architecture"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="w-1/2 rounded-xl border border-slate-700 bg-slate-950 py-2.5 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950"
                >
                  Start Custom Viva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
