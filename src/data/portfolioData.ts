export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  period: string;
  flagship?: boolean;
  category: 'AI & Mobile' | 'Full-Stack Web';
  technologies: string[];
  description: string;
  problem: string;
  solution: string;
  highlight?: string;
  features: string[];
  architecture: string[];
  contribution: string;
  githubUrl: string;
  demoUrl?: string;
  status: 'Completed' | 'In Progress' | 'Flagship';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  mode: string;
  highlights: string[];
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  stage: string;
  location?: string;
  category: 'Hackathon' | 'Technical Competition';
  description: string;
  iconName: 'trophy' | 'award' | 'zap';
  photos?: {
    url: string;
    caption: string;
    event: string;
  }[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'AI & ML' | 'Frontend' | 'Backend & Database' | 'Tools & Workflow';
  description: string;
  projectUsage: string;
  level: 'Advanced' | 'Proficient' | 'Core';
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Keerthisha Srinivasan',
    title: 'Full-Stack AI Developer',
    roles: [
      'FULL-STACK AI DEVELOPER',
      'AI SOLUTION BUILDER',
      'SOFTWARE DEVELOPER',
      'PROBLEM SOLVER',
    ],
    degree: 'Bachelor of Technology in Information Technology',
    college: 'Adithya Institute of Technology',
    location: 'Coimbatore, Tamil Nadu, India',
    period: 'September 2023 – May 2027',
    summary:
      'Dedicated and detail-oriented Information Technology undergraduate with a strong academic foundation and passion for software development and innovation. Strong in problem-solving, analytical thinking, teamwork, and continuous learning.',
    heroStatement:
      '“I build practical web and AI-powered solutions that turn real-world problems into meaningful digital experiences.”',
    aboutParagraphs: [
      'Currently pursuing a B.Tech in Information Technology at Adithya Institute of Technology (2023–2027), I focus on the intersection of modern full-stack web engineering and intelligent machine learning systems.',
      'From architecting accessible computer-vision platforms like Lumiable to streamlining campus placement operations with scalable web architectures, my approach centers on engineering practical, high-impact digital experiences that solve tangible challenges.',
    ],
    email: 'keerthishasrini@gmail.com',
    phone: '+91 9080435529',
    linkedin: 'https://www.linkedin.com/in/keerthisha-srinivasan-573939305/',
    github: 'https://github.com/Keerthishasrinivasan',
    resumePdf: '/Keerthisha_Resume.pdf',
    availability: 'Available for Summer Internships & Full-Stack AI Roles',
  },

  aboutCards: [
    {
      id: '01',
      title: 'DEVELOPER',
      headline: 'Full-Stack Web Architecture',
      description:
        'Builds responsive, maintainable, and practical web applications using Python, Flask, React.js, HTML, CSS, and relational SQL databases.',
      tags: ['React.js', 'Python', 'Flask', 'SQL', 'HTML5/CSS3'],
    },
    {
      id: '02',
      title: 'AI EXPLORER',
      headline: 'Applied Artificial Intelligence',
      description:
        'Built Lumiable, an AI-powered accessibility and safety platform leveraging TensorFlow Lite, Google Maps API, and ML Kit for low-latency on-device perception.',
      tags: ['TensorFlow Lite', 'ML Kit', 'Computer Vision', 'Maps API'],
    },
    {
      id: '03',
      title: 'PROBLEM SOLVER',
      headline: 'Competitive Engineering',
      description:
        'National Level AWS Hackathon Finalist in Hyderabad, Larsen & Toubro Hackathon Finalist in Chennai, and multiple top prize winner in technical presentation competitions.',
      tags: ['AWS Hackathon', 'L&T Hackathon', 'System Design', 'Innovation'],
    },
  ],

  skills: [
    {
      id: 'python',
      name: 'Python',
      category: 'AI & ML',
      description: 'Primary programming language for AI pipelines, Flask backends, and algorithm design.',
      projectUsage: 'Used across Lumiable, Placement Management, and Blood Donor Finder.',
      level: 'Advanced',
    },
    {
      id: 'tflite',
      name: 'TensorFlow Lite',
      category: 'AI & ML',
      description: 'High-performance mobile and edge machine learning inference runtime.',
      projectUsage: 'Engineered real-time on-device object detection for SeeSphere in Lumiable.',
      level: 'Proficient',
    },
    {
      id: 'mlkit',
      name: 'ML Kit',
      category: 'AI & ML',
      description: 'Google machine learning SDK for real-time mobile vision and language tasks.',
      projectUsage: 'Integrated environmental analysis and text extraction in Lumiable.',
      level: 'Proficient',
    },
    {
      id: 'mapsapi',
      name: 'Google Maps API',
      category: 'AI & ML',
      description: 'Geospatial mapping, live tracking, and geofencing platform.',
      projectUsage: 'Delivered live location tracking and emergency SOS dispatch routing.',
      level: 'Proficient',
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'Frontend',
      description: 'Modern component-driven declarative UI library for responsive SPAs.',
      projectUsage: 'Front-end interface engineering and interactive web dashboards.',
      level: 'Proficient',
    },
    {
      id: 'html5',
      name: 'HTML5',
      category: 'Frontend',
      description: 'Semantic structure, accessibility standards, and web document semantics.',
      projectUsage: 'Core structure across all web applications and templates.',
      level: 'Advanced',
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'Frontend',
      description: 'Modern layouts, responsive design, animations, and fluid styling.',
      projectUsage: 'Custom responsive styling and glassmorphic user interfaces.',
      level: 'Advanced',
    },
    {
      id: 'flask',
      name: 'Flask',
      category: 'Backend & Database',
      description: 'Lightweight, modular Python micro-framework for RESTful services.',
      projectUsage: 'Backend API routing for Placement Portal and Blood Donor Finder.',
      level: 'Proficient',
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Backend & Database',
      description: 'Relational query language for structured data schema and analysis.',
      projectUsage: 'Complex joins, indexing, and transactional queries across projects.',
      level: 'Advanced',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Backend & Database',
      description: 'Enterprise relational database management system.',
      projectUsage: 'Persistent transactional storage for users, companies, and jobs.',
      level: 'Proficient',
    },
    {
      id: 'sqlite',
      name: 'SQLite',
      category: 'Backend & Database',
      description: 'Zero-configuration, serverless relational database engine.',
      projectUsage: 'Local fast prototyping and embedded database management.',
      level: 'Proficient',
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Tools & Workflow',
      description: 'Distributed version control system for tracking source code changes.',
      projectUsage: 'Feature branching, commit management, and collaborative workflows.',
      level: 'Proficient',
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Tools & Workflow',
      description: 'Cloud repository hosting, CI/CD integrations, and collaboration.',
      projectUsage: 'Open-source repository management and codebase versioning.',
      level: 'Proficient',
    },
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'Tools & Workflow',
      description: 'Extensible integrated development environment for multi-language dev.',
      projectUsage: 'Primary daily IDE for Python, React, Flask, and SQL development.',
      level: 'Advanced',
    },
  ] as SkillNode[],

  projects: [
    {
      id: 'lumiable',
      title: 'LUMIABLE',
      subtitle: 'AI-Powered Accessibility & Safety Platform',
      tagline: 'Empowering visually impaired users with on-device computer vision and emergency navigation.',
      period: '2025',
      flagship: true,
      category: 'AI & Mobile',
      status: 'Flagship',
      technologies: ['Python', 'TensorFlow Lite', 'Google Maps API', 'ML Kit'],
      description:
        'An AI-powered mobile application engineered to assist visually impaired individuals with autonomous navigation, real-time environmental hazard awareness, and instantaneous emergency support.',
      problem:
        'Visually impaired people face unpredictable physical obstacles, navigation barriers in unfamiliar venues, and life-threatening delays when seeking emergency assistance during independent daily commute.',
      solution:
        'Engineered an integrated assistive platform combining on-device computer vision for low-latency obstacle identification, synthesized acoustic feedback, live coordinate broadcasting, and one-tap SOS dispatch.',
      highlight:
        'Built the flagship SeeSphere perception module for real-time object detection and contextual voice guidance.',
      features: [
        'SeeSphere real-time obstacle & object detection',
        'Voice-based environmental and proximity feedback',
        'One-touch SOS emergency alert triggers',
        'Real-time live location tracking via Google Maps',
        'Multilingual voice guidance for inclusive accessibility',
        'Low-latency on-device machine learning inference',
      ],
      architecture: [
        'Camera Frame Stream → TensorFlow Lite Inference Engine',
        'ML Kit Vision Processing → Object & Spatial Hazard Classification',
        'Text-to-Speech Audio Pipeline → Real-Time Audio Feedback',
        'Google Maps API Geolocation → Live Tracking & Emergency Geofence',
      ],
      contribution:
        'Architected the core SeeSphere perception pipeline, integrated TensorFlow Lite models for high-frame-rate mobile inference, designed the spatial audio feedback cues, and connected geolocation tracking for emergency safety triggers.',
      githubUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
      demoUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
    },
    {
      id: 'placement-management',
      title: 'STUDENT PLACEMENT MANAGEMENT SYSTEM',
      subtitle: 'Full-Stack Campus Recruitment Automation Platform',
      tagline: 'Streamlining university campus recruitment with automated application tracking and analytics.',
      period: '2026',
      flagship: false,
      category: 'Full-Stack Web',
      status: 'Completed',
      technologies: ['Python', 'Flask', 'HTML', 'CSS', 'SQL', 'VS Code'],
      description:
        'A full-stack web application designed to automate student placement activities, eliminate tedious manual paperwork, and provide recruiters and students with real-time tracking.',
      problem:
        'Collegiate recruitment drives traditionally rely on disjointed spreadsheets, leading to lost resumes, communication gaps, slow verification, and absent progress analytics for placement officers.',
      solution:
        'Constructed a centralized web portal with role-based authentication, allowing students to manage verified credentials, companies to post job openings, and administrators to track recruitment metrics in real time.',
      features: [
        'Dual-role secure authentication (Students & Administrators)',
        'Comprehensive student profile and academic credential management',
        'Company registry and job openings management module',
        'End-to-end job application lifecycle tracking',
        'Multi-parameter search and eligibility filtering',
        'SQL relational database integration for reliable data persistence',
        'Interactive administrative placement analytics dashboard',
        'Recruitment stage monitoring and cohort placement statistics',
      ],
      architecture: [
        'Frontend UI (Semantic HTML5, CSS3 responsive grid)',
        'Application Layer (Python Flask REST routing & middleware)',
        'Security (Session authentication & input sanitization)',
        'Persistence Layer (Relational SQL database with indexed queries)',
      ],
      contribution:
        'Designed relational SQL schemas for candidates, recruiters, and application states; developed Flask backend endpoints and authentication workflows; built the interactive metrics dashboard for placement officers.',
      githubUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
      demoUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
    },
    {
      id: 'blood-donor-finder',
      title: 'BLOOD DONOR FINDER',
      subtitle: 'Emergency Blood Connect & Hospital Notification System',
      tagline: 'Bridging patients, hospitals, and voluntary blood donors during critical medical emergencies.',
      period: '2026',
      flagship: false,
      category: 'Full-Stack Web',
      status: 'Completed',
      technologies: ['Python', 'Flask', 'HTML', 'CSS', 'SQL', 'VS Code'],
      description:
        'A full-stack web application designed to connect blood donors directly with patients and healthcare facilities during emergency situations through real-time availability matching.',
      problem:
        'During urgent surgical or trauma emergencies, identifying compatible and currently eligible blood donors in proximity is hindered by outdated registers and lack of instantaneous hospital alerts.',
      solution:
        'Engineered an emergency-first directory with real-time donor availability toggles, location-based query filters, and a dedicated hospital portal to broadcast prioritized donation requests.',
      features: [
        'Donor registration with medical availability verification',
        'Secure authentication and profile data management',
        'Precise blood group matching and geographical indexing',
        'Real-time donor availability status toggle',
        'Advanced multi-criteria donor query engine',
        'Hospital emergency broadcast dashboard',
        'Instant blood request notification dispatch',
        'Historical donation records and eligibility cooldown tracking',
      ],
      architecture: [
        'Client Tier (Mobile-first responsive emergency search interface)',
        'Controller Tier (Flask application routes and business logic)',
        'Query Engine (Optimized SQL queries by blood group & availability)',
        'Hospital Dispatch (Urgent request queue & event logging)',
      ],
      contribution:
        'Engineered the core SQL matching query engine for blood compatibility, built the hospital request alert module, implemented secure donor account management, and ensured cross-device responsiveness.',
      githubUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
      demoUrl: 'https://github.com/Keerthishasrinivasan/portfolio-2026',
    },
  ] as Project[],

  experience: [
    {
      id: 'cognifyz-internship',
      role: 'Full Stack Development Intern',
      company: 'Cognifyz Technologies',
      period: 'February 2026 – March 2026',
      mode: 'Remote',
      highlights: [
        'Developed responsive full-stack web applications by implementing front-end interfaces and back-end functionalities.',
        'Applied modern software engineering principles to build maintainable, scalable, and user-centric web applications.',
        'Collaborated in an Agile development environment, actively participating in debugging, testing, and feature implementation.',
        'Enhanced technical proficiency in full-stack architecture, problem-solving, and industry-standard Git development workflows.',
      ],
      skills: ['Full-Stack Development', 'Frontend Architecture', 'Backend APIs', 'Agile Workflows', 'Debugging & QA', 'Scalable Code'],
    },
  ] as Experience[],

  achievements: [
    {
      id: 'tech-seminars',
      title: 'Paper Presentation & Technical Seminars',
      stage: 'Multiple Top Prizes',
      location: 'Tamil Nadu, India',
      category: 'Technical Competition',
      description:
        'Presented research on "Drug Trafficking Detection on Social Media" and emerging computational paradigms at inter-collegiate symposiums including UTHRA Fest (United Institute of Technology & Dept of IT), earning multiple top honors.',
      iconName: 'award',
      photos: [
        {
          url: '/achievements/stage_award_ceremony.jpg',
          caption: 'Receiving Award on Stage at United Institute of Technology (UTHRA Fest)',
          event: 'UTHRA Inter-College Techno-Cultural Fest',
        },
        {
          url: '/achievements/uthra_paper_presentation.jpg',
          caption: 'Delivering Technical Paper Presentation on "Drug Trafficking on Social Media"',
          event: 'UTHRA Paper Presentation Competition',
        },
        {
          url: '/achievements/presentation_evaluation.jpg',
          caption: 'Live Jury & Evaluator Technical Defense of Social Media Trace Analysis',
          event: 'Department of Information Technology Symposium',
        },
        {
          url: '/achievements/certificate_handover.jpg',
          caption: 'Stage Felicitation and Certificate of Achievement Handover',
          event: 'Inter-Collegiate Technical Awards',
        },
      ],
    },
    {
      id: 'aws-hackathon',
      title: 'National Level AWS Hackathon',
      stage: 'Finalist',
      location: 'Hyderabad, India',
      category: 'Hackathon',
      description:
        'Competed against top engineering teams nationwide in Hyderabad, building scalable cloud-native architectures under tight hackathon deadlines.',
      iconName: 'trophy',
    },
    {
      id: 'lt-hackathon',
      title: 'Larsen & Toubro Hackathon',
      stage: 'Finalist',
      location: 'Chennai, India',
      category: 'Hackathon',
      description:
        'Selected as a Finalist in Chennai for conceptualizing and prototyping innovative engineering solutions for industrial technology challenges.',
      iconName: 'zap',
    },
  ] as Achievement[],

  journeyMilestones: [
    {
      step: '01',
      title: 'LEARN',
      period: '2023',
      description: 'Commenced B.Tech in Information Technology at Adithya Institute of Technology; mastered computer science fundamentals, Python programming, and relational database paradigms.',
    },
    {
      step: '02',
      title: 'BUILD',
      period: '2024 – 2025',
      description: 'Architected full-stack web solutions and designed Lumiable, deploying TensorFlow Lite and Google Maps API to create real-time AI accessibility tools.',
    },
    {
      step: '03',
      title: 'COMPETE',
      period: '2025 – 2026',
      description: 'Earned Finalist honors at the National Level AWS Hackathon in Hyderabad and the prestigious Larsen & Toubro Hackathon in Chennai.',
    },
    {
      step: '04',
      title: 'PRESENT',
      period: '2025 – 2026',
      description: 'Earned multiple first-place awards presenting technical seminars and academic research papers on cutting-edge software paradigms.',
    },
    {
      step: '05',
      title: 'PRACTICE',
      period: 'Feb – Mar 2026',
      description: 'Served as Full Stack Development Intern at Cognifyz Technologies, engineering scalable features and participating in Agile production workflows.',
    },
    {
      step: '06',
      title: 'INNOVATE',
      period: '2026 & Beyond',
      description: 'Iterating on next-generation AI-powered web systems, enterprise portals, and accessible technology solutions for real-world impact.',
    },
  ],
};
