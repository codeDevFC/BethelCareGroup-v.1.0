export const groups = [
  { id: '1', name: 'Willenhall Victory', meetingDay: 'Sunday', meetingTime: '15:00', leader: 'Frank A', members: 12, seekers: 3, healthScore: 92, location: 'Willenhall Town Centre' },
  { id: '2', name: 'Dudley Faith Builders', meetingDay: 'Wednesday', meetingTime: '18:30', leader: 'Michael A', members: 11, seekers: 2, healthScore: 85, location: 'Dudley Town Centre' },
  { id: '3', name: 'Birmingham Hope', meetingDay: 'Tuesday', meetingTime: '19:00', leader: 'Charles A', members: 13, seekers: 4, healthScore: 88, location: 'Birmingham City Centre' },
  { id: '4', name: 'Wolverhampton Harvest', meetingDay: 'Sunday', meetingTime: '16:00', leader: 'Anthony A', members: 12, seekers: 3, healthScore: 91, location: 'Wolverhampton City Centre' },
  { id: '5', name: 'Walsall Steadfast', meetingDay: 'Monday', meetingTime: '18:00', leader: 'Jason A', members: 10, seekers: 2, healthScore: 79, location: 'Walsall Town Centre' },
  { id: '6', name: 'Coventry Connect', meetingDay: 'Friday', meetingTime: '19:30', leader: 'Daniel A', members: 12, seekers: 3, healthScore: 88, location: 'Coventry City Centre' },
  { id: '7', name: 'Sandwell New Life', meetingDay: 'Thursday', meetingTime: '18:30', leader: 'Sarah D', members: 11, seekers: 2, healthScore: 86, location: 'Sandwell Town Centre' },
];

export const members = [
  { id: '1', name: 'Frank A', email: 'frank@willenhall.org', phone: '+44 1902 123001', role: 'leader', groupId: '1', joinedDate: '2024-01-15', status: 'active' },
  { id: '2', name: 'Felix B', email: 'felix@willenhall.org', phone: '+44 1902 123002', role: 'member', groupId: '1', joinedDate: '2024-02-01', status: 'active' },
  { id: '3', name: 'Maa Ellen C', email: 'ellen@willenhall.org', phone: '+44 1902 123003', role: 'member', groupId: '1', joinedDate: '2024-01-20', status: 'active' },
  { id: '4', name: 'Sarah D', email: 'sarah@willenhall.org', phone: '+44 1902 123004', role: 'member', groupId: '1', joinedDate: '2024-03-10', status: 'active' },
  { id: '5', name: 'David Chen', email: 'david@willenhall.org', phone: '+44 1902 123005', role: 'seeker', groupId: '1', joinedDate: '2024-03-20', status: 'active' },
  { id: '13', name: 'Michael A', email: 'michael@dudley.org', phone: '+44 1384 223001', role: 'leader', groupId: '2', joinedDate: '2024-01-10', status: 'active' },
  { id: '24', name: 'Charles A', email: 'charles@birmingham.org', phone: '+44 121 555001', role: 'leader', groupId: '3', joinedDate: '2024-01-12', status: 'active' },
  { id: '37', name: 'Anthony A', email: 'anthony@wolves.org', phone: '+44 1902 456001', role: 'leader', groupId: '4', joinedDate: '2024-01-08', status: 'active' },
  { id: '49', name: 'Jason A', email: 'jason@walsall.org', phone: '+44 1922 789001', role: 'leader', groupId: '5', joinedDate: '2024-01-05', status: 'active' },
  { id: '59', name: 'Daniel A', email: 'daniel@coventry.org', phone: '+44 2476 123001', role: 'leader', groupId: '6', joinedDate: '2024-01-10', status: 'active' },
  { id: '71', name: 'Sarah D', email: 'sarah@sandwell.org', phone: '+44 121 888001', role: 'leader', groupId: '7', joinedDate: '2024-01-15', status: 'active' },
];

export const prayerRequests = [
  { id: '1', memberName: 'Frank A', request: 'Pray for our group outreach this weekend', date: '2025-03-25', status: 'active', isPrivate: false },
  { id: '2', memberName: 'Sarah D', request: 'Job interview this Thursday - need wisdom', date: '2025-03-26', status: 'active', isPrivate: false },
  { id: '3', memberName: 'David Chen', request: 'Seeking truth and direction in life', date: '2025-03-28', status: 'active', isPrivate: false },
];

export const attendanceRecords = [
  { id: '1', memberId: '1', memberName: 'Frank A', date: '2025-03-24', status: 'present' },
  { id: '2', memberId: '2', memberName: 'Felix B', date: '2025-03-24', status: 'present' },
  { id: '3', memberId: '3', memberName: 'Maa Ellen C', date: '2025-03-24', status: 'present' },
  { id: '4', memberId: '4', memberName: 'Sarah D', date: '2025-03-24', status: 'absent' },
];

export const discipleshipProgress = [
  { id: '1', memberId: '1', memberName: 'Frank A', level: 'completed', scripturesMemorized: 25, devotionsCompleted: 85, mentor: 'Pastor John', startDate: '2024-01-15' },
  { id: '2', memberId: '2', memberName: 'Felix B', level: 'basic', scripturesMemorized: 12, devotionsCompleted: 42, mentor: 'Frank A', startDate: '2024-02-01' },
];

export const missionStages = [
  { id: '1', memberId: '5', memberName: 'David Chen', stage: 'praying', notes: 'Attending weekly meetings', date: '2025-03-20' },
];
