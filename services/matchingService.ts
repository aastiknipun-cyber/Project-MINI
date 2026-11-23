import type { UserProfile, Internship, MatchAnalysis } from '../types';

const norm = (s: string) => s.trim().toLowerCase();

// Deterministic, explainable match: skill overlap is the only scored factor
// besides a simple degree/eligibility check. No AI involved.
export function computeMatch(profile: UserProfile, internship: Internship): MatchAnalysis {
  const have = new Set([...profile.skills, ...profile.toolsAndFrameworks, ...profile.programmingLanguages].map(norm));
  const matchedSkills = internship.requiredSkills.filter((s) => have.has(norm(s)));
  const missingSkills = internship.requiredSkills.filter((s) => !have.has(norm(s)));
  const preferredHit = internship.preferredSkills.filter((s) => have.has(norm(s)));

  const skillMatchScore = internship.requiredSkills.length
    ? Math.round((matchedSkills.length / internship.requiredSkills.length) * 100)
    : 100;
  const educationScore = profile.degree === 'B.Tech' ? 100 : 60;
  const eligibilityScore = profile.graduationYear === '2026' || profile.graduationYear === '2027' ? 100 : 50;
  const experienceScore = profile.projects.length >= 2 ? 80 : 50;

  const overallScore = Math.round(
    skillMatchScore * 0.6 + educationScore * 0.15 + eligibilityScore * 0.15 + experienceScore * 0.1
  );

  return {
    internshipId: internship.id,
    overallScore,
    matchedSkills,
    missingSkills,
    whyItMatches: [
      `Matches ${matchedSkills.length} of ${internship.requiredSkills.length} required skills.`,
      preferredHit.length ? `Also covers preferred skills: ${preferredHit.join(', ')}.` : 'No preferred skills matched yet.',
    ],
    skillGapReasons: missingSkills.map((s) => `${s} is required but not listed in your profile.`),
    preparationTip: missingSkills.length
      ? `Consider reviewing ${missingSkills.slice(0, 2).join(' and ')} before interviewing.`
      : 'Your listed skills cover all required skills. Focus on project walkthroughs.',
    factors: { skillMatchScore, educationScore, eligibilityScore, experienceScore },
  };
}
