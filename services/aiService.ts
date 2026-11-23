import type { UserProfile, Internship, ApplicationRecord, DeadlineItem } from '../types';
import { computeMatch } from './matchingService';

export interface CommandResult {
  message: string;
  targetTab?: string;
  selectedInternshipId?: string;
  selectedApplicationId?: string;
}

// Keyword-based command router. Deterministic, runs entirely in the browser.
export function processNaturalLanguageCommand(
  query: string,
  profile: UserProfile,
  internships: Internship[],
  applications: ApplicationRecord[],
  deadlines: DeadlineItem[]
): CommandResult {
  const q = query.toLowerCase();

  if (q.includes('match')) {
    const ranked = internships
      .map((i) => ({ i, score: computeMatch(profile, i).overallScore }))
      .sort((a, b) => b.score - a.score);
    const top = ranked[0];
    return {
      message: top ? `Best match: ${top.i.role} at ${top.i.company} (${top.score}%).` : 'No internships loaded.',
      targetTab: 'matches',
      selectedInternshipId: top?.i.id,
    };
  }

  if (q.includes('follow')) {
    const due = applications.filter((a) => a.status === 'Awaiting Response' || a.status === 'Applied');
    return {
      message: due.length
        ? `${due.length} application(s) may need follow-up: ${due.map((a) => a.company).join(', ')}.`
        : 'No applications need follow-up right now.',
      targetTab: 'actions',
      selectedApplicationId: due[0]?.id,
    };
  }

  if (q.includes('interview')) {
    const interviews = applications.filter((a) => a.status === 'Interview');
    return {
      message: interviews.length
        ? `Upcoming interviews: ${interviews.map((a) => a.company).join(', ')}.`
        : 'No interviews scheduled.',
      targetTab: 'applications',
    };
  }

  if (q.includes('gap') || q.includes('skill')) {
    const first = internships[0];
    const gaps = first ? computeMatch(profile, first).missingSkills : [];
    return {
      message: gaps.length
        ? `Skill gaps for ${first.company}: ${gaps.join(', ')}.`
        : 'No skill gaps found for the first listing.',
      targetTab: 'matches',
      selectedInternshipId: first?.id,
    };
  }

  if (q.includes('deadline')) {
    const pending = deadlines.filter((d) => d.status === 'Pending');
    return {
      message: `${pending.length} pending deadline(s).`,
      targetTab: 'deadlines',
    };
  }

  if (q.includes('find') || q.includes('internship')) {
    return { message: `Showing ${internships.length} internships.`, targetTab: 'find' };
  }

  return {
    message: 'Try: "Show my best matches", "Which applications need follow-up?", "Show upcoming interviews", "Show my skill gaps".',
  };
}
