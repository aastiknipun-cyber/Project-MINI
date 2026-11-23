import { useState } from 'react';
import type { UserProfile, ApplicationRecord, ApplicationStatus, DeadlineItem } from '../types';
import { generateFollowUp } from '../services/applicationService';

interface ActionCenterViewProps {
  profile: UserProfile;
  applications: ApplicationRecord[];
  onUpdateApplicationStatus: (id: string, newStatus: ApplicationStatus, notes?: string) => void;
  onAddDeadline: (item: DeadlineItem) => void;
  selectedAppIdFromCommand?: string;
}

export function ActionCenterView({ profile, applications, onUpdateApplicationStatus, onAddDeadline, selectedAppIdFromCommand }: ActionCenterViewProps) {
  const needsFollowUp = applications.filter((a) => a.status === 'Awaiting Response' || a.status === 'Applied');
  const [draftId, setDraftId] = useState<string | undefined>(selectedAppIdFromCommand);
  const draftApp = applications.find((a) => a.id === draftId);

  const logFollowUp = (app: ApplicationRecord) => {
    onUpdateApplicationStatus(app.id, 'Awaiting Response', `Follow-up sent on ${new Date().toISOString().split('T')[0]}.`);
  };

  const addReminder = (app: ApplicationRecord) => {
    onAddDeadline({
      id: `dl-${Date.now()}`, title: 'Follow-up reminder', company: app.company, role: app.role,
      type: 'Application Deadline', dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: 'MEDIUM', status: 'Pending', reminderSet: true, relatedApplicationId: app.id,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Action Center</h2>
      <section className="space-y-3">
        <h3 className="font-semibold">Follow-ups</h3>
        {needsFollowUp.length === 0 && <p className="text-sm text-slate-500">No follow-ups needed.</p>}
        {needsFollowUp.map((a) => (
          <div key={a.id} className="rounded-xl bg-white border border-slate-200 p-4 flex justify-between items-center gap-4">
            <div>
              <p className="font-medium">{a.company}: {a.role}</p>
              <p className="text-xs text-slate-500">Status: {a.status}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => setDraftId(a.id)} className="rounded-md border px-3 py-1">Draft</button>
              <button onClick={() => addReminder(a)} className="rounded-md border px-3 py-1">Remind me in 7 days</button>
              <button onClick={() => logFollowUp(a)} className="rounded-md bg-indigo-600 text-white px-3 py-1">Mark followed up</button>
            </div>
          </div>
        ))}
      </section>
      {draftApp && (
        <section className="rounded-xl bg-white border border-slate-200 p-5">
          <h3 className="font-semibold mb-2">Draft for {draftApp.company}</h3>
          <textarea readOnly value={generateFollowUp(draftApp)} rows={7} className="w-full rounded-md border p-3 text-sm" />
          <p className="text-xs text-slate-500 mt-2">Sender: {profile.fullName}. Review before sending.</p>
        </section>
      )}
    </div>
  );
}
