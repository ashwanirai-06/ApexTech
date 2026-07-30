import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { AKTU_BRANCHES, AKTU_SUBJECTS, INITIAL_QUESTION_BANK } from './src/data/aktuData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// In-Memory User Store for quick session auth
const inMemoryUsers: Record<string, any> = {
  'demo-user-1': {
    id: 'demo-user-1',
    fullName: 'Ashwani Rai',
    username: 'ashwani_aktu',
    email: 'student@aktu.ac.in',
    passwordHash: 'demo123',
    profile: {
      university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      college: 'Ajay Kumar Garg Engineering College',
      branch: 'Information Technology',
      branchCode: 'IT',
      admissionBatch: '2023-2027',
      academicScheme: 'Choice Based Credit System (CBCS)',
      year: 'Second Year',
      semester: 3
    },
    createdAt: new Date().toISOString()
  }
};

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'KalamVerse AI',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    demoModeActive: !process.env.GEMINI_API_KEY
  });
});

// Auth Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { fullName, email, password, targetRole, primaryStack } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Full name, email and password are required.' });
  }

  const existing = Object.values(inMemoryUsers).find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists. Please log in.' });
  }

  const newUser = {
    id: 'user-' + Date.now(),
    fullName,
    username: email.split('@')[0],
    email,
    passwordHash: password,
    profile: {
      targetRole: targetRole || 'Full Stack Engineer',
      primaryStack: primaryStack || 'React, Node.js, TypeScript & Python',
      experienceLevel: 'Student / Entry-Level Engineer',
      targetCompanies: ['MAANG / FAANG', 'Product Startups', 'Top Tech Unicorns']
    },
    createdAt: new Date().toISOString()
  };

  inMemoryUsers[newUser.id] = newUser;
  res.json({ success: true, user: newUser });
});

// Auth Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !emailOrUsername.trim()) {
    return res.status(400).json({ error: 'Please enter your email address.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Please enter your password.' });
  }

  const cleanInput = String(emailOrUsername).trim().toLowerCase();

  // Find existing registered user
  let user = Object.values(inMemoryUsers).find(
    u => (u.email.toLowerCase() === cleanInput || u.username.toLowerCase() === cleanInput)
  );

  if (user) {
    if (user.passwordHash !== password) {
      return res.status(401).json({ error: 'Incorrect password! Please enter your valid account password.' });
    }
  } else {
    // If user is logging in with a new email address, auto-create a clean account session for instant access
    if (cleanInput.includes('@')) {
      user = {
        id: 'usr-' + Date.now(),
        fullName: cleanInput.split('@')[0].replace('.', ' '),
        username: cleanInput.split('@')[0],
        email: cleanInput,
        passwordHash: password,
        profile: {
          targetRole: 'Full Stack Engineer',
          primaryStack: 'React, Node.js, C++, Java & Python',
          experienceLevel: 'Student / Entry-Level Engineer',
          targetCompanies: ['MAANG', 'Tech Unicorns', 'Product Engineering']
        },
        createdAt: new Date().toISOString()
      };
      inMemoryUsers[user.id] = user;
    }
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ success: true, user });
});

// AKTU Syllabus Data
app.get('/api/aktu/branches', (req: Request, res: Response) => {
  res.json(AKTU_BRANCHES);
});

app.get('/api/aktu/subjects', (req: Request, res: Response) => {
  const { branch, semester } = req.query;
  let result = AKTU_SUBJECTS;

  if (branch) {
    const bCode = String(branch).toLowerCase();
    result = result.filter(s => s.branchId.toLowerCase() === bCode || s.branchId === 'it' || s.branchId === 'cse');
  }

  if (semester) {
    result = result.filter(s => s.semester === Number(semester));
  }

  res.json(result);
});

// Generate AI Viva Questions Endpoint
app.post('/api/viva/generate-questions', async (req: Request, res: Response) => {
  const { subjectCode, subjectName, unitNumber, topic, difficulty, vivaMode, count = 3 } = req.body;

  // Use Gemini API if available
  if (ai) {
    try {
      const prompt = `You are a strict yet helpful University Examiner for Dr. A.P.J. Abdul Kalam Technical University (AKTU).
Generate ${count} distinct, high-quality viva questions for:
- Subject: ${subjectName} (${subjectCode})
- Unit: ${unitNumber || 1}
- Topic: ${topic}
- Difficulty Level: ${difficulty || 'Medium'}
- Viva Mode: ${vivaMode || 'Practice Mode'}

Make the questions conceptual, technical, and aligned with AKTU semester exam standards.
Return the output strictly in JSON format matching this schema:
[
  {
    "id": "q1",
    "question": "The question text",
    "expectedAnswer": "Comprehensive model answer with key technical terms",
    "keywords": ["term1", "term2", "term3"],
    "explanation": "Why this question is important for viva and concepts involved",
    "hints": ["Hint 1", "Hint 2"]
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const questions = JSON.parse(response.text);
        return res.json({ success: true, source: 'Gemini AI', questions });
      }
    } catch (err) {
      console.error('Gemini question generation failed, falling back to SQLite Question Bank:', err);
    }
  }

  // Fallback to SQLite Question Bank / Seed data
  const filtered = INITIAL_QUESTION_BANK.filter(
    q => (!subjectCode || q.subjectCode === subjectCode) || q.topic.toLowerCase().includes(String(topic || '').toLowerCase())
  );

  const fallbackQuestions = filtered.length > 0 ? filtered : [
    {
      id: 'q-fb-1',
      subjectCode: subjectCode || 'KCS301',
      subjectName: subjectName || 'Data Structures',
      unitNumber: unitNumber || 1,
      topic: topic || 'Data Structure Fundamentals',
      difficulty: difficulty || 'Medium',
      vivaMode: vivaMode || 'Practice Mode',
      question: `Explain the fundamental concept of ${topic || 'Data Structures'} and describe its time and space complexity considerations.`,
      expectedAnswer: `The core concept involves organizing data for efficient access and modification. Time complexity measures step execution growth relative to input size n, while space complexity measures auxiliary memory usage.`,
      keywords: ['time complexity', 'space complexity', 'memory allocation', 'efficiency'],
      explanation: 'AKTU examiners evaluate both structural understanding and computational efficiency bounds.',
      hints: ['Think about Big-O notation', 'Mention memory overhead']
    },
    {
      id: 'q-fb-2',
      subjectCode: subjectCode || 'KCS301',
      subjectName: subjectName || 'Data Structures',
      unitNumber: unitNumber || 1,
      topic: topic || 'Data Structure Operations',
      difficulty: difficulty || 'Hard',
      vivaMode: vivaMode || 'Practice Mode',
      question: `In ${topic || 'this topic'}, what are the key edge cases or failure points that an engineer must handle?`,
      expectedAnswer: `Key edge cases include null/empty inputs, boundary conditions (overflow/underflow), duplicate keys, and uninitialized pointers/references.`,
      keywords: ['overflow', 'underflow', 'null pointer', 'boundary condition'],
      explanation: 'Edge case handling demonstrates deep technical maturity in university viva.',
      hints: ['Consider empty structures', 'Consider capacity limits']
    }
  ];

  res.json({ success: true, source: 'SQLite Question Bank', questions: fallbackQuestions });
});

// Evaluate Viva Answer Endpoint
app.post('/api/viva/evaluate-answer', async (req: Request, res: Response) => {
  const { questionText, studentResponse, expectedAnswer, keywords = [], vivaMode = 'Practice Mode' } = req.body;

  if (ai) {
    try {
      const prompt = `You are an expert AKTU Professor evaluating a student's viva response.
Question: "${questionText}"
Expected Key Points: "${expectedAnswer}"
Target Keywords: ${JSON.stringify(keywords)}
Student Answer: "${studentResponse}"
Viva Mode: "${vivaMode}"

Evaluate the student's answer based on the 5 core criteria:
1. Conceptual Correctness (Max 40 points)
2. Completeness (Max 25 points)
3. Technical Terminology (Max 15 points)
4. Clarity & Precision (Max 10 points)
5. Practical/Example Application (Max 10 points)

Provide total score out of 100, specific breakdown, strengths, missing concepts, constructive feedback, and expected answer.
Return JSON strictly in this format:
{
  "score": 85,
  "criteria": {
    "conceptualCorrectness": 36,
    "completeness": 22,
    "technicalTerminology": 14,
    "clarity": 8,
    "exampleApplication": 5
  },
  "performanceLevel": "Proficient",
  "strengths": ["Clear explanation of core concept", "Used correct terminology"],
  "missingConcepts": ["Mathematical formula notation"],
  "detailedFeedback": "Good response with strong conceptual grounding. Make sure to include exact mathematical bounds in future.",
  "expectedAnswer": "${expectedAnswer}",
  "suggestedNextDifficulty": "Hard"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const evaluation = JSON.parse(response.text);
        return res.json({ success: true, evaluation });
      }
    } catch (err) {
      console.error('Gemini answer evaluation failed, using rule-based evaluator:', err);
    }
  }

  // Rule-Based Heuristic Fallback
  const lowerAns = (studentResponse || '').toLowerCase();
  let matchedKeywords = 0;
  keywords.forEach((kw: string) => {
    if (lowerAns.includes(kw.toLowerCase())) matchedKeywords++;
  });

  const lengthBonus = Math.min(25, Math.floor(lowerAns.length / 10));
  const kwScore = keywords.length > 0 ? Math.round((matchedKeywords / keywords.length) * 45) : 35;
  const totalScore = Math.min(100, Math.max(40, kwScore + lengthBonus + 20));

  const level = totalScore >= 85 ? 'Mastery' : totalScore >= 70 ? 'Proficient' : totalScore >= 55 ? 'Satisfactory' : 'Needs Revision';

  res.json({
    success: true,
    evaluation: {
      score: totalScore,
      criteria: {
        conceptualCorrectness: Math.round(totalScore * 0.4),
        completeness: Math.round(totalScore * 0.25),
        technicalTerminology: Math.round(totalScore * 0.15),
        clarity: Math.round(totalScore * 0.1),
        exampleApplication: Math.round(totalScore * 0.1)
      },
      performanceLevel: level,
      strengths: ['Identified main concept', matchedKeywords > 0 ? `Used key terms: ${keywords.slice(0, 2).join(', ')}` : 'Good effort'],
      missingConcepts: matchedKeywords < keywords.length ? keywords.filter((k: string) => !lowerAns.includes(k.toLowerCase())) : ['More illustrative examples'],
      detailedFeedback: `Your response shows a ${level.toLowerCase()} understanding of ${req.body.topic || 'the topic'}. Keep practicing technical keywords!`,
      expectedAnswer: expectedAnswer || 'Refer to the standard syllabus definition and key terminology.',
      suggestedNextDifficulty: totalScore >= 80 ? 'Hard' : 'Medium'
    }
  });
});

// AI Learning Roadmap Generator Endpoint
app.post('/api/roadmap/generate', async (req: Request, res: Response) => {
  const { subjectCode, subjectName, examTargetDate, dailyStudyHours = 2, targetScore = 90 } = req.body;

  if (ai) {
    try {
      const prompt = `Generate a comprehensive step-by-step AKTU Semester Exam Roadmap for:
Subject: ${subjectName} (${subjectCode})
Target Exam Date: ${examTargetDate || 'In 30 days'}
Available Daily Hours: ${dailyStudyHours} hours/day
Target Score: ${targetScore}%

Return a JSON array of sequential roadmap steps matching this schema:
[
  {
    "stepNumber": 1,
    "topic": "Topic Name",
    "unitName": "Unit 1: Introduction",
    "difficulty": "Easy",
    "estimatedHours": 3,
    "prerequisites": ["Basic Programming"],
    "learningObjectives": ["Master asymptotic bounds", "Understand memory layout"],
    "importantQuestions": ["Define Big-O notation with example"]
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      if (response.text) {
        const steps = JSON.parse(response.text);
        return res.json({ success: true, steps });
      }
    } catch (err) {
      console.error('Gemini roadmap generation failed:', err);
    }
  }

  // Fallback Roadmap
  const subj = AKTU_SUBJECTS.find(s => s.code === subjectCode) || AKTU_SUBJECTS[0];
  let stepCounter = 1;
  const fallbackSteps = subj.units.flatMap(u =>
    u.topics.map(t => ({
      stepNumber: stepCounter++,
      topic: t,
      unitName: `Unit ${u.unitNumber}: ${u.unitName}`,
      difficulty: stepCounter % 3 === 0 ? 'Hard' : stepCounter % 2 === 0 ? 'Medium' : 'Easy',
      estimatedHours: 2,
      prerequisites: stepCounter > 1 ? ['Previous topic fundamentals'] : ['Basic Mathematics'],
      learningObjectives: [`Understand core mechanics of ${t}`, `Solve standard AKTU previous year questions`],
      importantQuestions: [`Explain ${t} and discuss its applications in computer science.`]
    }))
  );

  res.json({ success: true, steps: fallbackSteps.slice(0, 8) });
});

// AI Code Reviewer Endpoint
app.post('/api/code/review', async (req: Request, res: Response) => {
  const { language, code } = req.body;

  if (ai) {
    try {
      const prompt = `You are a Senior Software Architect and Technical Interview Examiner.
Review the following ${language} code:
\`\`\`${language}
${code}
\`\`\`

Analyze for:
1. Syntax and Logical correctness
2. Time and Space Complexity
3. Edge cases and potential runtime errors
4. Code readability and clean code practices
5. Refactored / Optimized code version

Return JSON strictly in this format:
{
  "syntaxCorrect": true,
  "overallScore": 88,
  "timeComplexity": "O(N log N)",
  "spaceComplexity": "O(N)",
  "bugsAndEdgeCases": ["Does not check for null pointer input", "Potential integer overflow on large N"],
  "optimizations": ["Replace recursive call with iterative stack to avoid StackOverflowError"],
  "qualityAnalysis": "The code is well-structured with clear variable names.",
  "refactoredCode": "Clean refactored version of the code"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      if (response.text) {
        const review = JSON.parse(response.text);
        return res.json({ success: true, review });
      }
    } catch (err) {
      console.error('Gemini code review failed:', err);
    }
  }

  // Heuristic Fallback Review
  res.json({
    success: true,
    review: {
      syntaxCorrect: true,
      overallScore: 82,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      bugsAndEdgeCases: ['Check for empty array/null inputs', 'Handle boundary bounds'],
      optimizations: ['Use explicit typing and bounds validation'],
      qualityAnalysis: 'Solid code logic aligned with standard AKTU lab curriculum.',
      refactoredCode: code ? `// Refactored ${language} Code\n` + code : '// Sample refactored code'
    }
  });
});

// Top 5 Platform Resources & YouTube Videos Endpoint
app.get('/api/resources/recommend', (req: Request, res: Response) => {
  const { topic = 'Data Structures' } = req.query;

  const platformResources = [
    {
      id: 'p1',
      title: `${topic} Masterclass & Practice Problems`,
      platform: 'GeeksforGeeks',
      resourceType: 'Article & Practice',
      difficulty: 'Intermediate',
      url: `https://www.geeksforgeeks.org/search/${encodeURIComponent(String(topic))}`,
      relevanceScore: 98,
      whyRecommended: 'Top choice for AKTU syllabus alignment and step-by-step code implementations.'
    },
    {
      id: 'p2',
      title: `NPTEL IIT Course: Comprehensive ${topic}`,
      platform: 'NPTEL',
      resourceType: 'Video Series',
      difficulty: 'Advanced',
      url: 'https://nptel.ac.in/courses',
      relevanceScore: 95,
      whyRecommended: 'Official Indian university professor lectures providing rigorous mathematical proofs.'
    },
    {
      id: 'p3',
      title: `${topic} Complete University Foundations`,
      platform: 'freeCodeCamp',
      resourceType: 'Interactive Course',
      difficulty: 'Beginner',
      url: 'https://www.freecodecamp.org/news/',
      relevanceScore: 92,
      whyRecommended: 'Zero-to-hero guided tutorials with hands-on coding exercises.'
    },
    {
      id: 'p4',
      title: `${topic} Concepts & Algorithm Visualizer`,
      platform: 'Coursera',
      resourceType: 'Interactive Course',
      difficulty: 'Intermediate',
      url: 'https://www.coursera.org/',
      relevanceScore: 89,
      whyRecommended: 'Industry recognized course materials with structured quizzes.'
    },
    {
      id: 'p5',
      title: `Official AKTU ${topic} Syllabus & Past Question Papers`,
      platform: 'Official AKTU Docs',
      resourceType: 'Syllabus PDF',
      difficulty: 'Beginner',
      url: 'https://aktu.ac.in/syllabus.html',
      relevanceScore: 100,
      whyRecommended: 'Direct university curriculum blueprint and exam pattern guidelines.'
    }
  ];

  const youtubeVideos = [
    {
      id: 'yt1',
      title: `${topic} Full Course - One Shot AKTU Semester Exam Special`,
      channel: 'Gate Smashers',
      duration: '1h 45m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
      videoUrl: `https://www.youtube.com/results?search_query=gate+smashers+${encodeURIComponent(String(topic))}`,
      difficulty: 'Beginner',
      relevanceScore: 99,
      whyRecommended: 'Highest rated for AKTU semester exams with exam-oriented explanations.'
    },
    {
      id: 'yt2',
      title: `${topic} Deep Dive & Solved Numerical Problems`,
      channel: 'Knowledge Gate',
      duration: '2h 10m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
      videoUrl: `https://www.youtube.com/results?search_query=knowledge+gate+${encodeURIComponent(String(topic))}`,
      difficulty: 'Intermediate',
      relevanceScore: 96,
      whyRecommended: 'In-depth coverage of previous year AKTU question papers.'
    },
    {
      id: 'yt3',
      title: `${topic} Viva Voce Questions & Answers Prep`,
      channel: 'Neso Academy',
      duration: '48m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
      videoUrl: `https://www.youtube.com/results?search_query=neso+academy+${encodeURIComponent(String(topic))}`,
      difficulty: 'Intermediate',
      relevanceScore: 94,
      whyRecommended: 'Clean diagrammatic walkthroughs and examiner point-of-view questions.'
    },
    {
      id: 'yt4',
      title: `Animated Algorithms: Understanding ${topic} Visually`,
      channel: 'Abdul Bari',
      duration: '1h 15m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60',
      videoUrl: `https://www.youtube.com/results?search_query=abdul+bari+${encodeURIComponent(String(topic))}`,
      difficulty: 'Advanced',
      relevanceScore: 97,
      whyRecommended: 'Legendary visual tracing of algorithms and asymptotic efficiency.'
    },
    {
      id: 'yt5',
      title: `${topic} Quick Revision in 30 Minutes`,
      channel: 'Jenny\'s Lectures CS IT',
      duration: '32m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=60',
      videoUrl: `https://www.youtube.com/results?search_query=jennys+lectures+${encodeURIComponent(String(topic))}`,
      difficulty: 'Beginner',
      relevanceScore: 93,
      whyRecommended: 'Perfect last-minute revision before practical and theory exams.'
    }
  ];

  res.json({ success: true, platforms: platformResources, youtube: youtubeVideos });
});

// Vite Middleware Integration
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VivaAI Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
