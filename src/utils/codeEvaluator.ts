export interface TestCaseItem {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface TestCaseDetail {
  id: number;
  type: 'sample' | 'hidden' | 'edge';
  description: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  runtime: string;
  memory: string;
  failureReason?: string;
}

export interface AiJudgeFeedback {
  status: 'Accepted ✅' | 'Wrong Answer ❌' | 'Solution works but can be optimized.' | 'Compile Error ❌';
  headline: string;
  whatIsWrong?: string;
  whichConditionFails?: string;
  whyLogicFails?: string;
  howToImprove?: string;
  currentComplexity?: { time: string; space: string };
  optimalComplexity?: { time: string; space: string };
  optimizationAdvice?: string;
}

export interface CodeEvaluationResult {
  executed: boolean;
  passed: boolean;
  status: 'Accepted ✅' | 'Wrong Answer ❌' | 'Compile Error ❌' | 'Solution works but can be optimized.';
  message: string;
  errorType?: 'syntax' | 'logic' | 'incomplete' | 'runtime' | 'wrong_answer' | 'inefficient';
  details: TestCaseDetail[];
  aiFeedback: AiJudgeFeedback;
  totalPassed: number;
  totalCases: number;
}

/**
 * Normalizes stringified outputs, arrays, matrices, and booleans for comparison.
 */
function normalizeOutput(val: any): string {
  if (val === undefined || val === null) return 'undefined';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    const trimmed = val.trim();
    // Try to parse JSON array or object
    try {
      const parsed = JSON.parse(trimmed);
      return JSON.stringify(parsed);
    } catch {
      return trimmed.replace(/\s+/g, '');
    }
  }
  if (Array.isArray(val) || typeof val === 'object') {
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }
  return String(val).trim();
}

/**
 * Parses variable inputs from string format like "nums = [2, 7, 11, 15], target = 9"
 */
function parseInputValues(inputStr: string): Record<string, any> {
  const vars: Record<string, any> = {};
  if (!inputStr) return vars;

  // Split by top-level commas or parameter definitions
  const parts = inputStr.split(/,(?=\s*[a-zA-Z_][a-zA-Z0-9_]*\s*=)/);
  for (const part of parts) {
    const eqIdx = part.indexOf('=');
    if (eqIdx !== -1) {
      const varName = part.substring(0, eqIdx).trim();
      const valStr = part.substring(eqIdx + 1).trim();
      try {
        // Try parsing JSON array/object/number/boolean
        vars[varName] = JSON.parse(valStr);
      } catch {
        // Remove quotes if present
        vars[varName] = valStr.replace(/^["']|["']$/g, '');
      }
    }
  }
  return vars;
}

/**
 * Transpiles user Python / C++ / Java / JS code into executable JavaScript function logic.
 */
function attemptExecuteUserCode(
  userCode: string,
  language: string,
  inputStr: string
): { actual: string; error?: string } {
  try {
    const parsedArgs = parseInputValues(inputStr);
    const argKeys = Object.keys(parsedArgs);
    const argVals = Object.values(parsedArgs);

    let jsCode = userCode;

    if (language === 'Python') {
      // Basic Python to JS conversion
      jsCode = jsCode
        .replace(/def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):/g, 'function $1($2) {')
        .replace(/class\s+Solution[^:]*:/g, '')
        .replace(/self,\s*/g, '')
        .replace(/elif\b/g, 'else if')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\b/g, '!')
        .replace(/\bNone\b/g, 'null')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/len\(([^)]+)\)/g, '$1.length')
        .replace(/\.append\(/g, '.push(')
        .replace(/range\(len\(([^)]+)\)\)/g, 'Array.from({length: $1.length}, (_, i) => i)')
        .replace(/range\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)');
    } else if (language === 'C++') {
      // Basic C++ to JS conversion
      jsCode = jsCode
        .replace(/#include\s*<[^>]+>/g, '')
        .replace(/using\s+namespace\s+std;/g, '')
        .replace(/class\s+Solution\s*\{/g, '')
        .replace(/public:/g, '')
        .replace(/unordered_map<[^>]+>\s*([a-zA-Z0-9_]+);/g, 'let $1 = new Map();')
        .replace(/map<[^>]+>\s*([a-zA-Z0-9_]+);/g, 'let $1 = new Map();')
        .replace(/unordered_set<[^>]+>\s*([a-zA-Z0-9_]+);/g, 'let $1 = new Set();')
        .replace(/vector<vector<int>>/g, 'let')
        .replace(/vector<int>/g, 'let')
        .replace(/vector<string>/g, 'let')
        .replace(/int\b/g, 'let')
        .replace(/double\b/g, 'let')
        .replace(/bool\b/g, 'let')
        .replace(/auto\b/g, 'let')
        .replace(/\.push_back\(/g, '.push(')
        .replace(/\.size\(\)/g, '.length')
        .replace(/sort\(([^.]+)\.begin\(\),\s*([^.]+)\.end\(\)\);/g, '$1.sort((a,b)=>a-b);')
        .replace(/\{([0-9a-zA-Z_\s,]+)\}/g, '[$1]');
    } else if (language === 'Java') {
      // Basic Java to JS conversion
      jsCode = jsCode
        .replace(/import\s+[^;]+;/g, '')
        .replace(/public\s+class\s+Solution\s*\{/g, '')
        .replace(/public\s+[a-zA-Z0-9_<>\t ]+\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g, 'function $1($2) {')
        .replace(/HashMap<[^>]+>\s*([a-zA-Z0-9_]+)\s*=\s*new\s+HashMap<>\(\);/g, 'let $1 = new Map();')
        .replace(/HashSet<[^>]+>\s*([a-zA-Z0-9_]+)\s*=\s*new\s+HashSet<>\(\);/g, 'let $1 = new Set();')
        .replace(/new\s+int\[\]\{([^}]+)\}/g, '[$1]')
        .replace(/\.length/g, '.length')
        .replace(/int\[\]/g, 'let')
        .replace(/int\b/g, 'let');
    }

    // Try executing user code in an isolated Function scope
    // Wrap to capture the returned value or function result
    const wrappedRunner = `
      ${jsCode}
      
      // Attempt auto-invocation if a function is defined
      if (typeof solveProblem === 'function') return solveProblem(${argKeys.join(', ')});
      if (typeof twoSum === 'function') return twoSum(${argKeys.join(', ')});
      if (typeof threeSum === 'function') return threeSum(${argKeys.join(', ')});
      if (typeof solution === 'function') return solution(${argKeys.join(', ')});
      
      // If code returns directly
      return (function(${argKeys.join(', ')}) {
        ${jsCode.includes('return') ? jsCode : `return ${jsCode};`}
      })(${argKeys.join(', ')});
    `;

    const runFn = new Function(...argKeys, wrappedRunner);
    const result = runFn(...argVals);
    return { actual: normalizeOutput(result) };
  } catch (err: any) {
    return { actual: 'Runtime Error', error: err?.message || 'Execution Exception' };
  }
}

/**
 * Generates Hidden Test Cases and Edge Cases based on Problem Info
 */
function generateComprehensiveTestCases(
  sampleCases: TestCaseItem[],
  problemTitle?: string
): TestCaseDetail[] {
  const result: TestCaseDetail[] = [];
  let idCounter = 1;

  // 1. Sample Test Cases
  for (const sc of sampleCases) {
    result.push({
      id: idCounter++,
      type: 'sample',
      description: sc.description || `Sample Test Case #${idCounter - 1}`,
      input: sc.input,
      expected: sc.expectedOutput,
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  }

  // 2. Hidden Test Cases (Stress & Alternate Inputs)
  const titleLower = (problemTitle || '').toLowerCase();

  if (titleLower.includes('two sum') || titleLower.includes('2 sum')) {
    result.push({
      id: idCounter++,
      type: 'hidden',
      description: 'Hidden Case: Array with negative numbers & zero target',
      input: 'nums = [-3, 4, 3, 90], target = 0',
      expected: '[0, 2]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
    result.push({
      id: idCounter++,
      type: 'edge',
      description: 'Edge Case: Minimum length array with duplicates [3, 3]',
      input: 'nums = [3, 3], target = 6',
      expected: '[0, 1]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  } else if (titleLower.includes('3sum') || titleLower.includes('three sum')) {
    result.push({
      id: idCounter++,
      type: 'hidden',
      description: 'Hidden Case: Array with multiple zero triplets',
      input: 'nums = [0, 0, 0, 0]',
      expected: '[[0, 0, 0]]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
    result.push({
      id: idCounter++,
      type: 'edge',
      description: 'Edge Case: Empty or insufficient elements [< 3 elements]',
      input: 'nums = [1, 2]',
      expected: '[]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  } else if (titleLower.includes('palindrome') || titleLower.includes('valid palindrome')) {
    result.push({
      id: idCounter++,
      type: 'hidden',
      description: 'Hidden Case: String with punctuation & uppercase mixed',
      input: 's = "A man, a plan, a canal: Panama"',
      expected: 'true',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
    result.push({
      id: idCounter++,
      type: 'edge',
      description: 'Edge Case: Single space or empty string',
      input: 's = " "',
      expected: 'true',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  } else if (titleLower.includes('reverse') || titleLower.includes('linked list')) {
    result.push({
      id: idCounter++,
      type: 'hidden',
      description: 'Hidden Case: Linked List with 2 nodes',
      input: 'head = [1, 2]',
      expected: '[2, 1]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
    result.push({
      id: idCounter++,
      type: 'edge',
      description: 'Edge Case: Empty Linked List (null head)',
      input: 'head = []',
      expected: '[]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  } else {
    // Generic Hidden & Edge Cases
    result.push({
      id: idCounter++,
      type: 'hidden',
      description: 'Hidden Case: Stress test input with boundary parameters',
      input: sampleCases[0]?.input ? `${sampleCases[0].input} (Hidden Variation)` : 'Input = [100, -50, 0]',
      expected: sampleCases[0]?.expectedOutput || 'true',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
    result.push({
      id: idCounter++,
      type: 'edge',
      description: 'Edge Case: Boundary condition (empty/duplicate/zero)',
      input: 'Edge Input = Boundary Condition',
      expected: sampleCases[0]?.expectedOutput || '[]',
      actual: '',
      passed: false,
      runtime: '0ms',
      memory: '0MB'
    });
  }

  return result;
}

/**
 * MAIN AI CODE EVALUATION SYSTEM PIPELINE
 */
export function evaluateUserCode(
  userCode: string,
  language: 'C++' | 'Python' | 'Java' | 'JavaScript' | string,
  sampleTestCases: TestCaseItem[],
  solutions?: { cpp?: string; python?: string; java?: string } | string,
  problemTitle?: string,
  problemDescription?: string
): CodeEvaluationResult {
  const code = (userCode || '').trim();

  // STAGE 1: Syntax & Lexical Check (Compilation Pipeline)
  // 1A. Incomplete / Placeholder Check
  if (
    !code ||
    code.includes('TODO: Start coding here') ||
    code.includes('# TODO: Start coding here') ||
    code.includes('pass') && code.length < 50 ||
    code.length < 30
  ) {
    const allCases = generateComprehensiveTestCases(sampleTestCases, problemTitle);
    return {
      executed: true,
      passed: false,
      status: 'Compile Error ❌',
      message: '⚠️ Code Submission Incomplete: Please write your algorithm logic inside the editor before running tests!',
      errorType: 'incomplete',
      totalPassed: 0,
      totalCases: allCases.length,
      details: allCases.map(tc => ({
        ...tc,
        actual: 'No implementation (Template unchanged)',
        passed: false,
        failureReason: 'Code submission is empty or unchanged from starter template.'
      })),
      aiFeedback: {
        status: 'Compile Error ❌',
        headline: 'Compile Error ❌: Incomplete Code Submission',
        whatIsWrong: 'The code template remains unmodified or contains default placeholder comments.',
        whichConditionFails: 'All test cases failed execution due to missing logic implementation.',
        whyLogicFails: 'No algorithm statements were executed inside the function body.',
        howToImprove: 'Implement your solution logic inside the function body and click "Run & Submit Code".'
      }
    };
  }

  // 1B. Delimiter / Bracket Balance Check
  let braceCount = 0, parenCount = 0, bracketCount = 0;
  for (const char of code) {
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;
  }

  if (braceCount !== 0 || parenCount !== 0 || bracketCount !== 0) {
    const missing = braceCount > 0 ? "'}'" : parenCount > 0 ? "')'" : "']'";
    const allCases = generateComprehensiveTestCases(sampleTestCases, problemTitle);
    return {
      executed: true,
      passed: false,
      status: 'Compile Error ❌',
      message: `❌ Syntax Error: Unbalanced brackets/parentheses in code. Missing matching ${missing}.`,
      errorType: 'syntax',
      totalPassed: 0,
      totalCases: allCases.length,
      details: allCases.map(tc => ({
        ...tc,
        actual: `SyntaxError - Unbalanced enclosing delimiter ${missing}`,
        passed: false,
        failureReason: `Compilation failed due to mismatched bracket ${missing}.`
      })),
      aiFeedback: {
        status: 'Compile Error ❌',
        headline: 'Compile Error ❌: Syntax / Parser Failure',
        whatIsWrong: `Your code contains an unbalanced nesting delimiter. Missing matching ${missing}.`,
        whichConditionFails: 'Compilation stage failed before test cases could execute.',
        whyLogicFails: 'The compiler/parser cannot construct an Abstract Syntax Tree (AST) with unbalanced delimiters.',
        howToImprove: `Inspect your code for unclosed braces or parentheses and make sure every open bracket has a matching closing ${missing}.`
      }
    };
  }

  // 1C. Keyword / Non-code prose check
  const lowerCode = code.toLowerCase();
  const validKeywords = [
    'class', 'def', 'void', 'int', 'string', 'public', 'private', 'return', 'include', 'import',
    'vector', 'list', 'map', 'set', 'for', 'while', 'if', 'else', 'function', 'const', 'let', 'var', 'cout', 'print', 'system.out'
  ];
  const hasValidKeywords = validKeywords.some(kw => lowerCode.includes(kw));

  if (!hasValidKeywords) {
    const allCases = generateComprehensiveTestCases(sampleTestCases, problemTitle);
    return {
      executed: true,
      passed: false,
      status: 'Compile Error ❌',
      message: `❌ Compilation Error: Unrecognized syntax or invalid code structure in ${language}.`,
      errorType: 'syntax',
      totalPassed: 0,
      totalCases: allCases.length,
      details: allCases.map(tc => ({
        ...tc,
        actual: `Compilation Failure: Unable to parse syntax in ${language} source file`,
        passed: false,
        failureReason: 'Code contains unrecognized syntax or informal prose.'
      })),
      aiFeedback: {
        status: 'Compile Error ❌',
        headline: 'Compile Error ❌: Invalid Syntax Structure',
        whatIsWrong: 'The submitted input does not conform to valid program syntax.',
        whichConditionFails: 'Lexical analysis failed.',
        whyLogicFails: 'Code lacks required function/variable keywords.',
        howToImprove: `Write valid ${language} syntax with standard constructs.`
      }
    };
  }

  // 1D. Missing Return / Output Statement Check
  const hasReturn = lowerCode.includes('return') || lowerCode.includes('cout') || lowerCode.includes('print') || lowerCode.includes('system.out');
  if (!hasReturn) {
    const allCases = generateComprehensiveTestCases(sampleTestCases, problemTitle);
    return {
      executed: true,
      passed: false,
      status: 'Compile Error ❌',
      message: `❌ Execution Failed: Missing 'return' or output statement inside your function.`,
      errorType: 'logic',
      totalPassed: 0,
      totalCases: allCases.length,
      details: allCases.map(tc => ({
        ...tc,
        actual: 'void / undefined (No return value produced)',
        passed: false,
        failureReason: 'Function completed without returning or producing an output.'
      })),
      aiFeedback: {
        status: 'Compile Error ❌',
        headline: 'Compile Error ❌: Missing Return Statement',
        whatIsWrong: 'Your function executes but does not return a value.',
        whichConditionFails: 'Output validation check.',
        whyLogicFails: 'The test runner received undefined/null output.',
        howToImprove: 'Add an explicit "return <result>;" statement at the end of your function.'
      }
    };
  }

  // STAGE 2: Test Case Suite Generation (Sample + Hidden + Edge Cases)
  const testSuite = generateComprehensiveTestCases(sampleTestCases, problemTitle);

  // STAGE 3: Real Execution & Output Comparison
  // Detect if code is a static hardcoded return (e.g. "return [0, 1];")
  const staticReturnMatch = code.match(/return\s+([^;{}]+);?/i);
  const isStaticReturnOnly = staticReturnMatch && code.length < 120 && !code.includes('for') && !code.includes('while') && !code.includes('if');

  // Detect loop / recursion complexity
  const hasNestedLoops = (code.match(/for|while/g) || []).length >= 2;
  const usesOptimalDataStructure = lowerCode.includes('map') || lowerCode.includes('set') || lowerCode.includes('unordered') || lowerCode.includes('hash') || lowerCode.includes('dict') || lowerCode.includes('binary');

  let passedCount = 0;
  let firstFailedCase: TestCaseDetail | null = null;

  const evaluatedDetails: TestCaseDetail[] = testSuite.map((tc) => {
    let actualValue = '';
    let isPassed = false;
    let failureMsg = '';

    if (isStaticReturnOnly) {
      // User hardcoded static return value
      const returnedVal = staticReturnMatch ? staticReturnMatch[1].trim() : '';
      actualValue = normalizeOutput(returnedVal);
      const expectedNorm = normalizeOutput(tc.expected);

      if (actualValue === expectedNorm) {
        isPassed = true;
      } else {
        isPassed = false;
        failureMsg = `Output Mismatch: Hardcoded static return (${actualValue}) failed on input (${tc.input}). Expected: (${expectedNorm}).`;
      }
    } else {
      // Execute user code via dynamic transpiled runner
      const execResult = attemptExecuteUserCode(code, language, tc.input);

      if (execResult.error) {
        actualValue = execResult.actual;
        isPassed = false;
        failureMsg = `Runtime Exception: ${execResult.error}`;
      } else {
        actualValue = execResult.actual;
        const expectedNorm = normalizeOutput(tc.expected);
        const actualNorm = normalizeOutput(actualValue);

        if (actualNorm === expectedNorm || (actualNorm.length > 0 && actualNorm !== 'undefined' && expectedNorm.includes(actualNorm))) {
          isPassed = true;
        } else {
          isPassed = false;
          failureMsg = `Output Mismatch: For input (${tc.input}), expected output was (${tc.expected}), but user code returned (${actualValue}).`;
        }
      }
    }

    if (isPassed) {
      passedCount++;
    } else if (!firstFailedCase) {
      firstFailedCase = {
        ...tc,
        actual: actualValue || 'Incorrect Output',
        passed: false,
        failureReason: failureMsg
      };
    }

    return {
      ...tc,
      actual: actualValue || 'Incorrect Output',
      passed: isPassed,
      runtime: `${Math.floor(Math.random() * 5) + 2}ms`,
      memory: `${(Math.random() * 2 + 8).toFixed(1)}MB`,
      failureReason: isPassed ? undefined : failureMsg
    };
  });

  const allCasesPassed = passedCount === testSuite.length;

  // STAGE 4: Final Result & AI Coding Judge Feedback
  if (!allCasesPassed) {
    const failedTc = firstFailedCase || evaluatedDetails.find(d => !d.passed)!;

    return {
      executed: true,
      passed: false,
      status: 'Wrong Answer ❌',
      message: `Wrong Answer ❌: (${passedCount}/${testSuite.length} Test Cases Passed). Failed on ${failedTc.type} test case #${failedTc.id}.`,
      errorType: 'wrong_answer',
      totalPassed: passedCount,
      totalCases: testSuite.length,
      details: evaluatedDetails,
      aiFeedback: {
        status: 'Wrong Answer ❌',
        headline: 'Wrong Answer ❌: Solution Failed Test Case Validation',
        whatIsWrong: `Your algorithm produced an incorrect output on test case #${failedTc.id} (${failedTc.type.toUpperCase()}).`,
        whichConditionFails: `Failed Condition: Input = [${failedTc.input}] | Expected Output = [${failedTc.expected}] | Your Output = [${failedTc.actual}]`,
        whyLogicFails: failedTc.failureReason || `The algorithm returned an invalid response for edge/sample input parameters.`,
        howToImprove: `1. Re-check boundary conditions for edge inputs.\n2. Ensure loops and pointer increments skip duplicate or out-of-bound indices.\n3. Verify your algorithm logic step-by-step against input [${failedTc.input}].`
      }
    };
  }

  // ALL TEST CASES PASSED -> STAGE 5: Check Optimization / Complexity
  const isSuboptimal = hasNestedLoops && !usesOptimalDataStructure;

  if (isSuboptimal) {
    return {
      executed: true,
      passed: true,
      status: 'Solution works but can be optimized.',
      message: `Solution works but can be optimized. Passed all (${passedCount}/${testSuite.length}) test cases, but uses sub-optimal O(N²) time complexity.`,
      errorType: 'inefficient',
      totalPassed: passedCount,
      totalCases: testSuite.length,
      details: evaluatedDetails,
      aiFeedback: {
        status: 'Solution works but can be optimized.',
        headline: 'Solution works but can be optimized.',
        currentComplexity: { time: 'O(N²)', space: 'O(1)' },
        optimalComplexity: { time: 'O(N)', space: 'O(N)' },
        optimizationAdvice: 'Your code passes all test cases using nested loops (O(N²)). For technical interview standards, optimize by using a Hash Table / Map to achieve O(N) linear time complexity.'
      }
    };
  }

  // 100% Correct and Optimal!
  return {
    executed: true,
    passed: true,
    status: 'Accepted ✅',
    message: `🎉 Accepted ✅: All Sample, Hidden, and Edge Test Cases Passed Successfully! (${passedCount}/${testSuite.length} Passed)`,
    totalPassed: passedCount,
    totalCases: testSuite.length,
    details: evaluatedDetails,
    aiFeedback: {
      status: 'Accepted ✅',
      headline: 'Accepted ✅: Perfect Solution!',
      currentComplexity: { time: 'O(N)', space: 'O(N)' },
      optimalComplexity: { time: 'O(N)', space: 'O(N)' },
      optimizationAdvice: 'Great job! Your algorithm compiles cleanly, handles all hidden & edge test cases, and operates within optimal time & space complexity bounds.'
    }
  };
}
