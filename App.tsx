import React, { useState } from 'react';
import {
  UserProfile,
  Internship,
  ApplicationRecord,
  DeadlineItem,
  ApplicationStatus,
} from './types';
import {
  DEMO_USER_PROFILE,
  DEMO_INTERNSHIPS,
  DEMO_APPLICATIONS,
  DEMO_DEADLINES,
} from './data/demoData';
import { processNaturalLanguageCommand } from './services/aiService';
import { Sidebar } from './components/Sidebar';
import { HeaderCommandBar } from './components/HeaderCommandBar';
import { DashboardView } from './components/DashboardView';
import { FindInternshipsView } from './components/FindInternshipsView';
import { ResumeView } from './components/ResumeView';
import { MatchAnalysisView } from './components/MatchAnalysisView';
import { ActionCenterView } from './components/ActionCenterView';
import { ApplicationsView } from './components/ApplicationsView';
import { DeadlinesView } from './components/DeadlinesView';
import { AiWriterView } from './components/AiWriterView';
import { SettingsView } from './components/SettingsView';
import { HumanApprovalModal } from './components/HumanApprovalModal';

export default function App() {
  // Navigation & Mode
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Core Data State
  const [profile, setProfile] = useState<UserProfile>(DEMO_USER_PROFILE);
  const [internships, setInternships] = useState<Internship[]>(DEMO_INTERNSHIPS);
  const [applications, setApplications] = useState<ApplicationRecord[]>(DEMO_APPLICATIONS);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>(DEMO_DEADLINES);

  // Selection & Interactivity State
  const [selectedInternshipId, setSelectedInternshipId] = useState<string>(DEMO_INTERNSHIPS[0].id);
  const [selectedAppIdForAction, setSelectedAppIdForAction] = useState<string | undefined>();
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);
  const [isProcessingCommand, setIsProcessingCommand] = useState<boolean>(false);

  // Human Approval Modal State
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean;
    internship: Internship | null;
    coverLetter: string;
  }>({
    isOpen: false,
    internship: null,
    coverLetter: '',
  });

  // Shortlisted IDs
  const shortlistedIds = applications
    .filter((a) => a.status === 'Shortlisted')
    .map((a) => a.internshipId);

  // Derived Counts
  const interviewsCount = applications.filter((a) => a.status === 'Interview').length;
  const followUpsCount = applications.filter(
    (a) => a.status === 'Awaiting Response' || a.status === 'Applied'
  ).length;
  const pendingDeadlinesCount = deadlines.filter((d) => d.status === 'Pending').length;

  // Handle Natural Language Commands
  const handleExecuteCommand = (query: string) => {
    setIsProcessingCommand(true);
    setCopilotResponse(null);

    setTimeout(() => {
      const response = processNaturalLanguageCommand(
        query,
        profile,
        internships,
        applications,
        deadlines
      );

      setCopilotResponse(response.message);

      if (response.targetTab) {
        setCurrentTab(response.targetTab);
      }

      if (response.selectedInternshipId) {
        setSelectedInternshipId(response.selectedInternshipId);
      }

      if (response.selectedApplicationId) {
        setSelectedAppIdForAction(response.selectedApplicationId);
      }

      setIsProcessingCommand(false);
    }, 400);
  };

  // Shortlist an internship
  const handleShortlist = (internship: Internship) => {
    const existing = applications.find((a) => a.internshipId === internship.id);
    if (!existing) {
      const newApp: ApplicationRecord = {
        id: `app-${Date.now()}`,
        internshipId: internship.id,
        company: internship.company,
        role: internship.role,
        location: internship.location,
        workplaceType: internship.workplaceType,
        status: 'Shortlisted',
        deadline: internship.deadline,
        notes: `Shortlisted from discovery. Skills: ${internship.requiredSkills.slice(0, 3).join(', ')}.`,
        stipend: internship.stipend,
        applicationLink: internship.applicationLink,
        readinessScore: 85,
      };
      setApplications((prev) => [newApp, ...prev]);
    }
  };

  // Update application status & notes
  const handleUpdateApplicationStatus = (
    id: string,
    newStatus: ApplicationStatus,
    notes?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              notes: notes || app.notes,
              lastFollowUpDate:
                notes && notes.includes('Follow-up')
                  ? new Date().toISOString().split('T')[0]
                  : app.lastFollowUpDate,
            }
          : app
      )
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Deadline Handlers
  const handleAddDeadline = (item: DeadlineItem) => {
    setDeadlines((prev) => [item, ...prev]);
  };

  const handleToggleDeadlineStatus = (id: string) => {
    setDeadlines((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'Completed' ? 'Pending' : 'Completed' }
          : d
      )
    );
  };

  const handleToggleReminder = (id: string) => {
    setDeadlines((prev) =>
      prev.map((d) => (d.id === id ? { ...d, reminderSet: !d.reminderSet } : d))
    );
  };

  const handleDeleteDeadline = (id: string) => {
    setDeadlines((prev) => prev.filter((d) => d.id !== id));
  };

  // Reset to initial demo state
  const handleResetDemoData = () => {
    setProfile(DEMO_USER_PROFILE);
    setInternships(DEMO_INTERNSHIPS);
    setApplications(DEMO_APPLICATIONS);
    setDeadlines(DEMO_DEADLINES);
    setSelectedInternshipId(DEMO_INTERNSHIPS[0].id);
    setIsDemoMode(true);
    setCopilotResponse('Reset to full demo environment. All sample records restored.');
  };

  // Human approval trigger from AI Writer
  const handleRequestHumanApproval = (internship: Internship, coverLetter: string) => {
    setApprovalModal({
      isOpen: true,
      internship,
      coverLetter,
    });
  };

  // Human confirmed submit
  const handleConfirmSubmit = (internship: Internship) => {
    const existing = applications.find((a) => a.internshipId === internship.id);
    if (existing) {
      handleUpdateApplicationStatus(
        existing.id,
        'Applied',
        `Application confirmed and submitted on ${new Date().toLocaleDateString()}.`
      );
    } else {
      const newApp: ApplicationRecord = {
        id: `app-${Date.now()}`,
        internshipId: internship.id,
        company: internship.company,
        role: internship.role,
        location: internship.location,
        workplaceType: internship.workplaceType,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        deadline: internship.deadline,
        notes: `Application submitted via portal with tailored cover letter.`,
        stipend: internship.stipend,
        applicationLink: internship.applicationLink,
        readinessScore: 92,
      };
      setApplications((prev) => [newApp, ...prev]);
    }

    setCopilotResponse(
      `✓ Application logged for ${internship.company}. Moved to 'Applied' stage in Tracker!`
    );

    // Open official link
    if (internship.applicationLink) {
      window.open(internship.applicationLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setCopilotResponse(null);
        }}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
        applicationsCount={applications.length}
        interviewsCount={interviewsCount}
        followUpsCount={followUpsCount}
        deadlinesCount={pendingDeadlinesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top AI Command Bar */}
        <HeaderCommandBar
          onExecuteCommand={handleExecuteCommand}
          copilotResponse={copilotResponse}
          onClearResponse={() => setCopilotResponse(null)}
          isProcessing={isProcessingCommand}
        />

        {/* Tab View Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto pb-12">
            {currentTab === 'dashboard' && (
              <DashboardView
                profile={profile}
                internships={internships}
                applications={applications}
                deadlines={deadlines}
                onNavigateTab={(tab) => setCurrentTab(tab)}
                onExecuteCommand={handleExecuteCommand}
                onSelectInternshipForDetail={(item) => setSelectedInternshipId(item.id)}
              />
            )}

            {currentTab === 'find' && (
              <FindInternshipsView
                internships={internships}
                profile={profile}
                onSelectForMatch={(item) => {
                  setSelectedInternshipId(item.id);
                  setCurrentTab('matches');
                }}
                onSelectForApplication={(item) => {
                  setSelectedInternshipId(item.id);
                  setCurrentTab('writer');
                }}
                onShortlist={handleShortlist}
                shortlistedIds={shortlistedIds}
              />
            )}

            {currentTab === 'resume' && (
              <ResumeView
                profile={profile}
                onUpdateProfile={(updated) => setProfile(updated)}
                onLoadDemoResume={() => setProfile(DEMO_USER_PROFILE)}
              />
            )}

            {currentTab === 'matches' && (
              <MatchAnalysisView
                profile={profile}
                internships={internships}
                selectedInternshipId={selectedInternshipId}
                onSelectInternshipId={(id) => setSelectedInternshipId(id)}
                onNavigateToWriter={(item) => {
                  setSelectedInternshipId(item.id);
                  setCurrentTab('writer');
                }}
              />
            )}

            {currentTab === 'actions' && (
              <ActionCenterView
                profile={profile}
                applications={applications}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onAddDeadline={handleAddDeadline}
                selectedAppIdFromCommand={selectedAppIdForAction}
              />
            )}

            {currentTab === 'applications' && (
              <ApplicationsView
                applications={applications}
                onUpdateStatus={handleUpdateApplicationStatus}
                onDeleteApplication={handleDeleteApplication}
                onNavigateToActionCenter={(appId) => {
                  setSelectedAppIdForAction(appId);
                  setCurrentTab('actions');
                }}
              />
            )}

            {currentTab === 'deadlines' && (
              <DeadlinesView
                deadlines={deadlines}
                onAddDeadline={handleAddDeadline}
                onToggleStatus={handleToggleDeadlineStatus}
                onToggleReminder={handleToggleReminder}
                onDeleteDeadline={handleDeleteDeadline}
              />
            )}

            {currentTab === 'writer' && (
              <AiWriterView
                profile={profile}
                internships={internships}
                selectedInternshipId={selectedInternshipId}
                onSelectInternshipId={(id) => setSelectedInternshipId(id)}
                onRequestHumanApproval={handleRequestHumanApproval}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView
                isDemoMode={isDemoMode}
                onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
                onResetDemoData={handleResetDemoData}
                profile={profile}
                applications={applications}
                deadlines={deadlines}
                onImportData={(data) => {
                  if (data.profile) setProfile(data.profile);
                  if (data.applications) setApplications(data.applications);
                  if (data.deadlines) setDeadlines(data.deadlines);
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Human Approval Modal */}
      <HumanApprovalModal
        isOpen={approvalModal.isOpen}
        internship={approvalModal.internship}
        profile={profile}
        coverLetter={approvalModal.coverLetter}
        onClose={() => setApprovalModal({ isOpen: false, internship: null, coverLetter: '' })}
        onConfirmSubmit={handleConfirmSubmit}
      />
    </div>
  );
}
