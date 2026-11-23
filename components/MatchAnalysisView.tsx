import type { UserProfile, Internship } from '../types';
import { computeMatch } from '../services/matchingService';

interface MatchAnalysisViewProps {
  profile: UserProfile;
  internships: Internship[];
  selectedInternshipId: string;
  onSelectInternshipId: (id: string) => void;
  onNavigateToWriter: (item: Internship) => void;
}

export function MatchAnalysisView({ profile, internships, selectedInternshipId, onSelectInternshipId, onNavigateToWriter }: MatchAnalysisViewProps) {
  const selected = internships.find((i) => i.id === selectedInternshipId) ?? internships[0];
  if (!selected) return <p className="text-sm text-slate-500">No internships available.</p>;
  const m = computeMatch(profile, selected);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Match Analysis</h2>
        <select value={selected.id} onChange={(e) => onSelectInternshipId(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
          {internships.map((i) => <option key={i.id} value={i.id}>{i.company}: {i.role}</option>)}
        </select>
      </div>
      <section className="rounded-xl bg-white border border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Overall match</p>
            <p className="text-4xl font-bold text-indigo-600">{m.overallScore}%</p>
          </div>
          <p className="max-w-sm text-xs leading-5 text-slate-500">Rule-based score: 60% skills, 15% degree, 15% graduation year, 10% projects.</p>
        </div>
      </section>
      <section className="rounded-xl bg-white border border-slate-200 p-5">
        <div className="mb-5">
          <h3 className="font-semibold">Match score weightage</h3>
          <p className="mt-1 text-sm text-slate-500">See how much each factor contributes to the overall score.</p>
        </div>
        <div
          className="flex h-14 w-full overflow-hidden rounded-lg text-white"
          role="img"
          aria-label="Match score weights: skills 60%, degree 15%, graduation year 15%, projects 10%"
        >
          <div className="flex items-center justify-center bg-indigo-600 px-2 text-center text-xs font-semibold" style={{ width: '60%' }}>Skills<br />60%</div>
          <div className="flex items-center justify-center border-l border-white/60 bg-teal-600 px-1 text-center text-[11px] font-semibold" style={{ width: '15%' }}>Degree<br />15%</div>
          <div className="flex items-center justify-center border-l border-white/60 bg-amber-600 px-1 text-center text-[10px] font-semibold leading-tight" style={{ width: '15%' }}>Graduation<br />year 15%</div>
          <div className="flex items-center justify-center border-l border-white/60 bg-fuchsia-600 px-1 text-center text-[10px] font-semibold" style={{ width: '10%' }}>Projects<br />10%</div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Skills', weight: 60, score: m.factors.skillMatchScore, color: 'bg-indigo-600' },
            { label: 'Degree', weight: 15, score: m.factors.educationScore, color: 'bg-teal-600' },
            { label: 'Graduation year', weight: 15, score: m.factors.eligibilityScore, color: 'bg-amber-600' },
            { label: 'Projects', weight: 10, score: m.factors.experienceScore, color: 'bg-fuchsia-600' },
          ].map((factor) => (
            <div key={factor.label} className="rounded-lg border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 font-medium text-slate-700"><span className={`h-2.5 w-2.5 rounded-sm ${factor.color}`} />{factor.label}</span>
                <span className="text-right text-xs text-slate-500">{factor.weight}% weight · {factor.score}% score · {Math.round(factor.weight * factor.score / 100)} pts</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${factor.label} factor score`} aria-valuenow={factor.score} aria-valuemin={0} aria-valuemax={100}>
                <div className={`h-full rounded-full ${factor.color}`} style={{ width: `${factor.score}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">Factor points are weighted contributions to the total. This score is a guide, not a hiring prediction.</p>
      </section>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="rounded-xl bg-white border border-slate-200 p-5">
          <h3 className="font-semibold mb-2">Why it matches</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">{m.whyItMatches.map((w) => <li key={w}>{w}</li>)}</ul>
        </section>
        <section className="rounded-xl bg-white border border-slate-200 p-5">
          <h3 className="font-semibold mb-2">Skill gaps</h3>
          {m.missingSkills.length === 0 && <p className="text-sm text-slate-500">No gaps for this role.</p>}
          <ul className="list-disc pl-5 text-sm space-y-1">{m.skillGapReasons.map((g) => <li key={g}>{g}</li>)}</ul>
          <p className="text-sm mt-3 text-slate-700">{m.preparationTip}</p>
        </section>
      </div>
      <button onClick={() => onNavigateToWriter(selected)} className="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm">Write application</button>
    </div>
  );
}
