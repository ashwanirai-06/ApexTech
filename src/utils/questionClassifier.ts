export type QuestionCategoryType = 
  | 'DSA'
  | 'HR'
  | 'Aptitude'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'React'
  | 'SystemDesign'
  | 'Database'
  | 'CoreCS';

export interface QuestionMetadata {
  categoryType: QuestionCategoryType;
  displayTitle: string;
  badgeLabel: string;
  badgeColor: string;
}

/**
 * Robust classification layer that routes questions to their specialized answer engines.
 */
export function classifyQuestion(question: {
  category?: string;
  patternOrTag?: string;
  title?: string;
  description?: string;
}): QuestionCategoryType {
  const cat = (question.category || '').toLowerCase().trim();
  const tag = (question.patternOrTag || '').toLowerCase().trim();
  const title = (question.title || '').toLowerCase().trim();
  const desc = (question.description || '').toLowerCase().trim();
  const fullText = `${cat} ${tag} ${title} ${desc}`;

  // 1. HR & Behavioral Questions
  if (
    cat === 'hr' ||
    cat === 'behavioral' ||
    cat === 'management' ||
    cat === 'soft skills' ||
    tag.includes('hr') ||
    tag.includes('behavioral') ||
    tag.includes('soft skills') ||
    title.includes('tell me about') ||
    title.includes('strength') ||
    title.includes('weakness') ||
    title.includes('conflict') ||
    title.includes('leadership') ||
    title.includes('why should we hire') ||
    title.includes('prioritize') ||
    title.includes('overcome a challenge') ||
    title.includes('work under pressure') ||
    title.includes('failed project') ||
    title.includes('salary expectation') ||
    (cat === 'hr & aptitude' && (tag.includes('hr') || tag.includes('behavioral') || title.includes('tell me') || title.includes('describe') || title.includes('why')))
  ) {
    return 'HR';
  }

  // 2. Aptitude & Quantitative Reasoning
  if (
    cat === 'aptitude' ||
    cat === 'quant' ||
    cat === 'reasoning' ||
    tag.includes('aptitude') ||
    tag.includes('math') ||
    tag.includes('quant') ||
    tag.includes('logical') ||
    title.includes('aptitude') ||
    title.includes('profit and loss') ||
    title.includes('time and distance') ||
    title.includes('work and time') ||
    title.includes('permutation') ||
    title.includes('probability') ||
    title.includes('blood relation') ||
    title.includes('syllogism') ||
    (cat === 'hr & aptitude' && !tag.includes('hr') && !tag.includes('behavioral'))
  ) {
    return 'Aptitude';
  }

  // 3. HTML Questions
  if (
    cat === 'html' ||
    tag === 'html' ||
    tag.includes('html5') ||
    title.includes('html') ||
    title.includes('doctype') ||
    title.includes('semantic html') ||
    title.includes('semantic element') ||
    title.includes('anchor tag') ||
    title.includes('meta tag')
  ) {
    return 'HTML';
  }

  // 4. CSS Questions
  if (
    cat === 'css' ||
    tag === 'css' ||
    tag.includes('css3') ||
    tag.includes('flexbox') ||
    tag.includes('grid') ||
    tag.includes('styling') ||
    title.includes('css') ||
    title.includes('flexbox') ||
    title.includes('grid') ||
    title.includes('box model') ||
    title.includes('specificity') ||
    title.includes('pseudo-class') ||
    title.includes('z-index') ||
    title.includes('media query') ||
    title.includes('centering')
  ) {
    return 'CSS';
  }

  // 5. React Questions
  if (
    cat === 'react' ||
    tag.includes('react') ||
    title.includes('react') ||
    title.includes('usestate') ||
    title.includes('useeffect') ||
    title.includes('usememo') ||
    title.includes('usecallback') ||
    title.includes('virtual dom') ||
    title.includes('jsx') ||
    title.includes('custom hook')
  ) {
    return 'React';
  }

  // 6. JavaScript Questions
  if (
    cat === 'javascript' ||
    tag.includes('javascript') ||
    tag.includes('js') ||
    tag.includes('es6') ||
    title.includes('javascript') ||
    title.includes('closure') ||
    title.includes('event loop') ||
    title.includes('async/await') ||
    title.includes('promise') ||
    title.includes('hoisting') ||
    title.includes('prototype') ||
    title.includes('debounce') ||
    title.includes('throttle')
  ) {
    return 'JavaScript';
  }

  // 7. System Design Questions
  if (
    cat === 'system design' ||
    tag.includes('system design') ||
    tag.includes('architecture') ||
    title.includes('system design') ||
    title.includes('load balancer') ||
    title.includes('microservice') ||
    title.includes('rate limiter') ||
    title.includes('cap theorem') ||
    title.includes('cdn') ||
    title.includes('cache')
  ) {
    return 'SystemDesign';
  }

  // 8. Database / SQL Questions
  if (
    cat === 'database' ||
    cat === 'sql' ||
    cat === 'dbms' ||
    tag.includes('sql') ||
    tag.includes('database') ||
    tag.includes('query') ||
    title.includes('sql') ||
    title.includes('query') ||
    title.includes('join') ||
    title.includes('indexing') ||
    title.includes('acid properties') ||
    title.includes('transaction')
  ) {
    return 'Database';
  }

  // 9. Core CS Questions (OS, Networking, OOPs, DBMS Theory)
  if (
    cat === 'core cs' ||
    cat === 'os' ||
    cat === 'cn' ||
    cat === 'oops' ||
    tag.includes('operating system') ||
    tag.includes('computer network') ||
    tag.includes('oops') ||
    tag.includes('dbms theory') ||
    title.includes('deadlock') ||
    title.includes('process vs thread') ||
    title.includes('tcp/ip') ||
    title.includes('polymorphism')
  ) {
    return 'CoreCS';
  }

  // Default to DSA
  return 'DSA';
}

/**
 * Returns UI badge metadata for classified questions.
 */
export function getQuestionClassificationMetadata(categoryType: QuestionCategoryType): QuestionMetadata {
  switch (categoryType) {
    case 'HR':
      return {
        categoryType: 'HR',
        displayTitle: 'HR & Behavioral Interview Answer Engine',
        badgeLabel: 'HR & Behavioral',
        badgeColor: 'bg-purple-950 text-purple-300 border-purple-800'
      };
    case 'Aptitude':
      return {
        categoryType: 'Aptitude',
        displayTitle: 'Quantitative & Logical Reasoning Engine',
        badgeLabel: 'Aptitude Math',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
      };
    case 'HTML':
      return {
        categoryType: 'HTML',
        displayTitle: 'HTML5 Semantic & Markup Workspace',
        badgeLabel: 'HTML5',
        badgeColor: 'bg-rose-950 text-rose-300 border-rose-800'
      };
    case 'CSS':
      return {
        categoryType: 'CSS',
        displayTitle: 'CSS3 Stylesheet & Layout Workspace',
        badgeLabel: 'CSS3 Layout',
        badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
      };
    case 'JavaScript':
      return {
        categoryType: 'JavaScript',
        displayTitle: 'JavaScript ES6+ & Async Engine',
        badgeLabel: 'JavaScript',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
      };
    case 'React':
      return {
        categoryType: 'React',
        displayTitle: 'React & Component Architecture Engine',
        badgeLabel: 'React / JSX',
        badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
      };
    case 'SystemDesign':
      return {
        categoryType: 'SystemDesign',
        displayTitle: 'Distributed System Design Architecture',
        badgeLabel: 'System Design',
        badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800'
      };
    case 'Database':
      return {
        categoryType: 'Database',
        displayTitle: 'Relational Database & SQL Query Sandbox',
        badgeLabel: 'SQL / DBMS',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800'
      };
    case 'CoreCS':
      return {
        categoryType: 'CoreCS',
        displayTitle: 'Core CS (OS, Networks, OOPs) Theory Guide',
        badgeLabel: 'Core CS Subjects',
        badgeColor: 'bg-blue-950 text-blue-300 border-blue-800'
      };
    case 'DSA':
    default:
      return {
        categoryType: 'DSA',
        displayTitle: 'DSA Algorithm & Code Execution Engine',
        badgeLabel: 'DSA Sheet',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800'
      };
  }
}
