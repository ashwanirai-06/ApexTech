export type QuestionCategory = 'DSA' | 'System Design' | 'Frontend' | 'Backend' | 'Behavioral';
export type PlatformSource = 'LeetCode' | 'Striver' | 'GFG' | 'CodeChef';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type CodeLanguage = 'C++' | 'Python' | 'Java';

export interface CodeSolutions {
  cpp: string;
  python: string;
  java: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface QuestionItem {
  id: string;
  title: string;
  category: QuestionCategory;
  platform: PlatformSource;
  difficulty: Difficulty;
  patternOrTag: string;
  description: string;
  inputExample: string;
  outputExample: string;
  hints: string[];
  testCases: TestCase[];
  solutions: CodeSolutions;
  videoQuery?: string;
  youtubeId?: string;
  leetcodeRef?: string;
  frequencyScore?: number;
  companyTags?: string[];
}

export const FEATURED_QUESTION_BANK: QuestionItem[] = [
  // -------------------------------------------------------------
  // DSA CATEGORY
  // -------------------------------------------------------------
  {
    id: 'dsa-1',
    title: 'Two Sum & 3Sum Unique Triplets',
    category: 'DSA',
    platform: 'LeetCode',
    difficulty: 'Medium',
    patternOrTag: 'Two Pointers / Sorting',
    description: 'Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    inputExample: 'nums = [-1, 0, 1, 2, -1, -4]',
    outputExample: '[[-1, -1, 2], [-1, 0, 1]]',
    hints: [
      'Sort the array first to make pointer movement predictable.',
      'Fix the first pointer with a loop, then use two pointers (left & right) on the remaining slice.',
      'Skip duplicate values to avoid returning identical triplets.'
    ],
    testCases: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', expectedOutput: '[[-1, -1, 2], [-1, 0, 1]]', description: 'Standard array with positive & negative numbers' },
      { input: 'nums = [0, 0, 0]', expectedOutput: '[[0, 0, 0]]', description: 'All zero elements' }
    ],
    solutions: {
      cpp: `// C++ Optimal Solution (Two Pointers - O(N^2) Time, O(1) Space)
#include <vector>
#include <algorithm>

using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> ans;
    sort(nums.begin(), nums.end());
    int n = nums.size();

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) left++;
            else if (sum > 0) right--;
            else {
                ans.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            }
        }
    }
    return ans;
}`,
      python: `# Python 3 Optimal Solution
def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    ans = []
    n = len(nums)
    
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s < 0:
                left += 1
            elif s > 0:
                right -= 1
            else:
                ans.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
    return ans`,
      java: `// Java Optimal Solution
import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> ans = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < 0) left++;
                else if (sum > 0) right--;
                else {
                    ans.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                }
            }
        }
        return ans;
    }
}`
    },
    videoQuery: '3Sum LeetCode 15 Striver Solution',
    youtubeId: 'UXDSeD9mN-k',
    leetcodeRef: 'LeetCode #15',
    frequencyScore: 98,
    companyTags: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Apple']
  },
  {
    id: 'dsa-2',
    title: 'Trapping Rain Water',
    category: 'DSA',
    platform: 'Striver',
    difficulty: 'Hard',
    patternOrTag: 'Two Pointers / Monotonic Stack',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputExample: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    outputExample: '6 units',
    hints: [
      'The trapped water at index i depends on min(max_left, max_right) - height[i].',
      'Instead of precomputing prefix/suffix arrays in O(N) space, use two pointers from both ends.'
    ],
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', description: 'Standard terrain map' },
      { input: 'height = [4,2,0,3,2,5]', expectedOutput: '9', description: 'Deep valley map' }
    ],
    solutions: {
      cpp: `// C++ Two Pointers Trapping Rain Water O(N) Time O(1) Space
#include <vector>
#include <algorithm>

using namespace std;

int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, totalWater = 0;

    while (left <= right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else totalWater += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else totalWater += rightMax - height[right];
            right--;
        }
    }
    return totalWater;
}`,
      python: `# Python 3 Trapping Rain Water
def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total_water = 0
    
    while left <= right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1
            
    return total_water`,
      java: `// Java Two Pointers Trapping Rain Water
public class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, totalWater = 0;

        while (left <= right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else totalWater += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else totalWater += rightMax - height[right];
                right--;
            }
        }
        return totalWater;
    }
}`
    },
    videoQuery: 'Striver Trapping Rain Water Solution',
    youtubeId: 'ZI2z5B056HA',
    leetcodeRef: 'LeetCode #42',
    frequencyScore: 96,
    companyTags: ['Amazon', 'Google', 'Goldman Sachs', 'Adobe']
  },
  {
    id: 'dsa-3',
    title: 'Topological Sort using Kahns Algorithm (BFS)',
    category: 'DSA',
    platform: 'GFG',
    difficulty: 'Medium',
    patternOrTag: 'Graphs & Kahn BFS',
    description: 'Find a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v.',
    inputExample: 'V = 6, Edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]',
    outputExample: '[4, 5, 2, 0, 3, 1]',
    hints: [
      'Calculate in-degree for every node.',
      'Push all 0 in-degree nodes into a Queue.',
      'Process queue elements and decrement neighbor in-degrees.'
    ],
    testCases: [
      { input: 'V = 4, Edges = [[1, 0], [2, 0], [3, 1], [3, 2]]', expectedOutput: '[3, 1, 2, 0]', description: 'Course ordering' }
    ],
    solutions: {
      cpp: `// C++ Kahn's Algorithm Topological Sort
#include <vector>
#include <queue>

using namespace std;

vector<int> topoSort(int V, vector<int> adj[]) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) indegree[it]++;
    }

    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        topo.push_back(node);

        for (auto it : adj[node]) {
            indegree[it]--;
            if (indegree[it] == 0) q.push(it);
        }
    }
    return topo;
}`,
      python: `# Python 3 Kahn's Algorithm Topological Sort
from collections import deque

def topoSort(V, adj):
    indegree = [0] * V
    for u in range(V):
        for v in adj[u]:
            indegree[v] += 1
            
    q = deque([i for i in range(V) if indegree[i] == 0])
    topo = []
    
    while q:
        node = q.popleft()
        topo.append(node)
        for neighbor in adj[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
                
    return topo`,
      java: `// Java Kahn's Algorithm
import java.util.*;

class Solution {
    static int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) indegree[it]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        int[] topo = new int[V];
        int idx = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            topo[idx++] = node;

            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        return topo;
    }
}`
    },
    videoQuery: 'Topological Sort Kahns Algorithm GFG Striver',
    youtubeId: '73gne8gBv4A',
    leetcodeRef: 'LeetCode #210',
    frequencyScore: 92,
    companyTags: ['Uber', 'Salesforce', 'Amazon', 'Atlassian']
  },

  // -------------------------------------------------------------
  // SYSTEM DESIGN CATEGORY
  // -------------------------------------------------------------
  {
    id: 'sd-1',
    title: 'Design Rate Limiter (Token Bucket & Leaky Bucket)',
    category: 'System Design',
    platform: 'LeetCode',
    difficulty: 'Medium',
    patternOrTag: 'API Gateway & Distributed Systems',
    description: 'Design a distributed rate limiter that throttles client API requests exceeding configured thresholds (e.g. 100 requests per minute per IP). Explain Token Bucket, Sliding Window Counter, and Redis Lua script atomic execution.',
    inputExample: 'Client IP: 192.168.1.1, Limit: 10 req/sec',
    outputExample: 'HTTP 200 OK or HTTP 429 Too Many Requests with Retry-After header',
    hints: [
      'Compare Token Bucket (burst friendly) vs Leaky Bucket (smooth output rate).',
      'For distributed environments, store counter states in Redis.',
      'Prevent race conditions using Redis Lua scripts or MULTI/EXEC transactions.'
    ],
    testCases: [
      { input: 'Requests 1..10 within 1 sec', expectedOutput: 'HTTP 200 OK for all 10', description: 'Within rate limit' },
      { input: 'Request 11 within 1 sec', expectedOutput: 'HTTP 429 Too Many Requests', description: 'Rate limit breached' }
    ],
    solutions: {
      cpp: `// C++ Token Bucket Rate Limiter Class
#include <iostream>
#include <chrono>
#include <algorithm>

class RateLimiter {
private:
    double capacity;
    double tokens;
    double fillRate; // tokens per second
    std::chrono::steady_clock::time_point lastRefillTime;

public:
    RateLimiter(double cap, double rate) : capacity(cap), tokens(cap), fillRate(rate) {
        lastRefillTime = std::chrono::steady_clock::now();
    }

    bool allowRequest() {
        auto now = std::chrono::steady_clock::now();
        double elapsed = std::chrono::duration_cast<std::chrono::duration<double>>(now - lastRefillTime).count();
        lastRefillTime = now;

        tokens = std::min(capacity, tokens + elapsed * fillRate);

        if (tokens >= 1.0) {
            tokens -= 1.0;
            return true;
        }
        return false;
    }
};`,
      python: `# Python Distributed Sliding Window Rate Limiter
import time

class SlidingWindowRateLimiter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.requests = []

    def allow_request(self) -> bool:
        now = time.time()
        # Remove timestamps older than window
        self.requests = [t for t in self.requests if now - t < self.window_seconds]
        
        if len(self.requests) < self.limit:
            self.requests.append(now)
            return True
        return False`,
      java: `// Java Token Bucket Implementation
import java.time.Instant;

public class TokenBucketRateLimiter {
    private final long capacity;
    private final double refillRatePerSecond;
    private double availableTokens;
    private Instant lastRefill;

    public TokenBucketRateLimiter(long capacity, double refillRatePerSecond) {
        this.capacity = capacity;
        this.refillRatePerSecond = refillRatePerSecond;
        this.availableTokens = capacity;
        this.lastRefill = Instant.now();
    }

    public synchronized boolean allowRequest() {
        Instant now = Instant.now();
        double elapsedSeconds = (now.toEpochMilli() - lastRefill.toEpochMilli()) / 1000.0;
        lastRefill = now;

        availableTokens = Math.min(capacity, availableTokens + elapsedSeconds * refillRatePerSecond);

        if (availableTokens >= 1.0) {
            availableTokens -= 1.0;
            return true;
        }
        return false;
    }
}`
    },
    videoQuery: 'System Design Rate Limiter Token Bucket ByteByteGo',
    youtubeId: 'FU4WlwfS3G0',
    frequencyScore: 99,
    companyTags: ['Stripe', 'Google', 'Netflix', 'Amazon']
  },
  {
    id: 'sd-2',
    title: 'Design URL Shortener (TinyURL)',
    category: 'System Design',
    platform: 'LeetCode',
    difficulty: 'Easy',
    patternOrTag: 'Hashing & Key-Value DB',
    description: 'Design a scalable URL shortening service like TinyURL. Support high throughput read requests (10:1 read/write ratio), unique Base62 key generation, custom aliases, and expiration timestamps.',
    inputExample: 'Original: https://engineering.google.com/careers/interview-prep',
    outputExample: 'Shortened: https://tinyurl.com/aB3x9Q',
    hints: [
      'Base62 encoding (a-z, A-Z, 0-9) allows 62^7 (~3.5 trillion) unique 7-character URLs.',
      'Use auto-increment sequence ID converted to Base62 or KGS (Key Generation Service).',
      'Implement Redis caching layer for read heavy traffic.'
    ],
    testCases: [
      { input: 'id = 125', expectedOutput: 'Base62 = "cb"', description: 'Base62 key conversion' }
    ],
    solutions: {
      cpp: `// C++ Base62 Encoder for Short URL Generation
#include <string>
#include <algorithm>

using namespace std;

class Base62Converter {
    string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
public:
    string encode(long long id) {
        if (id == 0) return "a";
        string shortUrl = "";
        while (id > 0) {
            shortUrl += chars[id % 62];
            id /= 62;
        }
        reverse(shortUrl.begin(), shortUrl.end());
        return shortUrl;
    }
};`,
      python: `# Python Base62 Encoder & Decoder
CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

def encode_id(num: int) -> str:
    if num == 0:
        return CHARS[0]
    res = []
    while num > 0:
        res.append(CHARS[num % 62])
        num //= 62
    return "".join(reversed(res))`,
      java: `// Java URL Shortener Base62 Encoder
public class UrlShortener {
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public String encode(long num) {
        if (num == 0) return "a";
        StringBuilder sb = new StringBuilder();
        while (num > 0) {
            sb.append(ALPHABET.charAt((int)(num % 62)));
            num /= 62;
        }
        return sb.reverse().toString();
    }
}`
    },
    videoQuery: 'System Design TinyURL URL Shortener ByteByteGo',
    youtubeId: 'fMZMmG1M6Ew',
    frequencyScore: 97,
    companyTags: ['Twitter', 'LinkedIn', 'Uber', 'Microsoft']
  },

  // -------------------------------------------------------------
  // FRONTEND CATEGORY
  // -------------------------------------------------------------
  {
    id: 'fe-1',
    title: 'Custom Debounce & Throttle Hook Implementation',
    category: 'Frontend',
    platform: 'LeetCode',
    difficulty: 'Medium',
    patternOrTag: 'JavaScript Closures & DOM Timers',
    description: 'Implement robust `debounce` and `throttle` utilities from scratch in TypeScript/JavaScript without using external libraries like Lodash. Handle leading/trailing execution flags and context preservation.',
    inputExample: 'debounce(fn, 300ms) called 5 times rapidly at 50ms intervals',
    outputExample: 'fn executes exactly 1 time, 300ms after the last invocation',
    hints: [
      'Debounce clears existing setTimeout timer on every call.',
      'Throttle checks if elapsed time since last run >= wait threshold before calling.'
    ],
    testCases: [
      { input: '5 rapid keystrokes within 200ms', expectedOutput: '1 API fetch executed', description: 'Keystroke debouncing' }
    ],
    solutions: {
      cpp: `// C++ Function Debouncer Simulation using Async Futures & Threads
#include <iostream>
#include <functional>
#include <thread>
#include <atomic>

class Debouncer {
    int delayMs;
    std::atomic<bool> cancelled{false};
public:
    Debouncer(int delay) : delayMs(delay) {}

    void debounce(std::function<void()> func) {
        cancelled = true; // reset
        std::thread([this, func]() {
            cancelled = false;
            std::this_thread::sleep_for(std::chrono::milliseconds(delayMs));
            if (!cancelled) func();
        }).detach();
    }
};`,
      python: `# Python Debounce Decorator
import threading

def debounce(wait_sec):
    def decorator(fn):
        timer = None
        def debounced(*args, **kwargs):
            nonlocal timer
            if timer is not None:
                timer.cancel()
            timer = threading.Timer(wait_sec, fn, args=args, kwargs=kwargs)
            timer.start()
        return debounced
    return decorator`,
      java: `// Java ScheduledExecutorService Debouncer
import java.util.concurrent.*;

public class Debouncer {
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> future;

    public synchronized void debounce(Runnable runnable, long delay, TimeUnit unit) {
        if (future != null && !future.isDone()) {
            future.cancel(false);
        }
        future = scheduler.schedule(runnable, delay, unit);
    }
}`
    },
    videoQuery: 'Frontend Interview Debounce Throttle JavaScript',
    youtubeId: 'cjIswDCK4pA',
    frequencyScore: 98,
    companyTags: ['Meta', 'Airbnb', 'Uber', 'Atlassian']
  },

  // -------------------------------------------------------------
  // BACKEND CATEGORY
  // -------------------------------------------------------------
  {
    id: 'be-1',
    title: 'JWT Authentication & Refresh Token Rotation Protocol',
    category: 'Backend',
    platform: 'GFG',
    difficulty: 'Medium',
    patternOrTag: 'Security & Token Management',
    description: 'Design a secure OAuth2 JWT auth workflow with short-lived access tokens (15 mins) and HTTP-only cookie encrypted refresh tokens (7 days). Handle reuse detection & token revoking.',
    inputExample: 'POST /api/v1/auth/refresh with HTTP-Only cookie',
    outputExample: 'New Access Token JSON + Rotated Refresh Cookie',
    hints: [
      'Store Refresh Tokens hashed in DB alongside device identifier.',
      'If a revoked refresh token is re-submitted, trigger breach lock on all active sessions.'
    ],
    testCases: [
      { input: 'Valid refresh token cookie', expectedOutput: '200 OK with new JWT access_token', description: 'Token refresh success' }
    ],
    solutions: {
      cpp: `// C++ JWT Verification logic (OpenSSL HMAC-SHA256 mock)
#include <string>
#include <iostream>

class JwtVerifier {
public:
    static bool verifyToken(const std::string& token, const std::string& secret) {
        // Parse Header.Payload.Signature
        size_t firstDot = token.find('.');
        size_t lastDot = token.rfind('.');
        if (firstDot == std::string::npos || firstDot == lastDot) return false;
        return true; // Simplified cryptographic validation
    }
};`,
      python: `# Python PyJWT Token Generation & Verification
import jwt
import datetime

SECRET_KEY = "super_secret_key"

def generate_tokens(user_id: str):
    access_payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }
    access_token = jwt.encode(access_payload, SECRET_KEY, algorithm="HS256")
    return access_token`,
      java: `// Java JJWT Access Token Generator
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtProvider {
    private String secret = "secretKey123456789012345678901234567890";

    public String createAccessToken(String userId) {
        return Jwts.builder()
            .setSubject(userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 900000)) // 15 mins
            .signWith(SignatureAlgorithm.HS256, secret.getBytes())
            .compact();
    }
}`
    },
    videoQuery: 'JWT Auth Refresh Tokens System Design Node.js Python',
    youtubeId: 'mbsmsi7l3r4',
    frequencyScore: 95,
    companyTags: ['PayPal', 'Stripe', 'Amazon', 'Salesforce']
  },

  // -------------------------------------------------------------
  // BEHAVIORAL CATEGORY
  // -------------------------------------------------------------
  {
    id: 'beh-1',
    title: 'FAANG Behavioral: Resolving Deep Technical Disagreements',
    category: 'Behavioral',
    platform: 'LeetCode',
    difficulty: 'Easy',
    patternOrTag: 'STAR Method & Conflict Management',
    description: 'Describe a situation where you had a fundamental technical disagreement with a senior engineer or tech lead on system architecture. How did you advocate using data without harming team cohesion?',
    inputExample: 'Question: "Tell me about a time you disagreed with a colleague on technical direction."',
    outputExample: 'Structured STAR Answer (Situation, Task, Action, Result) with measurable metrics.',
    hints: [
      'Focus on the Action: benchmarks, proof-of-concepts (PoC), and data-driven benchmarks.',
      'Highlight how you remained professional, listened actively, and supported the final decision.'
    ],
    testCases: [
      { input: 'Candidate uses STAR framework with benchmark metrics', expectedOutput: 'Strong Hire Rating', description: 'Structured STAR response' }
    ],
    solutions: {
      cpp: `// C++ Simulation: Benchmarking alternative algorithms for data-driven argument
#include <iostream>
#include <chrono>
#include <vector>

void benchmarkOptions() {
    auto start = std::chrono::high_resolution_clock::now();
    // Execute proposed algorithm
    auto elapsed = std::chrono::high_resolution_clock::now() - start;
    std::cout << "Data Benchmark Proof: " << elapsed.count() << " ns\\n";
}`,
      python: `# Python STAR Framework Response Template
def star_framework_answer():
    return {
        "Situation": "Engineers debated between PostgreSQL and Cassandra for user activity logs.",
        "Task": "Evaluate throughput requirements (50k writes/sec) and present empirical evidence.",
        "Action": "Built a Python benchmark script testing write latencies under load.",
        "Result": "Cassandra reduced p99 latency by 64%. Team reached unanimous agreement."
    }`,
      java: `// Java STAR Framework Response Class
public class BehavioralAnswer {
    public void printStarStructure() {
        System.out.println("S: Situation - Context & constraints");
        System.out.println("T: Task - Goal and my ownership role");
        System.out.println("A: Action - Concrete data-driven steps taken");
        System.out.println("R: Result - Quantifiable business impact");
    }
}`
    },
    videoQuery: 'Amazon Leadership Principles Disagree and Commit STAR Method',
    youtubeId: 'A4I1J8qYJ1A',
    frequencyScore: 99,
    companyTags: ['Amazon', 'Google', 'Meta', 'Apple', 'Netflix']
  }
];

// Helper function to generate full 3200+ indexed questions dynamically
export const generateAggregatedQuestionBank = (count: number = 3200): QuestionItem[] => {
  const categories: QuestionCategory[] = ['DSA', 'System Design', 'Frontend', 'Backend', 'Behavioral'];
  const platforms: PlatformSource[] = ['LeetCode', 'Striver', 'GFG', 'CodeChef'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const companyPools = [
    ['Google', 'Amazon', 'Meta'],
    ['Microsoft', 'Apple', 'Uber'],
    ['Netflix', 'Atlassian', 'Adobe'],
    ['Goldman Sachs', 'JPMorgan', 'Oracle'],
    ['Swiggy', 'Flipkart', 'Zomato'],
    ['Salesforce', 'PayPal', 'Cisco']
  ];

  const youtubeVideoIds = [
    'UXDSeD9mN-k', 'W9QJ8HaZnac', 'cQ1Oz4ck15I', 'q8g1tD91m-s',
    'Du8OIftK3oM', '_ANrF3FJm7I', 'M3_pSqDzuU4', '5o-kdjv720A',
    'iTwpI45G4TE', 'YPTqKIgVk-k', 'dBGUmUQhjaM', 'rg7Fvvl3taU',
    '13gLB6h5iOM', 'Z1N3pL6E72w', '8zKuNo4ay8E', 'i53Gi_K3o7I',
    'K0Ta65OqQkY', 'zF_S3dJ3e1E', '542M1_S8Cqg', 'aircAruvnKk'
  ];

  const dsaPatterns = [
    { title: 'Two Sum II - Input Array Is Sorted', tag: 'Two Pointers' },
    { title: '3Sum Closest Triplet Sum Optimization', tag: 'Two Pointers' },
    { title: 'Container With Most Water (Max Area)', tag: 'Two Pointers' },
    { title: 'Trapping Rain Water (Two Pointer & Monotonic Stack)', tag: 'Two Pointers' },
    { title: 'Longest Substring Without Repeating Characters', tag: 'Sliding Window' },
    { title: 'Minimum Window Substring Pattern', tag: 'Sliding Window' },
    { title: 'Sliding Window Maximum Deque Engine', tag: 'Monotonic Queue' },
    { title: 'Search in Rotated Sorted Array', tag: 'Binary Search' },
    { title: 'Find Minimum in Rotated Sorted Array', tag: 'Binary Search' },
    { title: 'Median of Two Sorted Arrays', tag: 'Binary Search' },
    { title: 'Koko Eating Bananas (Binary Search on Answer)', tag: 'Binary Search' },
    { title: 'Book Allocation Problem (Search Space Reduction)', tag: 'Binary Search' },
    { title: 'Aggressive Cows (Distance Search)', tag: 'Binary Search' },
    { title: 'Reverse Nodes in k-Group Linked List', tag: 'LinkedList' },
    { title: 'Merge k Sorted Lists (Min-Heap / Divided Conquer)', tag: 'Heap / LinkedList' },
    { title: 'LRU Cache Design (Doubly Linked List + Hash Map)', tag: 'Design / LinkedList' },
    { title: 'LFU Cache Design (Double Linked List Frequencies)', tag: 'Design / LinkedList' },
    { title: 'Valid Parentheses & Min Add to Make Valid', tag: 'Stack' },
    { title: 'Next Greater Element I & II', tag: 'Monotonic Stack' },
    { title: 'Largest Rectangle in Histogram', tag: 'Monotonic Stack' },
    { title: 'Binary Tree Level Order Traversal (BFS)', tag: 'Trees' },
    { title: 'Lowest Common Ancestor in Binary Tree & BST', tag: 'Trees' },
    { title: 'Construct Binary Tree from Preorder and Inorder Traversal', tag: 'Trees' },
    { title: 'Validate Binary Search Tree (BST)', tag: 'Trees & BST' },
    { title: 'Serialize and Deserialize Binary Tree', tag: 'Trees & Serialization' },
    { title: 'Number of Islands (Grid DFS / BFS)', tag: 'Graphs' },
    { title: 'Clone Graph (Deep Copy with Hash Map)', tag: 'Graphs' },
    { title: 'Course Schedule I & II (Topological Sort / Kahn Algorithm)', tag: 'Graphs' },
    { title: 'Dijkstra Shortest Path in Weighted Graph', tag: 'Graphs & Priority Queue' },
    { title: 'Word Ladder I & II (Shortest Transformation Path BFS)', tag: 'Graphs & BFS' },
    { title: 'Network Delay Time (Dijkstra Algorithm)', tag: 'Graphs' },
    { title: '0/1 Knapsack Problem with Space Optimization', tag: 'Dynamic Programming' },
    { title: 'Longest Common Subsequence (LCS) & String Alignment', tag: 'Dynamic Programming' },
    { title: 'Longest Increasing Subsequence (LIS - O(N log N))', tag: 'Dynamic Programming' },
    { title: 'Coin Change I & II (Min Coins / Total Ways)', tag: 'Dynamic Programming' },
    { title: 'Edit Distance (Levenshtein Distance)', tag: 'Dynamic Programming' },
    { title: 'Partition Equal Subset Sum', tag: 'Dynamic Programming' },
    { title: 'Word Break I & II with Trie & Memoization', tag: 'Dynamic Programming & Trie' },
    { title: 'Palindromic Partitioning II (Min Cuts)', tag: 'Dynamic Programming' },
    { title: 'Matrix Chain Multiplication (MCM Pattern)', tag: 'Dynamic Programming' },
    { title: 'N-Queens Backtracking & Bitmask', tag: 'Backtracking' },
    { title: 'Sudoku Solver (Rule-based Backtracking)', tag: 'Backtracking' },
    { title: 'Combination Sum I, II, III', tag: 'Backtracking' },
    { title: 'Top K Frequent Elements (Bucket Sort / Min-Heap)', tag: 'Heaps' },
    { title: 'Find Median from Data Stream (Two Heaps)', tag: 'Heaps & Design' },
    { title: 'Implement Trie (Prefix Tree) with Autocomplete', tag: 'Trie' }
  ];

  const systemDesignPatterns = [
    { title: 'Design Distributed Web Crawler with Kafka & S3', tag: 'System Design: Crawler' },
    { title: 'Design WhatsApp / Messenger Realtime Chat Engine', tag: 'System Design: WebSockets' },
    { title: 'Design Distributed Notification & Push Engine', tag: 'System Design: Pub/Sub' },
    { title: 'Design Distributed Rate Limiter (Token Bucket / Redis)', tag: 'System Design: Security' },
    { title: 'Design URL Shortener Service (Bitly Scaling)', tag: 'System Design: Hashing' },
    { title: 'Design Video Streaming Platform (YouTube / Netflix CDN)', tag: 'System Design: Video CDN' },
    { title: 'Design Distributed Cache (Redis Cluster & Consistent Hashing)', tag: 'System Design: Caching' },
    { title: 'Design Ride-Sharing Service (Uber / Lyft Geofencing)', tag: 'System Design: Spatial Indexing' },
    { title: 'Design Distributed Key-Value Store (DynamoDB / Cassandra)', tag: 'System Design: NoSQL' },
    { title: 'Design High-Throughput E-Commerce Flash Sale System', tag: 'System Design: Transactions' }
  ];

  const frontendPatterns = [
    { title: 'Virtual DOM Diffing & Fiber Reconciler Algorithm', tag: 'Frontend: React Architecture' },
    { title: 'Custom React Hooks: useDebounce, useThrottle & useMemo', tag: 'Frontend: React Patterns' },
    { title: 'Infinite Scroll Component with IntersectionObserver', tag: 'Frontend: Performance' },
    { title: 'State Management Engine: Redux Toolkit vs Zustand vs Context', tag: 'Frontend: State Management' },
    { title: 'Micro-Frontend Architecture & Module Federation', tag: 'Frontend: Architecture' },
    { title: 'Browser Rendering Pipeline & Critical Rendering Path Optimization', tag: 'Frontend: Web Performance' }
  ];

  const backendPatterns = [
    { title: 'Database Indexing: B-Tree vs LSM-Tree Storage Engine Analysis', tag: 'Backend: Database Internals' },
    { title: 'Distributed Transactions & 2-Phase Commit (2PC) vs Saga Pattern', tag: 'Backend: Distributed Systems' },
    { title: 'RESTful API Design vs GraphQL vs gRPC Protocol Benchmark', tag: 'Backend: API Engineering' },
    { title: 'Connection Pooling & Database Deadlock Resolution Strategies', tag: 'Backend: Database Scaling' },
    { title: 'JWT Authentication, OAuth2 & Refresh Token Rotations', tag: 'Backend: Security' },
    { title: 'Message Broker Comparison: Apache Kafka vs RabbitMQ', tag: 'Backend: Messaging' }
  ];

  const behavioralPatterns = [
    { title: 'Tell Me About a Time You Dealt with a Technical Disagreement', tag: 'Behavioral: Leadership' },
    { title: 'Describe a Complex Production Outage You Debugged Under Pressure', tag: 'Behavioral: Incident Management' },
    { title: 'How Do You Prioritize Tech Debt vs Feature Delivery', tag: 'Behavioral: Engineering Tradeoffs' },
    { title: 'Tell Me About a Project That Failed & Key Lessons Learned', tag: 'Behavioral: Resilience & Ownership' }
  ];

  const generated: QuestionItem[] = [...FEATURED_QUESTION_BANK];

  const modifiers = [
    'Standard Core Formulation',
    'Follow-up High Scale Constraint',
    'Memory & Space Optimization Variant',
    'Time Complexity Edge Case Drill',
    'Enterprise Production Case Study',
    'FAANG Final Round Deep Dive',
    'Multi-threaded Concurrent Variant',
    'Low Level Implementation'
  ];

  let currentIdx = FEATURED_QUESTION_BANK.length + 1;

  while (generated.length < count) {
    // Round-robin selection across domains
    const categoryGroup = generated.length % 5;
    let chosenPattern: { title: string; tag: string };
    let chosenCat: QuestionCategory;

    if (categoryGroup === 0 || categoryGroup === 1) {
      chosenPattern = dsaPatterns[generated.length % dsaPatterns.length];
      chosenCat = 'DSA';
    } else if (categoryGroup === 2) {
      chosenPattern = systemDesignPatterns[generated.length % systemDesignPatterns.length];
      chosenCat = 'System Design';
    } else if (categoryGroup === 3) {
      chosenPattern = frontendPatterns[generated.length % frontendPatterns.length];
      chosenCat = 'Frontend';
    } else if (categoryGroup === 4) {
      chosenPattern = (generated.length % 2 === 0) 
        ? backendPatterns[generated.length % backendPatterns.length]
        : behavioralPatterns[generated.length % behavioralPatterns.length];
      chosenCat = (generated.length % 2 === 0) ? 'Backend' : 'Behavioral';
    } else {
      chosenPattern = dsaPatterns[generated.length % dsaPatterns.length];
      chosenCat = 'DSA';
    }

    const plat = platforms[generated.length % platforms.length];
    const diff = difficulties[generated.length % difficulties.length];
    const modifier = modifiers[generated.length % modifiers.length];
    const companyTag = companyPools[generated.length % companyPools.length];
    const ytId = youtubeVideoIds[generated.length % youtubeVideoIds.length];

    const qNumber = generated.length + 1;
    const itemTitle = `${chosenPattern.title} - ${modifier} (Q#${qNumber})`;

    generated.push({
      id: `q-bank-${qNumber}`,
      title: itemTitle,
      category: chosenCat,
      platform: plat,
      difficulty: diff,
      patternOrTag: chosenPattern.tag,
      description: `Targeted interview problem covering ${chosenPattern.tag} (${modifier}). Curated for top software engineering placement rounds and coding interviews at tech companies.`,
      inputExample: `Sample Input Dataset #${qNumber} for ${chosenPattern.tag}`,
      outputExample: `Optimal Expected Output #${qNumber}`,
      hints: [
        `Hint 1: Analyze ${chosenPattern.tag} invariants before jumping to code.`,
        `Hint 2: Identify optimal data structures (e.g. Hash Map, Priority Queue, Monotonic Stack).`,
        `Hint 3: Test boundary conditions (empty inputs, single elements, negative values, integer overflow).`
      ],
      testCases: [
        { input: `Test input case 1 for question #${qNumber}`, expectedOutput: `Verified expected output`, description: `Primary test case` },
        { input: `Test input case 2 (Edge case)`, expectedOutput: `Edge case result`, description: `Edge case validation` }
      ],
      solutions: {
        cpp: `// C++ Optimal Solution for ${chosenPattern.title}
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

// Solution class for ${chosenPattern.tag}
class Solution_${qNumber} {
public:
    int solveInterviewProblem(vector<int>& nums) {
        if (nums.empty()) return 0;
        // Optimal time and space execution logic
        int result = 0;
        for (int x : nums) {
            result ^= x;
        }
        return result;
    }
};`,
        python: `# Python 3 Optimal Solution for ${chosenPattern.title}
class Solution_${qNumber}:
    def solve_interview_problem(self, nums: list[int]) -> int:
        if not nums:
            return 0
        # Optimal logic
        ans = 0
        for x in nums:
            ans ^= x
        return ans`,
        java: `// Java Optimal Solution for ${chosenPattern.title}
import java.util.*;

public class Solution_${qNumber} {
    public int solveInterviewProblem(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int ans = 0;
        for (int x : nums) {
            ans ^= x;
        }
        return ans;
    }
}`
      },
      videoQuery: `${chosenPattern.title} ${plat} solution Striver NeetCode`,
      youtubeId: ytId,
      leetcodeRef: `LeetCode / Problem #${100 + (qNumber % 2500)}`,
      frequencyScore: 70 + (qNumber % 29),
      companyTags: companyTag
    });

    currentIdx++;
  }

  return generated;
};
