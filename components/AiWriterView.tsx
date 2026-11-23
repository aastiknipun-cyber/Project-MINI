import { useState } from 'react';
import type { UserProfile, Internship } from '../types';
import { generateMaterials } from '../services/applicationService';

interface AiWriterViewProps {
  profile: UserProfile;
  internships: Internship[];
  selectedInternshipId: string;
  onSelectInternshipId: (id: string) => void;
  onRequestHumanApproval: (internship: Internship, coverLetter: string) => void;
}

export function AiWriterView({ profile, internships, selectedInternshipId, onSelectInternshipId, onRequestHumanApproval }: AiWriterViewProps) {
  const internship = internships.find((i) => i.id === selectedInternshipId) ?? internships[0];
  const [kind, setKind] = useState<'coverLetter' | 'recruiterEmail' | 'shortPitch'>('coverLetter');
  if (!internship) return <p className="text-sm text-slate-500">No internships available.</p>;

  const materials = generateMaterials(profile, internship);
  const text = materials[kind];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">AI Writer</h2>
        <select value={internship.id} onChange={(e) => onSelectInternshipId(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
          {internships.map((i) => <option key={i.id} value={i.id}>{i.company}: {i.role}</option>)}
        </select>
      </div>
      <div className="flex gap-2 text-sm">
        {(['coverLetter', 'recruiterEmail', 'shortPitch'] as const).map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`rounded-md px-3 py-1 border ${kind === k ? 'bg-indigo-50 border-indigo-300' : ''}`}>
            {k === 'coverLetter' ? 'Cover letter' : k === 'recruiterEmail' ? 'Recruiter email' : 'Short pitch'}
          </button>
        ))}
      </div>
      <textarea readOnly value={text} rows={14} className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm" />
      <button onClick={() => onRequestHumanApproval(internship, text)} className="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm">
        Review and submit
      </button>
    </div>
  );
}
