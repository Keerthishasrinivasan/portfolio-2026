import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CERTIFICATES_DATA } from '@/data/certificationsData';

interface AIResponse {
  answer: string;
  suggestedFollowUps?: string[];
  actionLink?: {
    label: string;
    sectionId?: string;
    url?: string;
  };
}

const SYSTEM_CONTEXT = `
You are Keerthisha AI, a dedicated intelligent assistant for Keerthisha Srinivasan's portfolio.
Answer questions strictly based on the following verified facts:

Candidate: ${PORTFOLIO_DATA.personal.name}
Degree: ${PORTFOLIO_DATA.personal.degree} at ${PORTFOLIO_DATA.personal.college} (${PORTFOLIO_DATA.personal.period}).
Location: ${PORTFOLIO_DATA.personal.location}.
Roles: ${PORTFOLIO_DATA.personal.roles.join(', ')}.
Summary: ${PORTFOLIO_DATA.personal.summary}
Email: ${PORTFOLIO_DATA.personal.email}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
GitHub: ${PORTFOLIO_DATA.personal.github}

Projects:
1. Lumiable: AI-Powered Accessibility & Safety Platform. Tech: Python, TensorFlow Lite, Google Maps API, ML Kit. Built SeeSphere module for real-time obstacle detection & voice feedback, SOS alerts, live GPS tracking.
2. Student Placement Management System: Full-stack web app with Python, Flask, HTML, CSS, SQL, VS Code. Secure auth, student profiles, company & job management, application tracking, placement analytics dashboard.
3. Blood Donor Finder: Emergency blood match web app with Python, Flask, HTML, CSS, SQL, VS Code. Donor availability search, blood group matching, hospital emergency request alerts.

Internship:
Cognifyz Technologies (Feb 2026 – Mar 2026, Remote): Full Stack Development Intern. Built responsive full-stack applications, implemented front-end & back-end features, collaborated in Agile workflows, focused on scalability and software engineering principles.

Skills:
Languages: Python, SQL
Frontend: React.js, HTML5, CSS3
Backend: Flask
Databases: MySQL, SQLite
AI & Mobile: TensorFlow Lite, Google Maps API, ML Kit
Tools: Git, GitHub, VS Code

Achievements:
- Finalist in National Level AWS Hackathon (Hyderabad)
- Finalist in Larsen & Toubro Hackathon (Chennai)
- Multiple top prizes in Paper Presentation and Technical Seminar Competitions

Certifications:
MindLuster certified in: Full Stack Vue.js Express MongoDB, Node.js REST API with Restify Mongoose JWT, JavaScript Workshops, Exploring Docker, Build a Node.js App with Sequelize, Website Design Fundamentals, Business Website Design, Editor X.

RULES:
- Always answer professionally, crisply, and accurately.
- Never invent facts, experiences, awards, or projects not listed above.
- If asked about something outside her profile, state politely that the information is not in her verified portfolio.
`;

function getDynamicFollowUps(q: string): string[] {
  if (q.includes('lumiable')) {
    return ['What other projects has she built?', 'What was her internship experience?', 'What technologies does she know?'];
  }
  if (q.includes('skill') || q.includes('technolog')) {
    return ['Explain Lumiable', 'What hackathons has she won?', 'Download resume'];
  }
  return ['Tell me about Keerthisha', 'Explain Lumiable', 'What was her internship experience?'];
}

export async function askKeerthishaAI(query: string): Promise<AIResponse> {
  const normalized = query.toLowerCase().trim();
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${SYSTEM_CONTEXT}\n\nUser Question: ${query}\nAnswer crisply and directly as Keerthisha AI:` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            answer: candidate.trim(),
            suggestedFollowUps: getDynamicFollowUps(normalized),
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call fell back to local engine:', err);
    }
  }

  // Deterministic local QA engine with zero hallucination
  return getLocalResponse(normalized);
}

function getLocalResponse(q: string): AIResponse {
  // 1. Tell me about Keerthisha / Who is she
  if (
    q.includes('who is') ||
    q.includes('tell me about') ||
    q.includes('about keerthisha') ||
    q.includes('background') ||
    q.includes('introduction')
  ) {
    return {
      answer: `**Keerthisha Srinivasan** is a dedicated B.Tech Information Technology undergraduate at **Adithya Institute of Technology** (2023–2027) based in Coimbatore, Tamil Nadu. 

She specializes as a **Full-Stack AI Developer** and **AI Solution Builder**, combining modern full-stack web architectures (React, Flask, Python, SQL) with on-device machine learning (TensorFlow Lite, ML Kit). She has built impactful solutions like **Lumiable** (AI accessibility platform) and was a finalist at the **National Level AWS Hackathon** and **Larsen & Toubro Hackathon**.`,
      suggestedFollowUps: [
        'What technologies does she know?',
        'Explain Lumiable',
        'What was her internship experience?',
      ],
      actionLink: {
        label: 'View About Section',
        sectionId: 'about',
      },
    };
  }

  // 2. Technologies / Skills
  if (
    q.includes('technolog') ||
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('language') ||
    q.includes('python') ||
    q.includes('know')
  ) {
    return {
      answer: `Keerthisha's verified technical skillset spans:

• **Programming Languages:** Python, SQL  
• **Frontend:** React.js, HTML5, CSS3  
• **Backend Frameworks:** Python Flask (basic & REST APIs)  
• **Databases:** MySQL, SQLite  
• **AI & Mobile APIs:** TensorFlow Lite, Google Maps API, Google ML Kit  
• **Tools & Workflow:** Git, GitHub, Visual Studio Code  
• **DevOps & Containers:** Docker (MindLuster certified)

She focuses on practical application rather than theoretical syntax, deploying these technologies into functional, responsive web and mobile systems.`,
      suggestedFollowUps: [
        'What projects has she built?',
        'What certifications does she hold?',
        'What was her internship experience?',
      ],
      actionLink: {
        label: 'Explore Tech Universe',
        sectionId: 'expertise',
      },
    };
  }

  // 3. Lumiable
  if (q.includes('lumiable') || q.includes('seesphere') || q.includes('accessibility') || q.includes('blind') || q.includes('vision')) {
    return {
      answer: `**Lumiable** is Keerthisha's flagship project: an **AI-Powered Accessibility & Safety Platform** designed to empower visually impaired users with independent mobility.

**Key Technical Highlights:**
• **SeeSphere Perception Module:** Utilizes **TensorFlow Lite** and **Google ML Kit** for real-time on-device object detection and spatial obstacle awareness.
• **Acoustic Feedback:** Synthesizes voice-based environmental audio cues to notify users of oncoming hazards without lag.
• **Safety & Geolocation:** Integrates **Google Maps API** for live GPS tracking and rapid one-touch SOS emergency alerts to emergency contacts and emergency services.`,
      suggestedFollowUps: [
        'What other projects has she built?',
        'What was her internship experience?',
        'Download resume',
      ],
      actionLink: {
        label: 'View Lumiable Case Study',
        sectionId: 'projects',
      },
    };
  }

  // 4. Projects in general / Placement / Blood donor
  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('placement') || q.includes('donor')) {
    return {
      answer: `Keerthisha has engineered three primary verified projects:

1. **Lumiable (Flagship):** AI-powered mobile accessibility and safety platform utilizing TensorFlow Lite, ML Kit, and Google Maps API for real-time obstacle detection and emergency SOS routing.
2. **Student Placement Management System:** Full-stack campus recruitment web portal built with Python, Flask, HTML, CSS, and SQL featuring role-based authentication, student registries, job management, and an interactive placement analytics dashboard.
3. **Blood Donor Finder:** Emergency healthcare web application built with Python Flask and SQL connecting eligible voluntary blood donors with patients and hospitals in real time.`,
      suggestedFollowUps: [
        'Explain Lumiable',
        'What was her internship experience?',
        'What are her achievements?',
      ],
      actionLink: {
        label: 'Explore Selected Work',
        sectionId: 'projects',
      },
    };
  }

  // 5. Internship experience
  if (
    q.includes('intern') ||
    q.includes('experience') ||
    q.includes('cognifyz') ||
    q.includes('work experience') ||
    q.includes('job')
  ) {
    return {
      answer: `**Cognifyz Technologies**  
*Full Stack Development Intern* (February 2026 – March 2026 | Remote)

**Key Responsibilities & Contributions:**
• Developed responsive full-stack web applications by implementing intuitive front-end interfaces and robust back-end functionalities.
• Applied core software engineering principles to build maintainable, scalable, and user-centric architectures.
• Collaborated actively in an Agile development environment, performing debugging, automated unit testing, and incremental feature delivery.
• Gained hands-on experience with industry-standard development workflows and version control.`,
      suggestedFollowUps: [
        'What are her hackathon achievements?',
        'What makes her suitable for a software role?',
        'Download resume',
      ],
      actionLink: {
        label: 'View Career Timeline',
        sectionId: 'experience',
      },
    };
  }

  // 6. Achievements / Hackathons
  if (
    q.includes('achievement') ||
    q.includes('hackathon') ||
    q.includes('award') ||
    q.includes('prize') ||
    q.includes('aws') ||
    q.includes('larsen')
  ) {
    return {
      answer: `Keerthisha's verified competitive accomplishments:

🏆 **National Level AWS Hackathon Finalist** (Hyderabad) — Ranked among top engineering teams nationally, architecting scalable solutions under intense competition criteria.
⚡ **Larsen & Toubro Hackathon Finalist** (Chennai) — Selected as a finalist for rapid prototyping of industrial innovation solutions.
🥇 **Paper Presentation & Technical Seminars** — Won multiple top prizes across collegiate technical symposiums presenting research on advanced computing and software engineering paradigms.`,
      suggestedFollowUps: [
        'What certifications does she have?',
        'What projects has she built?',
        'How can I contact her?',
      ],
      actionLink: {
        label: 'View Proof of Work',
        sectionId: 'achievements',
      },
    };
  }

  // 7. Certifications
  if (q.includes('certificat') || q.includes('course') || q.includes('docker') || q.includes('mindluster') || q.includes('learning')) {
    return {
      answer: `Keerthisha actively expands her engineering capabilities through rigorous coursework. Her verified MindLuster credentials include:

• **Full Stack Vue.js Express MongoDB** (Credential: 02064297)
• **Node.js REST API with Restify Mongoose JWT** (Credential: c5a30378)
• **Exploring Docker** (Credential: 8749fd5f)
• **Build a Node.js App with Sequelize** (Credential: 8738332c)
• **JavaScript Workshops** (Credential: ae1ef2b9)
• **Website Design Fundamentals** (Credential: e3531cea)
• **Business Website Design** (Credential: bad9c30f)
• **Editor X for Beginners** (Credential: 79bbd120)`,
      suggestedFollowUps: [
        'What technologies does she know?',
        'What projects has she built?',
        'Download resume',
      ],
      actionLink: {
        label: 'View All Certifications',
        sectionId: 'certifications',
      },
    };
  }

  // 8. Why hire / Suitability for role
  if (
    q.includes('why hire') ||
    q.includes('suitable') ||
    q.includes('hire her') ||
    q.includes('role') ||
    q.includes('strength') ||
    q.includes('candidate')
  ) {
    return {
      answer: `Here is why Keerthisha is a standout candidate for **Full-Stack & AI Engineering** roles:

1. **Practical Project Execution:** Rather than building toy projects, she engineered **Lumiable**, tackling low-latency edge AI (TensorFlow Lite, ML Kit) for real-world assistive mobility.
2. **End-to-End Stack Mastery:** Comfortable navigating from database schema design (SQL, MySQL, SQLite) to backend business logic (Python Flask) to dynamic frontends (React.js, HTML5/CSS3).
3. **Battle-Tested Under Pressure:** Proven ability to build, innovate, and present under competitive constraints as a finalist in both the **AWS Hackathon** and **L&T Hackathon**.
4. **Industry Agile Experience:** Completed an internship at Cognifyz Technologies applying enterprise software engineering workflows and code quality standards.
5. **Fast Learner & Proactive:** Holds 8+ verified certifications spanning Docker, Node APIs, Vue, and database ORMs.`,
      suggestedFollowUps: [
        'Download resume',
        'Open Recruiter View',
        'How can I contact her?',
      ],
      actionLink: {
        label: 'Open Recruiter View',
        sectionId: 'recruiter',
      },
    };
  }

  // 9. Contact / Email / LinkedIn / Phone / Location
  if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('reach') || q.includes('phone') || q.includes('location')) {
    return {
      answer: `You can reach out to Keerthisha directly:

• **Email:** [keerthishasrini@gmail.com](mailto:keerthishasrini@gmail.com)  
• **LinkedIn:** [linkedin.com/in/keerthisha-srinivasan-573939305](https://www.linkedin.com/in/keerthisha-srinivasan-573939305/)  
• **GitHub:** [github.com/Keerthishasrinivasan](https://github.com/Keerthishasrinivasan)  
• **Location:** Coimbatore, Tamil Nadu, India  

She is actively open to full-stack engineering roles, AI internships, and innovative collaborative ventures!`,
      suggestedFollowUps: [
        'Download resume',
        'Tell me about her projects',
      ],
      actionLink: {
        label: 'Go to Contact Section',
        sectionId: 'contact',
      },
    };
  }

  // 10. Default fallback
  return {
    answer: `Keerthisha Srinivasan is a B.Tech Information Technology student at Adithya Institute of Technology (2023–2027) and an aspiring **Full-Stack AI Developer**.

Her core focus areas are **Python, React.js, Flask, SQL, and Edge AI (TensorFlow Lite & ML Kit)**. She has built **Lumiable** (an AI accessibility platform) and was a finalist in the national **AWS Hackathon** and **Larsen & Toubro Hackathon**.

How can I help you explore her portfolio further?`,
    suggestedFollowUps: [
      'Tell me about Keerthisha',
      'What technologies does she know?',
      'Explain Lumiable',
      'What was her internship experience?',
    ],
  };
}
