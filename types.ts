export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';

export type ApplicationStatus =
  | 'Discovered'
  | 'Shortlisted'
  | 'Ready to Apply'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Awaiting Response'
  | 'Offer'
  | 'Rejected';

export type DeadlineType =
  | 'Application Deadline'
  | 'Coding Assessment'
  | 'Interview'
  | 'Document Deadline'
  | 'Joining Date';

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  highlights?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  branch: string;
  graduationYear: string;
  cgpa: string;
  college: string;
  skills: string[];
  programmingLanguages: string[];
  toolsAndFrameworks: string[];
  projects: ProjectItem[];
  certifications: string[];
  achievements: string[];
  experience: ExperienceItem[];
  interests: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  workplaceType: WorkplaceType;
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string;
  deadline: string;
  stipend: string;
  duration: string;
  description: string;
  source: string;
  applicationLink: string;
  hiringManager?: string;
  department?: string;
  experienceLevel: string;
  postedDate: string;
}

export interface MatchAnalysis {
  internshipId: string;
  overallScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  whyItMatches: string[];
  skillGapReasons: string[];
  preparationTip: string;
  factors: {
    skillMatchScore: number;
    educationScore: number;
    eligibilityScore: number;
    experienceScore: number;
  };
}

export interface ApplicationRecord {
  id: string;
  internshipId: string;
  company: string;
  role: string;
  location: string;
  workplaceType: WorkplaceType;
  status: ApplicationStatus;
  appliedDate?: string;
  deadline?: string;
  lastFollowUpDate?: string;
  notes: string;
  coverLetter?: string;
  recruiterEmail?: string;
  shortPitch?: string;
  stipend?: string;
  applicationLink?: string;
  readinessScore?: number;
}

export interface DeadlineItem {
  id: string;
  title: string;
  company: string;
  role: string;
  type: DeadlineType;
  dueDate: string;
  priority: PriorityLevel;
  status: 'Pending' | 'Completed';
  notes?: string;
  reminderSet: boolean;
  relatedApplicationId?: string;
}

export interface EmailIntelligenceItem {
  id: string;
  sender: string;
  subject: string;
  date: string;
  company: string;
  role: string;
  detectedStatus: ApplicationStatus;
  actionRequired: string;
  deadline?: string;
  interviewDate?: string;
  priority: PriorityLevel;
  nextStep: string;
  emailBody: string;
  isProcessed: boolean;
}

export interface ReadinessCheckResult {
  overallStatus: 'READY TO APPLY' | 'NEEDS REVIEW' | 'NOT READY';
  score: number;
  items: {
    key: string;
    label: string;
    passed: boolean;
    status: 'Ready ✓' | 'Missing ⚠' | 'Good Match ✓' | 'Needs Attention ⚠';
    detail: string;
  }[];
}

export interface FollowUpDraft {
  company: string;
  role: string;
  daysSinceContact: number;
  subject: string;
  emailBody: string;
  followUpType: string;
  suggestedAction: string;
}

export interface ApplicationMaterials {
  coverLetter: string;
  recruiterEmail: string;
  shortPitch: string;
}
