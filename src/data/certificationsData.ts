export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  category: 'All' | 'Full-Stack' | 'Backend & APIs' | 'Languages & Core' | 'Design & UI' | 'DevOps & Tools';
  previewImage: string;
  verificationUrl: string;
  skillsLearned: string[];
  description: string;
}

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 'cert-vue-mongo',
    title: 'Full Stack Vue js Express MongoDB',
    issuer: 'MindLuster',
    issueDate: 'December 2025',
    credentialId: '02064297',
    category: 'Full-Stack',
    previewImage: '/certificates/cert_0.png',
    verificationUrl: 'https://www.mindluster.com/certificate/02064297',
    skillsLearned: ['Vue.js', 'Express.js', 'MongoDB', 'REST Architecture', 'SPA Development'],
    description: 'Comprehensive course covering full-stack architecture, building end-to-end web applications with reactive client components and NoSQL data modeling.',
  },
  {
    id: 'cert-node-restify',
    title: 'Node js REST API With Restify Mongoose JWT',
    issuer: 'MindLuster',
    issueDate: 'December 2025',
    credentialId: 'c5a30378',
    category: 'Backend & APIs',
    previewImage: '/certificates/cert_2.png',
    verificationUrl: 'https://www.mindluster.com/certificate/c5a30378',
    skillsLearned: ['Node.js', 'Restify', 'Mongoose ODM', 'JWT Authentication', 'API Security'],
    description: 'In-depth exploration of robust RESTful API engineering, token-based authentication with JSON Web Tokens, and database interaction via Mongoose.',
  },
  {
    id: 'cert-docker',
    title: 'Exploring Docker',
    issuer: 'MindLuster',
    issueDate: 'March 2026',
    credentialId: '8749fd5f',
    category: 'DevOps & Tools',
    previewImage: '/certificates/cert_7.png',
    verificationUrl: 'https://www.mindluster.com/certificate/8749fd5f',
    skillsLearned: ['Docker Containers', 'Dockerfile', 'Images & Registries', 'Networking', 'Containerization'],
    description: 'Practical containerization fundamentals, creating custom images, container lifecycle orchestration, and isolating development environments.',
  },
  {
    id: 'cert-node-sequelize',
    title: 'Build a Node js App With Sequelize',
    issuer: 'MindLuster',
    issueDate: 'March 2026',
    credentialId: '8738332c',
    category: 'Backend & APIs',
    previewImage: '/certificates/cert_6.png',
    verificationUrl: 'https://www.mindluster.com/certificate/8738332c',
    skillsLearned: ['Node.js', 'Sequelize ORM', 'Relational Schemas', 'CRUD Operations', 'Migrations'],
    description: 'Implementing object-relational mapping in Node.js, establishing relational database models, associations, transactions, and automated schema migrations.',
  },
  {
    id: 'cert-javascript-workshops',
    title: 'JavaScript Workshops',
    issuer: 'MindLuster',
    issueDate: 'January 2026',
    credentialId: 'ae1ef2b9',
    category: 'Languages & Core',
    previewImage: '/certificates/cert_3.png',
    verificationUrl: 'https://www.mindluster.com/certificate/ae1ef2b9',
    skillsLearned: ['Modern ES6+', 'Asynchronous JS', 'DOM Manipulation', 'Event Loop', 'Functional Patterns'],
    description: 'Hands-on advanced JavaScript workshops exploring asynchronous concurrency, closures, prototype inheritance, and modular client-side scripting.',
  },
  {
    id: 'cert-web-fundamentals',
    title: 'Website Design Fundamentals',
    issuer: 'MindLuster',
    issueDate: 'February 2026',
    credentialId: 'e3531cea',
    category: 'Design & UI',
    previewImage: '/certificates/cert_5.png',
    verificationUrl: 'https://www.mindluster.com/certificate/e3531cea',
    skillsLearned: ['Visual Hierarchy', 'Responsive Layouts', 'Typography Systems', 'UX Principles', 'Accessibility'],
    description: 'Fundamental principles of web design, digital typography, visual ergonomics, color contrast accessibility, and grid design systems.',
  },
  {
    id: 'cert-business-web-design',
    title: 'Business Website Design for beginners',
    issuer: 'MindLuster',
    issueDate: 'December 2025',
    credentialId: 'bad9c30f',
    category: 'Design & UI',
    previewImage: '/certificates/cert_1.png',
    verificationUrl: 'https://www.mindluster.com/certificate/bad9c30f',
    skillsLearned: ['Landing Page Design', 'Conversion Principles', 'Brand Identity', 'Information Architecture'],
    description: 'Structuring commercial websites with focused user journeys, high-converting calls-to-action, and brand-consistent digital styling.',
  },
  {
    id: 'cert-editor-x',
    title: 'Editor X for Beginners',
    issuer: 'MindLuster',
    issueDate: 'January 2026',
    credentialId: '79bbd120',
    category: 'Design & UI',
    previewImage: '/certificates/cert_4.png',
    verificationUrl: 'https://www.mindluster.com/certificate/79bbd120',
    skillsLearned: ['Responsive Breakpoints', 'CSS Grid', 'Flexbox', 'Fluid Prototyping'],
    description: 'Advanced responsive layout creation with visual CSS Grid and Flexbox mechanics across desktop, tablet, and mobile viewports.',
  },
];
