import { useState } from 'react';
import type { DeadlineItem, DeadlineType, PriorityLevel } from '../types';

interface DeadlinesViewProps {
  deadlines: DeadlineItem[];
  onAddDeadline: (item: DeadlineItem) => void;
  onToggleStatus: (id: string) => void;
  onToggleReminder: (id: string) => void;
  onDeleteDeadline: (id: string) => void;
}

// Builds a minimal iCalendar file from the deadlines list.
function toIcs(items: DeadlineItem[]): string {
  const stamp = (d: string) => d.replace(/-/g, '');
  const events = items.map((d) => [
    'BEGIN:VEVENT',
    `UID:${d.id}@mailmuse`,
    `DTSTART;VALUE=DATE:${stamp(d.dueDate)}`,
    `SUMMARY:${d.title} - ${d.company}`,
    `DESCRIPTION:${d.role}`,
    'END:VEVENT',
  ].join('\r\n'));
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MailMuse//EN', ...events, 'END:VCALENDAR'].join('\r\n');
}

export function DeadlinesView({ deadlines, onAddDeadline, onToggleStatus, onToggleReminder, onDeleteDeadline }: DeadlinesViewProps) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('MEDIUM');

  const add = () => {
    if (!title || !company || !dueDate) return;
    const type: DeadlineType = 'Application Deadline';
    onAddDeadline({ id: `dl-${Date.now()}`, title, company, role: '', type, dueDate, priority, status: 'Pending', reminderSet: true });
    setTitle(''); setCompany(''); setDueDate('');
  };

  const exportIcs = () => {
    const blob = new Blob([toIcs(deadlines)], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mailmuse-deadlines.ics'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Deadlines</h2>
        <button onClick={exportIcs} className="rounded-md border px-3 py-1 text-sm">Export .ics</button>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-4 grid md:grid-cols-5 gap-2 text-sm">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-md border px-2 py-1" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="rounded-md border px-2 py-1" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-md border px-2 py-1" />
        <select value={priority} onChange={(e) => setPriority(e.target.value as PriorityLevel)} className="rounded-md border px-2 py-1">
          <option>HIGH</option><option>MEDIUM</option><option>LOW</option>
        </select>
        <button onClick={add} className="rounded-md bg-indigo-600 text-white px-3 py-1">Add</button>
      </div>
      <ul className="space-y-2">
        {deadlines.map((d) => (
          <li key={d.id} className={`rounded-xl bg-white border border-slate-200 p-4 flex justify-between items-center gap-4 ${d.status === 'Completed' ? 'opacity-60' : ''}`}>
            <div>
              <p className="font-medium">{d.title}: {d.company}</p>
              <p className="text-xs text-slate-500">{d.dueDate} · {d.priority} · {d.type}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => onToggleStatus(d.id)} className="rounded-md border px-2 py-1">{d.status === 'Completed' ? 'Reopen' : 'Done'}</button>
              <button onClick={() => onToggleReminder(d.id)} className="rounded-md border px-2 py-1">{d.reminderSet ? 'Reminder on' : 'Reminder off'}</button>
              <button onClick={() => onDeleteDeadline(d.id)} className="rounded-md border px-2 py-1 text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
