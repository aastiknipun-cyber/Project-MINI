import { LayoutDashboard, Search, FileText, Target, ClipboardList, Briefcase, CalendarClock, PenLine, Settings } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  applicationsCount: number;
  interviewsCount: number;
  followUpsCount: number;
  deadlinesCount: number;
}

const ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'find', label: 'Find Internships', icon: Search },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'matches', label: 'Match Analysis', icon: Target },
  { id: 'actions', label: 'Action Center', icon: ClipboardList },
  { id: 'applications', label: 'Applications', icon: Briefcase },
  { id: 'deadlines', label: 'Deadlines', icon: CalendarClock },
  { id: 'writer', label: 'AI Writer', icon: PenLine },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentTab, onSelectTab, isDemoMode, onToggleDemoMode, applicationsCount, interviewsCount, followUpsCount, deadlinesCount }: SidebarProps) {
  const counts: Record<string, number> = {
    applications: applicationsCount,
    actions: followUpsCount,
    deadlines: deadlinesCount,
  };
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-5 border-b border-slate-200">
        <h1 className="text-lg font-extrabold text-indigo-600">MailMuse</h1>
        <p className="text-xs text-slate-500">Internship copilot</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelectTab(id)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2"><Icon size={16} />{label}</span>
            {counts[id] !== undefined && <span className="text-xs text-slate-400">{counts[id]}</span>}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
        <p>Interviews: {interviewsCount}</p>
        <button onClick={onToggleDemoMode} className="w-full rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-100">
          {isDemoMode ? 'Demo mode: on' : 'Demo mode: off'}
        </button>
      </div>
    </aside>
  );
}
