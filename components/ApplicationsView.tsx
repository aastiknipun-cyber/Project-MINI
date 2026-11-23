import { useState } from 'react';
import type { ApplicationRecord, ApplicationStatus } from '../types';

const STAGES: ApplicationStatus[] = [
  'Discovered', 'Shortlisted', 'Ready to Apply', 'Applied', 'Assessment',
  'Interview', 'Awaiting Response', 'Offer', 'Rejected',
];

interface ApplicationsViewProps {
  applications: ApplicationRecord[];
  onUpdateStatus: (id: string, newStatus: ApplicationStatus, notes?: string) => void;
  onDeleteApplication: (id: string) => void;
  onNavigateToActionCenter: (appId: string) => void;
}

export function ApplicationsView({ applications, onUpdateStatus, onDeleteApplication, onNavigateToActionCenter }: ApplicationsViewProps) {
  const [search, setSearch] = useState('');
  const visible = applications.filter((a) => `${a.company} ${a.role}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Applications</h2>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="rounded-md border px-3 py-2 text-sm" />
      </div>
      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Company</th><th className="p-3">Role</th><th className="p-3">Stage</th><th className="p-3">Deadline</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((a) => (
              <tr key={a.id} className="border-t border-slate-100">
                <td className="p-3 font-medium">{a.company}</td>
                <td className="p-3">{a.role}</td>
                <td className="p-3">
                  <select value={a.status} onChange={(e) => onUpdateStatus(a.id, e.target.value as ApplicationStatus)} className="rounded-md border px-2 py-1">
                    {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3">{a.deadline ?? '—'}</td>
                <td className="p-3 flex gap-2 justify-end">
                  <button onClick={() => onNavigateToActionCenter(a.id)} className="rounded-md border px-2 py-1">Actions</button>
                  <button onClick={() => onDeleteApplication(a.id)} className="rounded-md border px-2 py-1 text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className="p-4 text-sm text-slate-500">No applications.</p>}
      </div>
    </div>
  );
}
