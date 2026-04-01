import { Role, GroupStatus, MeetingStatus, AttendanceStatus, PrayerStatus, DiscipleshipLevel, DiscipleshipStatus, EvangelismPhase, EventType, AlertLevel, StudyStatus } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  groupId?: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  leader?: User;
  carer?: User;
  members: User[];
  healthScore: number;
  communityScore: number;
  leadershipScore: number;
  evangelismScore: number;
  accountabilityScore: number;
  reproductionScore: number;
  status: GroupStatus;
  fishingPond?: string;
}

export interface Meeting {
  id: string;
  groupId: string;
  date: Date;
  weekNumber: number;
  topic: string;
  leader: string;
  attendance: number;
  notes?: string;
  status: MeetingStatus;
}

export interface WeeklyReport {
  id: string;
  meetingId: string;
  groupId: string;
  submittedBy: string;
  submittedAt: Date;
  attendance: number;
  topic: string;
  leader: string;
  prayerRequests: string[];
  answeredPrayers: string[];
  testimonies: string[];
  challenges: string[];
  observations?: string;
  actionItems: string[];
  followUpNeeded: { member: string; reason: string }[];
}

export interface PrayerRequest {
  id: string;
  groupId: string;
  circleId?: string;
  memberId?: string;
  request: string;
  isPrivate: boolean;
  status: PrayerStatus;
  answeredDate?: Date;
  testimony?: string;
  createdAt: Date;
}

export interface DiscipleshipProgress {
  id: string;
  disciplerId: string;
  discipleId: string;
  level: DiscipleshipLevel;
  startDate: Date;
  completionDate?: Date;
  status: DiscipleshipStatus;
  scripturesMemorized: string[];
  devotionsCompleted: number;
  prayerJournalStarted: boolean;
  testimonyWritten: boolean;
}

export interface Backslider {
  id: string;
  groupId: string;
  memberId: string;
  memberName: string;
  consecutiveAbsences: number;
  lastAttendance: Date;
  alertLevel: AlertLevel;
  notes?: string;
  contactAttempts: number;
  lastContact?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  series: string;
  lessonNumber: number;
  keyVerses: string[];
  content: any;
  isAdminOnly: boolean;
  audioUrl?: string;
  code: string;
}

export interface EvangelismEvent {
  id: string;
  name: string;
  type: EventType;
  date: Date;
  location?: string;
  attendance: number;
  contacts: EventContact[];
}

export interface EventContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  interestLevel: number;
  followUpDate?: Date;
  notes?: string;
}

export interface BibleStudy {
  id: string;
  teacherId: string;
  studentId: string;
  topic: string;
  lessonNumber: number;
  status: StudyStatus;
  scheduledFor: Date;
  completedAt?: Date;
  notes?: string;
}
