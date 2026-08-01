import initSqlJs, { Database } from 'sql.js';
import { StreakService } from '../utils/streakService';
import {
  User,
  StudentAcademicProfile,
  VivaSession,
  StudentAnswerLog,
  LearningRoadmap,
  StudyPlan,
  WeakTopic,
  PlatformResource,
  YouTubeVideo,
  AnalyticsSummary,
  AnswerEvaluation
} from '../types';
import { AKTU_SUBJECTS, AKTU_BRANCHES, INITIAL_QUESTION_BANK } from '../data/aktuData';

let dbInstance: Database | null = null;

function createFallbackDatabase(): Database {
  const storeKey = 'vivaai_sqlite_db_fallback';
  
  let tables: Record<string, any[]> = {
    users: [
      {
        id: 'demo-user-1',
        fullName: 'Ashwani',
        username: 'ashwani_aktu',
        email: 'student@aktu.ac.in',
        passwordHash: 'demo123',
        university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
        college: 'Ajay Kumar Garg Engineering College',
        branch: 'Information Technology',
        branchCode: 'IT',
        admissionBatch: '2023-2027',
        academicScheme: 'Choice Based Credit System (CBCS)',
        year: 'Second Year',
        semester: 3,
        createdAt: '2026-01-01T00:00:00.000Z'
      }
    ],
    viva_sessions: [
      {
        id: 'sess-demo-1',
        userId: 'demo-user-1',
        subjectCode: 'KCS301',
        subjectName: 'Data Structures',
        unitNumber: 1,
        topic: 'Asymptotic Notations',
        vivaMode: 'Practice Mode',
        difficulty: 'Medium',
        totalQuestions: 5,
        completedQuestions: 1,
        averageScore: 88.0,
        status: 'Completed',
        logs: JSON.stringify([
          {
            questionId: 'q1',
            questionText: 'What is Big-O notation and how does it differ from Omega and Theta?',
            studentResponse: 'Big O measures worst case execution time bound, while Omega measures lower bound and Theta gives tight bound.',
            timeSpentSeconds: 42,
            evaluation: {
              score: 88,
              criteria: {
                conceptualCorrectness: 36,
                completeness: 22,
                technicalTerminology: 14,
                clarity: 8,
                exampleApplication: 8
              },
              performanceLevel: 'Proficient',
              strengths: ['Accurate distinction between bounds', 'Clear technical terminology'],
              missingConcepts: ['Mathematical formal definition with constants c and n0'],
              detailedFeedback: 'Excellent grasp of asymptotic notation definitions and bounds comparison.',
              expectedAnswer: 'Big-O represents upper bound f(n) <= c*g(n), Omega represents lower bound f(n) >= c*g(n), Theta tight bound.',
              suggestedNextDifficulty: 'Hard'
            },
            timestamp: new Date().toISOString()
          }
        ]),
        startedAt: '2026-07-28T09:00:00.000Z',
        completedAt: '2026-07-28T09:10:00.000Z'
      }
    ],
    roadmaps: [],
    study_plans: [],
    weak_topics: [
      {
        id: 'wt-1',
        userId: 'demo-user-1',
        subjectCode: 'KCS301',
        subjectName: 'Data Structures',
        unitNumber: 4,
        topicName: 'AVL Trees & Rotations',
        errorFrequency: 3,
        averageScore: 45,
        priority: 'High',
        missingConcepts: JSON.stringify(['Double rotations (LR, RL)', 'Balance factor calculation rules']),
        lastPracticed: new Date().toISOString()
      },
      {
        id: 'wt-2',
        userId: 'demo-user-1',
        subjectCode: 'KCS501',
        subjectName: 'Database Management Systems',
        unitNumber: 3,
        topicName: 'BCNF Normalization',
        errorFrequency: 2,
        averageScore: 58,
        priority: 'Medium',
        missingConcepts: JSON.stringify(['Lossless join decomposition test', 'Functional dependency closure']),
        lastPracticed: new Date().toISOString()
      }
    ],
    saved_resources: []
  };

  try {
    const stored = localStorage.getItem(storeKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      tables = { ...tables, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load fallback localStorage:', e);
  }

  function persist() {
    try {
      localStorage.setItem(storeKey, JSON.stringify(tables));
    } catch (e) {
      console.error('Failed to persist fallback localStorage:', e);
    }
  }

  return {
    run: (sql: string, params?: any[]) => {
      const lower = sql.toLowerCase().trim();
      if (lower.startsWith('create table')) return;

      if (lower.startsWith('insert or replace into viva_sessions') || lower.startsWith('insert into viva_sessions')) {
        if (params) {
          const [id, userId, subjectCode, subjectName, unitNumber, topic, vivaMode, difficulty, totalQuestions, completedQuestions, averageScore, status, logs, startedAt, completedAt] = params;
          tables.viva_sessions = tables.viva_sessions.filter((s: any) => s.id !== id);
          tables.viva_sessions.push({
            id, userId, subjectCode, subjectName, unitNumber, topic, vivaMode, difficulty, totalQuestions, completedQuestions, averageScore, status, logs, startedAt, completedAt
          });
          persist();
        }
      } else if (lower.startsWith('insert into users')) {
        if (params && params.length >= 14) {
          tables.users.push({
            id: params[0], fullName: params[1], username: params[2], email: params[3], passwordHash: params[4], university: params[5], college: params[6], branch: params[7], branchCode: params[8], admissionBatch: params[9], academicScheme: params[10], year: params[11], semester: params[12], createdAt: params[13]
          });
          persist();
        }
      } else if (lower.startsWith('insert into weak_topics') || lower.startsWith('update weak_topics')) {
        if (lower.startsWith('update weak_topics') && params) {
          const [freq, newAvg, priority, missingConcepts, now, userId, topicName] = params;
          const target = tables.weak_topics.find((w: any) => w.userId === userId && w.topicName === topicName);
          if (target) {
            target.errorFrequency = freq;
            target.averageScore = newAvg;
            target.priority = priority;
            target.missingConcepts = missingConcepts;
            target.lastPracticed = now;
          }
        } else if (params) {
          const [id, userId, subjectCode, subjectName, unitNumber, topicName, freq, score, priority, missingConcepts, now] = params;
          tables.weak_topics.push({
            id, userId, subjectCode, subjectName, unitNumber, topicName, errorFrequency: freq, averageScore: score, priority, missingConcepts, lastPracticed: now
          });
        }
        persist();
      }
    },
    exec: (sql: string) => {
      const lower = sql.toLowerCase().trim();
      if (lower.includes('from users')) {
        const matchEmail = sql.match(/email\s*=\s*'([^']+)'/i);
        const matchId = sql.match(/id\s*=\s*'([^']+)'/i);
        let matched = tables.users || [];
        if (matchEmail) matched = matched.filter(u => u.email === matchEmail[1]);
        if (matchId) matched = matched.filter(u => u.id === matchId[1]);
        if (matched.length === 0) return [];
        return [{
          columns: ['id', 'fullName', 'username', 'email', 'passwordHash', 'university', 'college', 'branch', 'branchCode', 'admissionBatch', 'academicScheme', 'year', 'semester', 'createdAt'],
          values: matched.map(u => [u.id, u.fullName, u.username, u.email, u.passwordHash, u.university, u.college, u.branch, u.branchCode, u.admissionBatch, u.academicScheme, u.year, u.semester, u.createdAt])
        }];
      }
      if (lower.includes('from viva_sessions')) {
        const matchUser = sql.match(/userid\s*=\s*'([^']+)'/i);
        let matched = tables.viva_sessions || [];
        if (matchUser) matched = matched.filter(s => s.userId === matchUser[1]);
        if (matched.length === 0) return [];
        return [{
          columns: ['id', 'userId', 'subjectCode', 'subjectName', 'unitNumber', 'topic', 'vivaMode', 'difficulty', 'totalQuestions', 'completedQuestions', 'averageScore', 'status', 'logs', 'startedAt', 'completedAt'],
          values: matched.map(s => [s.id, s.userId, s.subjectCode, s.subjectName, s.unitNumber, s.topic, s.vivaMode, s.difficulty, s.totalQuestions, s.completedQuestions, s.averageScore, s.status, typeof s.logs === 'string' ? s.logs : JSON.stringify(s.logs || []), s.startedAt, s.completedAt])
        }];
      }
      if (lower.includes('from weak_topics')) {
        const matchUser = sql.match(/userid\s*=\s*'([^']+)'/i);
        const matchTopic = sql.match(/topicname\s*=\s*'([^']+)'/i);
        let matched = tables.weak_topics || [];
        if (matchUser) matched = matched.filter(w => w.userId === matchUser[1]);
        if (matchTopic) matched = matched.filter(w => w.topicName && w.topicName.toLowerCase() === matchTopic[1].toLowerCase());
        if (matched.length === 0) return [];
        return [{
          columns: ['id', 'userId', 'subjectCode', 'subjectName', 'unitNumber', 'topicName', 'errorFrequency', 'averageScore', 'priority', 'missingConcepts', 'lastPracticed'],
          values: matched.map(w => [w.id, w.userId, w.subjectCode, w.subjectName, w.unitNumber, w.topicName, w.errorFrequency, w.averageScore, w.priority, typeof w.missingConcepts === 'string' ? w.missingConcepts : JSON.stringify(w.missingConcepts || []), w.lastPracticed])
        }];
      }
      return [];
    },
    export: () => new Uint8Array()
  } as unknown as Database;
}

// Initialize SQLite schema and seed default data
export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  try {
    let wasmBinary: ArrayBuffer | undefined = undefined;
    try {
      const res = await fetch('/sql-wasm.wasm');
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const header = new Uint8Array(buffer.slice(0, 4));
        // Check WASM magic bytes: 0x00 ('\0'), 0x61 ('a'), 0x73 ('s'), 0x6d ('m') and length > 2MB
      if (
  buffer.byteLength > 500000 &&
  header.length === 4 &&
  header[0] === 0x00 &&
  header[1] === 0x61 &&
  header[2] === 0x73 &&
  header[3] === 0x6d
) {
  wasmBinary = buffer;
}
      }
    } catch (e) {
      console.warn('Could not load local /sql-wasm.wasm binary:', e);
    }

    if (wasmBinary) {
      const SQL = await initSqlJs({
        locateFile: file => `/${file}`,
        wasmBinary
      });

      const savedDb = localStorage.getItem('vivaai_sqlite_db');
      if (savedDb) {
        const uInt8Array = new Uint8Array(JSON.parse(savedDb));
        dbInstance = new SQL.Database(uInt8Array);
      } else {
        dbInstance = new SQL.Database();
        initTables(dbInstance);
        saveDb(dbInstance);
      }
    } else {
      dbInstance = createFallbackDatabase();
    }
  } catch (err) {
    console.warn('SQL.js WASM initialization failed, using fallback database engine:', err);
    dbInstance = createFallbackDatabase();
  }

  return dbInstance;
}

function saveDb(db: Database) {
  try {
    const data = db.export();
    const buffer = Array.from(data);
    localStorage.setItem('vivaai_sqlite_db', JSON.stringify(buffer));
  } catch (e) {
    console.error('Failed to persist SQLite DB:', e);
  }
}

function initTables(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      fullName TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      university TEXT,
      college TEXT,
      branch TEXT,
      branchCode TEXT,
      admissionBatch TEXT,
      academicScheme TEXT,
      year TEXT,
      semester INTEGER,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS viva_sessions (
      id TEXT PRIMARY KEY,
      userId TEXT,
      subjectCode TEXT,
      subjectName TEXT,
      unitNumber INTEGER,
      topic TEXT,
      vivaMode TEXT,
      difficulty TEXT,
      totalQuestions INTEGER,
      completedQuestions INTEGER,
      averageScore REAL,
      status TEXT,
      logs TEXT,
      startedAt TEXT,
      completedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS roadmaps (
      id TEXT PRIMARY KEY,
      userId TEXT,
      subjectCode TEXT,
      subjectName TEXT,
      examTargetDate TEXT,
      dailyStudyHours REAL,
      targetScore INTEGER,
      overallProgress REAL,
      steps TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS study_plans (
      id TEXT PRIMARY KEY,
      userId TEXT,
      subjectCode TEXT,
      subjectName TEXT,
      examDate TEXT,
      hoursPerDay REAL,
      tasks TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS weak_topics (
      id TEXT PRIMARY KEY,
      userId TEXT,
      subjectCode TEXT,
      subjectName TEXT,
      unitNumber INTEGER,
      topicName TEXT,
      errorFrequency INTEGER,
      averageScore REAL,
      priority TEXT,
      missingConcepts TEXT,
      lastPracticed TEXT
    );

    CREATE TABLE IF NOT EXISTS saved_resources (
      id TEXT PRIMARY KEY,
      userId TEXT,
      resourceType TEXT, -- 'platform' or 'youtube'
      data TEXT,
      createdAt TEXT
    );
  `);

  // Seed default demo user if not exists
  const existingUser = db.exec("SELECT * FROM users WHERE email = 'student@aktu.ac.in'");
  if (existingUser.length === 0 || existingUser[0].values.length === 0) {
    db.run(`
      INSERT INTO users (
        id, fullName, username, email, passwordHash, university, college,
        branch, branchCode, admissionBatch, academicScheme, year, semester, createdAt
      ) VALUES (
        'demo-user-1',
        'Ashwani Rai',
        'ashwani_aktu',
        'student@aktu.ac.in',
        'demo123',
        'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
        'Ajay Kumar Garg Engineering College',
        'Information Technology',
        'IT',
        '2023-2027',
        'Choice Based Credit System (CBCS)',
        'Second Year',
        3,
        '2026-01-01T00:00:00.000Z'
      )
    `);

    // Seed sample viva session
    const sampleLogs: StudentAnswerLog[] = [
      {
        questionId: 'q1',
        questionText: 'What is Big-O notation and how does it differ from Omega and Theta?',
        studentResponse: 'Big O measures worst case execution time bound, while Omega measures lower bound and Theta gives tight bound.',
        timeSpentSeconds: 42,
        evaluation: {
          score: 88,
          criteria: {
            conceptualCorrectness: 36,
            completeness: 22,
            technicalTerminology: 14,
            clarity: 8,
            exampleApplication: 8
          },
          performanceLevel: 'Proficient',
          strengths: ['Accurate distinction between bounds', 'Clear technical terminology'],
          missingConcepts: ['Mathematical formal definition with constants c and n0'],
          detailedFeedback: 'Excellent grasp of asymptotic notation definitions and bounds comparison.',
          expectedAnswer: 'Big-O represents upper bound f(n) <= c*g(n), Omega represents lower bound f(n) >= c*g(n), Theta tight bound.',
          suggestedNextDifficulty: 'Hard'
        },
        timestamp: new Date().toISOString()
      }
    ];

    db.run(`
      INSERT INTO viva_sessions (
        id, userId, subjectCode, subjectName, unitNumber, topic, vivaMode,
        difficulty, totalQuestions, completedQuestions, averageScore, status, logs, startedAt, completedAt
      ) VALUES (
        'sess-demo-1',
        'demo-user-1',
        'KCS301',
        'Data Structures',
        1,
        'Asymptotic Notations',
        'Practice Mode',
        'Medium',
        5,
        1,
        88.0,
        'Completed',
        ?,
        '2026-07-28T09:00:00.000Z',
        '2026-07-28T09:10:00.000Z'
      )
    `, [JSON.stringify(sampleLogs)]);
  }
}

export class DBService {
  static async init(): Promise<void> {
    await getDb();
  }

  static async getVivaHistory(userId: string): Promise<VivaSession[]> {
    return this.getVivaSessionsByUser(userId);
  }

  static async getUserById(userId: string): Promise<User | null> {
    const db = await getDb();
    const res = db.exec(`SELECT * FROM users WHERE id = '${userId}'`);
    if (res.length === 0 || res[0].values.length === 0) return null;
    const row = res[0].values[0];
    return {
      id: row[0] as string,
      fullName: row[1] as string,
      username: row[2] as string,
      email: row[3] as string,
      profile: {
        university: row[5] as string,
        college: row[6] as string,
        branch: row[7] as string,
        branchCode: row[8] as string,
        admissionBatch: row[9] as string,
        academicScheme: row[10] as string,
        year: row[11] as string,
        semester: row[12] as number,
      },
      createdAt: row[13] as string
    };
  }

  static async saveVivaSession(session: VivaSession): Promise<void> {
    const db = await getDb();
    db.run(`
      INSERT OR REPLACE INTO viva_sessions (
        id, userId, subjectCode, subjectName, unitNumber, topic, vivaMode,
        difficulty, totalQuestions, completedQuestions, averageScore, status, logs, startedAt, completedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      session.id,
      session.userId,
      session.subjectCode,
      session.subjectName,
      session.unitNumber,
      session.topic,
      session.vivaMode,
      session.difficulty,
      session.totalQuestions,
      session.completedQuestions,
      session.averageScore,
      session.status,
      JSON.stringify(session.logs),
      session.startedAt,
      session.completedAt || new Date().toISOString()
    ]);
    saveDb(db);
    StreakService.recordActivity();
  }

  static async getVivaSessionsByUser(userId: string): Promise<VivaSession[]> {
    const db = await getDb();
    const res = db.exec(`SELECT * FROM viva_sessions WHERE userId = '${userId}' ORDER BY startedAt DESC`);
    if (res.length === 0) return [];
    return res[0].values.map(row => ({
      id: row[0] as string,
      userId: row[1] as string,
      subjectCode: row[2] as string,
      subjectName: row[3] as string,
      unitNumber: row[4] as number,
      topic: row[5] as string,
      vivaMode: row[6] as any,
      difficulty: row[7] as any,
      totalQuestions: row[8] as number,
      completedQuestions: row[9] as number,
      averageScore: row[10] as number,
      status: row[11] as any,
      logs: JSON.parse(row[12] as string || '[]'),
      startedAt: row[13] as string,
      completedAt: row[14] as string
    }));
  }

  static async getWeakTopics(userId: string): Promise<WeakTopic[]> {
    const db = await getDb();
    const res = db.exec(`SELECT * FROM weak_topics WHERE userId = '${userId}' ORDER BY errorFrequency DESC`);
    if (res.length === 0 || !res[0] || !res[0].values) {
      return [];
    }
    return res[0].values.map(row => ({
      id: row[0] as string,
      userId: row[1] as string,
      subjectCode: row[2] as string,
      subjectName: row[3] as string,
      unitNumber: row[4] as number,
      topicName: row[5] as string,
      errorFrequency: row[6] as number,
      averageScore: row[7] as number,
      priority: row[8] as any,
      missingConcepts: JSON.parse(row[9] as string || '[]'),
      lastPracticed: row[10] as string
    }));
  }

  static async recordWeakTopic(
    userId: string,
    subjectCode: string,
    subjectName: string,
    unitNumber: number,
    topicName: string,
    score: number,
    missingConcepts: string[]
  ) {
    if (score >= 75) return; // Not a weak topic if high score
    const db = await getDb();
    const existing = db.exec(`SELECT * FROM weak_topics WHERE userId = '${userId}' AND topicName = '${topicName.replace(/'/g, "''")}'`);
    const now = new Date().toISOString();

    if (existing.length > 0 && existing[0].values.length > 0) {
      const row = existing[0].values[0];
      const freq = (row[6] as number) + 1;
      const prevAvg = row[7] as number;
      const newAvg = Math.round((prevAvg + score) / 2);
      const priority = newAvg < 50 ? 'High' : newAvg < 65 ? 'Medium' : 'Low';
      const prevMissing = JSON.parse(row[9] as string || '[]');
      const mergedMissing = Array.from(new Set([...prevMissing, ...missingConcepts]));

      db.run(`
        UPDATE weak_topics 
        SET errorFrequency = ?, averageScore = ?, priority = ?, missingConcepts = ?, lastPracticed = ?
        WHERE userId = ? AND topicName = ?
      `, [freq, newAvg, priority, JSON.stringify(mergedMissing), now, userId, topicName]);
    } else {
      const id = 'wt-' + Date.now();
      const priority = score < 50 ? 'High' : 'Medium';
      db.run(`
        INSERT INTO weak_topics (
          id, userId, subjectCode, subjectName, unitNumber, topicName, errorFrequency, averageScore, priority, missingConcepts, lastPracticed
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
      `, [id, userId, subjectCode, subjectName, unitNumber, topicName, score, priority, JSON.stringify(missingConcepts), now]);
    }
    saveDb(db);
  }

  static async getAnalytics(userId: string): Promise<AnalyticsSummary> {
    const sessions = await this.getVivaSessionsByUser(userId);
    const weakTopics = await this.getWeakTopics(userId);

    const totalSessions = sessions.length;
    let totalScore = 0;
    let maxScore = 0;
    const subjectScoresMap: Record<string, { total: number; count: number }> = {};
    const trends: { date: string; score: number; subject: string }[] = [];

    sessions.forEach(s => {
      totalScore += s.averageScore;
      if (s.averageScore > maxScore) maxScore = s.averageScore;

      if (!subjectScoresMap[s.subjectName]) {
        subjectScoresMap[s.subjectName] = { total: 0, count: 0 };
      }
      subjectScoresMap[s.subjectName].total += s.averageScore;
      subjectScoresMap[s.subjectName].count += 1;

      trends.push({
        date: new Date(s.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: Math.round(s.averageScore),
        subject: s.subjectCode
      });
    });

    const avgScore = totalSessions > 0 ? Math.round(totalScore / totalSessions) : 0;
    const aiReadiness = totalSessions > 0 ? Math.min(100, Math.round(avgScore * 0.9 + Math.min(totalSessions * 2, 10))) : 0;

    const subjectPerformance = Object.entries(subjectScoresMap).map(([subject, val]) => ({
      subject,
      score: Math.round(val.total / val.count),
      count: val.count
    }));

    return {
      totalSubjects: AKTU_SUBJECTS.length,
      totalVivaSessions: totalSessions,
      averageScore: avgScore,
      bestScore: maxScore,
      studyStreakDays: StreakService.getStreakData().currentStreak,
      aiReadinessScore: aiReadiness,
      weakestSubject: weakTopics.length > 0 ? weakTopics[0].subjectName : 'None yet',
      weakestTopic: weakTopics.length > 0 ? weakTopics[0].topicName : 'No tests taken yet',
      roadmapProgress: totalSessions > 0 ? Math.min(100, totalSessions * 10) : 0,
      scoreTrends: trends.reverse(),
      subjectPerformance
    };
  }

  static async clearVivaHistory(userId: string): Promise<boolean> {
    try {
      const db = await getDb();
      db.run(`DELETE FROM viva_sessions WHERE userId = ?`, [userId]);
      localStorage.removeItem('vivaai_sqlite_db_fallback');
      return true;
    } catch (err) {
      console.error('Error clearing viva history:', err);
      return false;
    }
  }
}
