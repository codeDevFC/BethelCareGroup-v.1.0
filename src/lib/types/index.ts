export interface Group {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  leader: string;
  members: number;
  seekers: number;
  healthScore: number;
  location?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  groupId: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'seeker';
  phone?: string;
  email?: string;
}

export interface PrayerRequest {
  id: string;
  memberName: string;
  request: string;
  date: string;
  status: 'active' | 'answered';
  answeredDate?: string;
  testimony?: string;
  isPrivate: boolean;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface DiscipleshipProgress {
  id: string;
  memberId: string;
  memberName: string;
  level: 'survival' | 'basic' | 'tactics' | 'completed';
  scripturesMemorized: string[];
  devotionsCompleted: number;
  prayerJournalStarted: boolean;
  testimonyWritten: boolean;
  mentor: string;
  startDate: string;
}

export interface MissionStage {
  id: string;
  memberId: string;
  memberName: string;
  stage: 'praying' | 'serving' | 'invited' | 'attending' | 'decided' | 'baptized';
  notes?: string;
  date?: string;
}

export interface Lesson {
  id: string;
  title: string;
  series: string;
  lessonNumber: number;
  keyVerses: string[];
  content: string;
  audioUrl?: string;
  code: string;
}
