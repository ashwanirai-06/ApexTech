/**
 * Video Helper Utilities for ApexTech Platform
 * Provides strict, verified educator video mappings for interview questions.
 * Supports exact problem matching, English & Hindi videos, and smart YouTube fallback.
 */

import { recordHistoryItem } from './historyService';

export interface EducatorVideoInfo {
  title: string;
  educatorName: string;
  platform: string;
  url?: string;
  videoId?: string;
  verified: boolean;
  language: 'English' | 'Hindi';
  topic?: string;
  questionId?: string;
  questionTitle?: string;
  searchQuery?: string;
  isFallbackSearch?: boolean;
}

export interface QuestionVideoMapping {
  questionId: string;
  questionTitle: string;
  aliases?: string[];
  english?: EducatorVideoInfo;
  hindi?: EducatorVideoInfo;
}

export const getYouTubeSearchUrl = (topic: string, subjectCode?: string): string => {
  const query = subjectCode 
    ? `${subjectCode} ${topic} full lecture tutorial`
    : `${topic} computer science engineering tutorial hindi`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

export const openTopicVideo = (topic: string, subjectCode?: string): void => {
  const url = getYouTubeSearchUrl(topic, subjectCode);
  recordHistoryItem({
    title: topic,
    category: 'Video Tutorial',
    actionType: 'video',
    englishAnswer: `Opened video search tutorial for: ${topic}`,
    hindiExplanation: `वीडियो ट्यूटोरियल खोला गया: ${topic}`
  });
  window.open(url, '_blank', 'noopener,noreferrer');
};

export function isValidEducatorVideo(video?: EducatorVideoInfo | null): boolean {
  if (!video) return false;
  if (video.isFallbackSearch) return true; // Valid search fallback object
  if (!video.verified) return false;
  if (!video.videoId || typeof video.videoId !== 'string') return false;
  if (video.videoId.trim().length < 5) return false;
  return true;
}

/**
 * Question-to-Video Mapping Database
 * Verified English & Hindi educator videos.
 */
export const QUESTION_VIDEO_MAPPING_DATABASE: Record<string, QuestionVideoMapping> = {
  'two-sum': {
    questionId: 'two-sum',
    questionTitle: 'Two Sum',
    aliases: ['2 sum', 'two sum problem', '2sum'],
    english: {
      title: 'Two Sum - LeetCode 1 - Python Hash Map Solution',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
      videoId: 'KLlXCFG5TnA',
      verified: true,
      language: 'English',
      topic: 'Arrays & Hashing'
    },
    hindi: {
      title: 'Two Sum Problem | Optimal Hash Map Approach in C++ & Java',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=UXDSeD9mN-k',
      videoId: 'UXDSeD9mN-k',
      verified: true,
      language: 'Hindi',
      topic: 'Arrays & Hashing'
    }
  },
  '3sum': {
    questionId: '3sum',
    questionTitle: '3Sum',
    aliases: ['three sum', '3 sum', 'triplets with zero sum'],
    english: {
      title: '3Sum - LeetCode 15 - Python Two Pointers Approach',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=jzZsG8n2R9A',
      videoId: 'jzZsG8n2R9A',
      verified: true,
      language: 'English',
      topic: 'Two Pointers'
    },
    hindi: {
      title: '3 Sum Problem | Find Triplets with Zero Sum',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=onLoX6Nhvmg',
      videoId: 'onLoX6Nhvmg',
      verified: true,
      language: 'Hindi',
      topic: 'Two Pointers'
    }
  },
  'best-time-to-buy-and-sell-stock': {
    questionId: 'best-time-to-buy-and-sell-stock',
    questionTitle: 'Best Time to Buy and Sell Stock',
    aliases: ['buy and sell stock 1', 'stock buy sell'],
    english: {
      title: 'Best Time to Buy and Sell Stock - LeetCode 121',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=1pkOgXD63yU',
      videoId: '1pkOgXD63yU',
      verified: true,
      language: 'English',
      topic: 'Arrays'
    },
    hindi: {
      title: 'Stock Buy and Sell - Best Time to Buy and Sell Stock',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=eMSfBgbiEjk',
      videoId: 'eMSfBgbiEjk',
      verified: true,
      language: 'Hindi',
      topic: 'Arrays'
    }
  },
  'binary-search': {
    questionId: 'binary-search',
    questionTitle: 'Binary Search',
    aliases: ['binary search masterclass', 'bs algorithm'],
    english: {
      title: 'Binary Search - LeetCode 704',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=s4DPM8ct1pI',
      videoId: 's4DPM8ct1pI',
      verified: true,
      language: 'English',
      topic: 'Binary Search'
    },
    hindi: {
      title: 'Binary Search Complete Explanation & Code',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=MHf6awe89xw',
      videoId: 'MHf6awe89xw',
      verified: true,
      language: 'Hindi',
      topic: 'Binary Search'
    }
  },
  'search-in-rotated-sorted-array': {
    questionId: 'search-in-rotated-sorted-array',
    questionTitle: 'Search in Rotated Sorted Array',
    aliases: ['rotated sorted array search'],
    english: {
      title: 'Search in Rotated Sorted Array - LeetCode 33',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=U8XENwh8Oy8',
      videoId: 'U8XENwh8Oy8',
      verified: true,
      language: 'English',
      topic: 'Binary Search'
    },
    hindi: {
      title: 'Search Element in Rotated Sorted Array',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=r3pUJ8U_ac8',
      videoId: 'r3pUJ8U_ac8',
      verified: true,
      language: 'Hindi',
      topic: 'Binary Search'
    }
  },
  'reverse-linked-list': {
    questionId: 'reverse-linked-list',
    questionTitle: 'Reverse Linked List',
    aliases: ['reverse a linked list', 'reverse list'],
    english: {
      title: 'Reverse Linked List - LeetCode 206',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
      videoId: 'G0_I-ZF0S38',
      verified: true,
      language: 'English',
      topic: 'Linked List'
    },
    hindi: {
      title: 'Reverse a Linked List (Iterative & Recursive)',
      educatorName: 'Love Babbar',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=Hj_RA9p5c08',
      videoId: 'Hj_RA9p5c08',
      verified: true,
      language: 'Hindi',
      topic: 'Linked List'
    }
  },
  'linked-list-cycle': {
    questionId: 'linked-list-cycle',
    questionTitle: 'Linked List Cycle',
    aliases: ['detect cycle in linked list', 'floyd cycle detection'],
    english: {
      title: 'Linked List Cycle - LeetCode 141 - Floyd Fast & Slow Pointer',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=gBTe7lFR3vc',
      videoId: 'gBTe7lFR3vc',
      verified: true,
      language: 'English',
      topic: 'Linked List'
    },
    hindi: {
      title: 'Detect Cycle in Linked List (Tortoise & Hare Algorithm)',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=wiOo4DC5GGA',
      videoId: 'wiOo4DC5GGA',
      verified: true,
      language: 'Hindi',
      topic: 'Linked List'
    }
  },
  'valid-anagram': {
    questionId: 'valid-anagram',
    questionTitle: 'Valid Anagram',
    aliases: ['check anagrams', 'anagram strings'],
    english: {
      title: 'Valid Anagram - LeetCode 242',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=9UtInBqnCgA',
      videoId: '9UtInBqnCgA',
      verified: true,
      language: 'English',
      topic: 'Strings & Hashing'
    },
    hindi: {
      title: 'Check for Valid Anagrams - C++ & Java Solution',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=3MnyUtD3Ase',
      videoId: '3MnyUtD3Ase',
      verified: true,
      language: 'Hindi',
      topic: 'Strings'
    }
  },
  'longest-substring-without-repeating-characters': {
    questionId: 'longest-substring-without-repeating-characters',
    questionTitle: 'Longest Substring Without Repeating Characters',
    aliases: ['longest non repeating substring', 'sliding window substring'],
    english: {
      title: 'Longest Substring Without Repeating Characters - LeetCode 3',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=wiGpQwVHdE0',
      videoId: 'wiGpQwVHdE0',
      verified: true,
      language: 'English',
      topic: 'Sliding Window'
    },
    hindi: {
      title: 'Longest Substring Without Repeating Characters (Sliding Window)',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=qtVh-XEilTg',
      videoId: 'qtVh-XEilTg',
      verified: true,
      language: 'Hindi',
      topic: 'Sliding Window'
    }
  },
  'container-with-most-water': {
    questionId: 'container-with-most-water',
    questionTitle: 'Container With Most Water',
    aliases: ['most water container', 'two pointers water'],
    english: {
      title: 'Container With Most Water - LeetCode 11',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=UuiTKBwPgAo',
      videoId: 'UuiTKBwPgAo',
      verified: true,
      language: 'English',
      topic: 'Two Pointers'
    },
    hindi: {
      title: 'Container With Most Water Solution',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=ZHQg1eSp3xM',
      videoId: 'ZHQg1eSp3xM',
      verified: true,
      language: 'Hindi',
      topic: 'Two Pointers'
    }
  },
  'trapping-rain-water': {
    questionId: 'trapping-rain-water',
    questionTitle: 'Trapping Rain Water',
    aliases: ['rain water trapping', 'trap rain water'],
    english: {
      title: 'Trapping Rain Water - LeetCode 42',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA',
      videoId: 'ZI2z5pq0TqA',
      verified: true,
      language: 'English',
      topic: 'Two Pointers'
    },
    hindi: {
      title: 'Trapping Rainwater Problem - Optimal Solution',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=m18Hntz4go8',
      videoId: 'm18Hntz4go8',
      verified: true,
      language: 'Hindi',
      topic: 'Two Pointers'
    }
  },
  'maximum-subarray': {
    questionId: 'maximum-subarray',
    questionTitle: 'Maximum Subarray (Kadanes Algorithm)',
    aliases: ['kadanes algorithm', 'max subarray sum'],
    english: {
      title: 'Maximum Subarray - LeetCode 53',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
      videoId: '5WZl3MMT0Eg',
      verified: true,
      language: 'English',
      topic: 'Dynamic Programming'
    },
    hindi: {
      title: 'Kadanes Algorithm - Maximum Subarray Sum',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=AHZpyENo7k4',
      videoId: 'AHZpyENo7k4',
      verified: true,
      language: 'Hindi',
      topic: 'Arrays'
    }
  },
  'coin-change': {
    questionId: 'coin-change',
    questionTitle: 'Coin Change',
    aliases: ['minimum coins dp', 'coin change 1'],
    english: {
      title: 'Coin Change - LeetCode 322',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=H9bfqozjoqs',
      videoId: 'H9bfqozjoqs',
      verified: true,
      language: 'English',
      topic: 'Dynamic Programming'
    },
    hindi: {
      title: 'Coin Change 1 - Minimum Coins to Make Target',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=myPeWb3Y68A',
      videoId: 'myPeWb3Y68A',
      verified: true,
      language: 'Hindi',
      topic: 'Dynamic Programming'
    }
  },
  'number-of-islands': {
    questionId: 'number-of-islands',
    questionTitle: 'Number of Islands',
    aliases: ['count islands bfs dfs'],
    english: {
      title: 'Number of Islands - LeetCode 200',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
      videoId: 'pV2kpPD66nE',
      verified: true,
      language: 'English',
      topic: 'Graphs'
    },
    hindi: {
      title: 'Number of Islands - Graph BFS & DFS Traversal',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=muncqlKJ86Q',
      videoId: 'muncqlKJ86Q',
      verified: true,
      language: 'Hindi',
      topic: 'Graphs'
    }
  },
  'lru-cache': {
    questionId: 'lru-cache',
    questionTitle: 'LRU Cache',
    aliases: ['least recently used cache'],
    english: {
      title: 'LRU Cache - LeetCode 146',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=7ABLItLLEVs',
      videoId: '7ABLItLLEVs',
      verified: true,
      language: 'English',
      topic: 'Design & Linked List'
    },
    hindi: {
      title: 'LRU Cache Implementation in C++ & Java',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=xDEuM5qa0zg',
      videoId: 'xDEuM5qa0zg',
      verified: true,
      language: 'Hindi',
      topic: 'Design'
    }
  },
  'climbing-stairs': {
    questionId: 'climbing-stairs',
    questionTitle: 'Climbing Stairs',
    aliases: ['climb stairs dp'],
    english: {
      title: 'Climbing Stairs - LeetCode 70',
      educatorName: 'NeetCode',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
      videoId: 'Y0lT9Fck7qI',
      verified: true,
      language: 'English',
      topic: 'Dynamic Programming'
    },
    hindi: {
      title: 'Climbing Stairs Problem - DP Memoization & Tabulation',
      educatorName: 'takeUforward (Striver)',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=mLfjzJsN8us',
      videoId: 'mLfjzJsN8us',
      verified: true,
      language: 'Hindi',
      topic: 'Dynamic Programming'
    }
  },
  'system-rate-limiter': {
    questionId: 'system-rate-limiter',
    questionTitle: 'Design an API Rate Limiter',
    aliases: ['rate limiter', 'token bucket system design'],
    english: {
      title: 'API Rate Limiter System Design (Token Bucket)',
      educatorName: 'ByteByteGo',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=FU4WlwfS3G0',
      videoId: 'FU4WlwfS3G0',
      verified: true,
      language: 'English',
      topic: 'System Design'
    },
    hindi: {
      title: 'API Rate Limiter Architecture Masterclass',
      educatorName: 'Gaurav Sen',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=CRGPbCbRpqU',
      videoId: 'CRGPbCbRpqU',
      verified: true,
      language: 'Hindi',
      topic: 'System Design'
    }
  }
};

function normalizeString(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Creates a smart fallback search info for any question when direct video ID is missing.
 */
export function getFallbackSearchForQuestion(
  qTitle: string,
  language: 'English' | 'Hindi' = 'English'
): EducatorVideoInfo {
  const educator = language === 'Hindi' ? 'Striver' : 'NeetCode';
  const query = `${qTitle} ${educator} ${language} solution`;
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  return {
    title: `${qTitle} (${language} Educator Explanation)`,
    educatorName: educator,
    platform: 'YouTube',
    url,
    verified: false,
    language,
    questionTitle: qTitle,
    searchQuery: query,
    isFallbackSearch: true
  };
}

/**
 * Returns exact educator video for a question matching language preferences.
 * Returns NULL if no exact video exists for that specific question.
 */
export function getExactEducatorVideoForQuestion(
  questionInput?: any,
  language: 'English' | 'Hindi' = 'English'
): EducatorVideoInfo | null {
  if (!questionInput) return null;

  let qId = '';
  let qTitle = '';

  if (typeof questionInput === 'string') {
    qTitle = questionInput;
  } else if (typeof questionInput === 'object') {
    if (questionInput.educatorVideo && isValidEducatorVideo(questionInput.educatorVideo)) {
      if (!language || questionInput.educatorVideo.language === language) {
        return questionInput.educatorVideo;
      }
    }
    qId = questionInput.id || questionInput.questionId || '';
    qTitle = questionInput.title || questionInput.topicName || '';
  }

  const normId = normalizeString(qId);
  const normTitle = normalizeString(qTitle);

  if (!normTitle && !normId) return null;

  // Search exact question video database
  for (const key of Object.keys(QUESTION_VIDEO_MAPPING_DATABASE)) {
    const entry = QUESTION_VIDEO_MAPPING_DATABASE[key];
    const keyNorm = normalizeString(key);
    const entryTitleNorm = normalizeString(entry.questionTitle);

    const aliasesNorm = (entry.aliases || []).map(normalizeString);

    const isMatch =
      (normId && normId === keyNorm) ||
      (normTitle && normTitle === keyNorm) ||
      (normTitle && normTitle === entryTitleNorm) ||
      aliasesNorm.some(alias => alias === normTitle) ||
      (normTitle.length > 5 && keyNorm.length > 5 && normTitle.includes(keyNorm));

    if (isMatch) {
      if (language === 'Hindi' && entry.hindi) return entry.hindi;
      if (language === 'English' && entry.english) return entry.english;
      return entry.english || entry.hindi || null;
    }
  }

  return null;
}

/**
 * Guaranteed solution fetcher: checks exact mapped video FIRST, then generates fallback search.
 */
export function getVideoSolutionForQuestion(
  questionInput?: any,
  language: 'English' | 'Hindi' = 'English'
): EducatorVideoInfo {
  const exact = getExactEducatorVideoForQuestion(questionInput, language);
  if (exact) return exact;

  let title = 'Coding Problem';
  if (typeof questionInput === 'string') {
    title = questionInput;
  } else if (questionInput?.title) {
    title = questionInput.title;
  } else if (questionInput?.topicName) {
    title = questionInput.topicName;
  }

  return getFallbackSearchForQuestion(title, language);
}

/**
 * Backward compatibility wrapper.
 */
export const getVerifiedVideoForQuestion = (
  questionInput?: any,
  language: 'English' | 'Hindi' = 'English'
): EducatorVideoInfo | null => {
  return getExactEducatorVideoForQuestion(questionInput, language);
};

export interface TopicVideoInfo {
  id: string;
  title: string;
  subjectOrCategory: string;
  educator: string;
  duration: string;
  query: string;
  youtubeId?: string;
  description: string;
  tags: string[];
}

export const FEATURED_TOPIC_VIDEOS: TopicVideoInfo[] = [
  {
    id: 'tv-1',
    title: 'Arrays & Two Pointers: Two Sum & 3Sum Optimal Masterclass',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '28 mins',
    youtubeId: 'UXDSeD9mN-k',
    query: 'Striver 3Sum Two Sum takeuforward',
    description: 'Master two pointers, sorting, and hash map optimal approach for 2Sum and 3Sum problems in C++, Python and Java.',
    tags: ['Arrays', 'Two Pointers', 'Striver Sheet']
  },
  {
    id: 'tv-2',
    title: 'Binary Search Complete Masterclass: Search Space Reduction',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '1 hr 15 mins',
    youtubeId: 'W9QJ8HaZnac',
    query: 'Striver Binary Search complete playlist',
    description: 'Deep dive into lower bound, upper bound, rotated arrays, and allocation problems.',
    tags: ['Binary Search', 'Algorithms']
  },
  {
    id: 'tv-3',
    title: 'System Design: API Rate Limiter (Token Bucket Algorithm)',
    subjectOrCategory: 'System Design',
    educator: 'ByteByteGo',
    duration: '14 mins',
    youtubeId: 'FU4WlwfS3G0',
    query: 'ByteByteGo Rate Limiter system design',
    description: 'Learn how tech giants protect microservices using token bucket and sliding window counter algorithms.',
    tags: ['System Design', 'Rate Limiter', 'ByteByteGo']
  },
  {
    id: 'tv-4',
    title: 'SQL Database Masterclass: Joins, Group By & Subqueries',
    subjectOrCategory: 'Gate Smashers',
    educator: 'Gate Smashers',
    duration: '42 mins',
    youtubeId: '542M1_S8Cqg',
    query: 'Gate Smashers SQL Joins subqueries tutorial',
    description: 'Complete walkthrough of SQL query execution order, complex inner/outer joins, and window functions.',
    tags: ['SQL', 'DBMS', 'Gate Smashers']
  }
];
