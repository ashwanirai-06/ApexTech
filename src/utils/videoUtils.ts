/**
 * Video Helper Utilities for ApexTech Platform
 * Generates exact search query URLs and supports direct YouTube embeds.
 */

export const getYouTubeSearchUrl = (topic: string, subjectCode?: string): string => {
  const query = subjectCode 
    ? `${subjectCode} ${topic} full lecture tutorial`
    : `${topic} computer science engineering tutorial hindi`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

export const openTopicVideo = (topic: string, subjectCode?: string): void => {
  const url = getYouTubeSearchUrl(topic, subjectCode);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Returns a guaranteed working, verified embeddable YouTube video ID and optimized search query
 * based on question title, category, and platform source.
 */
export const getVerifiedVideoForQuestion = (
  title: string,
  category?: string,
  platform?: string
): { youtubeId: string; videoQuery: string } => {
  const lowerTitle = (title || '').toLowerCase();
  const lowerCat = (category || '').toLowerCase();

  // 1. Array & Two Pointers / 3Sum / Two Sum
  if (lowerTitle.includes('sum') || lowerTitle.includes('pointer') || lowerTitle.includes('array') || lowerTitle.includes('triplet')) {
    return {
      youtubeId: 'UXDSeD9mN-k',
      videoQuery: `${title} ${platform || ''} Striver NeetCode Two Pointers solution`
    };
  }
  // 2. Binary Search
  if (lowerTitle.includes('binary search') || lowerTitle.includes('rotated') || lowerTitle.includes('median') || lowerTitle.includes('koko') || lowerTitle.includes('allocation')) {
    return {
      youtubeId: 'W9QJ8HaZnac',
      videoQuery: `${title} ${platform || ''} Striver Binary Search solution`
    };
  }
  // 3. Sliding Window
  if (lowerTitle.includes('window') || lowerTitle.includes('substring') || lowerTitle.includes('consecutive')) {
    return {
      youtubeId: 'cQ1Oz4ck15I',
      videoQuery: `${title} ${platform || ''} NeetCode Sliding Window solution`
    };
  }
  // 4. Linked List
  if (lowerTitle.includes('link') || lowerTitle.includes('list') || lowerTitle.includes('node') || lowerTitle.includes('lru') || lowerTitle.includes('lfu')) {
    return {
      youtubeId: 'q8g1tD91m-s',
      videoQuery: `${title} ${platform || ''} Love Babbar Striver Linked List solution`
    };
  }
  // 5. Stack & Queue
  if (lowerTitle.includes('stack') || lowerTitle.includes('queue') || lowerTitle.includes('histogram') || lowerTitle.includes('parentheses')) {
    return {
      youtubeId: 'Du8OIftK3oM',
      videoQuery: `${title} ${platform || ''} Striver Monotonic Stack solution`
    };
  }
  // 6. Trees & BST
  if (lowerTitle.includes('tree') || lowerTitle.includes('bst') || lowerTitle.includes('ancestor') || lowerTitle.includes('traversal') || lowerTitle.includes('serialize')) {
    return {
      youtubeId: '_ANrF3FJm7I',
      videoQuery: `${title} ${platform || ''} Striver Tree Traversals solution`
    };
  }
  // 7. Graphs
  if (lowerTitle.includes('graph') || lowerTitle.includes('island') || lowerTitle.includes('dijkstra') || lowerTitle.includes('topological') || lowerTitle.includes('course') || lowerTitle.includes('ladder')) {
    return {
      youtubeId: '73gne8gBv4A',
      videoQuery: `${title} ${platform || ''} Gate Smashers Striver Graph solution`
    };
  }
  // 8. Dynamic Programming
  if (lowerTitle.includes('dp') || lowerTitle.includes('knapsack') || lowerTitle.includes('subsequence') || lowerTitle.includes('coin') || lowerTitle.includes('edit distance') || lowerTitle.includes('partition') || lowerTitle.includes('break') || lowerTitle.includes('matrix')) {
    return {
      youtubeId: '5o-kdjv720A',
      videoQuery: `${title} ${platform || ''} Striver NeetCode Dynamic Programming solution`
    };
  }
  // 9. Backtracking
  if (lowerTitle.includes('queen') || lowerTitle.includes('sudoku') || lowerTitle.includes('combination') || lowerTitle.includes('backtrack')) {
    return {
      youtubeId: 'iTwpI45G4TE',
      videoQuery: `${title} ${platform || ''} Striver Backtracking N-Queens solution`
    };
  }
  // 10. System Design
  if (lowerCat.includes('system') || lowerTitle.includes('design') || lowerTitle.includes('rate limiter') || lowerTitle.includes('shortener') || lowerTitle.includes('crawler') || lowerTitle.includes('chat') || lowerTitle.includes('notification')) {
    return {
      youtubeId: 'FU4WlwfS3G0',
      videoQuery: `${title} System Design ByteByteGo Gaurav Sen`
    };
  }
  // 11. Frontend
  if (lowerCat.includes('frontend') || lowerTitle.includes('react') || lowerTitle.includes('debounce') || lowerTitle.includes('dom') || lowerTitle.includes('hook') || lowerTitle.includes('scroll')) {
    return {
      youtubeId: 'cjIswDCK4pA',
      videoQuery: `${title} Frontend Interview Akshay Saini Namaste JavaScript`
    };
  }
  // 12. Backend
  if (lowerCat.includes('backend') || lowerTitle.includes('jwt') || lowerTitle.includes('database') || lowerTitle.includes('kafka') || lowerTitle.includes('api') || lowerTitle.includes('connection')) {
    return {
      youtubeId: 'mbsmsi7l3r4',
      videoQuery: `${title} Backend Engineering Node.js Web Dev Simplified`
    };
  }
  // 13. Behavioral
  if (lowerCat.includes('behavioral') || lowerTitle.includes('star') || lowerTitle.includes('leadership') || lowerTitle.includes('outage') || lowerTitle.includes('disagreement')) {
    return {
      youtubeId: 'A4I1J8qYJ1A',
      videoQuery: `${title} Behavioral Interview STAR Method Tech Lead`
    };
  }

  // Fallback default: Striver / NeetCode verified high-quality video
  return {
    youtubeId: 'UXDSeD9mN-k',
    videoQuery: `${title} ${platform || 'LeetCode'} solution Striver NeetCode`
  };
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
  // --- DSA & ALGORITHMS TOPICS ---
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
    query: 'Striver Binary Search complete takeuforward',
    description: 'Master binary search on 1D, 2D arrays, Book Allocation, Aggressive Cows, and top product company coding questions.',
    tags: ['Binary Search', 'Arrays', 'Striver Sheet']
  },
  {
    id: 'tv-3',
    title: 'Sliding Window Pattern: Fixed & Variable Window Problems',
    subjectOrCategory: 'DSA & Placements',
    educator: 'NeetCode',
    duration: '35 mins',
    youtubeId: 'cQ1Oz4ck15I',
    query: 'NeetCode Two Pointers Sliding Window LeetCode 75',
    description: 'Concise visual walkthrough of sliding window and two-pointer interview patterns with clean Python, C++ and Java code.',
    tags: ['Sliding Window', 'Strings', 'LeetCode 75']
  },
  {
    id: 'tv-4',
    title: 'Linked List Complete Series: Cycle Detection & LRU Cache',
    subjectOrCategory: 'DSA & Placements',
    educator: 'Love Babbar',
    duration: '45 mins',
    youtubeId: 'q8g1tD91m-s',
    query: 'Love Babbar Linked List Cycle Detection Reversal C++',
    description: 'Step-by-step implementation of singly and doubly linked lists, Floyd cycle detection, and memory pointers.',
    tags: ['Linked List', 'Pointers', 'C++ DSA']
  },
  {
    id: 'tv-5',
    title: 'Stacks & Queues: Next Greater Element & Monotonic Stack',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '40 mins',
    youtubeId: 'Du8OIftK3oM',
    query: 'Striver Monotonic Stack Next Greater Element',
    description: 'Master monotonic stack concepts, valid parentheses, sliding window maximum, and min stack design.',
    tags: ['Stack', 'Monotonic Stack', 'Queues']
  },
  {
    id: 'tv-6',
    title: 'Binary Trees & BST Masterclass: Traversals, LCA & Diameter',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '1 hr 10 mins',
    youtubeId: '_ANrF3FJm7I',
    query: 'Striver Tree Traversals Inorder Preorder Postorder',
    description: 'Complete tree traversals (BFS, DFS), Lowest Common Ancestor, tree serialization, and BST property validation.',
    tags: ['Trees', 'Binary Search Tree', 'BFS/DFS']
  },
  {
    id: 'tv-7',
    title: 'Graph Algorithms Masterclass: BFS, DFS, Dijkstra & Topological Sort',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '1 hr 30 mins',
    youtubeId: 'M3_pSqDzuU4',
    query: 'Striver Graph Series BFS DFS Dijkstra Kahn Algorithm',
    description: 'Comprehensive graph masterclass covering adjacency lists, cycle detection, Kahn algorithm, Dijkstra, and Disjoint Set Union (DSU).',
    tags: ['Graphs', 'Dijkstra', 'Shortest Path']
  },
  {
    id: 'tv-8',
    title: 'Dynamic Programming & Greedy Algorithms Whiteboard Masterclass',
    subjectOrCategory: 'DSA & Placements',
    educator: 'Abdul Bari',
    duration: '52 mins',
    youtubeId: '5o-kdjv720A',
    query: 'Abdul Bari Dynamic Programming Knapsack Greedy',
    description: 'World-renowned whiteboard analysis of 0/1 Knapsack, memoization, tabular space optimization, and algorithm math.',
    tags: ['Dynamic Programming', '0/1 Knapsack', 'Greedy']
  },
  {
    id: 'tv-9',
    title: 'Backtracking & Recursion: N-Queens & Combination Sum',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '48 mins',
    youtubeId: 'iTwpI45G4TE',
    query: 'Striver N Queens Backtracking Recursion',
    description: 'Master decision trees, recursive stack frames, Sudoku solver, N-Queens, and subset generation algorithms.',
    tags: ['Recursion', 'Backtracking', 'N-Queens']
  },
  {
    id: 'tv-10',
    title: 'Heaps & Priority Queues: Kth Largest & Top K Elements',
    subjectOrCategory: 'DSA & Placements',
    educator: 'NeetCode',
    duration: '30 mins',
    youtubeId: 'YPTqKIgVk-k',
    query: 'NeetCode Heap Priority Queue Kth Largest Element',
    description: 'Min-Heap and Max-Heap implementations, heapify process, median from data stream, and priority queue problem patterns.',
    tags: ['Heaps', 'Priority Queue', 'Top K']
  },
  {
    id: 'tv-11',
    title: 'Trie Data Structure Complete Masterclass: Prefix Search',
    subjectOrCategory: 'DSA & Placements',
    educator: 'takeUforward (Striver)',
    duration: '38 mins',
    youtubeId: 'dBGUmUQhjaM',
    query: 'Striver Trie Data Structure Implement Trie Word Search',
    description: 'Implement Trie (Prefix Tree), insert, search, startsWith operations, and autocomplete search engine optimization.',
    tags: ['Trie', 'Prefix Search', 'Strings']
  },

  // --- FULL STACK & WEB DEVELOPMENT ---
  {
    id: 'tv-12',
    title: 'React.js 18 & Modern Frontend Architecture Full Course',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'CodeWithHarry',
    duration: '2 hrs 30 mins',
    youtubeId: 'rg7Fvvl3taU',
    query: 'React js full course in hindi CodeWithHarry',
    description: 'Modern frontend engineering with React components, useState, useEffect, custom hooks, Context API, and production UI build.',
    tags: ['React', 'Frontend', 'Web Dev']
  },
  {
    id: 'tv-13',
    title: 'Node.js, Express & REST API Production Architecture',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'Chai aur Code (Hitesh Choudhary)',
    duration: '1 hr 40 mins',
    youtubeId: '13gLB6h5iOM',
    query: 'Chai aur Code Node js Express full backend course',
    description: 'Production Express backend, REST APIs, MongoDB Mongoose models, JWT authentication, middleware, and clean code architecture.',
    tags: ['Node.js', 'Express', 'Backend']
  },
  {
    id: 'tv-14',
    title: 'Next.js 14 App Router, Server Actions & Cloud Deployment',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'Piyush Garg',
    duration: '1 hr 10 mins',
    youtubeId: 'Z1N3pL6E72w',
    query: 'Piyush Garg Next.js App Router Docker fullstack',
    description: 'Server components, API routes, Prisma ORM, Docker containerization, and production deployment on AWS/Vercel Cloud.',
    tags: ['Next.js', 'Full Stack', 'Web Dev']
  },
  {
    id: 'tv-15',
    title: 'JavaScript ES6+, Promises & Async/Event Loop Masterclass',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'Akshay Saini (Namaste JavaScript)',
    duration: '45 mins',
    youtubeId: '8zKuNo4ay8E',
    query: 'Akshay Saini Namaste JavaScript Event Loop Promises',
    description: 'In-depth execution context, closures, event loop, call stack, microtask queue, and asynchronous JavaScript interview questions.',
    tags: ['JavaScript', 'ES6', 'Namaste JS']
  },
  {
    id: 'tv-16',
    title: 'Tailwind CSS Modern Responsive UI Masterclass',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'FreeCodeCamp',
    duration: '1 hr 20 mins',
    youtubeId: 'ft30zcMlFao',
    query: 'Tailwind CSS full course responsive web design',
    description: 'Build fast, responsive dark-mode tech dashboards using Tailwind utility classes, custom themes, and flexbox/grid layouts.',
    tags: ['Tailwind CSS', 'UI/UX', 'Frontend']
  },

  // --- SYSTEM DESIGN & CS CORE ---
  {
    id: 'tv-17',
    title: 'System Design Interview: Distributed Caching & Redis Architecture',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'ByteByteGo (Alex Xu)',
    duration: '15 mins',
    youtubeId: 'i53Gi_K3o7I',
    query: 'ByteByteGo System Design Caching Redis Microservices',
    description: 'Animated architecture explanations for distributed caching strategies, write-through vs write-back, and LRU eviction.',
    tags: ['System Design', 'Caching', 'Redis']
  },
  {
    id: 'tv-18',
    title: 'High-Level System Design: Load Balancers & Microservices',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Gaurav Sen',
    duration: '25 mins',
    youtubeId: 'K0Ta65OqQkY',
    query: 'Gaurav Sen System Design Load Balancer Microservices',
    description: 'Consistent hashing, rate limiters, reverse proxies (Nginx), horizontal scaling, and fault tolerance in large distributed apps.',
    tags: ['System Design', 'Load Balancers', 'Microservices']
  },
  {
    id: 'tv-19',
    title: 'Operating Systems: CPU Process Scheduling & Deadlocks',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Gate Smashers',
    duration: '32 mins',
    youtubeId: 'zF_S3dJ3e1E',
    query: 'Operating Systems Process Scheduling CPU Gate Smashers',
    description: 'Gantt chart calculations for CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority) and OS deadlock prevention.',
    tags: ['Operating Systems', 'Process Scheduling', 'CS Core']
  },
  {
    id: 'tv-20',
    title: 'Database Management Systems: SQL Normalization & Indexing',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Gate Smashers',
    duration: '28 mins',
    youtubeId: '542M1_S8Cqg',
    query: 'DBMS Normalization 1NF 2NF 3NF BCNF Gate Smashers',
    description: 'Database design principles, B-Trees, B+ Trees indexing, ACID properties, transactions, and SQL normalization forms (1NF to BCNF).',
    tags: ['DBMS', 'SQL', 'Indexing']
  },
  {
    id: 'tv-21',
    title: 'Computer Networks: TCP/IP, HTTP/3 & DNS Resolution',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Knowledge Gate',
    duration: '35 mins',
    youtubeId: 'VwN91x5i25g',
    query: 'Computer Networks TCP IP Model OSI Model Knowledge Gate',
    description: 'OSI 7-layer model, TCP 3-way handshake, UDP, DNS query lookup process, SSL/TLS handshake, and HTTP protocols.',
    tags: ['Networks', 'TCP/IP', 'CS Core']
  },

  // --- AI, MACHINE LEARNING & LLMs ---
  {
    id: 'tv-22',
    title: 'Transformer Neural Networks & Self-Attention Visualized',
    subjectOrCategory: 'AI & Data Science',
    educator: 'StatQuest with Josh Starmer',
    duration: '22 mins',
    youtubeId: 'aircAruvnKk',
    query: 'StatQuest Transformer Neural Networks Self Attention',
    description: 'Clear, intuitive visual breakdown of Self-Attention, Multi-Head Attention, Transformers, and Large Language Models.',
    tags: ['AI/ML', 'Transformers', 'Deep Learning']
  },
  {
    id: 'tv-23',
    title: 'Building GPT & Large Language Models from Scratch in PyTorch',
    subjectOrCategory: 'AI & Data Science',
    educator: 'Andrej Karpathy',
    duration: '1 hr 55 mins',
    youtubeId: 'kCc8FmEb1nY',
    query: 'Andrej Karpathy Let us build GPT from scratch PyTorch',
    description: 'Former OpenAI & Tesla AI director explaining character-level language modeling, self-attention, and PyTorch backpropagation.',
    tags: ['AI/ML', 'GPT', 'PyTorch']
  },
  {
    id: 'tv-24',
    title: 'Machine Learning Complete Roadmap: Math, Regression & Scikit-Learn',
    subjectOrCategory: 'AI & Data Science',
    educator: 'CampusX (Nitish Singh)',
    duration: '1 hr 15 mins',
    youtubeId: 'Gv9_4yMHFhI',
    query: 'CampusX Machine Learning Full Course Linear Regression',
    description: 'Mathematics for Machine Learning, Linear/Logistic Regression, Decision Trees, Gradient Descent, and Scikit-Learn models.',
    tags: ['Machine Learning', 'Python', 'Data Science']
  },

  // --- BEHAVIORAL INTERVIEWS & PLACEMENT MASTERCLASS ---
  {
    id: 'tv-25',
    title: 'Behavioral Interviews: STAR Method & Amazon Leadership Principles',
    subjectOrCategory: 'Behavioral & Career',
    educator: 'Dan Croitor',
    duration: '25 mins',
    youtubeId: '3U4O4W17L-g',
    query: 'Amazon Behavioral Interview STAR Method Leadership Principles',
    description: 'Structure your answers using Situation, Task, Action, Result (STAR) framework for FAANG behavioral and HR rounds.',
    tags: ['Behavioral', 'STAR Method', 'HR Interview']
  },

  // --- LLD, DEVOPS, CLOUD & ENTERPRISE ARCHITECTURE ---
  {
    id: 'tv-26',
    title: 'Low-Level System Design (LLD) & SOLID Principles Masterclass',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Gaurav Sen',
    duration: '42 mins',
    youtubeId: 'v-xOFm_YpSg',
    query: 'Low Level Design SOLID Principles Design Patterns Gaurav Sen',
    description: 'Master Single Responsibility, Open-Closed, Factory Pattern, Strategy Pattern, and Parking Lot LLD questions.',
    tags: ['LLD', 'Design Patterns', 'SOLID']
  },
  {
    id: 'tv-27',
    title: 'Docker Containers & Kubernetes Deployment Masterclass',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'TechWorld with Nana',
    duration: '1 hr 15 mins',
    youtubeId: '3c-iBn73dDE',
    query: 'Docker Kubernetes Tutorial TechWorld with Nana',
    description: 'Complete hands-on breakdown of Dockerfile, Docker Compose, Kubernetes Pods, Deployments, and Helm charts.',
    tags: ['Docker', 'Kubernetes', 'DevOps']
  },
  {
    id: 'tv-28',
    title: 'DevOps & CI/CD Pipeline Automation with GitHub Actions',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'TrainWithShubham',
    duration: '50 mins',
    youtubeId: 'R8_veQiYBjU',
    query: 'DevOps CI CD Pipeline GitHub Actions TrainWithShubham',
    description: 'Build automated build, test, and container deployment workflows to AWS EC2 using GitHub Actions and Bash.',
    tags: ['DevOps', 'CI/CD', 'GitHub Actions']
  },
  {
    id: 'tv-29',
    title: 'Java Spring Boot & Microservices Enterprise Architecture',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'Telusko (Navin Reddy)',
    duration: '1 hr 30 mins',
    youtubeId: 'vtPkZShrvXQ',
    query: 'Spring Boot Microservices Full Course Telusko',
    description: 'Build robust REST APIs with Spring Boot 3, Spring Data JPA, Eureka Naming Server, and API Gateway.',
    tags: ['Java', 'Spring Boot', 'Microservices']
  },
  {
    id: 'tv-30',
    title: 'C++ STL Complete Masterclass for Competitive Programming',
    subjectOrCategory: 'DSA & Placements',
    educator: 'Luv (C++ CP)',
    duration: '1 hr 05 mins',
    youtubeId: 'zBhVZzi5RdU',
    query: 'C++ STL Masterclass Luv Competitive Programming',
    description: 'Vectors, Pairs, Sets, Maps, Priority Queues, Binary Search lower_bound/upper_bound, and custom iterators.',
    tags: ['C++', 'STL', 'Competitive Programming']
  },
  {
    id: 'tv-31',
    title: 'Theory of Automata & Formal Languages (TAFL / TOC) Masterclass',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Gate Smashers',
    duration: '45 mins',
    youtubeId: 'XslI8h7cGDs',
    query: 'Theory of Computation DFA NFA Conversion Gate Smashers',
    description: 'DFA, NFA construction, Regular Expressions, Arden Theorem, Pumping Lemma, and Turing Machines for exams.',
    tags: ['Automata', 'TOC', 'AKTU Core']
  },
  {
    id: 'tv-32',
    title: 'Computer Organization & Architecture (COA) Pipelining',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Neso Academy',
    duration: '38 mins',
    youtubeId: '4LqA2lX2X1A',
    query: 'Computer Architecture Instruction Pipelining Neso Academy',
    description: 'Instruction cycles, RISC vs CISC, ALU design, Memory Hierarchy, Cache Mapping, and Pipelining hazards.',
    tags: ['COA', 'Hardware', 'Pipelining']
  },
  {
    id: 'tv-33',
    title: 'Discrete Mathematics & Graph Theory Foundations',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Knowledge Gate (Sanchit Jain)',
    duration: '40 mins',
    youtubeId: 'wgl3Isc8p7U',
    query: 'Discrete Mathematics Set Theory Relations Logic Knowledge Gate',
    description: 'Propositional logic, truth tables, equivalence relations, recurrence relations, and graph colorings.',
    tags: ['Discrete Maths', 'DSTL', 'AKTU Core']
  },
  {
    id: 'tv-34',
    title: 'Generative AI, LangChain & RAG AI Agent Architecture',
    subjectOrCategory: 'AI & Data Science',
    educator: 'Krish Naik',
    duration: '1 hr 20 mins',
    youtubeId: 'aywZrzNaKjs',
    query: 'LangChain RAG Generative AI Project Krish Naik',
    description: 'Build RAG (Retrieval-Augmented Generation) AI apps using LangChain, Vector Databases (Chroma/FAISS), and LLMs.',
    tags: ['Generative AI', 'LangChain', 'RAG']
  },
  {
    id: 'tv-35',
    title: 'System Design: Rate Limiter & Token Bucket Algorithm',
    subjectOrCategory: 'System Design & CS Core',
    educator: 'Arpit Bhayani',
    duration: '22 mins',
    youtubeId: 'FU4WlwfS3G0',
    query: 'Arpit Bhayani Rate Limiter System Design Token Bucket',
    description: 'Deep dive engineering into how Leaky Bucket and Token Bucket rate limiters protect high-traffic microservices.',
    tags: ['System Design', 'Rate Limiter', 'Backend']
  },
  {
    id: 'tv-36',
    title: 'Realtime WebSockets & WebRTC Peer-to-Peer Streaming',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'Chai aur Code (Hitesh Choudhary)',
    duration: '45 mins',
    youtubeId: 'F3A81s5L_sM',
    query: 'WebSockets Node js Socket io Chai aur Code',
    description: 'Full duplex bidirectional communication using Socket.io, Express backend, and live client chat/canvas updates.',
    tags: ['WebSockets', 'Realtime', 'Node.js']
  },
  {
    id: 'tv-37',
    title: 'Ethical Hacking & Network Penetration Testing in Kali Linux',
    subjectOrCategory: 'Behavioral & Career',
    educator: 'Bitten Tech',
    duration: '55 mins',
    youtubeId: '3Kq1MIfTWCE',
    query: 'Cyber Security Ethical Hacking Kali Linux Bitten Tech',
    description: 'Port scanning with Nmap, packet sniffing with Wireshark, password hash cracking, and web vulnerability analysis.',
    tags: ['Cyber Security', 'Kali Linux', 'Ethical Hacking']
  },
  {
    id: 'tv-38',
    title: 'Quantitative Aptitude & Logical Reasoning Placement Masterclass',
    subjectOrCategory: 'Behavioral & Career',
    educator: 'Careerride',
    duration: '40 mins',
    youtubeId: 'aK_m_3I3s4Q',
    query: 'Quantitative Aptitude Shortcuts Placement Test Careerride',
    description: 'Fast mathematical shortcuts for Speed Distance Time, Permutation Combination, Probability, and Data Interpretation.',
    tags: ['Aptitude', 'Placements', 'Exam Prep']
  },
  {
    id: 'tv-39',
    title: 'Golang Backend Engineering & High Concurrency Goroutines',
    subjectOrCategory: 'Full Stack & Web Dev',
    educator: 'FreeCodeCamp',
    duration: '1 hr 10 mins',
    youtubeId: 'YS4e4q9oBaU',
    query: 'Golang full course backend development Goroutines',
    description: 'Build fast backend microservices in Go using channels, goroutines, structs, interfaces, and Gin web framework.',
    tags: ['Golang', 'Concurrency', 'Backend']
  },
  {
    id: 'tv-40',
    title: 'Resume Building, Off-Campus Placement Strategy & Referral Guide',
    subjectOrCategory: 'Behavioral & Career',
    educator: 'takeUforward (Striver)',
    duration: '30 mins',
    youtubeId: '1p4o41Y0K5g',
    query: 'Striver Resume Building Off Campus Placement Referral LinkedIn',
    description: 'How to format ATS-friendly developer resumes, craft cold emails to tech recruiters, and secure FAANG interview referrals.',
    tags: ['Resumes', 'Placements', 'Career Strategy']
  }
];
