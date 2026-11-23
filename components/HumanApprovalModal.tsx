import type { Internship, UserProfile } from '../types';

interface HumanApprovalModalProps {
  isOpen: boolean;
  internship: Internship | null;
  profile: UserProfile;
  coverLetter: string;
  onClose: () => void;
  onConfirmSubmit: (internship: Internship) => void;
}

// Nothing is sent automatically. The student must confirm, then the official link opens.
export function HumanApprovalModal({ isOpen, internship, profile, coverLetter, onClose, onConfirmSubmit }: HumanApprovalModalProps) {
  if (!isOpen || !internship) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold">Confirm application</h2>
        <p className="text-sm text-slate-600">
          You are applying to <strong>{internship.role}</strong> at <strong>{internship.company}</strong> as {profile.fullName}.
          Nothing is sent automatically. Confirming logs the application and opens the official portal.
        </p>
        <textarea readOnly value={coverLetter} rows={10} className="w-full rounded-md border p-3 text-sm" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
          <button onClick={() => { onConfirmSubmit(internship); onClose(); }} className="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm">
            I reviewed it, submit
          </button>
        </div>
      </div>
    </div>
  );
}
