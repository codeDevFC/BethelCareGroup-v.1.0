export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  groupId?: string;
  groupName?: string;
}

export interface Group {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  leader: string;
  members: number;
  seekers: number;
  healthScore: number;
}
