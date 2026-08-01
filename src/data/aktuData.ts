export interface AKTUBranch {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface AKTUUnit {
  unitNumber: number;
  unitName: string;
  topics: string[];
}

export interface AKTUSubject {
  id: string;
  code: string;
  name: string;
  branchId: string;
  semester: number;
  year: number;
  credits: number;
  category: 'Core' | 'Elective' | 'Lab' | 'Mandatory';
  units: AKTUUnit[];
  importantQuestions: string[];
}

export interface QuestionBankItem {
  id: string;
  subjectCode: string;
  unitNumber: number;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  question: string;
  expectedAnswer: string;
  keywords: string[];
  explanation: string;
}

export const AKTU_BATCHES = [
  '2021-2025',
  '2022-2026',
  '2023-2027',
  '2024-2028',
  '2025-2029',
  '2026-2030'
];

export const AKTU_SCHEMES = [
  'NEP-2020 Scheme (Latest 2023+ Curriculum)',
  'Choice Based Credit System (CBCS)',
  'Autonomous College Custom Scheme'
];

export const AKTU_ADMISSION_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
export const AKTU_PASSING_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

export const AKTU_BRANCHES: AKTUBranch[] = [
  { id: 'it', code: 'IT', name: 'Information Technology', description: 'Core software, networking, web technology & data systems' },
  { id: 'cse', code: 'CSE', name: 'Computer Science & Engineering', description: 'Algorithms, computing systems & software engineering' },
  { id: 'cse_ai', code: 'CSE-AI', name: 'CSE - Artificial Intelligence', description: 'Specialization in AI, machine reasoning & neural models' },
  { id: 'cse_ds', code: 'CSE-DS', name: 'CSE - Data Science', description: 'Specialization in big data analytics & statistical learning' },
  { id: 'aiml', code: 'AIML', name: 'AI & Machine Learning', description: 'Deep learning, computer vision & NLP systems' },
  { id: 'ece', code: 'ECE', name: 'Electronics & Communication', description: 'Signals, microprocessors & communication engineering' },
  { id: 'ee', code: 'EE', name: 'Electrical Engineering', description: 'Power systems, electrical machines & control logic' },
  { id: 'me', code: 'ME', name: 'Mechanical Engineering', description: 'Thermodynamics, fluid mechanics & machine design' },
  { id: 'ce', code: 'CE', name: 'Civil Engineering', description: 'Structural analysis, surveying & construction materials' },
];

export const AKTU_SUBJECTS: AKTUSubject[] = [
  // Semester 1 & 2 - First Year Common Foundation
  {
    id: 'bas101',
    code: 'BAS101',
    name: 'Engineering Physics',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Relativistic Mechanics', topics: ['Frame of Reference', 'Michelson-Morley Experiment', 'Lorentz Transformation', 'Mass-Energy Equivalence'] },
      { unitNumber: 2, unitName: 'Electromagnetic Field Theory', topics: ['Gauss Law', 'Ampere Law', 'Maxwell Equations', 'Poynting Vector & Electromagnetic Waves'] },
      { unitNumber: 3, unitName: 'Quantum Mechanics', topics: ['De-Broglie Waves', 'Heisenberg Uncertainty Principle', 'Schrodinger Wave Equation', 'Particle in 1D Box'] },
      { unitNumber: 4, unitName: 'Wave Optics', topics: ['Interference in Thin Films', 'Newton Rings', 'Diffraction at Single & Double Slit', 'Polarization & Fresnel'] },
      { unitNumber: 5, unitName: 'Fiber Optics & Lasers', topics: ['Acceptance Angle & Numerical Aperture', 'Optical Fiber Types & Attenuation', 'Laser Spontaneous & Stimulated Emission', 'Ruby & He-Ne Laser'] }
    ],
    importantQuestions: [
      'Derive Lorentz transformation equations for space and time coordinates.',
      'State Maxwell equations in differential and integral form and explain Poynting vector.',
      'Solve Schrodinger time-independent wave equation for a particle trapped in a 1D potential box.',
      'Explain the construction and working of Ruby laser with suitable energy level diagram.',
      'Derive expression for Acceptance Angle and Numerical Aperture in an Optical Fiber.'
    ]
  },
  {
    id: 'bas102',
    code: 'BAS102',
    name: 'Engineering Chemistry',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Atomic & Molecular Structure', topics: ['Molecular Orbital Theory (MOT)', 'MO Diagrams for N2, O2, CO, NO', 'Band Theory of Solids', 'Nanomaterials & Fullerenes'] },
      { unitNumber: 2, unitName: 'Spectroscopic Techniques & Applications', topics: ['UV-Vis Spectroscopy & Beer-Lambert Law', 'IR Spectroscopy & Molecular Vibrations', 'NMR Spectroscopy Basic Principles', 'Mass Spectrometry Overview'] },
      { unitNumber: 3, unitName: 'Electrochemistry & Corrosion', topics: ['Nernst Equation & Electrochemical Cells', 'Corrosion Mechanisms (Dry & Wet)', 'Pilling-Bedworth Rule', 'Corrosion Control & Cathodic Protection'] },
      { unitNumber: 4, unitName: 'Water Technology & Boiler Troubles', topics: ['Hardness of Water & Units (PPM)', 'EDTA Method for Hardness Estimation', 'Zeolite & Ion-Exchange Softening Processes', 'Boiler Corrosion, Scale & Sludge Formation'] },
      { unitNumber: 5, unitName: 'Polymers & Organometallics', topics: ['Classification & Synthesis of Polymers (Nylon, Teflon, Bakelite)', 'Conducting Polymers & Polymer Blends', 'Organometallic Compounds & Grignard Reagent', 'Green Chemistry Principles'] }
    ],
    importantQuestions: [
      'Draw MO energy level diagram for O2 molecule and calculate its bond order.',
      'Explain Beer-Lambert law and derive mathematical expression for absorbance.',
      'Explain mechanism of electrochemical corrosion with equations.',
      'Calculate total hardness of water sample determined by EDTA titration method.',
      'Explain Zeolite process for softening hard water with chemical reactions.'
    ]
  },
  {
    id: 'bas101',
    code: 'BAS101',
    name: 'Engineering Mathematics-I',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Matrices & Linear Algebra', topics: ['Elementary Row Transformation', 'Rank of Matrix & Consistency of Linear Equations', 'Eigenvalues & Eigenvectors', 'Cayley-Hamilton Theorem & Matrix Inverse'] },
      { unitNumber: 2, unitName: 'Differential Calculus - I', topics: ['Leibnitz Theorem for nth Derivative', 'Partial Differentiation & Euler Theorem', 'Total Derivatives & Chain Rule', 'Expansion of Functions by Taylor & Maclaurin Series'] },
      { unitNumber: 3, unitName: 'Differential Calculus - II', topics: ['Jacobians & Functional Dependence', 'Maxima & Minima of Two Variables', 'Lagrange Multipliers Method', 'Errors & Approximations'] },
      { unitNumber: 4, unitName: 'Multiple Integrals', topics: ['Double & Triple Integrals', 'Change of Order of Integration', 'Change of Variables (Cartesian to Polar)', 'Beta & Gamma Functions'] },
      { unitNumber: 5, unitName: 'Vector Calculus', topics: ['Gradient, Divergence & Curl', 'Directional Derivatives & Vector Identities', 'Line, Surface & Volume Integrals', 'Gauss Divergence, Green & Stokes Theorems'] }
    ],
    importantQuestions: [
      'Verify Cayley-Hamilton theorem for a 3x3 matrix and find its inverse.',
      'State and prove Leibnitz theorem for nth derivative of product of two functions.',
      'Find the maxima and minima of f(x, y) = x^3 + y^3 - 3axy.',
      'Evaluate double integral by changing the order of integration.',
      'Verify Stokes theorem for F = (x^2 + y^2)i - 2xyj around rectangle.'
    ]
  },
  {
    id: 'bas201',
    code: 'BAS201',
    name: 'Engineering Mathematics-II',
    branchId: 'common',
    semester: 2,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Ordinary Differential Equations of Higher Order', topics: ['Linear DE with Constant Coefficients', 'Cauchy-Euler & Legendre Equations', 'Method of Variation of Parameters', 'Simultaneous Linear Differential Equations'] },
      { unitNumber: 2, unitName: 'Multivariable Calculus & Infinite Series', topics: ['Convergence & Divergence of Infinite Series', 'Ratio Test, Rabbe Test & Integral Test', 'Fourier Series Expansion', 'Half-Range Sine & Cosine Series'] },
      { unitNumber: 3, unitName: 'Complex Variable - Differentiation', topics: ['Analytic Functions & Cauchy-Riemann (C-R) Equations', 'Harmonic Functions & Conjugates', 'Milne-Thomson Method', 'Conformal Mapping & Bilinear Transformations'] },
      { unitNumber: 4, unitName: 'Complex Variable - Integration', topics: ['Cauchy Integral Theorem & Formula', 'Taylor & Laurent Series Expansions', 'Singularities & Residues Evaluation', 'Cauchy Residue Theorem'] },
      { unitNumber: 5, unitName: 'Laplace Transform & Applications', topics: ['Laplace Transform Properties', 'Inverse Laplace Transform & Convolution Theorem', 'Unit Step & Dirac Delta Functions', 'Solving DEs using Laplace Transform'] }
    ],
    importantQuestions: [
      'Solve linear differential equation using Method of Variation of Parameters.',
      'Find Fourier series for f(x) = x^2 in interval (-pi, pi).',
      'Show that f(z) = z^2 is analytic and satisfy Cauchy-Riemann equations.',
      'Evaluate contour integral using Cauchy Residue Theorem.',
      'Solve second order DE with initial conditions using Laplace Transform.'
    ]
  },
  {
    id: 'bcs101',
    code: 'BCS101',
    name: 'Programming for Problem Solving (C)',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Introduction to Programming & Flowcharts', topics: ['Computer Hardware Architecture', 'Algorithms & Flowchart Logic', 'Compilation Pipeline', 'Basic Tokens & Data Types'] },
      { unitNumber: 2, unitName: 'Control Structures & Loops', topics: ['If-Else Conditionals', 'Switch Case Statements', 'For, While, Do-While Loops', 'Break & Continue Statements'] },
      { unitNumber: 3, unitName: 'Functions and Arrays', topics: ['1D and 2D Array Memory Mapping', 'User Defined Functions', 'Call by Value vs Call by Reference', 'Recursion & Stack Frames'] },
      { unitNumber: 4, unitName: 'Pointers & Memory Allocation', topics: ['Pointer Arithmetic & Address Operator', 'Pointers to Arrays & Functions', 'Dynamic Memory Allocation (malloc, calloc, realloc, free)', 'Dangling Pointers'] },
      { unitNumber: 5, unitName: 'Structures, Unions & File I/O', topics: ['Structure Syntax & Memory Alignment', 'Difference between Structure and Union', 'File Pointers & Modes (r, w, a)', 'Fscanf, Fprintf, Fgetc, Fputc Operations'] }
    ],
    importantQuestions: [
      'Explain call by value and call by reference in C programming with code examples.',
      'Write a C program to perform matrix multiplication of two 3x3 matrices using 2D arrays.',
      'Differentiate between malloc() and calloc() dynamic memory allocation functions.',
      'Explain structures vs unions with memory layout representation.',
      'Write a C program to copy the contents of one text file to another using file pointers.'
    ]
  },
  {
    id: 'bee101',
    code: 'BEE101',
    name: 'Basic Electrical Engineering',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'DC Circuits & Network Theorems', topics: ['KCL & KVL Laws', 'Mesh & Nodal Analysis', 'Thevenin Theorem & Norton Theorem', 'Superposition & Maximum Power Transfer Theorems'] },
      { unitNumber: 2, unitName: 'AC Circuits Fundamentals', topics: ['Sinusoidal Waveforms, RMS & Average Values', 'Phasor Representation of R, L, C', 'Single-Phase Series R-L, R-C, R-L-C Circuits', 'Resonance in Series & Parallel AC Circuits'] },
      { unitNumber: 3, unitName: 'Transformers', topics: ['Single Phase Transformer Construction & Principle', 'EMF Equation & Ideal Transformer', 'Equivalent Circuit & Phasor Diagrams', 'Losses, Efficiency & Open/Short Circuit Tests'] },
      { unitNumber: 4, unitName: 'Electrical Machines', topics: ['DC Generators & Motors Principle', '3-Phase Induction Motor Construction & Rotating Magnetic Field', 'Slip & Torque-Speed Characteristics', 'Synchronous Generator Basics'] },
      { unitNumber: 5, unitName: 'Electrical Installations & Batteries', topics: ['Switchgear Components (MCB, ELCB, Fuses)', 'Earthing & Grounding Importance', 'Types of Wires & Cables', 'Battery Types & Energy Storage'] }
    ],
    importantQuestions: [
      'State and prove Thevenin Theorem with circuit example.',
      'Derive expression for resonant frequency and Q-factor in series RLC circuit.',
      'Derive EMF equation of a single phase transformer.',
      'Explain construction and working principle of 3-Phase Squirrel Cage Induction Motor.',
      'Explain why earthing is essential for electrical installations.'
    ]
  },
  {
    id: 'bec101',
    code: 'BEC101',
    name: 'Basic Electronics Engineering',
    branchId: 'common',
    semester: 2,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Semiconductor Diodes & Applications', topics: ['PN Junction Diode V-I Characteristics', 'Half Wave & Full Wave Bridge Rectifiers', 'Zener Diode as Voltage Regulator', 'Light Emitting Diode (LED) & Photodiode'] },
      { unitNumber: 2, unitName: 'Bipolar Junction Transistors (BJT)', topics: ['BJT Construction & CE, CB, CC Configurations', 'Transistor Biasing & Operating Point (Q-Point)', 'BJT as an Amplifier & Switch', 'Input & Output V-I Characteristics'] },
      { unitNumber: 3, unitName: 'Field Effect Transistors (FET)', topics: ['JFET Construction & Working', 'MOSFET Types (Depletion & Enhancement)', 'MOSFET V-I Characteristics', 'Comparison of BJT, JFET & MOSFET'] },
      { unitNumber: 4, unitName: 'Operational Amplifiers (Op-Amp)', topics: ['Ideal Op-Amp Characteristics & Pin Layout', 'Inverting & Non-Inverting Amplifiers', 'Summing Amplifier, Integrator & Differentiator', 'Op-Amp as Voltage Follower & Comparator'] },
      { unitNumber: 5, unitName: 'Digital Electronics & Instruments', topics: ['Number Systems & Binary Conversions', 'Logic Gates & Boolean Postulates', 'De Morgan Theorems', 'Cathode Ray Oscilloscope (CRO) & Digital Multimeter'] }
    ],
    importantQuestions: [
      'Explain Full Wave Bridge Rectifier with circuit diagram and calculate efficiency.',
      'Draw and explain input/output characteristics of BJT in Common Emitter configuration.',
      'Explain Op-Amp as Integrator and Differentiator with circuit diagrams.',
      'Differentiate between BJT, JFET, and MOSFET.',
      'State and prove De Morgan laws of Boolean algebra.'
    ]
  },
  {
    id: 'bme101',
    code: 'BME101',
    name: 'Basic Mechanical Engineering',
    branchId: 'common',
    semester: 2,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Thermodynamics Foundations', topics: ['System, Boundary, State & Zeroth Law', 'First Law of Thermodynamics & Joule Experiment', 'Second Law (Kelvin-Planck & Clausius Statements)', 'Entropy & Carnot Engine Cycle'] },
      { unitNumber: 2, unitName: 'IC Engines & Power Plants', topics: ['2-Stroke vs 4-Stroke Petrol (Spark Ignition) Engines', '4-Stroke Diesel (Compression Ignition) Engines', 'Steam Power Plant Layout & Boilers', 'Refrigeration Cycle & Air Conditioners'] },
      { unitNumber: 3, unitName: 'Engineering Materials & Properties', topics: ['Classification of Ferrous & Non-Ferrous Metals', 'Stress-Strain Diagram for Mild Steel', 'Mechanical Properties (Ductility, Malleability, Hardness)', 'Heat Treatment Processes'] },
      { unitNumber: 4, unitName: 'Measurement & Automation Tools', topics: ['Vernier Caliper, Micrometer & Dial Gauges', 'Temperature Measurement (Thermocouples)', 'Sensors, Actuators & Industrial Automation', 'Mechatronics Systems Overview'] },
      { unitNumber: 5, unitName: 'Manufacturing Processes', topics: ['Casting & Mold Construction', 'Forging, Rolling & Extrusion Metal Forming', 'Welding Techniques (SMAW, TIG, MIG)', 'Machining Operations (Lathe, Drilling, Milling)'] }
    ],
    importantQuestions: [
      'State First and Second laws of thermodynamics.',
      'Differentiate between 4-stroke Petrol and 4-stroke Diesel engines.',
      'Draw stress-strain diagram for mild steel under tension and explain key points.',
      'Explain TIG and MIG arc welding processes with neat sketches.',
      'Describe working of Carnot engine cycle and calculate efficiency.'
    ]
  },
  {
    id: 'bce101',
    code: 'BCE101',
    name: 'Basic Civil Engineering & Mechanics',
    branchId: 'common',
    semester: 2,
    year: 1,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Building Construction Materials', topics: ['Bricks Classification & Testing', 'Cement Types, Grade & Hydration', 'Concrete Mix Ratios & Compressive Strength', 'Timber & Structural Steel'] },
      { unitNumber: 2, unitName: 'Surveying & Levelling', topics: ['Principles of Surveying & Chain Surveying', 'Compass Surveying & Bearing Calculations', 'Levelling Instruments & Reduced Levels', 'GPS & GIS Modern Mapping Tools'] },
      { unitNumber: 3, unitName: 'Engineering Mechanics - Force Systems', topics: ['Lami Theorem & Resultant of Coplanar Forces', 'Free Body Diagrams (FBD)', 'Equilibrium Conditions', 'Friction Laws & Wedge Friction'] },
      { unitNumber: 4, unitName: 'Trusses & Centroid / Moment of Inertia', topics: ['Analysis of Perfect Trusses (Method of Joints)', 'Centroid of Plane Figures (I, T, L Sections)', 'Moment of Inertia (Parallel & Perpendicular Axis Theorems)', 'Radius of Gyration'] },
      { unitNumber: 5, unitName: 'Environmental Civil Engineering', topics: ['Water Supply & Quality Parameters', 'Rainwater Harvesting Systems', 'Green Building & GRIHA Ratings', 'Solid Waste Management'] }
    ],
    importantQuestions: [
      'State and prove Lami Theorem for coplanar concurrent forces.',
      'Calculate centroid and moment of inertia for an unsymmetrical I-section.',
      'Determine member forces in a truss using Method of Joints.',
      'Explain principles of surveying and levelling with R.L calculation.',
      'Describe components and benefits of Rainwater Harvesting system.'
    ]
  },
  {
    id: 'bas104',
    code: 'BAS104',
    name: 'Environment & Ecology',
    branchId: 'common',
    semester: 1,
    year: 1,
    credits: 3,
    category: 'Mandatory',
    units: [
      { unitNumber: 1, unitName: 'Ecosystems & Biodiversity', topics: ['Abiotic & Biotic Components', 'Food Chains, Food Webs & Ecological Pyramids', 'Biodiversity Hotspots & Conservation (In-situ & Ex-situ)', 'Ecosystem Services'] },
      { unitNumber: 2, unitName: 'Air & Water Pollution', topics: ['Air Pollutants (PM2.5, SOx, NOx) & Smog', 'Greenhouse Effect & Global Warming', 'Acid Rain & Ozone Layer Depletion', 'Water Quality Parameters (BOD, COD) & Eutrophication'] },
      { unitNumber: 3, unitName: 'Noise, Soil & E-Waste Management', topics: ['Noise Level Standards & Health Impact', 'Soil Degradation & Pesticides', 'E-Waste Hazards & Disposal Technologies', 'Plastic & Bio-medical Waste Rules'] },
      { unitNumber: 4, unitName: 'Renewable Energy & Sustainability', topics: ['Solar Photovoltaic & Solar Thermal Power', 'Wind, Biomass & Hydro Energy', 'Sustainable Development Goals (SDGs)', 'Carbon Footprint & Auditing'] },
      { unitNumber: 5, unitName: 'Environmental Legislation & Acts', topics: ['Environment Protection Act 1986', 'Air & Water Pollution Prevention Acts', 'National Green Tribunal (NGT)', 'Environmental Impact Assessment (EIA)'] }
    ],
    importantQuestions: [
      'Explain ecological pyramids of number, biomass, and energy with diagrams.',
      'Differentiate between Biochemical Oxygen Demand (BOD) and Chemical Oxygen Demand (COD).',
      'Explain mechanism of Ozone Layer Depletion and role of CFCs.',
      'Discuss E-waste composition, environmental hazards, and recycling methods.',
      'Explain Environmental Impact Assessment (EIA) steps for industrial projects.'
    ]
  },
  {
    id: 'bas105',
    code: 'BAS105',
    name: 'Soft Skills & Technical Communication',
    branchId: 'common',
    semester: 2,
    year: 1,
    credits: 3,
    category: 'Mandatory',
    units: [
      { unitNumber: 1, unitName: 'Fundamentals of Technical Communication', topics: ['Communication Process & Barriers', '7 Cs of Effective Business Communication', 'Verbal vs Non-Verbal Body Language', 'Kinesics, Proxemics & Paralanguage'] },
      { unitNumber: 2, unitName: 'Professional Speaking & Presentation', topics: ['Public Speaking & Stage Fright Management', 'Group Discussion (GD) Strategies', 'Job Interview Techniques & STAR Method', 'Presentation Design & Visual Aids'] },
      { unitNumber: 3, unitName: 'Technical Writing & Documentation', topics: ['Business Email Etiquette & Letters', 'Technical Report Writing Layout', 'Resume & Curriculum Vitae (CV) Drafting', 'Research Paper Abstract Writing'] },
      { unitNumber: 4, unitName: 'Reading & Comprehension', topics: ['Skimming & Scanning Techniques', 'Critical Reading & Inference', 'Vocabulary Enrichment & Idioms', 'Précis & Executive Summary Writing'] },
      { unitNumber: 5, unitName: 'Personality Development & Ethics', topics: ['Interpersonal Skills & Emotional Intelligence (EQ)', 'Time Management & Prioritization', 'Professional Ethics & Workplace Etiquette', 'Stress Management'] }
    ],
    importantQuestions: [
      'Explain 7 Cs of effective technical communication with examples.',
      'Differentiate between Kinesics, Proxemics, and Chronemics in non-verbal communication.',
      'Draft a professional cover letter and resume for Software Engineering campus placement.',
      'Explain STAR method for answering behavioral interview questions.',
      'Describe strategies for active participation and leadership in Group Discussions.'
    ]
  },

  // Semester 3 & 4 - Second Year Core & Common
  {
    id: 'kve301',
    code: 'KVE301',
    name: 'Universal Human Values & Professional Ethics (UHV)',
    branchId: 'common',
    semester: 3,
    year: 2,
    credits: 3,
    category: 'Mandatory',
    units: [
      { unitNumber: 1, unitName: 'Self-Exploration & Harmony in Myself', topics: ['Process of Self-Exploration', 'Continuous Happiness & Prosperity', 'Understanding Myself (I) and Body (Samyam & Swasthya)', 'Desires, Thoughts & Expectations'] },
      { unitNumber: 2, unitName: 'Harmony in Family & Society', topics: ['Trust (Vishwas) & Respect (Samman) in Relationships', 'Justice & Universal Human Order', 'Divided vs Undivided Society', '9 Universal Values'] },
      { unitNumber: 3, unitName: 'Harmony in Nature & Existence', topics: ['4 Orders in Nature (Material, Plant, Animal, Human)', 'Mutual Fulfillment (Parasparikta)', 'Existence as Co-existence (Saha-astitva)', 'Holistic Perception'] },
      { unitNumber: 4, unitName: 'Professional Ethics & Competence', topics: ['Definitiveness of Ethical Human Conduct', 'Humanistic Education & Management Models', 'Issues in Professional Ethics', 'Salient Features of Holistic Technologies'] },
      { unitNumber: 5, unitName: 'Holistic Vision & Transition Strategy', topics: ['Transition from Present State to Universal Human Order', 'Case Studies in Professional Ethics', 'Sustainable Models of Living', 'Self-Actualization'] }
    ],
    importantQuestions: [
      'Explain process of self-exploration with a block diagram.',
      'Differentiate between needs of Self (I) and needs of Body with examples.',
      'Explain Trust (Vishwas) as the foundational value in relationships.',
      'Describe 4 orders in nature and mutual fulfillment among them.',
      'Discuss ethical issues in modern engineering profession and solutions.'
    ]
  },
  {
    id: 'bas301',
    code: 'BAS301 / KAS302',
    name: 'Engineering Mathematics-IV',
    branchId: 'common',
    semester: 3,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Partial Differential Equations (PDE)', topics: ['Formulation of PDE', 'First Order Linear PDE (Lagrange Method)', 'Non-linear PDE (Charpit Method)', 'Linear PDE with Constant Coefficients'] },
      { unitNumber: 2, unitName: 'Applications of PDE', topics: ['Method of Separation of Variables', '1D Wave Equation (Vibrating String)', '1D Heat Conduction Equation', '2D Laplace Equation in Rectangular Coordinates'] },
      { unitNumber: 3, unitName: 'Integral Transforms (Fourier Transform)', topics: ['Fourier Integral Formula', 'Fourier Sine & Cosine Transforms', 'Properties of Fourier Transform', 'Applications to Boundary Value Problems'] },
      { unitNumber: 4, unitName: 'Z-Transform & Applications', topics: ['Definition & Region of Convergence (ROC)', 'Properties of Z-Transform', 'Inverse Z-Transform Methods', 'Solving Difference Equations using Z-Transform'] },
      { unitNumber: 5, unitName: 'Statistical Techniques & Curve Fitting', topics: ['Moments, Skewness & Kurtosis', 'Curve Fitting by Least Squares (Line, Parabola)', 'Correlation & Linear Regression Equations', 'Spearman Rank Correlation'] }
    ],
    importantQuestions: [
      'Solve PDE using Lagrange method: p(x^2 - yz) + q(y^2 - zx) = z^2 - xy.',
      'Solve 1D heat equation u_t = c^2 u_xx subject to boundary conditions using separation of variables.',
      'Find Fourier transform of e^(-a|x|).',
      'Find inverse Z-transform using Partial Fraction method.',
      'Fit a straight line y = a + bx to given bivariate data by least squares method.'
    ]
  },
  {
    id: 'kcs301',
    code: 'KCS301',
    name: 'Data Structures',
    branchId: 'it',
    semester: 3,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Introduction to Data Structures & Arrays', topics: ['Asymptotic Notations', 'Array Operations & Address Calculation', 'Sparse Matrices', 'Recursion & Tail Recursion'] },
      { unitNumber: 2, unitName: 'Stacks and Queues', topics: ['Stack ADT & Applications', 'Infix to Postfix Conversion', 'Queue ADT & Circular Queues', 'Priority Queues & Deque'] },
      { unitNumber: 3, unitName: 'Linked Lists', topics: ['Singly Linked List Operations', 'Doubly & Circular Linked Lists', 'Polynomial Representation using Linked Lists', 'Header Linked Lists'] },
      { unitNumber: 4, unitName: 'Trees and Graphs', topics: ['Binary Trees & Traversals', 'Binary Search Trees (BST)', 'AVL Trees & Rotations', 'Graph Traversals (BFS & DFS)', 'Spanning Trees (Kruskal & Prim)'] },
      { unitNumber: 5, unitName: 'Sorting and Searching', topics: ['Searching Techniques (Binary & Hash Search)', 'Sorting Algorithms (Quick, Merge, Heap Sort)', 'Hashing & Collision Resolution', 'File Organization'] }
    ],
    importantQuestions: [
      'Explain asymptotic notation Big-O, Omega, and Theta with examples.',
      'Differentiate between stack and queue ADT with real-world applications.',
      'How does rotation work in AVL trees? Explain Left-Left (LL) and Right-Left (RL) rotations.',
      'Write and explain the QuickSort algorithm and analyze its time complexity in best, average, and worst cases.',
      'What is hashing? Explain separate chaining and open addressing collision resolution strategies.'
    ]
  },
  {
    id: 'kcs302',
    code: 'KCS302',
    name: 'Computer System Architecture (COA)',
    branchId: 'it',
    semester: 3,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Register Transfer & Microoperations', topics: ['Bus Architecture & Common Bus System', 'Arithmetic Microoperations', 'Logic & Shift Microoperations', 'Instruction Codes & Formats'] },
      { unitNumber: 2, unitName: 'Basic Computer Organization & Control Unit', topics: ['Instruction Cycle & Interrupts', 'Hardwired vs Microprogrammed Control Unit', 'Control Memory & Address Sequencing', 'Microinstruction Formats'] },
      { unitNumber: 3, unitName: 'Computer Arithmetic Algorithms', topics: ['Booth Multiplication Algorithm', 'Restoring & Non-Restoring Division', 'IEEE 754 Floating Point Representation', 'Floating Point Arithmetic'] },
      { unitNumber: 4, unitName: 'Memory Hierarchy & Organization', topics: ['Cache Memory & Mapping Techniques (Direct, Associative, Set-Associative)', 'Virtual Memory & Page Tables', 'Cache Coherence & Write Policies', 'RAM & ROM Architecture'] },
      { unitNumber: 5, unitName: 'Input-Output Organization & Pipelining', topics: ['Peripheral Devices & I/O Interfaces', 'Asynchronous Data Transfer', 'Direct Memory Access (DMA)', 'Instruction & Arithmetic Pipelining', 'RISC vs CISC Architecture'] }
    ],
    importantQuestions: [
      'Explain Booth multiplication algorithm with flow chart and multiply 5 by -3.',
      'Compare Hardwired Control Unit and Microprogrammed Control Unit.',
      'Explain Cache Mapping techniques: Direct Mapping, Associative Mapping, and Set-Associative Mapping.',
      'Describe DMA Controller working with neat block diagram.',
      'Explain instruction pipeline stages and pipeline hazards (Data, Control, Structural).'
    ]
  },
  {
    id: 'kcs303',
    code: 'KCS303',
    name: 'Discrete Structures & Theory of Logic (DSTL)',
    branchId: 'it',
    semester: 3,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Set Theory, Relations & Functions', topics: ['Set Operations & Power Sets', 'Equivalence Relations & Partial Orders', 'Hasse Diagrams', 'Functions & Pigeonhole Principle'] },
      { unitNumber: 2, unitName: 'Algebraic Structures & Group Theory', topics: ['Semi-Groups & Monoids', 'Groups, Subgroups & Lagrange Theorem', 'Cyclic Groups & Permutation Groups', 'Rings & Fields'] },
      { unitNumber: 3, unitName: 'Propositional & Predicate Logic', topics: ['Logical Connectives & Truth Tables', 'Tautologies & Contradictions', 'Normal Forms (CNF & DNF)', 'Predicate Logic & Quantifiers'] },
      { unitNumber: 4, unitName: 'Lattices & Boolean Algebra', topics: ['Lattice Properties & Sublattices', 'Bounded & Complemented Lattices', 'Boolean Algebra & Duality', 'K-Map Simplification'] },
      { unitNumber: 5, unitName: 'Combinatorics & Recurrence Relations', topics: ['Permutations & Combinations', 'Generating Functions', 'Solving Homogeneous Recurrence Relations', 'Master Theorem'] }
    ],
    importantQuestions: [
      'State and prove Lagrange theorem for finite groups.',
      'Draw Hasse diagram for poset (D36, |) where D36 is the set of divisors of 36.',
      'Convert the given statement into DNF and CNF normal forms.',
      'Solve the recurrence relation a_n - 7a_{n-1} + 10a_{n-2} = 0 with initial conditions.',
      'Explain Complemented and Distributive Lattices with examples.'
    ]
  },
  {
    id: 'kec301',
    code: 'KEC301',
    name: 'Analog Circuits & Devices',
    branchId: 'ece',
    semester: 3,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Diode Circuits & Special Diodes', topics: ['PN Junction Small Signal Model', 'Clipper & Clamper Circuits', 'Varactor, Tunnel & Schottky Diodes', 'Zener Voltage Regulator'] },
      { unitNumber: 2, unitName: 'BJT Amplifiers & Frequency Response', topics: ['Hybrid Pi Model', 'CE Amplifier Small Signal Analysis', 'High Frequency Response & Miller Theorem', 'Multistage Amplifiers'] },
      { unitNumber: 3, unitName: 'MOSFET Amplifiers', topics: ['MOSFET Small Signal Model', 'Common Source & Common Drain Amplifiers', 'Biasing Techniques in Integrated Circuits', 'CMOS Inverter Basics'] },
      { unitNumber: 4, unitName: 'Feedback Amplifiers & Oscillators', topics: ['Feedback Topologies (Voltage/Current Series & Shunt)', 'Barkhausen Criterion', 'RC Phase Shift & Wien Bridge Oscillators', 'Hartley & Colpitts Oscillators'] },
      { unitNumber: 5, unitName: 'Power Amplifiers & Tuned Amplifiers', topics: ['Class A, B, AB & C Power Amplifiers', 'Push-Pull Amplifier & Crossover Distortion', 'Tuned Amplifiers & Q-Factor', '555 Timer Applications'] }
    ],
    importantQuestions: [
      'Analyze Common Emitter amplifier using Hybrid-Pi model for voltage gain.',
      'Explain negative feedback advantages on amplifier bandwidth and noise.',
      'State Barkhausen criterion and derive frequency of RC Phase Shift oscillator.',
      'Explain Class B Push-Pull amplifier working and calculate maximum efficiency.',
      'Design astable multivibrator using IC 555 timer.'
    ]
  },
  {
    id: 'kcs401',
    code: 'KCS401',
    name: 'Operating Systems',
    branchId: 'it',
    semester: 4,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'OS Overview & System Calls', topics: ['Operating System Functions & Types', 'Dual Mode Operation & Kernel Architecture', 'System Calls & OS Structure', 'Process State Transition Diagram'] },
      { unitNumber: 2, unitName: 'Process Scheduling & Threads', topics: ['CPU Scheduling Criteria', 'FCFS, SJF, Priority & Round Robin Scheduling', 'Multithreading Models & Thread Libraries', 'Process Control Block (PCB)'] },
      { unitNumber: 3, unitName: 'Process Synchronization & Deadlocks', topics: ['Critical Section Problem & Peterson Solution', 'Semaphores & Mutex Locks', 'Classical Sync Problems (Producer-Consumer, Dining Philosophers)', 'Deadlock Handling & Banker Algorithm'] },
      { unitNumber: 4, unitName: 'Memory Management', topics: ['Logical vs Physical Address Space', 'Paging & Segmentation Architecture', 'Page Replacement Algorithms (FIFO, LRU, Optimal)', 'Thrashing & Belady Anomaly'] },
      { unitNumber: 5, unitName: 'File Systems & Storage', topics: ['File Concept, Access Methods & Directory Structure', 'Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)', 'RAID Levels & Storage Hardware', 'I/O Hardware & Device Drivers'] }
    ],
    importantQuestions: [
      'Draw and explain 5-state process transition model in OS.',
      'Explain Banker Algorithm for Deadlock Avoidance with a numerical example.',
      'Solve CPU scheduling for FCFS, SJF, and Round Robin and calculate average waiting time.',
      'Explain Page Replacement algorithms FIFO, LRU, and Optimal with page trace.',
      'Compare SCAN and C-SCAN disk scheduling algorithms.'
    ]
  },
  {
    id: 'kcs402',
    code: 'KCS402',
    name: 'Theory of Automata & Formal Languages (TAFL)',
    branchId: 'it',
    semester: 4,
    year: 2,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Finite Automata', topics: ['DFA and NFA Formal Definitions', 'NFA to DFA Conversion', 'Epsilon-NFA & Minimization of DFA', 'Moore & Mealy Machines'] },
      { unitNumber: 2, unitName: 'Regular Languages & Expressions', topics: ['Regular Expressions & Arden Theorem', 'Pumping Lemma for Regular Languages', 'Closure Properties of Regular Sets', 'DFA Construction'] },
      { unitNumber: 3, unitName: 'Context-Free Grammars (CFG)', topics: ['CFG Definition & Derivation Trees', 'Ambiguity in Grammars', 'Chomsky Normal Form (CNF)', 'Greibach Normal Form (GNF)'] },
      { unitNumber: 4, unitName: 'Pushdown Automata (PDA)', topics: ['Deterministic and Non-Deterministic PDA', 'PDA Acceptance by Final State & Empty Stack', 'Equivalence of PDA and CFG', 'Pumping Lemma for CFL'] },
      { unitNumber: 5, unitName: 'Turing Machines & Undecidability', topics: ['Turing Machine Formal Definition & Design', 'Variations of Turing Machines', 'Church-Turing Thesis', 'Halting Problem & PCP Problem'] }
    ],
    importantQuestions: [
      'Convert given NFA to equivalent DFA and minimize it.',
      'State and prove Arden Theorem for regular expressions.',
      'Convert the given Context Free Grammar into Chomsky Normal Form (CNF).',
      'Design a PDA for language L = { a^n b^n | n >= 1 }.',
      'Explain Turing Machine model and prove that Halting Problem is undecidable.'
    ]
  },
  {
    id: 'kcs403',
    code: 'KCS403',
    name: 'Python Programming',
    branchId: 'it',
    semester: 4,
    year: 2,
    credits: 3,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Python Basics & Control Flow', topics: ['Data Types (Int, Float, String, List, Tuple, Dict)', 'Operators & Expression Evaluation', 'If-Else Conditionals', 'For & While Loops with Range'] },
      { unitNumber: 2, unitName: 'Functions, Modules & Packages', topics: ['Lambda Expressions', 'Map, Filter & Reduce Functions', 'Module Import System', 'Standard Libraries (math, random, sys, os)'] },
      { unitNumber: 3, unitName: 'Object Oriented Python', topics: ['Classes & Object Creation', 'Self Parameter & __init__ Constructor', 'Inheritance & Method Overriding', 'Encapsulation & Polymorphism'] },
      { unitNumber: 4, unitName: 'File Handling & Exception Management', topics: ['File Reading & Writing Modes', 'Context Managers (with statement)', 'Try, Except, Else, Finally Blocks', 'Custom Exceptions'] },
      { unitNumber: 5, unitName: 'Data Science Packages Basics', topics: ['NumPy Arrays & Vectorized Operations', 'Pandas Series & DataFrame Manipulation', 'Matplotlib Data Plotting', 'Scipy Overview'] }
    ],
    importantQuestions: [
      'Differentiate between List, Tuple, and Dictionary in Python with code examples.',
      'Explain lambda functions and map(), filter(), reduce() higher order functions.',
      'Demonstrate object-oriented inheritance and method overriding in Python.',
      'Write a Python script to handle file read/write exceptions gracefully.',
      'Perform matrix multiplication using NumPy library.'
    ]
  },
  {
    id: 'knc401',
    code: 'KNC401',
    name: 'Computer System Security & Cyber Laws',
    branchId: 'common',
    semester: 4,
    year: 2,
    credits: 2,
    category: 'Mandatory',
    units: [
      { unitNumber: 1, unitName: 'Security Principles & Cryptography', topics: ['CIA Triad (Confidentiality, Integrity, Availability)', 'Symmetric Encryption (DES, AES)', 'Asymmetric Cryptography (RSA)', 'Hash Functions (SHA-256) & Digital Signatures'] },
      { unitNumber: 2, unitName: 'System & Network Security', topics: ['Malware Types (Viruses, Worms, Trojans, Ransomware)', 'Firewalls Architecture (Packet Filter, Proxy)', 'Intrusion Detection Systems (IDS/IPS)', 'Vulnerability Scanning'] },
      { unitNumber: 3, unitName: 'Web & Application Security', topics: ['OWASP Top 10 Vulnerabilities', 'SQL Injection Attacks & Prevention', 'Cross-Site Scripting (XSS)', 'Session Hijacking & CSRF'] },
      { unitNumber: 4, unitName: 'Cyber Crime & Forensics', topics: ['Classification of Cyber Crimes', 'Phishing, Identity Theft & Cyber Stalking', 'Digital Forensics Investigation Steps', 'Evidence Collection Rules'] },
      { unitNumber: 5, unitName: 'IT Act 5000+ & Regulations', topics: ['Salient Features of IT Act 5000+', 'Sections 66, 66A, 66B, 66C, 66D Penalties', 'Cyber Appellate Tribunal', 'Data Privacy Laws'] }
    ],
    importantQuestions: [
      'Explain CIA triad of computer security with examples.',
      'Differentiate between symmetric and asymmetric key cryptography.',
      'Explain SQL Injection attack mechanism and how parameterized queries prevent it.',
      'Explain working of Firewalls and Intrusion Detection Systems.',
      'Discuss major sections and penalties under Indian IT Act 5000+.'
    ]
  },

  // Semester 5 & 6 - Third Year Core & Specializations
  {
    id: 'kcs501',
    code: 'KCS501',
    name: 'Database Management Systems (DBMS)',
    branchId: 'it',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Introduction & ER Modeling', topics: ['Database System Architecture (3-Schema)', 'Entity-Relationship (ER) Diagram', 'Enhanced ER Features (Specialization & Generalization)', 'Relational Model Constraints'] },
      { unitNumber: 2, unitName: 'SQL & Relational Algebra', topics: ['Relational Algebra Operators (Select, Project, Join)', 'Tuple & Domain Relational Calculus', 'DDL, DML, DCL SQL Queries', 'Subqueries, Views, Triggers & Stored Procedures'] },
      { unitNumber: 3, unitName: 'Database Design & Normalization', topics: ['Functional Dependencies & Attribute Closure', 'First, Second & Third Normal Forms (1NF, 2NF, 3NF)', 'Boyce-Codd Normal Form (BCNF)', 'Lossless Join & Dependency Preservation'] },
      { unitNumber: 4, unitName: 'Transaction Processing & Concurrency', topics: ['ACID Properties of Transactions', 'Schedule Serializability (Conflict & View)', 'Two-Phase Locking (2PL) Protocols', 'Timestamp Ordering & Deadlock Prevention'] },
      { unitNumber: 5, unitName: 'Indexing & Query Optimization', topics: ['Primary, Secondary & Clustered Indexes', 'B-Trees and B+ Trees Architecture', 'Query Processing & Optimization Steps', 'Database Recovery Techniques (WAL, Checkpointing)'] }
    ],
    importantQuestions: [
      'Draw ER diagram for University Management System specifying all entities, attributes, and relationships.',
      'Explain Relational Algebra joins: Inner Join, Left Outer Join, Right Outer Join, and Full Outer Join.',
      'Define BCNF. Differentiate between 3NF and BCNF with suitable relational schema examples.',
      'Explain ACID properties of database transactions.',
      'How do B+ Trees index database records? Explain search and insertion in B+ Trees.'
    ]
  },
  {
    id: 'kcs502',
    code: 'KCS502',
    name: 'Compiler Design',
    branchId: 'it',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Lexical Analysis', topics: ['Phases of Compiler Architecture', 'Lexical Analyzer & Token Recognition', 'Regular Expressions to DFA (Thompson Construction)', 'Lex Tool Overview'] },
      { unitNumber: 2, unitName: 'Syntax Analysis & Top-Down Parsing', topics: ['Role of Parser & Grammars', 'Top-Down Parsing & Recursive Descent', 'LL(1) Parser Construction', 'FIRST and FOLLOW Sets Computation'] },
      { unitNumber: 3, unitName: 'Bottom-Up Parsing', topics: ['Shift-Reduce Parsing Overview', 'SLR(1) Parser Table Construction', 'CLR(1) and LALR(1) Parsing', 'Yacc / Bison Tool Usage'] },
      { unitNumber: 4, unitName: 'Syntax Directed Translation & Intermediate Code', topics: ['Syntax Directed Definitions (SDD) & S-attributed/L-attributed', 'Three Address Code Formats (Quadruples, Triples)', 'Intermediate Code for Control Statements', 'Type Checking'] },
      { unitNumber: 5, unitName: 'Code Optimization & Generation', topics: ['Basic Blocks and Flow Graphs', 'Loop Optimization & Peephole Optimization', 'Register Allocation & Assignment', 'Target Machine Code Generation'] }
    ],
    importantQuestions: [
      'Explain 6 phases of compiler with a block diagram for source statement x = y + z * 60.',
      'Compute FIRST and FOLLOW sets for given grammar and construct LL(1) parsing table.',
      'Construct SLR(1) parsing table for given arithmetic expression grammar.',
      'Explain Quadruples, Triples, and Indirect Triples representations of Three Address Code.',
      'Explain code optimization techniques: Common Subexpression Elimination, Dead Code Elimination, Loop Unrolling.'
    ]
  },
  {
    id: 'kcs503',
    code: 'KCS503',
    name: 'Design & Analysis of Algorithms (DAA)',
    branchId: 'it',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Algorithm Analysis & Recurrences', topics: ['Asymptotic Analysis Bounds', 'Recurrence Relations (Substitution, Recursion Tree)', 'Master Theorem for Divide & Conquer', 'Amortized Analysis'] },
      { unitNumber: 2, unitName: 'Greedy & Divide-and-Conquer Algorithms', topics: ['Fractional Knapsack Problem', 'Huffman Coding Algorithm', 'Minimum Spanning Trees (Kruskal & Prim)', 'Dijkstra Single Source Shortest Path'] },
      { unitNumber: 3, unitName: 'Dynamic Programming', topics: ['0/1 Knapsack Problem', 'Longest Common Subsequence (LCS)', 'Matrix Chain Multiplication', 'Floyd-Warshall All-Pairs Shortest Path'] },
      { unitNumber: 4, unitName: 'Backtracking & Branch-and-Bound', topics: ['N-Queens Problem', 'Subset Sum Problem', 'Graph Coloring Problem', '15-Puzzle Problem'] },
      { unitNumber: 5, unitName: 'NP-Completeness & Approximation Algorithms', topics: ['P, NP, NP-Hard & NP-Complete Classes', 'Polynomial Time Verification', 'Cook Theorem Overview', 'Vertex Cover & TSP Approximation'] }
    ],
    importantQuestions: [
      'State and prove Master Theorem for divide and conquer recurrences.',
      'Solve 0/1 Knapsack problem using Dynamic Programming for given weights and values.',
      'Explain Huffman coding algorithm and construct optimal prefix code tree.',
      'Explain N-Queens problem using backtracking approach for N=4.',
      'Differentiate between P, NP, NP-Hard, and NP-Complete complexity classes.'
    ]
  },
  {
    id: 'kcs504',
    code: 'KCS504',
    name: 'Object Oriented Programming with Java',
    branchId: 'it',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Java Fundamentals & OOP Principles', topics: ['JVM, JRE & JDK Architecture', 'Classes, Objects & Constructors', 'Access Modifiers & Encapsulation', 'Garbage Collection'] },
      { unitNumber: 2, unitName: 'Inheritance, Interfaces & Packages', topics: ['Super Keyword & Method Overriding', 'Abstract Classes vs Interfaces', 'Java Package Creation', 'Polymorphism'] },
      { unitNumber: 3, unitName: 'Exception Handling & Multithreading', topics: ['Try-Catch-Finally Blocks', 'Custom Exceptions', 'Thread Lifecycle & Runnable Interface', 'Thread Synchronization'] },
      { unitNumber: 4, unitName: 'Java Collections Framework', topics: ['List, Set & Map Interfaces', 'ArrayList, LinkedList & HashMap', 'Generics & Iterators', 'Collections Utility Methods'] },
      { unitNumber: 5, unitName: 'Java I/O, JDBC & GUI', topics: ['File I/O & Streams', 'JDBC Connection Pipeline', 'Prepared Statements & Transactions', 'JavaFX / Swing Layouts'] }
    ],
    importantQuestions: [
      'Compare JVM, JRE, and JDK architecture.',
      'Differentiate between Abstract Class and Interface with Java code example.',
      'Explain multithreading lifecycle and thread synchronization using synchronized block.',
      'Demonstrate Java Collections framework usage with HashMap and ArrayList.',
      'Explain JDBC pipeline steps for executing database queries.'
    ]
  },
  {
    id: 'kcs055',
    code: 'KCS055',
    name: 'Machine Learning',
    branchId: 'cse_ai',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'ML Overview & Linear Models', topics: ['Supervised vs Unsupervised Learning', 'Linear Regression & Cost Function', 'Gradient Descent Optimization', 'Logistic Regression & Classification'] },
      { unitNumber: 2, unitName: 'Tree Models & Ensemble Learning', topics: ['Decision Trees (Entropy & Information Gain)', 'Overfitting & Pruning', 'Random Forests Ensemble', 'XGBoost & Gradient Boosting'] },
      { unitNumber: 3, unitName: 'Support Vector Machines & Kernel Tricks', topics: ['Margin Optimization & Support Vectors', 'Linear vs Non-Linear SVM', 'Kernel Functions (RBF, Polynomial)', 'Soft Margin Classification'] },
      { unitNumber: 4, unitName: 'Unsupervised Learning & Dimensionality Reduction', topics: ['K-Means Clustering', 'Hierarchical Clustering & Dendrograms', 'Principal Component Analysis (PCA)', 'Singular Value Decomposition (SVD)'] },
      { unitNumber: 5, unitName: 'Neural Networks & Model Evaluation', topics: ['Perceptron Model & Activation Functions', 'Multi-Layer Perceptron & Backpropagation', 'Precision, Recall, F1-Score & ROC-AUC', 'Bias-Variance Tradeoff'] }
    ],
    importantQuestions: [
      'Derive Gradient Descent update rule for Linear Regression.',
      'Calculate Information Gain and construct Decision Tree for dataset.',
      'Explain SVM margin maximization and role of Kernel functions.',
      'Explain K-Means clustering algorithm steps and elbow method.',
      'Derive Backpropagation rule for artificial neural network.'
    ]
  },
  {
    id: 'kcs056',
    code: 'KCS056',
    name: 'Cloud Computing',
    branchId: 'it',
    semester: 5,
    year: 3,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'Cloud Infrastructure & Delivery Models', topics: ['NIST Cloud Definition & Characteristics', 'IaaS, PaaS, SaaS Models', 'Public, Private, Hybrid Cloud Deployments', 'Cloud Economics'] },
      { unitNumber: 2, unitName: 'Virtualization Architecture', topics: ['Hypervisors (Type 1 & Type 2)', 'Full Virtualization vs Para-Virtualization', 'Virtual Machine Lifecycle', 'Containerization (Docker) vs VMs'] },
      { unitNumber: 3, unitName: 'Cloud Storage & Data Management', topics: ['Block, File & Object Storage (S3)', 'Distributed Data Systems', 'Cloud Databases (NoSQL & Managed SQL)', 'Data Replication'] },
      { unitNumber: 4, unitName: 'Cloud Security & Governance', topics: ['Shared Responsibility Model', 'Identity & Access Management (IAM)', 'Cloud Cryptography & Key Management', 'Compliance Standards'] },
      { unitNumber: 5, unitName: 'Cloud Orchestration & Serverless', topics: ['Auto-scaling & Load Balancers', 'Serverless Computing (AWS Lambda)', 'Cloud Migration Strategies', 'Multi-cloud Management'] }
    ],
    importantQuestions: [
      'Compare IaaS, PaaS, and SaaS cloud service models with real-world examples.',
      'Differentiate between Type-1 and Type-2 Hypervisors.',
      'Explain Docker containerization vs traditional Virtual Machines.',
      'Explain AWS Shared Responsibility Model for cloud security.',
      'Describe Serverless computing paradigm and its cost benefits.'
    ]
  },
  {
    id: 'kcs601',
    code: 'KCS601',
    name: 'Software Engineering',
    branchId: 'it',
    semester: 6,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Software Development Process Models', topics: ['Software Process & Lifecycle', 'Waterfall, Spiral & Prototyping Models', 'Agile Software Development & Scrum', 'Extreme Programming (XP)'] },
      { unitNumber: 2, unitName: 'Requirements Engineering', topics: ['Functional & Non-Functional Requirements', 'Software Requirements Specification (SRS) Document', 'Use Case Modeling & User Stories', 'Requirements Validation'] },
      { unitNumber: 3, unitName: 'Software Design & UML Architecture', topics: ['Cohesion and Coupling Metrics', 'UML Class, Sequence, State & Activity Diagrams', 'Software Architectural Styles', 'User Interface Design'] },
      { unitNumber: 4, unitName: 'Software Testing & QA', topics: ['Black Box vs White Box Testing', 'Equivalence Partitioning & Boundary Value Analysis', 'Cyclomatic Complexity & Basis Path Testing', 'Unit, Integration, System & Acceptance Testing'] },
      { unitNumber: 5, unitName: 'Software Project Management', topics: ['COCOMO Cost Estimation Models', 'Risk Management & Mitigation Strategy', 'Software Configuration Management (SCM)', 'Software Quality Metrics & ISO/CMMI'] }
    ],
    importantQuestions: [
      'Compare Waterfall, Spiral, and Agile Scrum process models.',
      'Explain characteristics of a good SRS document.',
      'Calculate Cyclomatic Complexity for given control flow graph and list basis set of paths.',
      'Compare Black Box and White Box testing strategies.',
      'Explain COCOMO model for software cost and effort estimation.'
    ]
  },
  {
    id: 'kcs602',
    code: 'KCS602',
    name: 'Web Technology',
    branchId: 'it',
    semester: 6,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'HTML5, CSS3 & Responsive Layouts', topics: ['HTML5 Semantic Elements', 'CSS3 Flexbox and Grid Systems', 'Responsive Web Design & Media Queries', 'Web Accessibility (WCAG)'] },
      { unitNumber: 2, unitName: 'Client-Side JavaScript (ES6+)', topics: ['JS Variables, Closures & Scope', 'Promises, Async/Await & Fetch API', 'DOM Manipulation & Event Bubbling', 'Form Validation & LocalStorage'] },
      { unitNumber: 3, unitName: 'Server-Side Node.js & Express', topics: ['Node.js Event Loop & Non-blocking I/O', 'Express Routing & Middleware', 'RESTful API Architecture', 'JWT Authentication & Sessions'] },
      { unitNumber: 4, unitName: 'React & Modern Frontend Frameworks', topics: ['React Components, JSX & Virtual DOM', 'State Management & React Hooks', 'Component Lifecycle', 'Single Page Application (SPA) Routing'] },
      { unitNumber: 5, unitName: 'Web Security & Deployment', topics: ['CORS & Cross-Site Scripting (XSS)', 'SQL Injection & CSRF Protection', 'HTTPS, SSL/TLS Certificates', 'Web Server Deployment & Docker Containerization'] }
    ],
    importantQuestions: [
      'Explain ES6 Promises and async/await syntax with JavaScript examples.',
      'Describe Node.js Event Loop architecture and non-blocking I/O paradigm.',
      'Explain Virtual DOM in React and reconciliation algorithm.',
      'Differentiate between REST API and SOAP web services.',
      'Explain XSS and CSRF web vulnerabilities and how to prevent them.'
    ]
  },
  {
    id: 'kcs603',
    code: 'KCS603',
    name: 'Computer Networks',
    branchId: 'it',
    semester: 6,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Network Architecture & Physical Layer', topics: ['OSI and TCP/IP Reference Models', 'Transmission Media (Twisted Pair, Fiber)', 'Switching Techniques (Packet, Circuit)', 'Network Topologies'] },
      { unitNumber: 2, unitName: 'Data Link Layer & MAC', topics: ['Framing & Error Control (CRC, Hamming Code)', 'Flow Control Protocols (Stop-and-Wait, Sliding Window)', 'CSMA/CD & Ethernet Architecture', 'Wireless LANs (IEEE 802.11)'] },
      { unitNumber: 3, unitName: 'Network Layer & Routing', topics: ['IPv4 & IPv6 Addressing & Subnetting', 'Classless Inter-Domain Routing (CIDR)', 'Distance Vector Routing & Link State Routing', 'ICMP, ARP & RARP Protocols'] },
      { unitNumber: 4, unitName: 'Transport Layer Protocols', topics: ['TCP 3-Way Handshake & Connection State', 'TCP Congestion Control (Slow Start, Fast Recovery)', 'UDP Header & Socket Programming', 'Port Numbers & Multiplexing'] },
      { unitNumber: 5, unitName: 'Application Layer & Network Security', topics: ['DNS Domain Name System Hierarchy', 'HTTP/HTTPS, SMTP, FTP Protocols', 'Symmetric & Asymmetric Cryptography (RSA)', 'Firewalls, NAT & VPNs'] }
    ],
    importantQuestions: [
      'Compare OSI Reference Model and TCP/IP Protocol Suite.',
      'Explain CRC error detection method with a numerical example.',
      'Given IPv4 address 192.168.10.0/24, divide it into 4 equal subnets.',
      'Explain TCP 3-way handshake and connection termination procedure.',
      'Explain working of RSA public-key cryptographic algorithm.'
    ]
  },
  {
    id: 'kec601',
    code: 'KEC601',
    name: 'VLSI Design',
    branchId: 'ece',
    semester: 6,
    year: 3,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'CMOS Technology & Fabrication', topics: ['Silicon Wafer Processing & Photolithography', 'CMOS N-Well Process', 'Latch-up Phenomenon & Prevention', 'Layout Design Rules'] },
      { unitNumber: 2, unitName: 'MOS Transistor Theory', topics: ['MOS Device Equations', 'Drain Current Expressions', 'Channel Length Modulation', 'Subthreshold Conduction'] },
      { unitNumber: 3, unitName: 'CMOS Inverter Architecture', topics: ['Static VTC Characteristics', 'Switching Threshold & Noise Margins', 'RC Delay Models', 'Power Dissipation (Dynamic & Static)'] },
      { unitNumber: 4, unitName: 'Combinational & Sequential Logic Design', topics: ['Pass Transistor Logic & Transmission Gates', 'Dynamic CMOS Logic', 'CMOS Flip-Flops & Latches', 'Verilog HDL Hardware Description'] },
      { unitNumber: 5, unitName: 'Semiconductor Memories & Testing', topics: ['SRAM & DRAM Cell Operation', 'ROM Architecture', 'Built-In Self-Test (BIST)', 'Fault Models & Boundary Scan'] }
    ],
    importantQuestions: [
      'Explain CMOS fabrication N-Well process step-by-step.',
      'Derive noise margins VIH, VIL, VOH, VOL for CMOS Inverter.',
      'Calculate propagation delay tphl and tplh using RC delay model.',
      'Write Verilog module for 4-bit Ripple Carry Adder.',
      'Explain 6T SRAM cell read and write operations.'
    ]
  },

  // Semester 7 & 8 - Final Year Advanced & Electives
  {
    id: 'kcs701',
    code: 'KCS701',
    name: 'Artificial Intelligence',
    branchId: 'it',
    semester: 7,
    year: 4,
    credits: 4,
    category: 'Core',
    units: [
      { unitNumber: 1, unitName: 'Problem Solving & State Space Search', topics: ['AI Definitions & Turing Test', 'Uninformed Search (BFS, DFS, Uniform Cost)', 'Heuristic Search (A* Search, AO* Search, Hill Climbing)', 'Game Playing & Minimax Search'] },
      { unitNumber: 2, unitName: 'Knowledge Representation & Logic', topics: ['Propositional & First Order Predicate Logic (FOL)', 'Unification Algorithm & Resolution Theorem', 'Semantic Networks & Frames', 'Conceptual Dependency'] },
      { unitNumber: 3, unitName: 'Reasoning Under Uncertainty', topics: ['Probabilistic Reasoning & Bayes Theorem', 'Bayesian Belief Networks', 'Fuzzy Logic & Fuzzy Sets', 'Certainty Factors & Dempster-Shafer Theory'] },
      { unitNumber: 4, unitName: 'Machine Learning & Decision Trees', topics: ['Supervised vs Unsupervised Learning', 'Decision Tree Learning (ID3 Algorithm)', 'Artificial Neural Networks & Backpropagation', 'Support Vector Machines (SVM)'] },
      { unitNumber: 5, unitName: 'Natural Language Processing & Expert Systems', topics: ['NLP Pipeline (Tokenization, Parsing, POS Tagging)', 'Expert System Architecture & Inference Engine', 'Robotics & Computer Vision Basics', 'Ethical AI & Future Horizons'] }
    ],
    importantQuestions: [
      'Explain A* search algorithm and state condition for admissibility of heuristics.',
      'Convert sentences into First Order Predicate Logic and prove by Resolution.',
      'Explain Bayesian Belief Network with an example.',
      'Derive Backpropagation learning algorithm for Multi-Layer Perceptron.',
      'Explain Architecture of Expert System specifying Inference Engine and Knowledge Base.'
    ]
  },
  {
    id: 'kcs702',
    code: 'KCS702',
    name: 'Deep Learning & Natural Language Processing',
    branchId: 'cse_ai',
    semester: 7,
    year: 4,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'Deep Neural Networks & Optimization', topics: ['Deep Feedforward Networks', 'Vanishing & Exploding Gradients', 'Adam, RMSProp & Momentum Optimizers', 'Batch Normalization & Dropout'] },
      { unitNumber: 2, unitName: 'Convolutional Neural Networks (CNN)', topics: ['Convolution & Pooling Operations', 'LeNet, AlexNet, ResNet Architectures', 'Object Detection (YOLO, R-CNN)', 'Transfer Learning'] },
      { unitNumber: 3, unitName: 'Recurrent Neural Networks (RNN)', topics: ['Sequence Modeling & Backpropagation Through Time', 'Long Short-Term Memory (LSTM)', 'Gated Recurrent Units (GRU)', 'Bidirectional RNNs'] },
      { unitNumber: 4, unitName: 'Attention Mechanism & Transformers', topics: ['Self-Attention & Multi-Head Attention', 'Transformer Encoder-Decoder Architecture', 'BERT, GPT & LLM Pre-training', 'Fine-Tuning Strategies'] },
      { unitNumber: 5, unitName: 'NLP Applications & Generative Models', topics: ['Word Embeddings (Word2Vec, GloVe)', 'Neural Machine Translation', 'Generative Adversarial Networks (GANs)', 'Diffusion Models Overview'] }
    ],
    importantQuestions: [
      'Explain Vanishing Gradient problem in deep networks and how ReLU & ResNet skip connections resolve it.',
      'Describe CNN architecture and calculate output spatial dimension after convolution & max-pooling.',
      'Explain LSTM cell architecture with equations for input, forget, and output gates.',
      'Explain Self-Attention mechanism equation and Transformer Multi-Head Attention.',
      'Differentiate between BERT and GPT pre-training objectives.'
    ]
  },
  {
    id: 'kcs071',
    code: 'KCS071',
    name: 'Big Data Analytics',
    branchId: 'cse_ds',
    semester: 7,
    year: 4,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'Big Data Foundations & Hadoop', topics: ['5 Vs of Big Data (Volume, Velocity, Variety, Veracity, Value)', 'Hadoop Architecture & HDFS', 'YARN Resource Management', 'MapReduce Processing Framework'] },
      { unitNumber: 2, unitName: 'NoSQL Databases & Data Models', topics: ['CAP Theorem & BASE Consistency Model', 'Key-Value Stores (Redis)', 'Document Stores (MongoDB)', 'Column Family Stores (Cassandra) & Graph DBs (Neo4j)'] },
      { unitNumber: 3, unitName: 'Apache Spark Data Engine', topics: ['Spark Ecosystem & Resilient Distributed Datasets (RDD)', 'Spark SQL & DataFrames', 'Spark Streaming & Kafka Integration', 'MLlib Distributed Machine Learning'] },
      { unitNumber: 4, unitName: 'Data Stream Mining', topics: ['Stream Data Model & Sliding Windows', 'Flajolet-Martin Algorithm for Count Distinct', 'Bloom Filters for Stream Membership', 'Decaying Windows'] },
      { unitNumber: 5, unitName: 'Graph Analytics & Link Analysis', topics: ['PageRank Algorithm & Random Walker Model', 'HITS Algorithm (Hubs & Authorities)', 'Community Detection in Social Graphs', 'Big Data Visualization'] }
    ],
    importantQuestions: [
      'Explain Hadoop Distributed File System (HDFS) Architecture and NameNode/DataNode roles.',
      'State CAP Theorem and compare ACID vs BASE properties.',
      'Explain Apache Spark RDD transformation and action operations.',
      'Explain Bloom Filter working mechanism for stream membership checking.',
      'Derive PageRank iteration formula and handle dead ends and spider traps.'
    ]
  },
  {
    id: 'kcs801',
    code: 'KCS801',
    name: 'Distributed Systems & Cloud Architecture',
    branchId: 'it',
    semester: 8,
    year: 4,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'Distributed Systems Foundations', topics: ['Characterization & Challenges of Distributed Systems', 'System Models (Architectural & Fundamental)', 'Networking & Interprocess Communication (IPC)', 'Remote Procedure Call (RPC) & RMI'] },
      { unitNumber: 2, unitName: 'Time, Clocks & Distributed State', topics: ['Physical Clocks & Logical Clocks (Lamport Timestamps)', 'Vector Clocks', 'Global State & Snapshot Algorithms (Chandy-Lamport)', 'Distributed Mutual Exclusion Algorithms'] },
      { unitNumber: 3, unitName: 'Consensus & Fault Tolerance', topics: ['Consensus Problem & Byzantine Generals Problem', 'Paxos Consensus Algorithm', 'Raft Consensus Protocol', 'Failure Detectors & Self-Stabilization'] },
      { unitNumber: 4, unitName: 'Distributed Storage & Replication', topics: ['Replication Models & Consistency Spectrum', 'Linearizability vs Eventual Consistency', 'Distributed File Systems (NFS, GFS)', 'Distributed Hash Tables (Chord)'] },
      { unitNumber: 5, unitName: 'Distributed Transactions & Cloud Services', topics: ['Two-Phase Commit (2PC) & Three-Phase Commit (3PC)', 'Distributed Deadlock Detection', 'Microservices Architecture', 'Cloud Service Mesh'] }
    ],
    importantQuestions: [
      'Explain Lamport Logical Clock algorithm and partial ordering of events.',
      'Describe Chandy-Lamport algorithm for recording global snapshot in distributed systems.',
      'Explain Raft Consensus algorithm leader election and log replication steps.',
      'Compare Two-Phase Commit (2PC) and Three-Phase Commit (3PC) protocols.',
      'Explain Chord Distributed Hash Table (DHT) lookup mechanism.'
    ]
  },
  {
    id: 'kcs802',
    code: 'KCS802',
    name: 'Blockchain Architecture & Smart Contracts',
    branchId: 'it',
    semester: 8,
    year: 4,
    credits: 4,
    category: 'Elective',
    units: [
      { unitNumber: 1, unitName: 'Blockchain Fundamentals & Cryptography', topics: ['Distributed Ledger Technology (DLT)', 'Cryptographic Hash Functions & Merkle Trees', 'Asymmetric Key Pair & Digital Signatures', 'UTXO Model vs Account Model'] },
      { unitNumber: 2, unitName: 'Consensus Mechanisms', topics: ['Proof of Work (PoW) & Bitcoin Mining', 'Proof of Stake (PoS) & Slashing', 'Delegated PoS (DPoS) & Practical Byzantine Fault Tolerance (PBFT)', 'Sybil Attacks'] },
      { unitNumber: 3, unitName: 'Ethereum & Smart Contracts', topics: ['Ethereum Virtual Machine (EVM) Architecture', 'Solidity Syntax, Data Types & Mappings', 'Smart Contract Events, Modifiers & Reentrancy', 'Gas Optimization Techniques'] },
      { unitNumber: 4, unitName: 'Enterprise Blockchain (Hyperledger Fabric)', topics: ['Public vs Permissioned Blockchains', 'Hyperledger Fabric Architecture (Peers, Orderer, CA)', 'Chaincode Development in Go/Node.js', 'Private Data Collections'] },
      { unitNumber: 5, unitName: 'Decentralized Apps (dApps) & Future', topics: ['Web3.js / Ethers.js Frontend Integration', 'IPFS Distributed File Storage', 'DeFi Protocols & DAO Governance', 'Zero-Knowledge Proofs (zk-SNARKs)'] }
    ],
    importantQuestions: [
      'Explain Merkle Tree construction and how it provides tamper-evident audit trailing.',
      'Compare Proof of Work (PoW) and Proof of Stake (PoS) consensus mechanisms.',
      'Write a Solidity smart contract for ERC-20 token transfer and explain Reentrancy attack.',
      'Explain Hyperledger Fabric permissioned architecture and transaction lifecycle.',
      'Explain Zero-Knowledge Proofs (zk-SNARKs) concept in privacy preserving blockchain.'
    ]
  }
];

export const AKTU_LABS = [
  {
    id: 'lab-bcs151',
    labCode: 'BCS151',
    labName: 'Programming for Problem Solving Lab',
    subjectCode: 'BCS101',
    semester: 1,
    credits: 1,
    experiments: [
      { expNumber: 1, title: 'Basic C Syntax & Operators', objective: 'Write programs using formatted printf/scanf, arithmetic operators & typecasting.', keyCommandsOrCode: 'gcc exp1.c -o exp1 && ./exp1', vivaQuestions: ['What is the difference between float and double in C?', 'Why do we use %d and %f format specifiers?'] },
      { expNumber: 2, title: 'Control Statements & Switch Case', objective: 'Implement quadratic equation root finder and calculator using switch.', keyCommandsOrCode: 'gcc exp2.c -o exp2 && ./exp2', vivaQuestions: ['What happens if break is omitted in switch case?', 'Explain nested if-else condition execution logic.'] },
      { expNumber: 3, title: 'Arrays & Matrix Operations', objective: 'Perform matrix addition, transpose & multiplication using 2D arrays.', keyCommandsOrCode: 'gcc exp3.c -o exp3 && ./exp3', vivaQuestions: ['How are 2D arrays stored in memory (Row Major vs Column Major)?', 'What is array index out of bound error?'] },
      { expNumber: 4, title: 'Pointers & Dynamic Memory', objective: 'Swap two numbers using pointers and allocate dynamic array using malloc.', keyCommandsOrCode: 'gcc exp4.c -o exp4 && ./exp4', vivaQuestions: ['What is a dangling pointer?', 'Difference between malloc and calloc.'] }
    ]
  },
  {
    id: 'lab-kcs351',
    labCode: 'KCS351',
    labName: 'Data Structures Lab',
    subjectCode: 'KCS301',
    semester: 3,
    credits: 1.5,
    experiments: [
      { expNumber: 1, title: 'Stack Implementation', objective: 'Implement Stack ADT using Array and Linked List with push, pop, peek operations.', keyCommandsOrCode: 'gcc stack.c -o stack && ./stack', vivaQuestions: ['What is stack overflow and stack underflow condition?', 'Where is stack memory used in CPU recursion?'] },
      { expNumber: 2, title: 'Infix to Postfix Conversion', objective: 'Convert Infix expression to Postfix using Stack.', keyCommandsOrCode: 'gcc infix.c -o infix && ./infix', vivaQuestions: ['Why is postfix evaluation faster for computer compilers?', 'How do operator precedence and associativity affect stack parsing?'] },
      { expNumber: 3, title: 'Binary Search Tree (BST)', objective: 'Create BST, insert nodes, and perform Inorder, Preorder, Postorder traversals.', keyCommandsOrCode: 'gcc bst.c -o bst && ./bst', vivaQuestions: ['Why does Inorder traversal of BST yield sorted array output?', 'What is the worst case time complexity of searching in BST?'] },
      { expNumber: 4, title: 'Graph Traversal (BFS & DFS)', objective: 'Implement Breadth First Search and Depth First Search for adjacency matrix graph.', keyCommandsOrCode: 'gcc graph.c -o graph && ./graph', vivaQuestions: ['Which data structure is used in BFS and DFS?', 'Differentiate between BFS and DFS traversal order.'] }
    ]
  },
  {
    id: 'lab-kcs551',
    labCode: 'KCS551',
    labName: 'Database Management Systems Lab',
    subjectCode: 'KCS501',
    semester: 5,
    credits: 1.5,
    experiments: [
      { expNumber: 1, title: 'DDL & DML SQL Queries', objective: 'Create database tables with primary keys, foreign keys, insert and update data.', keyCommandsOrCode: 'CREATE TABLE Student (id INT PRIMARY KEY, name VARCHAR(50));', vivaQuestions: ['Difference between DROP, TRUNCATE, and DELETE commands in SQL.', 'What is a Foreign Key constraint?'] },
      { expNumber: 2, title: 'SQL Joins & Subqueries', objective: 'Execute Inner Join, Outer Join, Self Join, and nested subqueries on Employee-Department DB.', keyCommandsOrCode: 'SELECT e.name, d.dname FROM Emp e JOIN Dept d ON e.dept_id = d.id;', vivaQuestions: ['Explain difference between INNER JOIN and LEFT OUTER JOIN.', 'What is a correlated subquery?'] },
      { expNumber: 3, title: 'Triggers & Stored Procedures', objective: 'Write PL/SQL triggers for audit logging on row insertion.', keyCommandsOrCode: 'CREATE TRIGGER audit_log AFTER INSERT ON Orders FOR EACH ROW...', vivaQuestions: ['What are BEFORE and AFTER triggers?', 'Why do we use Stored Procedures?'] }
    ]
  }
];

export const DOMAIN_ROADMAPS = [
  {
    id: 'fullstack',
    domainName: 'Full-Stack Web Development',
    category: 'Software',
    iconName: 'Code',
    description: 'Master modern frontend & backend engineering (MERN, Next.js, Node.js, PostgreSQL, System Design)',
    jobRoles: ['Full Stack Engineer', 'Frontend Specialist', 'Backend Architect', 'MERN Developer'],
    averageSalaryPackage: '₹6.5 LPA - ₹18 LPA (Fresher)',
    phases: [
      {
        phaseName: 'Phase 1: Web Fundamentals & JavaScript ES6',
        durationMonths: '0 - 2 Months',
        topics: ['HTML5 & CSS3 Flexbox/Grid', 'Tailwind CSS Layouts', 'JavaScript Promises, DOM & Async/Await', 'Git & GitHub Version Control'],
        keyTools: ['VS Code', 'Git', 'Chrome DevTools'],
        suggestedProjects: ['Responsive Portfolio', 'Interactive E-commerce Cart', 'Weather API App']
      },
      {
        phaseName: 'Phase 2: Modern Frontend (React & Next.js)',
        durationMonths: '2 - 4 Months',
        topics: ['React Component Architecture & Hooks', 'State Management (Redux / Zustand)', 'Next.js App Router & Server Components', 'TypeScript Type Safety'],
        keyTools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        suggestedProjects: ['Full-featured Blog Platform', 'SaaS Landing Page with Authentication']
      },
      {
        phaseName: 'Phase 3: Backend Services & Databases',
        durationMonths: '4 - 7 Months',
        topics: ['Node.js & Express RESTful APIs', 'PostgreSQL / MongoDB Schema Design', 'JWT Authentication & OAuth2', 'Redis Caching & WebSockets'],
        keyTools: ['Express.js', 'PostgreSQL', 'Prisma ORM', 'MongoDB', 'Redis'],
        suggestedProjects: ['Real-time Chat App with Socket.io', 'Payment Gateway Integration App']
      },
      {
        phaseName: 'Phase 4: DevOps, Cloud & System Design',
        durationMonths: '7 - 9 Months',
        topics: ['Docker Containerization', 'AWS S3, EC2 & Cloud Run Deployment', 'CI/CD Pipelines (GitHub Actions)', 'System Design & Rate Limiting'],
        keyTools: ['Docker', 'AWS', 'GitHub Actions', 'Postman'],
        suggestedProjects: ['Production Scalable Microservice App']
      }
    ],
    recommendedChannels: [
      { name: 'CodeWithHarry', url: 'https://youtube.com/@CodeWithHarry', note: 'Complete Hindi Web Dev & JS Tutorials' },
      { name: 'Sheryians Coding School', url: 'https://youtube.com/@sheryianscodingschool', note: 'Modern UI/UX & High-end Web Design' },
      { name: 'Piyush Garg', url: 'https://youtube.com/@piyushgargdev', note: 'Node.js, Docker, Next.js & System Design' },
      { name: 'Chai aur Code (Hitesh Choudhary)', url: 'https://youtube.com/@chaiaurcode', note: 'Deep dive JS, React & Backend' }
    ]
  },
  {
    id: 'ai_data_science',
    domainName: 'AI & Data Science Engineering',
    category: 'AI & Data',
    iconName: 'Brain',
    description: 'Machine Learning, Deep Learning, Neural Networks, PyTorch, Generative AI & MLOps',
    jobRoles: ['AI/ML Engineer', 'Data Scientist', 'NLP Engineer', 'Computer Vision Specialist'],
    averageSalaryPackage: '₹8 LPA - ₹24 LPA (Fresher)',
    phases: [
      {
        phaseName: 'Phase 1: Math & Python Foundations',
        durationMonths: '0 - 2 Months',
        topics: ['Python Data Science Stack (NumPy, Pandas, Matplotlib)', 'Linear Algebra & Matrix Operations', 'Probability & Statistics', 'Calculus & Gradient Descent'],
        keyTools: ['Python', 'Jupyter Notebook', 'Pandas'],
        suggestedProjects: ['Exploratory Data Analysis (EDA) on AKTU Result Data']
      },
      {
        phaseName: 'Phase 2: Machine Learning Algorithms',
        durationMonths: '2 - 5 Months',
        topics: ['Supervised Learning (Regression, Decision Trees, Random Forests, SVM)', 'Unsupervised Learning (K-Means, PCA)', 'Scikit-Learn Pipeline', 'Model Evaluation & Hyperparameter Tuning'],
        keyTools: ['Scikit-Learn', 'XGBoost', 'Seaborn'],
        suggestedProjects: ['Student Exam Score Predictor App']
      },
      {
        phaseName: 'Phase 3: Deep Learning & Neural Networks',
        durationMonths: '5 - 8 Months',
        topics: ['Artificial Neural Networks (ANN)', 'Convolutional Neural Networks (CNN) for Vision', 'Recurrent Neural Networks (RNN/LSTM)', 'PyTorch Framework'],
        keyTools: ['PyTorch', 'TensorFlow', 'OpenCV'],
        suggestedProjects: ['Medical X-Ray Disease Classifier']
      },
      {
        phaseName: 'Phase 4: Generative AI, LLMs & MLOps',
        durationMonths: '8 - 10 Months',
        topics: ['Transformer Architecture & Attention Mechanism', 'Hugging Face & RAG Applications', 'LangChain / LlamaIndex', 'MLflow & Model Deployment'],
        keyTools: ['Hugging Face', 'LangChain', 'FastAPI', 'Docker'],
        suggestedProjects: ['AI Study Assistant with RAG on AKTU Textbooks']
      }
    ],
    recommendedChannels: [
      { name: 'CampusX (Nitish Singh)', url: 'https://youtube.com/@campusx-official', note: 'Best Complete Data Science & ML in Hindi' },
      { name: 'Krish Naik', url: 'https://youtube.com/@krishnaik06', note: 'Deep Learning, NLP & Generative AI' },
      { name: 'StatQuest with Josh Starmer', url: 'https://youtube.com/@statquest', note: 'Intuitive Visual Math & ML Algorithms' }
    ]
  },
  {
    id: 'cloud_devops',
    domainName: 'Cloud & DevOps Engineering',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'Infrastructure as Code, Linux Administration, Docker, Kubernetes, AWS/GCP, CI/CD',
    jobRoles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)'],
    averageSalaryPackage: '₹7.5 LPA - ₹20 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Linux & Shell Scripting',
        durationMonths: '0 - 2 Months',
        topics: ['Linux Terminal Commands & File System', 'Bash Scripting & Automation', 'Networking Basics (Subnetting, SSH, DNS)', 'Git Ops Workflow'],
        keyTools: ['Ubuntu Linux', 'Bash', 'Git'],
        suggestedProjects: ['Automated Server Backup & Log Rotation Script']
      },
      {
        phaseName: 'Phase 2: Containerization & CI/CD',
        durationMonths: '2 - 4 Months',
        topics: ['Docker Engine, Images & Dockerfile', 'Docker Compose Multi-container Apps', 'GitHub Actions & GitLab CI', 'Artifact Management'],
        keyTools: ['Docker', 'GitHub Actions', 'Nginx'],
        suggestedProjects: ['Containerized Full Stack App with Automated Deployment']
      },
      {
        phaseName: 'Phase 3: Orchestration & Cloud (AWS/GCP)',
        durationMonths: '4 - 7 Months',
        topics: ['Kubernetes Architecture (Pods, Deployments, Services)', 'AWS EC2, S3, IAM, VPC, EKS', 'Infrastructure as Code with Terraform', 'Monitoring with Prometheus & Grafana'],
        keyTools: ['Kubernetes', 'AWS', 'Terraform', 'Grafana'],
        suggestedProjects: ['Production Kubernetes Cluster Setup on Cloud']
      }
    ],
    recommendedChannels: [
      { name: 'TrainWithShubham', url: 'https://youtube.com/@trainwithshubham', note: 'DevOps & Cloud Tutorials in Hindi' },
      { name: 'Abhishek Veeramalla', url: 'https://youtube.com/@abhishekveeramalla', note: 'Real-world DevOps, Kubernetes & AWS' },
      { name: 'TechWorld with Nana', url: 'https://youtube.com/@techworldwithnana', note: 'Docker, Kubernetes & CI/CD Visual Guide' }
    ]
  },
  {
    id: 'android_mobile',
    domainName: 'Android & Mobile App Engineering',
    category: 'Mobile & Security',
    iconName: 'Smartphone',
    description: 'Build native & cross-platform Android/iOS apps using Kotlin, Jetpack Compose, Flutter',
    jobRoles: ['Android Developer', 'Flutter Engineer', 'Mobile App Architect'],
    averageSalaryPackage: '₹6 LPA - ₹16 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Kotlin Programming & Android SDK',
        durationMonths: '0 - 2 Months',
        topics: ['Kotlin OOP & Coroutines', 'Android Studio Layouts', 'Activity & Fragment Lifecycle', 'Intent & Navigation'],
        keyTools: ['Android Studio', 'Kotlin'],
        suggestedProjects: ['AKTU Notes & Attendance Tracker App']
      },
      {
        phaseName: 'Phase 2: Jetpack Compose & Clean Architecture',
        durationMonths: '2 - 5 Months',
        topics: ['Jetpack Compose Declarative UI', 'ViewModel & StateFlow', 'Room Local Database', 'Retrofit API Calls'],
        keyTools: ['Jetpack Compose', 'Room DB', 'Retrofit'],
        suggestedProjects: ['College Campus Event Management App']
      },
      {
        phaseName: 'Phase 3: Cross-Platform Flutter & Firebase',
        durationMonths: '5 - 7 Months',
        topics: ['Dart Programming Language', 'Flutter Widgets & Provider/Riverpod', 'Firebase Auth, Firestore & Cloud Messaging'],
        keyTools: ['Flutter', 'Dart', 'Firebase'],
        suggestedProjects: ['Food Delivery App for College Canteen']
      }
    ],
    recommendedChannels: [
      { name: 'Cheezy Code', url: 'https://youtube.com/@cheezycode', note: 'Android Development in Kotlin & Jetpack' },
      { name: 'Philipp Lackner', url: 'https://youtube.com/@philipplackner', note: 'Advanced Kotlin, Compose & Clean Architecture' }
    ]
  },
  {
    id: 'cyber_security',
    domainName: 'Cyber Security & Ethical Hacking',
    category: 'Mobile & Security',
    iconName: 'Shield',
    description: 'Penetration Testing, Network Security, Web Vulnerabilities, Cryptography, OWASP Top 10',
    jobRoles: ['Cyber Security Analyst', 'Ethical Hacker / PenTester', 'SOC Analyst'],
    averageSalaryPackage: '₹7 LPA - ₹18 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Networking & Linux Fundamentals',
        durationMonths: '0 - 2 Months',
        topics: ['OSI Model, TCP/IP, Wireshark Packet Analysis', 'Kali Linux & Nmap Scanning', 'Shell Scripting & Python Automation'],
        keyTools: ['Kali Linux', 'Wireshark', 'Nmap'],
        suggestedProjects: ['Network Port Scanner & Vulnerability Checker']
      },
      {
        phaseName: 'Phase 2: Web Application Security',
        durationMonths: '2 - 5 Months',
        topics: ['OWASP Top 10 Vulnerabilities', 'Burp Suite Proxy & Interception', 'SQL Injection, XSS, CSRF Attacks', 'Metasploit Framework'],
        keyTools: ['Burp Suite', 'Metasploit', 'OWASP ZAP'],
        suggestedProjects: ['Security Audit Report on Vulnerable Web Application']
      }
    ],
    recommendedChannels: [
      { name: 'Bitten Tech', url: 'https://youtube.com/@bittentech', note: 'Cyber Security & Ethical Hacking in Hindi' },
      { name: 'NetworkChuck', url: 'https://youtube.com/@networkchuck', note: 'Networking, Linux & Hacking Tutorials' }
    ]
  },
  {
    id: 'game_dev',
    domainName: 'Game Development & AR/VR',
    category: 'Software',
    iconName: 'Compass',
    description: '3D Graphics, Physics Engine, Unity (C#), Unreal Engine 5 (C++), Virtual Reality & Augmented Reality',
    jobRoles: ['Game Developer', 'Unreal Engine C++ Programmer', 'AR/VR Spatial Engineer'],
    averageSalaryPackage: '₹6.5 LPA - ₹18 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Math & C# / C++ Game Fundamentals',
        durationMonths: '0 - 2 Months',
        topics: ['Vector Mathematics, Matrices, Quaternion Rotations', 'C# for Unity / C++ for Unreal', 'Game Loop & Frame Rendering Logic'],
        keyTools: ['Unity Engine', 'C#', 'Visual Studio'],
        suggestedProjects: ['2D Physics Platformer Game']
      },
      {
        phaseName: 'Phase 2: 3D Graphics & Game Physics',
        durationMonths: '2 - 5 Months',
        topics: ['3D Modeling in Blender', 'Rigidbodies, Colliders, Raycasting', 'Shaders, Lighting & Particle Effects', 'Multiplayer Networking'],
        keyTools: ['Unreal Engine 5', 'Blender', 'Photon Fusion'],
        suggestedProjects: ['3D First Person Survival Action Game']
      }
    ],
    recommendedChannels: [
      { name: 'Brackeys', url: 'https://youtube.com/@brackeys', note: 'The Legendary Unity & C# Game Dev Tutorials' },
      { name: 'Code Monkey', url: 'https://youtube.com/@codemonkeyunity', note: 'Professional Unity C# Architecture & Design Patterns' }
    ]
  },
  {
    id: 'blockchain_web3',
    domainName: 'Blockchain & Web3 Engineering',
    category: 'Software',
    iconName: 'Shield',
    description: 'Smart Contracts, Solidity, Ethereum, Ethers.js, Rust on Solana, Decentralized Applications (dApps)',
    jobRoles: ['Blockchain Developer', 'Smart Contract Auditor', 'Web3 Full Stack Engineer'],
    averageSalaryPackage: '₹8 LPA - ₹25 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Cryptography & Smart Contracts',
        durationMonths: '0 - 3 Months',
        topics: ['Hashing Algorithms, Asymmetric Encryption', 'Ethereum Virtual Machine (EVM)', 'Solidity Programming & OpenZeppelin Standard', 'Hardhat & Foundry Testing'],
        keyTools: ['Solidity', 'Hardhat', 'Metamask'],
        suggestedProjects: ['ERC-20 Token & NFT Staking Smart Contract']
      },
      {
        phaseName: 'Phase 2: Decentralized Apps (dApps)',
        durationMonths: '3 - 6 Months',
        topics: ['React / Next.js integration with Ethers.js / Wagmi', 'IPFS Distributed File Storage', 'DeFi Protocol Mechanics (DEX Swaps, Liquidity Pools)'],
        keyTools: ['Next.js', 'Ethers.js', 'IPFS'],
        suggestedProjects: ['Decentralized Voting & Crowdfunding DApp']
      }
    ],
    recommendedChannels: [
      { name: 'Patrick Collins', url: 'https://youtube.com/@patrickcollins', note: 'Ultimate Full Stack Smart Contract & Solidity Course' },
      { name: 'Dapp University', url: 'https://youtube.com/@dappuniversity', note: 'Web3 & DeFi dApp Build Tutorials' }
    ]
  },
  {
    id: 'data_engineering',
    domainName: 'Data Engineering & Big Data Infrastructure',
    category: 'AI & Data',
    iconName: 'Server',
    description: 'Build large-scale data pipelines, ETL/ELT workflows, data warehouses (Snowflake/BigQuery), and Apache Spark clusters',
    jobRoles: ['Data Engineer', 'Big Data Developer', 'ETL Architect', 'Analytics Engineer'],
    averageSalaryPackage: '₹8 LPA - ₹22 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Advanced SQL, Data Modeling & Python',
        durationMonths: '0 - 2 Months',
        topics: ['Complex SQL Window Functions, CTEs & Query Tuning', 'Dimensional Data Modeling (Star & Snowflake Schema)', 'Python Data Parsing & Automation'],
        keyTools: ['PostgreSQL', 'Python', 'dbt'],
        suggestedProjects: ['E-Commerce Data Warehouse Schema Design']
      },
      {
        phaseName: 'Phase 2: Distributed Processing with Apache Spark & Airflow',
        durationMonths: '2 - 5 Months',
        topics: ['PySpark DataFrames & Resilient Distributed Datasets (RDDs)', 'Apache Airflow DAG Scheduling & Monitoring', 'Delta Lake & Parquet Formats'],
        keyTools: ['Apache Spark', 'Apache Airflow', 'PySpark'],
        suggestedProjects: ['Automated End-to-End Spark ETL Pipeline']
      },
      {
        phaseName: 'Phase 3: Realtime Streaming & Cloud Warehouses',
        durationMonths: '5 - 8 Months',
        topics: ['Apache Kafka Streaming & Event Sourcing', 'Snowflake / Google BigQuery Warehousing', 'AWS Glue & Cloud Data Lakes'],
        keyTools: ['Kafka', 'Snowflake', 'AWS Glue'],
        suggestedProjects: ['Real-time Log Processing Engine with Kafka & BigQuery']
      }
    ],
    recommendedChannels: [
      { name: 'Darshil Parmar', url: 'https://youtube.com/@darshilparmar', note: 'Data Engineering Projects & Cloud Architecture' },
      { name: 'Seattle Data Guy', url: 'https://youtube.com/@seattledataguy', note: 'Data Warehousing, SQL & Career Strategies' }
    ]
  },
  {
    id: 'sre_platform',
    domainName: 'Site Reliability Engineering (SRE) & Platform',
    category: 'Infrastructure',
    iconName: 'Server',
    description: 'High availability, observability, SLO/SLA management, chaos engineering, and infrastructure automation',
    jobRoles: ['Site Reliability Engineer', 'Platform Engineer', 'Systems Architect'],
    averageSalaryPackage: '₹9 LPA - ₹26 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Operating System Internals & Networking',
        durationMonths: '0 - 2 Months',
        topics: ['Linux Kernel Tuning, Memory Management & Syscalls', 'Network Packet Tracing with eBPF & Wireshark', 'Golang Systems Programming'],
        keyTools: ['Linux Kernel', 'Golang', 'eBPF'],
        suggestedProjects: ['Custom Linux Process & Resource Monitor in Go']
      },
      {
        phaseName: 'Phase 2: Observability & Incident Response',
        durationMonths: '2 - 5 Months',
        topics: ['Prometheus Metrics, Grafana Dashboards, Loki Logs', 'OpenTelemetry Distributed Tracing', 'SLI/SLO/SLA Definition & Error Budgets'],
        keyTools: ['Prometheus', 'Grafana', 'OpenTelemetry'],
        suggestedProjects: ['Full Stack Observability Dashboard with Alerting']
      }
    ],
    recommendedChannels: [
      { name: 'Abhishek Veeramalla', url: 'https://youtube.com/@abhishekveeramalla', note: 'SRE, Kubernetes & DevOps Industry Guide' }
    ]
  },
  {
    id: 'ai_mlops',
    domainName: 'AI Systems & MLOps Engineering',
    category: 'AI & Data',
    iconName: 'Brain',
    description: 'Model deployment, LLM fine-tuning, vector databases, vLLM/Triton inference acceleration, and model monitoring',
    jobRoles: ['MLOps Engineer', 'AI Systems Engineer', 'LLM Infrastructure Developer'],
    averageSalaryPackage: '₹10 LPA - ₹28 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Model Packaging & FastAPI Ingestion',
        durationMonths: '0 - 2 Months',
        topics: ['Containerizing ML Models with Docker & FastAPI', 'ONNX Runtime Acceleration', 'Model Serialization (Pickle, SafeTensors)'],
        keyTools: ['FastAPI', 'Docker', 'ONNX'],
        suggestedProjects: ['Microservice API for Realtime Sentiment Analysis']
      },
      {
        phaseName: 'Phase 2: LLM Inference & Vector Indexing',
        durationMonths: '2 - 5 Months',
        topics: ['vLLM & TensorRT-LLM High Speed Inference', 'Vector Databases (ChromaDB, Pinecone, Qdrant)', 'LoRA / QLoRA Fine-tuning Pipelines'],
        keyTools: ['vLLM', 'ChromaDB', 'Hugging Face'],
        suggestedProjects: ['Enterprise RAG Engine with LoRA Fine-Tuned Model']
      }
    ],
    recommendedChannels: [
      { name: 'Krish Naik', url: 'https://youtube.com/@krishnaik06', note: 'MLOps & LLM Deployment Masterclasses' }
    ]
  },
  {
    id: 'embedded_iot',
    domainName: 'Embedded Systems & Robotics / IoT',
    category: 'Mobile & Security',
    iconName: 'Smartphone',
    description: 'Microcontrollers (ARM/ESP32), RTOS, Embedded C/C++, Circuit Design, and ROS2 Robotics Navigation',
    jobRoles: ['Embedded Firmware Engineer', 'Robotics Systems Developer', 'IoT Architect'],
    averageSalaryPackage: '₹6.5 LPA - ₹16 LPA',
    phases: [
      {
        phaseName: 'Phase 1: C/C++ Firmware & Microcontrollers',
        durationMonths: '0 - 2 Months',
        topics: ['Embedded C Memory Control & Bitwise Manipulation', 'STM32 / ESP32 Architecture & Peripherals (GPIO, UART, SPI, I2C)', 'ADC/DAC Interfacing'],
        keyTools: ['STM32CubeIDE', 'ESP-IDF', 'C/C++'],
        suggestedProjects: ['Smart IoT Environment Sensor Node']
      },
      {
        phaseName: 'Phase 2: Real-Time OS (FreeRTOS) & ROS2',
        durationMonths: '2 - 5 Months',
        topics: ['FreeRTOS Tasks, Mutexes, Semaphores & Queues', 'ROS2 Robot Operating System Communication Nodes', 'Sensor Fusion & Kinematics'],
        keyTools: ['FreeRTOS', 'ROS2', 'Gazebo Simulator'],
        suggestedProjects: ['Autonomous Obstacle Avoiding Rover Robot']
      }
    ],
    recommendedChannels: [
      { name: 'Neso Academy', url: 'https://youtube.com/@nesoacademy', note: 'Microprocessors & Digital Logic Foundations' }
    ]
  },
  {
    id: 'qa_automation',
    domainName: 'Software Quality & Test Automation Engineering',
    category: 'Software',
    iconName: 'Shield',
    description: 'Automated E2E testing, Playwright, Selenium, Cypress, Performance Load Testing with k6, and CI Integration',
    jobRoles: ['SDET (Software Development Engineer in Test)', 'QA Automation Lead'],
    averageSalaryPackage: '₹6 LPA - ₹15 LPA',
    phases: [
      {
        phaseName: 'Phase 1: Modern Web Automation with Playwright',
        durationMonths: '0 - 2 Months',
        topics: ['TypeScript / JavaScript Test Scripting', 'Playwright Selectors, Locators & Assertions', 'Page Object Model (POM) Design Pattern'],
        keyTools: ['Playwright', 'TypeScript', 'VS Code'],
        suggestedProjects: ['Full E-Commerce Web E2E Test Suite']
      },
      {
        phaseName: 'Phase 2: API Testing & Load Performance',
        durationMonths: '2 - 4 Months',
        topics: ['REST API Testing with Postman & Supertest', 'Performance Load Testing with Grafana k6', 'CI/CD Pipeline Test Execution'],
        keyTools: ['Postman', 'k6', 'GitHub Actions'],
        suggestedProjects: ['Automated Load Test Strategy for Payment Gateway']
      }
    ],
    recommendedChannels: [
      { name: 'Testing Mini Bytes', url: 'https://youtube.com/@testingminibytes', note: 'Playwright, Selenium & SDET Masterclass' }
    ]
  }
];

export const YOUTUBE_RECOMMENDED_CHANNELS = [
  // AKTU Semester Core Channels
  {
    id: 'yt-gateway',
    name: 'Gateway Classes',
    category: 'AKTU Semester Exams',
    subjectFocus: 'AKTU Engineering Maths, Physics, CSE, Electrical, Mechanical',
    description: 'Top recommendation for AKTU B.Tech semester preparation with unit-wise syllabus coverage & PYQ solutions.',
    url: 'https://youtube.com/@gatewayclasses',
    recommendedFor: ['BAS101', 'BAS102', 'BCS101', 'KCS301', 'KCS302'],
    isAktuSpecial: true
  },
  {
    id: 'yt-edurudram',
    name: 'EduRudram',
    category: 'AKTU Semester Exams',
    subjectFocus: 'AKTU Semester Exam Unit Crash Courses & Revision Notes',
    description: 'Comprehensive AKTU semester unit explanations, important 10-mark questions & pass guarantee strategies.',
    url: 'https://youtube.com/@edurudram',
    recommendedFor: ['KCS301', 'KCS303', 'KCS401', 'KCS501'],
    isAktuSpecial: true
  },
  {
    id: 'yt-gatesmashers',
    name: 'Gate Smashers (Varun Singla)',
    category: 'AKTU Semester Exams',
    subjectFocus: 'Data Structures, Operating Systems, DBMS, Computer Networks, TAFL, COA',
    description: 'The standard for CS engineering concepts. Crystal clear animations & short focused exam lectures.',
    url: 'https://youtube.com/@gatesmashers',
    recommendedFor: ['KCS301', 'KCS302', 'KCS401', 'KCS501', 'KCS603'],
    isAktuSpecial: true
  },
  {
    id: 'yt-knowledgegate',
    name: 'Knowledge Gate (Sanchit Jain)',
    category: 'AKTU Semester Exams',
    subjectFocus: 'Discrete Structures (DSTL), Compiler Design, DAA, DBMS, Operating Systems',
    description: 'In-depth university exam and GATE level problem solving with step-by-step mathematical proofs.',
    url: 'https://youtube.com/@knowledgegate',
    recommendedFor: ['KCS303', 'KCS502', 'KCS503'],
    isAktuSpecial: true
  },
  {
    id: 'yt-neso',
    name: 'Neso Academy',
    category: 'AKTU Semester Exams',
    subjectFocus: 'C Programming, Digital Electronics, Microprocessors, Computer Networks',
    description: 'High quality animated video series covering core hardware and programming concepts.',
    url: 'https://youtube.com/@nesoacademy',
    recommendedFor: ['BCS101', 'KCS302', 'KCS403'],
    isAktuSpecial: true
  },
  {
    id: 'yt-jenny',
    name: 'Jennys Lectures CS IT',
    category: 'AKTU Semester Exams',
    subjectFocus: 'C, C++, Data Structures, Operating Systems, Design & Analysis of Algorithms',
    description: 'Handwritten blackboard style CS lecture notes explaining core algorithms step-by-step.',
    url: 'https://youtube.com/@jennyslecturescsit',
    recommendedFor: ['BCS101', 'KCS301', 'KCS401', 'KCS503'],
    isAktuSpecial: true
  },
  {
    id: 'yt-abdulbari',
    name: 'Abdul Bari',
    category: 'AKTU Semester Exams',
    subjectFocus: 'Algorithms (DAA), Data Structures, Dynamic Programming',
    description: 'Master of Algorithm visual proofs, time complexity derivations and DP state transition logic.',
    url: 'https://youtube.com/@abdulbari',
    recommendedFor: ['KCS301', 'KCS503'],
    isAktuSpecial: true
  },

  // Tech & Coding Channels
  {
    id: 'yt-codewithharry',
    name: 'CodeWithHarry',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'C, C++, Python, Web Dev, Java, Data Structures, Android',
    description: 'Comprehensive Hindi programming roadmaps, full length courses & project tutorials.',
    url: 'https://youtube.com/@codewithharry',
    recommendedFor: ['Web Dev', 'Python', 'C++', 'Java'],
    isAktuSpecial: false
  },
  {
    id: 'yt-sheryians',
    name: 'Sheryians Coding School',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'Modern Frontend, JavaScript ES6, React, Node.js, Animations, CSS Art',
    description: 'Trendy, production-level frontend engineering and interactive web animation school.',
    url: 'https://youtube.com/@sheryianscodingschool',
    recommendedFor: ['Full Stack Web Dev', 'UI/UX'],
    isAktuSpecial: false
  },
  {
    id: 'yt-telusko',
    name: 'Telusko (Navin Reddy)',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'Java, Spring Boot, Microservices, Python, Blockchain, Docker',
    description: 'Industry Java and backend framework guide from beginner to enterprise microservices.',
    url: 'https://youtube.com/@telusko',
    recommendedFor: ['Java', 'Spring Boot', 'Backend'],
    isAktuSpecial: false
  },
  {
    id: 'yt-piyushgarg',
    name: 'Piyush Garg',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'Node.js, Docker, Next.js 14, System Design, DevOps, WebSockets',
    description: 'Modern fullstack developer channel focused on real-world production projects & cloud tech.',
    url: 'https://youtube.com/@piyushgargdev',
    recommendedFor: ['Node.js', 'Docker', 'System Design'],
    isAktuSpecial: false
  },
  {
    id: 'yt-striver',
    name: 'takeUforward (Striver)',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'A2Z DSA Sheet, SDE Sheet, C++, Java, Dynamic Programming, Graphs',
    description: 'The gold standard for product company interview DSA preparation (FAANG / Top Tech).',
    url: 'https://youtube.com/@takeuforward',
    recommendedFor: ['DSA Mastery', 'C++', 'Java'],
    isAktuSpecial: false
  },
  {
    id: 'yt-lovebabbar',
    name: 'Love Babbar',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'Supreme DSA Series in C++, Web Development, Operating System Notes',
    description: 'High energy C++ DSA sheet, placement prep guidance and software project series.',
    url: 'https://youtube.com/@lovebabbar',
    recommendedFor: ['DSA C++', 'Placements'],
    isAktuSpecial: false
  },
  {
    id: 'yt-apnacollege',
    name: 'Apna College (Shradha Khapra)',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'C++, Java, Full Stack Web Dev, Python, DSA One Shots',
    description: 'Beginner-friendly structured CS foundation courses with complete notes & sheets.',
    url: 'https://youtube.com/@apnacollegeofficial',
    recommendedFor: ['C++', 'Java', 'Web Dev'],
    isAktuSpecial: false
  },
  {
    id: 'yt-chaiaurcode',
    name: 'Chai aur Code (Hitesh Choudhary)',
    category: 'Domain & Coding Mastery',
    subjectFocus: 'JavaScript, React, Node.js, Python, React Native, Git',
    description: 'In-depth conceptual Hindi coding series focusing on real developer mechanics.',
    url: 'https://youtube.com/@chaiaurcode',
    recommendedFor: ['JavaScript', 'React', 'Backend'],
    isAktuSpecial: false
  }
];

export const DSA_SHEET_TOPICS = [
  {
    id: 'dsa-1',
    topicName: 'Arrays & Two Pointers',
    difficulty: 'Easy' as const,
    leetcodePattern: 'Two Pointers / Sliding Window',
    keyConcepts: ['Memory Contiguity', 'Time Complexity O(N)', 'In-place Modification', 'Prefix Sum Array'],
    commonVivaQuestions: [
      'What is address calculation formula for a 2D array stored in Row-Major order?',
      'How does Two Pointer technique reduce O(N^2) brute force to O(N)?'
    ],
    cppSnippet: `// C++ Two Pointer Two Sum Solution
#include <iostream>
#include <vector>
#include <algorithm>

bool hasTwoSum(std::vector<int>& nums, int target) {
    std::sort(nums.begin(), nums.end());
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`,
    javaSnippet: `// Java Two Pointer Two Sum
import java.util.Arrays;

public class TwoSum {
    public static boolean hasTwoSum(int[] nums, int target) {
        Arrays.sort(nums);
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return true;
            if (sum < target) left++;
            else right--;
        }
        return false;
    }
}`,
    pythonSnippet: `# Python Two Pointer
def has_two_sum(nums, target):
    nums.sort()
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False`
  },
  {
    id: 'dsa-2',
    topicName: 'Stack & Monotonic Queue',
    difficulty: 'Medium' as const,
    leetcodePattern: 'Next Greater Element / Valid Parentheses',
    keyConcepts: ['LIFO Memory Principle', 'Parentheses Matching', 'Infix to Postfix Stack Parsing', 'Monotonic Decreasing Stack'],
    commonVivaQuestions: [
      'Explain how Call Stack handles function recursion in memory.',
      'How do you convert an expression from infix to postfix using a stack?'
    ],
    cppSnippet: `// C++ Valid Parentheses using Stack
#include <stack>
#include <string>

bool isValid(std::string s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '['))
                return false;
        }
    }
    return st.empty();
}`,
    javaSnippet: `// Java Valid Parentheses
import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '['))
                    return false;
            }
        }
        return stack.isEmpty();
    }
}`,
    pythonSnippet: `# Python Valid Parentheses
def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
    return not stack`
  },
  {
    id: 'dsa-3',
    topicName: 'Binary Trees & Traversals',
    difficulty: 'Medium' as const,
    leetcodePattern: 'Inorder / Preorder / Postorder / Level Order (BFS)',
    keyConcepts: ['Hierarchical Data Representation', 'Recursion & Base Cases', 'BFS Queue Traversal', 'Height & Diameter of Tree'],
    commonVivaQuestions: [
      'Why does Inorder Traversal of a Binary Search Tree (BST) always yield sorted order?',
      'Differentiate between Binary Tree and Binary Search Tree.'
    ],
    cppSnippet: `// C++ Binary Tree Node & Inorder Traversal
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    std::cout << root->val << " ";
    inorder(root->right);
}`,
    javaSnippet: `// Java BST Node & Inorder
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class TreeTraversal {
    public void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }
}`,
    pythonSnippet: `# Python Tree Inorder
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)`
  }
];

export const YOUTUBE_CHANNELS = [
  // -------------------------------------------------------------
  // DSA & PLACEMENTS
  // -------------------------------------------------------------
  {
    id: 'yt-dsa-1',
    channelName: 'takeUforward (Striver)',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@takeUforward',
    recommendedFor: 'Striver A2Z DSA Sheet, SDE Sheet, C++ STL, Dynamic Programming',
    description: 'Gold standard DSA placement preparation sheet with C++ & Java solutions, time-space complexity, and coding interview guidance.'
  },
  {
    id: 'yt-dsa-2',
    channelName: 'Love Babbar',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@LoveBabbar',
    recommendedFor: 'Supreme DSA Series, C++ Placement Playlist, Resume Tips',
    description: 'Popular C++ DSA playlist, placement advice, resume tips, and product-based company interview drills.'
  },
  {
    id: 'yt-dsa-3',
    channelName: 'NeetCode',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@NeetCode',
    recommendedFor: 'LeetCode 75, Blind 75, Algorithms & Data Structure Visualizations',
    description: 'Concise visual walkthroughs of top LeetCode problems in Python, C++, and Java with clean pattern explanations.'
  },
  {
    id: 'yt-dsa-4',
    channelName: 'Abdul Bari',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@abdul_bari',
    recommendedFor: 'Core Algorithm Analysis, Dynamic Programming, Greedy Methods',
    description: 'World-renowned whiteboard explanations of algorithm design paradigms, time complexity math, and graph theory.'
  },
  {
    id: 'yt-dsa-5',
    channelName: 'Kunal Kushwaha',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@kunalkushwaha',
    recommendedFor: 'Complete Java & DSA Bootcamp, Git & Open Source',
    description: 'Free comprehensive Java + Data Structures & Algorithms bootcamp with hands-on practice problems.'
  },
  {
    id: 'yt-dsa-6',
    channelName: 'Apna College (Shradha Khapra)',
    category: 'DSA & Placements',
    url: 'https://www.youtube.com/@ApnaCollegeOfficial',
    recommendedFor: 'C++ & Java Placement Course, Web Development',
    description: 'Beginner to advanced DSA courses in C++ and Java with placement guidance for product companies.'
  },

  // -------------------------------------------------------------
  // FULL STACK & WEB DEV
  // -------------------------------------------------------------
  {
    id: 'yt-web-1',
    channelName: 'CodeWithHarry',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@CodeWithHarry',
    recommendedFor: 'React.js, Node.js, Express, MongoDB, Web Dev in Hindi',
    description: 'Comprehensive Hindi coding bootcamps, project tutorials, and full-stack web development playlists.'
  },
  {
    id: 'yt-web-2',
    channelName: 'Chai aur Code (Hitesh Choudhary)',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@chaiaurcode',
    recommendedFor: 'JavaScript, React, Modern Backend, Git & Open Source',
    description: 'Deep-dive conceptual JavaScript, React, Node.js, and backend engineering explained clearly in Hindi.'
  },
  {
    id: 'yt-web-3',
    channelName: 'Sheryians Coding School',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@sheryianscodingschool',
    recommendedFor: 'Modern UI/UX, React.js, GSAP Animations, Frontend Projects',
    description: 'Industry-level creative web design, JavaScript animations, and production web application build-alongs.'
  },
  {
    id: 'yt-web-4',
    channelName: 'Piyush Garg',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@PiyushGargDev',
    recommendedFor: 'Next.js 14, Node.js, Docker, WebSockets, Fullstack Architecture',
    description: 'Modern fullstack tutorials, cloud deployments, Next.js App Router, Docker, and scalable system engineering.'
  },
  {
    id: 'yt-web-5',
    channelName: 'freeCodeCamp.org',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@freecodecamp',
    recommendedFor: 'Full Length Tech Bootcamps, Python, React, SQL & Cloud',
    description: 'Free multi-hour comprehensive masterclasses on software engineering, computer science, and full stack development.'
  },
  {
    id: 'yt-web-6',
    channelName: 'Fireship',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@Fireship',
    recommendedFor: '100 Seconds of Code, Tech Trends, Modern Frameworks',
    description: 'High-speed, humorous tech overviews and fast-paced tutorials on modern web development tools and frameworks.'
  },
  {
    id: 'yt-web-7',
    channelName: 'Traversy Media',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@TraversyMedia',
    recommendedFor: 'HTML/CSS, JavaScript Crash Courses, MERN Stack',
    description: 'Practical project-based web development tutorials and crash courses for all skill levels.'
  },
  {
    id: 'yt-web-8',
    channelName: 'Technical Suneja',
    category: 'Full Stack & Web Dev',
    url: 'https://www.youtube.com/@TechnicalSuneja',
    recommendedFor: 'Frontend & React Interview Questions, JavaScript Drills',
    description: 'Focused video tutorials on JavaScript output questions, React interview machine coding, and web performance.'
  },

  // -------------------------------------------------------------
  // AI & DATA SCIENCE
  // -------------------------------------------------------------
  {
    id: 'yt-ai-1',
    channelName: 'StatQuest with Josh Starmer',
    category: 'AI & Data Science',
    url: 'https://www.youtube.com/@statquest',
    recommendedFor: 'Machine Learning Math, Neural Networks, Statistics & LLMs',
    description: 'Clear, fun visual breakdowns of complex machine learning algorithms, deep learning, gradient descent, and Transformers.'
  },
  {
    id: 'yt-ai-2',
    channelName: 'Andrej Karpathy',
    category: 'AI & Data Science',
    url: 'https://www.youtube.com/@AndrejKarpathy',
    recommendedFor: 'Neural Networks from Scratch, LLMs, Micrograd & GPT Building',
    description: 'Former OpenAI researcher and Tesla AI director teaching how to build neural networks and GPT language models from scratch.'
  },
  {
    id: 'yt-ai-3',
    channelName: 'Krish Naik',
    category: 'AI & Data Science',
    url: 'https://www.youtube.com/@krishnaik06',
    recommendedFor: 'Data Science Roadmap, PyTorch, LangChain, Generative AI Projects',
    description: 'End-to-end Machine Learning, MLOps, RAG applications, and Generative AI project masterclasses in Hindi & English.'
  },
  {
    id: 'yt-ai-4',
    channelName: 'CampusX (Nitish Singh)',
    category: 'AI & Data Science',
    url: 'https://www.youtube.com/@campusx-official',
    recommendedFor: '100 Days of Machine Learning, Deep Learning & NLP',
    description: 'Comprehensive structured curriculum on Machine Learning mathematics, Pandas, Scikit-learn, and neural networks.'
  },
  {
    id: 'yt-ai-5',
    channelName: '3Blue1Brown',
    category: 'AI & Data Science',
    url: 'https://www.youtube.com/@3blue1brown',
    recommendedFor: 'Essence of Linear Algebra, Calculus, Neural Network Visualizations',
    description: 'Incredible geometric and mathematical visual explanations for neural networks, linear algebra, and calculus.'
  },

  // -------------------------------------------------------------
  // SYSTEM DESIGN & CS CORE
  // -------------------------------------------------------------
  {
    id: 'yt-sys-1',
    channelName: 'ByteByteGo (Alex Xu)',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@ByteByteGo',
    recommendedFor: 'System Design Interview, Microservices, Caching & Load Balancing',
    description: 'Animated architecture explanations for distributed systems, database scaling, Redis caching, and rate limiters.'
  },
  {
    id: 'yt-sys-2',
    channelName: 'Gaurav Sen',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@gkcs',
    recommendedFor: 'High Level Design (HLD), Low Level Design (LLD), Message Queues',
    description: 'Deep architectural breakdowns of real-world scalable systems like WhatsApp, Netflix, Uber, and distributed databases.'
  },
  {
    id: 'yt-sys-3',
    channelName: 'Gate Smashers',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@GateSmashers',
    recommendedFor: 'Operating Systems, DBMS, Computer Networks, COA',
    description: 'Simplified concept diagrams for computer science core subjects, GATE concepts, and fundamental engineering modules.'
  },
  {
    id: 'yt-sys-4',
    channelName: 'Arpit Bhayani',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@AsliEngineering',
    recommendedFor: 'Asli Engineering, Database Engines, Distributed Systems',
    description: 'In-depth engineering masterclasses on how databases work internally, memory allocators, and production scale engineering.'
  },
  {
    id: 'yt-sys-5',
    channelName: 'The Primeagen',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@ThePrimeagen',
    recommendedFor: 'High Performance Backend, Go, Rust, Developer Tools',
    description: 'Energetic analysis of software architecture, high-concurrency systems, low-level performance, and developer efficiency.'
  },
  {
    id: 'yt-sys-6',
    channelName: 'Jenny\'s Lectures CS IT',
    category: 'System Design & CS Core',
    url: 'https://www.youtube.com/@JennyslecturesCSIT',
    recommendedFor: 'Operating Systems, C Programming, Data Structures',
    description: 'Crystal clear classroom-style lectures on foundational computer science concepts and C programming.'
  }
];

export const AKTU_ACADEMIC_EVENTS = [
  {
    id: 'evt-1',
    title: 'AKTU Odd Semester Commencement',
    eventType: 'University Holiday' as const,
    startDate: '2026-08-01',
    semesterRange: 'Sem 3, 5, 7',
    description: 'Official commencement of Odd Semester academic session classes for all B.Tech branches.',
    isOfficialAKTU: true
  },
  {
    id: 'evt-2',
    title: 'AKTU Sessional Exam 1 (Internal Test 1)',
    eventType: 'Sessional Exam' as const,
    startDate: '2026-09-20',
    endDate: '2026-09-25',
    semesterRange: 'Sem 1, 3, 5, 7',
    description: 'First sessional examination covering Unit 1 and Unit 2 of all core syllabus subjects (Weightage: 15 Marks).',
    isOfficialAKTU: true
  },
  {
    id: 'evt-3',
    title: 'AKTU Sessional Exam 2 (Internal Test 2)',
    eventType: 'Sessional Exam' as const,
    startDate: '2026-11-10',
    endDate: '2026-11-15',
    semesterRange: 'Sem 1, 3, 5, 7',
    description: 'Second sessional examination covering Unit 3, 4, and 5 syllabus (Weightage: 15 Marks).',
    isOfficialAKTU: true
  },
  {
    id: 'evt-4',
    title: 'AKTU End-Semester Practical Vivas & Labs',
    eventType: 'Practical Viva' as const,
    startDate: '2026-12-05',
    endDate: '2026-12-15',
    semesterRange: 'Sem 1 to Sem 8',
    description: 'External university practical viva exams conducted by AKTU appointed external professors (50 Marks).',
    isOfficialAKTU: true
  },
  {
    id: 'evt-5',
    title: 'AKTU End-Semester Theory Examinations',
    eventType: 'End Sem Theory' as const,
    startDate: '2026-12-20',
    endDate: '2027-01-10',
    semesterRange: 'Sem 1 to Sem 8',
    description: 'AKTU official end-semester written theory examinations at designated exam centers (70 Marks per subject).',
    isOfficialAKTU: true
  }
];

export const AKTU_MARKING_SCHEME = {
  theory: {
    subjectType: 'Theory Subject' as const,
    credits: 4,
    internalMarks: 30, // Sessional 1 (15) + Sessional 2 (15) + Teacher Assessment
    externalMarks: 70, // Written End Sem Exam
    totalMarks: 100,
    minExternalPassPercent: 30, // Minimum 21/70 in External Theory
    minTotalPassPercent: 40 // Minimum 40/100 aggregate
  },
  practical: {
    subjectType: 'Practical / Lab' as const,
    credits: 1.5,
    internalMarks: 50, // Sessional Lab Assessment + File
    externalMarks: 50, // External Professor Viva + Experiment
    totalMarks: 100,
    minExternalPassPercent: 50,
    minTotalPassPercent: 50
  },
  gradeScale: [
    { grade: 'O (Outstanding)', minPercentage: 90, gradePoint: 10 },
    { grade: 'A+ (Excellent)', minPercentage: 80, gradePoint: 9 },
    { grade: 'A (Very Good)', minPercentage: 70, gradePoint: 8 },
    { grade: 'B+ (Good)', minPercentage: 60, gradePoint: 7 },
    { grade: 'B (Above Average)', minPercentage: 50, gradePoint: 6 },
    { grade: 'C (Average)', minPercentage: 45, gradePoint: 5 },
    { grade: 'P (Pass)', minPercentage: 40, gradePoint: 4 },
    { grade: 'F (Fail)', minPercentage: 0, gradePoint: 0 }
  ]
};

export const AKTU_BATCH_DETAILS = [
  { batch: '2022-2026', admissionYear: 2022, passingYear: 2026, scheme: 'AKTU Choice Based Credit System (CBCS)' },
  { batch: '2023-2027', admissionYear: 2023, passingYear: 2027, scheme: 'AKTU NEP-2020 Model Curriculum' },
  { batch: '2024-2028', admissionYear: 2024, passingYear: 2028, scheme: 'AKTU NEP-2020 AI & Industry Aligned Curriculum' },
  { batch: '2025-2029', admissionYear: 2025, passingYear: 2029, scheme: 'AKTU New Syllabus 2025 (Outcome-Based Education)' },
  { batch: '2026-2030', admissionYear: 2026, passingYear: 2030, scheme: 'AKTU Future-Tech Syllabus 2026 (GenAI & Quantum Integrated)' }
];

export const AKTU_ACADEMIC_SCHEMES = [
  {
    id: 'scheme-2025',
    name: 'AKTU 2025-2029 New Curriculum',
    batches: ['2025-2029'],
    admissionYear: 2025,
    passingYear: 2029,
    description: 'Outcome-based engineering curriculum with compulsory AI/ML labs, Data Science, and Industry Internship credits.'
  },
  {
    id: 'scheme-2026',
    name: 'AKTU 2026-2030 Future-Tech Curriculum',
    batches: ['2026-2030'],
    admissionYear: 2026,
    passingYear: 2030,
    description: 'Advanced curriculum incorporating Generative AI, Cyber Security, Quantum Computing basics, and Hands-on Capstones.'
  },
  {
    id: 'scheme-nep',
    name: 'AKTU NEP-2020 Curriculum',
    batches: ['2023-2027', '2024-2028'],
    admissionYear: 2023,
    passingYear: 2027,
    description: 'National Education Policy aligned 4-Year B.Tech with multidisciplinary electives and skill enhancement courses.'
  }
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'qb-1',
    subjectCode: 'KCS301',
    unitNumber: 1,
    topic: 'Asymptotic Notations',
    difficulty: 'Medium',
    question: 'What is Big-O notation and how does it differ from Omega and Theta in algorithm analysis?',
    expectedAnswer: 'Big-O represents the upper bound on execution time f(n) <= c*g(n), giving worst-case complexity. Omega (Ω) gives lower bound f(n) >= c*g(n) for best-case, and Theta (Θ) gives tight bound when f(n) is bounded both above and below.',
    keywords: ['upper bound', 'lower bound', 'tight bound', 'worst case', 'c*g(n)'],
    explanation: 'Asymptotic notation compares algorithm growth rate as input size n tends to infinity.'
  },
  {
    id: 'qb-2',
    subjectCode: 'KCS301',
    unitNumber: 4,
    topic: 'AVL Trees & Rotations',
    difficulty: 'Hard',
    question: 'Explain how rotation maintains balance in an AVL tree when a node becomes unbalanced.',
    expectedAnswer: 'AVL trees maintain height balance factor in {-1, 0, +1}. Single rotations (LL or RR) fix outer subtree insertion, while double rotations (LR or RL) fix inner subtree insertion by rebalancing root heights in O(log N) time.',
    keywords: ['balance factor', 'LL rotation', 'RR rotation', 'LR rotation', 'RL rotation', 'O(log N)'],
    explanation: 'Balance factor = Height(Left Subtree) - Height(Right Subtree).'
  },
  {
    id: 'qb-3',
    subjectCode: 'KCS501',
    unitNumber: 3,
    topic: 'BCNF Normalization',
    difficulty: 'Hard',
    question: 'Define BCNF and explain how it differs from 3NF with a relational schema example.',
    expectedAnswer: 'A relation is in BCNF if for every non-trivial functional dependency X -> Y, X is a super key. 3NF allows Y to be a prime attribute, whereas BCNF strictly forbids non-superkey determinants even if Y is prime.',
    keywords: ['super key', 'functional dependency', 'determinant', 'prime attribute', '3NF vs BCNF'],
    explanation: 'BCNF eliminates anomalies caused by overlapping candidate keys.'
  }
];
