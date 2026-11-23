import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface HeaderCommandBarProps {
  onExecuteCommand: (query: string) => void;
  copilotResponse: string | null;
  onClearResponse: () => void;
  isProcessing: boolean;
}

export function HeaderCommandBar({ onExecuteCommand, copilotResponse, onClearResponse, isProcessing }: HeaderCommandBarProps) {
  const [value, setValue] = useState('');

  const submit = () => {
    const q = value.trim();
    if (!q || isProcessing) return;
    onExecuteCommand(q);
    setValue('');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-indigo-500" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder='Ask MailMuse, e.g. "Show my best matches"'
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <button onClick={submit} disabled={isProcessing} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50">
          {isProcessing ? 'Working…' : 'Run'}
        </button>
      </div>
      {copilotResponse && (
        <div className="mt-2 flex items-start justify-between rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-900">
          <span>{copilotResponse}</span>
          <button onClick={onClearResponse} aria-label="Dismiss"><X size={14} /></button>
        </div>
      )}
    </header>
  );
}
