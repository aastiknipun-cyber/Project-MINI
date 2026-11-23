import type { UserProfile, Internship, ApplicationMaterials, ApplicationRecord } from '../types';

// Local, template-based generator. Uses only fields present in the profile.
export function generateMaterials(profile: UserProfile, internship: Internship): ApplicationMaterials {
  const topProject = profile.projects[0];
  const projectLine = topProject
    ? `For example, I built ${topProject.title}, which used ${topProject.techStack.join(', ')}.`
    : '';
  const coverLetter = [
    `Dear ${internship.company} team,`,
    '',
    `I am ${profile.fullName}, a ${profile.degree} ${profile.branch} student at ${profile.college} (CGPA ${profile.cgpa}), graduating in ${profile.graduationYear}.`,
    `I am applying for the ${internship.role} position. ${projectLine}`,
    `My skills in ${internship.requiredSkills.slice(0, 3).join(', ')} align with what this role asks for.`,
    '',
    'Thank you for your time. I would welcome the chance to discuss how I can contribute.',
    '',
    `Regards,\n${profile.fullName}`,
  ].join('\n');

  return {
    coverLetter,
    recruiterEmail: `Subject: ${internship.role} application: ${profile.fullName}\n\nHi,\n\nI'm applying for the ${internship.role} role at ${internship.company}. ${projectLine}\n\nBest,\n${profile.fullName}`,
    shortPitch: `${profile.degree} CSE student (CGPA ${profile.cgpa}) with hands-on work in ${profile.skills.slice(0, 3).join(', ')}. Interested in the ${internship.role} role.`,
  };
}

export function generateFollowUp(app: ApplicationRecord): string {
  return `Hi,\n\nI wanted to follow up on my application for the ${app.role} role at ${app.company}. I remain very interested and would be glad to share any further information.\n\nThank you,`;
}
