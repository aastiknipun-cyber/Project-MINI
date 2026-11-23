import { useState } from 'react';
import type { Internship, UserProfile } from '../types';
import { computeMatch } from '../services/matchingService';

interface FindInternshipsViewProps {
  internships: Internship[];
  profile: UserProfile;
  onSelectForMatch: (item: Internship) => void;
  onSelectForApplication: (item: Internship) => void;
  onShortlist: (item: Internship) => void;
  shortlistedIds: string[];
}

export function FindInternshipsView({ internships, profile, onSelectForMatch, onSelectForApplication, onShortlist, shortlistedIds }: FindInternshipsViewProps) {
  const [query, setQuery] = useState('');
  const filtered = internships.filter((i) =>
    `${i.company} ${i.role} ${i.requiredSkills.join(' ')}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Find Internships</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by company, role or skill"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <div className="space-y-3">
        {filtered.map((i) => {
          const score = computeMatch(profile, i).overallScore;
          const saved = shortlistedIds.includes(i.id);
          return (
            <article key={i.id} className="rounded-xl bg-white border border-slate-200 p-5">
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{i.role}</h3>
                  <p className="text-sm text-slate-500">{i.company} · {i.location} · {i.workplaceType} · {i.stipend}</p>
                  <p className="text-sm mt-2">{i.description}</p>
                  <p className="text-xs text-slate-500 mt-2">Skills: {i.requiredSkills.join(', ')} · Deadline: {i.deadline}</p>
                </div>
                <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap">{score}% match</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                <button onClick={() => onSelectForMatch(i)} className="rounded-md border px-3 py-1 hover:bg-slate-50">Analyse match</button>
                <button onClick={() => onShortlist(i)} disabled={saved} className="rounded-md border px-3 py-1 hover:bg-slate-50 disabled:opacity-50">
                  {saved ? 'Shortlisted' : 'Shortlist'}
                </button>
                <button onClick={() => onSelectForApplication(i)} className="rounded-md bg-indigo-600 text-white px-3 py-1">Write application</button>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-slate-500">No internships match this filter.</p>}
      </div>
    </div>
  );
}
