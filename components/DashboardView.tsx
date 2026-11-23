import type { UserProfile, Internship, ApplicationRecord, DeadlineItem } from '../types';

interface DashboardViewProps {
  profile: UserProfile;
  internships: Internship[];
  applications: ApplicationRecord[];
  deadlines: DeadlineItem[];
  onNavigateTab: (tab: string) => void;
  onExecuteCommand: (query: string) => void;
  onSelectInternshipForDetail: (item: Internship) => void;
}

export function DashboardView({ profile, internships, applications, deadlines, onNavigateTab }: DashboardViewProps) {
  const pending = deadlines.filter((d) => d.status === 'Pending');
  const stats = [
    { label: 'Internships found', value: internships.length, tab: 'find' },
    { label: 'Applications', value: applications.length, tab: 'applications' },
    { label: 'Pending deadlines', value: pending.length, tab: 'deadlines' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {profile.fullName.split(' ')[0]}</h2>
        <p className="text-slate-500 text-sm">{profile.branch}, {profile.college}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <button key={s.label} onClick={() => onNavigateTab(s.tab)} className="rounded-xl bg-white border border-slate-200 p-5 text-left hover:border-indigo-300">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
          </button>
        ))}
      </div>
      <section className="rounded-xl bg-white border border-slate-200 p-5">
        <h3 className="font-semibold mb-3">Upcoming deadlines</h3>
        {pending.length === 0 && <p className="text-sm text-slate-500">Nothing pending.</p>}
        <ul className="space-y-2 text-sm">
          {pending.map((d) => (
            <li key={d.id} className="flex justify-between">
              <span>{d.title}: {d.company}</span>
              <span className="text-slate-500">{d.dueDate}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
