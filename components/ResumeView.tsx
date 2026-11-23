import type { UserProfile } from '../types';

interface ResumeViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onLoadDemoResume: () => void;
}

// Simple form editor for the profile. Resume file parsing is not implemented here.
export function ResumeView({ profile, onUpdateProfile, onLoadDemoResume }: ResumeViewProps) {
  const set = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => onUpdateProfile({ ...profile, [key]: value });
  const list = (text: string) => text.split(',').map((s) => s.trim()).filter(Boolean);

  const fields: { key: 'fullName' | 'email' | 'phone' | 'college' | 'branch' | 'degree' | 'graduationYear' | 'cgpa'; label: string }[] = [
    { key: 'fullName', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'college', label: 'College' },
    { key: 'degree', label: 'Degree' },
    { key: 'branch', label: 'Branch' },
    { key: 'graduationYear', label: 'Graduation year' },
    { key: 'cgpa', label: 'CGPA' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Profile</h2>
        <button onClick={onLoadDemoResume} className="rounded-md border px-3 py-1 text-sm">Load demo profile</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 rounded-xl bg-white border border-slate-200 p-5">
        {fields.map((f) => (
          <label key={f.key} className="text-sm space-y-1">
            <span className="text-slate-600">{f.label}</span>
            <input value={profile[f.key]} onChange={(e) => set(f.key, e.target.value)} className="w-full rounded-md border border-slate-300 px-2 py-1" />
          </label>
        ))}
        <label className="text-sm space-y-1 md:col-span-2">
          <span className="text-slate-600">Skills (comma separated)</span>
          <input value={profile.skills.join(', ')} onChange={(e) => set('skills', list(e.target.value))} className="w-full rounded-md border border-slate-300 px-2 py-1" />
        </label>
      </div>
    </div>
  );
}
