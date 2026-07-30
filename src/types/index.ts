export interface StudentAcademicProfile {
  university?: string;
  college?: string;
  branch?: string; // e.g. 'Information Technology'
  branchCode?: string; // e.g. 'IT'
  admissionBatch?: string; // e.g. '2023-2027'
  academicScheme?: string; // e.g. 'Choice Based Credit System (CBCS)'
  year?: string; // e.g. 'Second Year'
  semester?: number; // e.g. 3
  targetRole?: string;
  primaryStack?: string;
  experienceLevel?: string;
  targetCompanies?: string[];
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  profile: StudentAcademicProfile;
  createdAt: string;
}

export interface VivaQuestion {
  id: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  vivaMode: 'Practice Mode' | 'Exam Mode' | 'Strict Professor Mode';
  question: string;
  expectedAnswer: string;
  keywords: string[];
  explanation: string;
  hints?: string[];
}

export interface EvaluationCriteria {
  conceptualCorrectness: number; // max 40
  completeness: number; // max 25
  technicalTerminology: number; // max 15
  clarity: number; // max 10
  exampleApplication: number; // max 10
}

export interface AnswerEvaluation {
  score: number; // 0 - 100
  criteria: EvaluationCriteria;
  performanceLevel: 'Needs Revision' | 'Satisfactory' | 'Proficient' | 'Mastery';
  strengths: string[];
  missingConcepts: string[];
  detailedFeedback: string;
  expectedAnswer: string;
  suggestedNextDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export interface StudentAnswerLog {
  questionId: string;
  questionText: string;
  studentResponse: string;
  timeSpentSeconds: number;
  evaluation: AnswerEvaluation;
  timestamp: string;
}

export interface VivaSession {
  id: string;
  userId: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  topic: string;
  vivaMode: 'Practice Mode' | 'Exam Mode' | 'Strict Professor Mode';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  totalQuestions: number;
  completedQuestions: number;
  averageScore: number;
  status: 'In Progress' | 'Completed';
  logs: StudentAnswerLog[];
  startedAt: string;
  completedAt?: string;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  topic: string;
  unitName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  completed: boolean;
  importantQuestions: string[];
}

export interface LearningRoadmap {
  id: string;
  userId: string;
  subjectCode: string;
  subjectName: string;
  examTargetDate: string;
  dailyStudyHours: number;
  targetScore: number;
  overallProgress: number; // 0 - 100
  steps: RoadmapStep[];
  createdAt: string;
}

export interface StudyPlanTask {
  id: string;
  dayNumber: number;
  date: string;
  topic: string;
  taskType: 'Theory' | 'Coding Task' | 'AI Viva Practice' | 'Revision Checkpoint';
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  hoursPerDay: number;
  tasks: StudyPlanTask[];
  createdAt: string;
}

export interface PlatformResource {
  id: string;
  title: string;
  platform: 'GeeksforGeeks' | 'NPTEL' | 'Coursera' | 'freeCodeCamp' | 'Official AKTU Docs' | 'Interactive Sandbox';
  resourceType: 'Article' | 'Video Series' | 'Interactive Course' | 'Syllabus PDF';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  relevanceScore: number;
  whyRecommended: string;
  saved?: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relevanceScore: number;
  whyRecommended: string;
  saved?: boolean;
}

export interface ResourceRecommendation {
  id: string;
  topic: string;
  title: string;
  channelName: string;
  url: string;
  duration: string;
  platform: string;
  thumbnailUrl: string;
  description: string;
}

export interface CodeReviewResult {
  language: 'python' | 'cpp' | 'java' | 'c' | 'javascript';
  code: string;
  syntaxCorrect: boolean;
  overallScore: number; // 0 - 100
  timeComplexity: string;
  spaceComplexity: string;
  bugsAndEdgeCases: string[];
  optimizations: string[];
  qualityAnalysis: string;
  refactoredCode: string;
}

export interface WeakTopic {
  id: string;
  userId: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  topicName: string;
  errorFrequency: number;
  averageScore: number;
  priority: 'High' | 'Medium' | 'Low';
  missingConcepts: string[];
  lastPracticed: string;
}

export interface AnalyticsSummary {
  totalSubjects: number;
  totalVivaSessions: number;
  averageScore: number;
  bestScore: number;
  studyStreakDays: number;
  aiReadinessScore: number;
  weakestSubject: string;
  weakestTopic: string;
  roadmapProgress: number;
  scoreTrends: { date: string; score: number; subject: string }[];
  subjectPerformance: { subject: string; score: number; count: number }[];
}

export interface LabManual {
  id: string;
  labCode: string;
  labName: string;
  subjectCode: string;
  semester: number;
  credits: number;
  experiments: {
    expNumber: number;
    title: string;
    objective: string;
    keyCommandsOrCode: string;
    vivaQuestions: string[];
  }[];
}

export interface DomainRoadmap {
  id: string;
  domainName: string;
  category: 'Software' | 'AI & Data' | 'Infrastructure' | 'Mobile & Security' | 'Core Engineering';
  iconName: string;
  description: string;
  jobRoles: string[];
  averageSalaryPackage: string;
  phases: {
    phaseName: string;
    durationMonths: string;
    topics: string[];
    keyTools: string[];
    suggestedProjects: string[];
  }[];
  recommendedChannels: { name: string; url: string; note: string }[];
}

export interface DSATopic {
  id: string;
  topicName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodePattern: string;
  cppSnippet: string;
  javaSnippet: string;
  pythonSnippet: string;
  keyConcepts: string[];
  commonVivaQuestions: string[];
}

export interface AcademicEvent {
  id: string;
  title: string;
  eventType: 'Sessional Exam' | 'Practical Viva' | 'End Sem Theory' | 'Assignment Deadline' | 'University Holiday' | 'Custom Note';
  startDate: string;
  endDate?: string;
  semesterRange: string;
  description: string;
  isOfficialAKTU: boolean;
}

export interface MarkingSchemeRule {
  subjectType: 'Theory' | 'Practical / Lab' | 'Project / Seminar';
  credits: number;
  internalMarks: number; // e.g. 30
  externalMarks: number; // e.g. 70
  totalMarks: number; // 100
  minExternalPassPercent: number; // e.g. 30%
  minTotalPassPercent: number; // e.g. 40%
  gradeScale: { grade: string; minPercentage: number; gradePoint: number }[];
}

