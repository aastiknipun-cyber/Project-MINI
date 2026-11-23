import { useRef } from 'react';
import type { UserProfile, ApplicationRecord, DeadlineItem } from '../types';

interface SettingsViewProps {
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onResetDemoData: () => void;
  profile: UserProfile;
  applications: ApplicationRecord[];
  deadlines: DeadlineItem[];
  onImportData: (data: { profile?: UserProfile; applications?: ApplicationRecord[]; deadlines?: DeadlineItem[] }) => void;
}

export function SettingsView({ isDemoMode, onToggleDemoMode, onResetDemoData, profile, applications, deadlines, onImportData }: SettingsViewProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ profile, applications, deadlines }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mailmuse-backup.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    const text = await file.text();
    onImportData(JSON.parse(text));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <section className="rounded-xl bg-white border border-slate-200 p-5 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span>Demo mode is {isDemoMode ? 'on' : 'off'}</span>
          <button onClick={onToggleDemoMode} className="rounded-md border px-3 py-1">Toggle</button>
        </div>
        <button onClick={onResetDemoData} className="rounded-md border px-3 py-1">Reset to demo data</button>
      </section>
      <section className="rounded-xl bg-white border border-slate-200 p-5 space-y-3 text-sm">
        <h3 className="font-semibold">Backup</h3>
        <div className="flex gap-2">
          <button onClick={exportJson} className="rounded-md border px-3 py-1">Export JSON</button>
          <button onClick={() => fileRef.current?.click()} className="rounded-md border px-3 py-1">Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
        </div>
      </section>
    </div>
  );
}
