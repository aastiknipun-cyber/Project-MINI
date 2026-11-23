import type { UserProfile, Internship, ApplicationRecord, DeadlineItem } from '../types';

export const DEMO_USER_PROFILE: UserProfile = {
  fullName: 'Rohan Sharma',
  email: 'rohan.sharma@example.com',
  phone: '+91 98765 43210',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  graduationYear: '2026',
  cgpa: '8.85',
  college: 'Delhi Technological University',
  skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQL', 'WebSockets', 'Git', 'Docker'],
  programmingLanguages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++'],
  toolsAndFrameworks: ['FastAPI', 'React', 'Vite', 'Docker', 'PostgreSQL', 'Git'],
  projects: [
    {
      id: 'p1',
      title: 'Realtime Chat Service',
      techStack: ['Python', 'FastAPI', 'WebSockets'],
      description: 'Built a chat backend with WebSocket rooms and message persistence.',
      highlights: 'Supports 200+ concurrent connections in load tests.',
      githubUrl: 'https://github.com/example/realtime-chat',
    },
    {
      id: 'p2',
      title: 'Expense Tracker Dashboard',
      techStack: ['React', 'TypeScript', 'Vite'],
      description: 'Responsive dashboard for categorising expenses with charts and CSV export.',
      highlights: 'Reduced manual entry time with bulk import.',
      githubUrl: 'https://github.com/example/expense-dashboard',
    },
  ],
  certifications: ['AWS Cloud Practitioner'],
  achievements: ['Finalist, college hackathon 2025'],
  experience: [],
  interests: ['Backend engineering', 'Developer tools'],
  githubUrl: 'https://github.com/example',
  linkedinUrl: 'https://linkedin.com/in/example',
};

export const DEMO_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1', company: 'Razorpay', role: 'Backend Engineering Intern', location: 'Bengaluru',
    workplaceType: 'Hybrid', requiredSkills: ['Python', 'SQL', 'REST APIs'], preferredSkills: ['FastAPI', 'Docker'],
    eligibility: 'B.Tech CSE/IT, graduating 2026 or 2027', deadline: '2026-11-05', stipend: '₹60,000 / month',
    duration: '6 months', description: 'Build payment-service APIs and internal tooling.', source: 'Company careers page',
    applicationLink: 'https://razorpay.com/careers', experienceLevel: 'Intern', postedDate: '2026-10-01',
  },
  {
    id: 'int-2', company: 'Swiggy', role: 'Frontend Developer Intern', location: 'Bengaluru',
    workplaceType: 'On-site', requiredSkills: ['React', 'TypeScript', 'CSS'], preferredSkills: ['Vite', 'Testing'],
    eligibility: 'Any B.Tech branch, 2026 graduates', deadline: '2026-10-30', stipend: '₹50,000 / month',
    duration: '4 months', description: 'Ship customer-facing React features for the ordering flow.', source: 'LinkedIn',
    applicationLink: 'https://careers.swiggy.com', experienceLevel: 'Intern', postedDate: '2026-09-25',
  },
  {
    id: 'int-3', company: 'Postman', role: 'Developer Tools Intern', location: 'Remote',
    workplaceType: 'Remote', requiredSkills: ['TypeScript', 'REST APIs', 'Git'], preferredSkills: ['Node.js'],
    eligibility: 'CS students, final or pre-final year', deadline: '2026-11-15', stipend: '$1,500 / month',
    duration: '3 months', description: 'Improve the API client and collection runner.', source: 'Company careers page',
    applicationLink: 'https://www.postman.com/company/careers', experienceLevel: 'Intern', postedDate: '2026-10-05',
  },
  {
    id: 'int-4', company: 'Linear', role: 'Full-stack Engineering Intern', location: 'Remote',
    workplaceType: 'Remote', requiredSkills: ['TypeScript', 'React', 'PostgreSQL'], preferredSkills: ['WebSockets'],
    eligibility: 'Strong TypeScript skills, 2026 or 2027 graduates', deadline: '2026-11-20', stipend: '$2,000 / month',
    duration: '3 months', description: 'Work across the issue-tracking product end to end.', source: 'Referral board',
    applicationLink: 'https://linear.app/careers', experienceLevel: 'Intern', postedDate: '2026-10-10',
  },
  {
    id: 'int-5', company: 'Zerodha', role: 'Systems Intern', location: 'Bengaluru',
    workplaceType: 'On-site', requiredSkills: ['C++', 'Linux', 'Networking'], preferredSkills: ['Python'],
    eligibility: 'CSE/ECE, strong fundamentals', deadline: '2026-11-01', stipend: '₹45,000 / month',
    duration: '3 months', description: 'Work on low-latency market data components.', source: 'Campus list',
    applicationLink: 'https://zerodha.com/careers', experienceLevel: 'Intern', postedDate: '2026-09-28',
  },
  {
    id: 'int-6', company: 'TCS Research', role: 'Machine Learning Intern', location: 'Pune',
    workplaceType: 'Hybrid', requiredSkills: ['Python', 'Machine Learning', 'SQL'], preferredSkills: ['PyTorch'],
    eligibility: 'CS/AI students, final year', deadline: '2026-10-28', stipend: '₹35,000 / month',
    duration: '3 months', description: 'Prototype ML models for enterprise analytics.', source: 'Naukri',
    applicationLink: 'https://www.tcs.com/careers', experienceLevel: 'Intern', postedDate: '2026-09-20',
  },
];

export const DEMO_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-1', internshipId: 'int-1', company: 'Razorpay', role: 'Backend Engineering Intern', location: 'Bengaluru',
    workplaceType: 'Hybrid', status: 'Applied', appliedDate: '2026-10-08', deadline: '2026-11-05',
    notes: 'Applied via careers portal with tailored cover letter.', stipend: '₹60,000 / month',
    applicationLink: 'https://razorpay.com/careers', readinessScore: 92,
  },
  {
    id: 'app-2', internshipId: 'int-4', company: 'Linear', role: 'Full-stack Engineering Intern', location: 'Remote',
    workplaceType: 'Remote', status: 'Interview', appliedDate: '2026-10-02', deadline: '2026-11-20',
    notes: 'Technical interview scheduled. Prepare system design basics.', stipend: '$2,000 / month',
    applicationLink: 'https://linear.app/careers', readinessScore: 88,
  },
  {
    id: 'app-3', internshipId: 'int-3', company: 'Postman', role: 'Developer Tools Intern', location: 'Remote',
    workplaceType: 'Remote', status: 'Assessment', appliedDate: '2026-10-06', deadline: '2026-11-15',
    notes: 'Online assessment due in 3 days.', stipend: '$1,500 / month',
    applicationLink: 'https://www.postman.com/company/careers', readinessScore: 80,
  },
  {
    id: 'app-4', internshipId: 'int-6', company: 'TCS Research', role: 'Machine Learning Intern', location: 'Pune',
    workplaceType: 'Hybrid', status: 'Awaiting Response', appliedDate: '2026-09-29', deadline: '2026-10-28',
    notes: 'No response yet.', stipend: '₹35,000 / month', applicationLink: 'https://www.tcs.com/careers', readinessScore: 75,
  },
  {
    id: 'app-5', internshipId: 'int-2', company: 'Swiggy', role: 'Frontend Developer Intern', location: 'Bengaluru',
    workplaceType: 'On-site', status: 'Shortlisted', deadline: '2026-10-30',
    notes: 'Shortlisted from discovery. Skills: React, TypeScript, CSS.', stipend: '₹50,000 / month',
    applicationLink: 'https://careers.swiggy.com', readinessScore: 85,
  },
  {
    id: 'app-6', internshipId: 'int-5', company: 'Zerodha', role: 'Systems Intern', location: 'Bengaluru',
    workplaceType: 'On-site', status: 'Ready to Apply', deadline: '2026-11-01',
    notes: 'Cover letter drafted. Needs final review.', stipend: '₹45,000 / month',
    applicationLink: 'https://zerodha.com/careers', readinessScore: 70,
  },
];

export const DEMO_DEADLINES: DeadlineItem[] = [
  { id: 'dl-1', title: 'Online assessment', company: 'Postman', role: 'Developer Tools Intern', type: 'Coding Assessment', dueDate: '2026-10-22', priority: 'HIGH', status: 'Pending', reminderSet: true, relatedApplicationId: 'app-3' },
  { id: 'dl-2', title: 'Technical interview', company: 'Linear', role: 'Full-stack Engineering Intern', type: 'Interview', dueDate: '2026-10-24', priority: 'HIGH', status: 'Pending', reminderSet: true, relatedApplicationId: 'app-2' },
  { id: 'dl-3', title: 'Application closes', company: 'Swiggy', role: 'Frontend Developer Intern', type: 'Application Deadline', dueDate: '2026-10-30', priority: 'MEDIUM', status: 'Pending', reminderSet: false },
  { id: 'dl-4', title: 'Application closes', company: 'TCS Research', role: 'Machine Learning Intern', type: 'Application Deadline', dueDate: '2026-10-28', priority: 'MEDIUM', status: 'Pending', reminderSet: false },
  { id: 'dl-5', title: 'Application closes', company: 'Zerodha', role: 'Systems Intern', type: 'Application Deadline', dueDate: '2026-11-01', priority: 'LOW', status: 'Pending', reminderSet: false },
];
