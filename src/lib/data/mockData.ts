import { Group, Member, PrayerRequest, AttendanceRecord, DiscipleshipProgress, MissionStage, Lesson } from '@/lib/types';

// 7 UK-based Care Groups
export const groups: Group[] = [
  { id: '1', name: 'Willenhall Victory', meetingDay: 'Sunday', meetingTime: '15:00', leader: 'Frank A', members: 12, seekers: 3, healthScore: 92, location: 'Willenhall Town Centre' },
  { id: '2', name: 'Dudley Faith Builders', meetingDay: 'Wednesday', meetingTime: '18:30', leader: 'Michael A', members: 11, seekers: 2, healthScore: 85, location: 'Dudley Town Centre' },
  { id: '3', name: 'Birmingham Hope', meetingDay: 'Tuesday', meetingTime: '19:00', leader: 'Charles A', members: 13, seekers: 4, healthScore: 88, location: 'Birmingham City Centre' },
  { id: '4', name: 'Wolverhampton Harvest', meetingDay: 'Sunday', meetingTime: '16:00', leader: 'Anthony A', members: 12, seekers: 3, healthScore: 91, location: 'Wolverhampton City Centre' },
  { id: '5', name: 'Walsall Steadfast', meetingDay: 'Monday', meetingTime: '18:00', leader: 'Jason A', members: 10, seekers: 2, healthScore: 79, location: 'Walsall Town Centre' },
  { id: '6', name: 'Coventry Connect', meetingDay: 'Friday', meetingTime: '19:30', leader: 'Daniel A', members: 12, seekers: 3, healthScore: 83, location: 'Coventry City Centre' },
  { id: '7', name: 'Sandwell New Life', meetingDay: 'Thursday', meetingTime: '18:30', leader: 'Sarah D', members: 11, seekers: 2, healthScore: 86, location: 'West Bromwich, Sandwell' },
];

// Members distributed across 7 groups (max 13 per group)
export const members: Member[] = [
  // Group 1: Willenhall Victory (12 members)
  { id: '1', name: 'Frank A', email: 'frank@willenhall.org', phone: '+44 1902 123001', role: 'leader', groupId: '1', joinedDate: '2024-01-15', status: 'active', notes: 'Group leader, retired teacher' },
  { id: '2', name: 'Felix B', email: 'felix@willenhall.org', phone: '+44 1902 123002', role: 'member', groupId: '1', joinedDate: '2024-02-01', status: 'active', notes: 'Works at local school' },
  { id: '3', name: 'Maa Ellen C', email: 'ellen@willenhall.org', phone: '+44 1902 123003', role: 'member', groupId: '1', joinedDate: '2024-01-20', status: 'active', notes: 'Prayer warrior' },
  { id: '4', name: 'Sarah D', email: 'sarah@willenhall.org', phone: '+44 1902 123004', role: 'member', groupId: '1', joinedDate: '2024-03-10', status: 'active', notes: 'Nurse at New Cross Hospital' },
  { id: '5', name: 'David Chen', email: 'david@willenhall.org', phone: '+44 1902 123005', role: 'seeker', groupId: '1', joinedDate: '2024-03-20', status: 'active', notes: 'New seeker from China' },
  { id: '6', name: 'Grace Moyo', email: 'grace@willenhall.org', phone: '+44 1902 123006', role: 'member', groupId: '1', joinedDate: '2024-02-15', status: 'active', notes: 'Zimbabwean community leader' },
  { id: '7', name: 'Thomas Okafor', email: 'thomas@willenhall.org', phone: '+44 1902 123007', role: 'member', groupId: '1', joinedDate: '2024-02-20', status: 'active', notes: 'Nigerian business owner' },
  { id: '8', name: 'Rachel Cohen', email: 'rachel@willenhall.org', phone: '+44 1902 123008', role: 'member', groupId: '1', joinedDate: '2024-03-01', status: 'active', notes: 'University student' },
  { id: '9', name: 'Peter Kowalski', email: 'peter@willenhall.org', phone: '+44 1902 123009', role: 'member', groupId: '1', joinedDate: '2024-02-10', status: 'active', notes: 'Polish community representative' },
  { id: '10', name: 'Linda Garcia', email: 'linda@willenhall.org', phone: '+44 1902 123010', role: 'member', groupId: '1', joinedDate: '2024-01-25', status: 'active', notes: 'Spanish speaker' },
  { id: '11', name: 'Robert Kim', email: 'robert@willenhall.org', phone: '+44 1902 123011', role: 'member', groupId: '1', joinedDate: '2024-02-05', status: 'active', notes: 'Korean community' },
  { id: '12', name: 'Patricia Lee', email: 'patricia@willenhall.org', phone: '+44 1902 123012', role: 'member', groupId: '1', joinedDate: '2024-03-05', status: 'active', notes: 'Retired nurse' },
  
  // Group 2: Dudley Faith Builders (11 members)
  { id: '13', name: 'Michael A', email: 'michael@dudley.org', phone: '+44 1384 223001', role: 'leader', groupId: '2', joinedDate: '2024-01-10', status: 'active', notes: 'Business owner' },
  { id: '14', name: 'John Member', email: 'john@dudley.org', phone: '+44 1384 223002', role: 'member', groupId: '2', joinedDate: '2024-02-15', status: 'active', notes: 'Works at Dudley Zoo' },
  { id: '15', name: 'Mary Johnson', email: 'mary@dudley.org', phone: '+44 1384 223003', role: 'member', groupId: '2', joinedDate: '2024-01-05', status: 'active', notes: 'Children\'s ministry' },
  { id: '16', name: 'James Wilson', email: 'james@dudley.org', phone: '+44 1384 223004', role: 'member', groupId: '2', joinedDate: '2024-02-20', status: 'active', notes: 'Retired engineer' },
  { id: '17', name: 'Elizabeth Brown', email: 'elizabeth@dudley.org', phone: '+44 1384 223005', role: 'member', groupId: '2', joinedDate: '2024-01-18', status: 'active', notes: 'Teacher' },
  { id: '18', name: 'Sarah Adebayo', email: 'sarah.ade@dudley.org', phone: '+44 1384 223006', role: 'seeker', groupId: '2', joinedDate: '2024-03-25', status: 'active', notes: 'New from Nigeria' },
  { id: '19', name: 'William Harris', email: 'william@dudley.org', phone: '+44 1384 223007', role: 'member', groupId: '2', joinedDate: '2024-02-08', status: 'active', notes: 'Local council worker' },
  { id: '20', name: 'Catherine Lewis', email: 'catherine@dudley.org', phone: '+44 1384 223008', role: 'member', groupId: '2', joinedDate: '2024-03-12', status: 'active', notes: 'Artist' },
  { id: '21', name: 'Daniel Wright', email: 'daniel@dudley.org', phone: '+44 1384 223009', role: 'member', groupId: '2', joinedDate: '2024-02-22', status: 'active', notes: 'University student' },
  { id: '22', name: 'Emma Taylor', email: 'emma@dudley.org', phone: '+44 1384 223010', role: 'member', groupId: '2', joinedDate: '2024-01-28', status: 'active', notes: 'Music teacher' },
  { id: '23', name: 'Oliver Clark', email: 'oliver@dudley.org', phone: '+44 1384 223011', role: 'member', groupId: '2', joinedDate: '2024-03-03', status: 'active', notes: 'Youth worker' },
  
  // Group 3: Birmingham Hope (13 members)
  { id: '24', name: 'Charles A', email: 'charles@birmingham.org', phone: '+44 121 555001', role: 'leader', groupId: '3', joinedDate: '2024-01-12', status: 'active', notes: 'Retired pastor' },
  { id: '25', name: 'Barbara Adams', email: 'barbara@birmingham.org', phone: '+44 121 555002', role: 'member', groupId: '3', joinedDate: '2024-01-20', status: 'active', notes: 'Social worker' },
  { id: '26', name: 'Richard Evans', email: 'richard@birmingham.org', phone: '+44 121 555003', role: 'member', groupId: '3', joinedDate: '2024-02-01', status: 'active', notes: 'Engineer' },
  { id: '27', name: 'Susan Miller', email: 'susan@birmingham.org', phone: '+44 121 555004', role: 'member', groupId: '3', joinedDate: '2024-01-25', status: 'active', notes: 'NHS worker' },
  { id: '28', name: 'Joseph King', email: 'joseph@birmingham.org', phone: '+44 121 555005', role: 'member', groupId: '3', joinedDate: '2024-02-12', status: 'active', notes: 'Business consultant' },
  { id: '29', name: 'Margaret White', email: 'margaret@birmingham.org', phone: '+44 121 555006', role: 'member', groupId: '3', joinedDate: '2024-03-01', status: 'active', notes: 'Retired teacher' },
  { id: '30', name: 'Steven Green', email: 'steven@birmingham.org', phone: '+44 121 555007', role: 'member', groupId: '3', joinedDate: '2024-02-18', status: 'active', notes: 'IT specialist' },
  { id: '31', name: 'Jennifer Hall', email: 'jennifer@birmingham.org', phone: '+44 121 555008', role: 'member', groupId: '3', joinedDate: '2024-03-08', status: 'active', notes: 'University lecturer' },
  { id: '32', name: 'Kevin Brown', email: 'kevin@birmingham.org', phone: '+44 121 555009', role: 'seeker', groupId: '3', joinedDate: '2024-03-18', status: 'active', notes: 'New to faith' },
  { id: '33', name: 'Laura Wilson', email: 'laura@birmingham.org', phone: '+44 121 555010', role: 'member', groupId: '3', joinedDate: '2024-02-05', status: 'active', notes: 'Accountant' },
  { id: '34', name: 'Matthew Thomas', email: 'matthew@birmingham.org', phone: '+44 121 555011', role: 'member', groupId: '3', joinedDate: '2024-01-30', status: 'active', notes: 'Musician' },
  { id: '35', name: 'Amanda Scott', email: 'amanda@birmingham.org', phone: '+44 121 555012', role: 'member', groupId: '3', joinedDate: '2024-03-15', status: 'active', notes: 'Student' },
  { id: '36', name: 'Joshua Parker', email: 'joshua@birmingham.org', phone: '+44 121 555013', role: 'member', groupId: '3', joinedDate: '2024-02-25', status: 'active', notes: 'Youth pastor' },
  
  // Group 4: Wolverhampton Harvest (12 members)
  { id: '37', name: 'Anthony A', email: 'anthony@wolves.org', phone: '+44 1902 456001', role: 'leader', groupId: '4', joinedDate: '2024-01-08', status: 'active', notes: 'Evangelist' },
  { id: '38', name: 'Donna Carter', email: 'donna@wolves.org', phone: '+44 1902 456002', role: 'member', groupId: '4', joinedDate: '2024-01-18', status: 'active', notes: 'Nurse' },
  { id: '39', name: 'Paul Roberts', email: 'paul@wolves.org', phone: '+44 1902 456003', role: 'member', groupId: '4', joinedDate: '2024-02-10', status: 'active', notes: 'Factory worker' },
  { id: '40', name: 'Helen Cooper', email: 'helen@wolves.org', phone: '+44 1902 456004', role: 'member', groupId: '4', joinedDate: '2024-01-22', status: 'active', notes: 'Hairdresser' },
  { id: '41', name: 'Mark Edwards', email: 'mark@wolves.org', phone: '+44 1902 456005', role: 'member', groupId: '4', joinedDate: '2024-02-15', status: 'active', notes: 'Bus driver' },
  { id: '42', name: 'Sandra Hughes', email: 'sandra@wolves.org', phone: '+44 1902 456006', role: 'member', groupId: '4', joinedDate: '2024-03-05', status: 'active', notes: 'Volunteer' },
  { id: '43', name: 'George Foster', email: 'george@wolves.org', phone: '+44 1902 456007', role: 'member', groupId: '4', joinedDate: '2024-02-20', status: 'active', notes: 'Retired soldier' },
  { id: '44', name: 'Betty Morgan', email: 'betty@wolves.org', phone: '+44 1902 456008', role: 'member', groupId: '4', joinedDate: '2024-03-12', status: 'active', notes: 'Grandmother' },
  { id: '45', name: 'Kenneth Ward', email: 'kenneth@wolves.org', phone: '+44 1902 456009', role: 'member', groupId: '4', joinedDate: '2024-02-08', status: 'active', notes: 'Shopkeeper' },
  { id: '46', name: 'Ashley Turner', email: 'ashley@wolves.org', phone: '+44 1902 456010', role: 'seeker', groupId: '4', joinedDate: '2024-03-22', status: 'active', notes: 'New seeker' },
  { id: '47', name: 'Joshua Hill', email: 'joshua@wolves.org', phone: '+44 1902 456011', role: 'member', groupId: '4', joinedDate: '2024-01-28', status: 'active', notes: 'College student' },
  { id: '48', name: 'Kimberly Bell', email: 'kimberly@wolves.org', phone: '+44 1902 456012', role: 'member', groupId: '4', joinedDate: '2024-03-01', status: 'active', notes: 'Teacher' },
  
  // Group 5: Walsall Steadfast (10 members)
  { id: '49', name: 'Jason A', email: 'jason@walsall.org', phone: '+44 1922 789001', role: 'leader', groupId: '5', joinedDate: '2024-01-05', status: 'active', notes: 'Construction manager' },
  { id: '50', name: 'Rebecca Allen', email: 'rebecca@walsall.org', phone: '+44 1922 789002', role: 'member', groupId: '5', joinedDate: '2024-02-01', status: 'active', notes: 'Nurse' },
  { id: '51', name: 'Jeffrey Cox', email: 'jeffrey@walsall.org', phone: '+44 1922 789003', role: 'member', groupId: '5', joinedDate: '2024-01-15', status: 'active', notes: 'Electrician' },
  { id: '52', name: 'Cynthia Price', email: 'cynthia@walsall.org', phone: '+44 1922 789004', role: 'member', groupId: '5', joinedDate: '2024-02-12', status: 'active', notes: 'Café owner' },
  { id: '53', name: 'Ryan Baker', email: 'ryan@walsall.org', phone: '+44 1922 789005', role: 'member', groupId: '5', joinedDate: '2024-03-08', status: 'active', notes: 'Student' },
  { id: '54', name: 'Stephanie Reed', email: 'stephanie@walsall.org', phone: '+44 1922 789006', role: 'member', groupId: '5', joinedDate: '2024-02-18', status: 'active', notes: 'Social worker' },
  { id: '55', name: 'Timothy Cook', email: 'timothy@walsall.org', phone: '+44 1922 789007', role: 'member', groupId: '5', joinedDate: '2024-03-15', status: 'active', notes: 'Retired' },
  { id: '56', name: 'Nicole Foster', email: 'nicole@walsall.org', phone: '+44 1922 789008', role: 'seeker', groupId: '5', joinedDate: '2024-03-20', status: 'active', notes: 'New to area' },
  { id: '57', name: 'Brandon Murphy', email: 'brandon@walsall.org', phone: '+44 1922 789009', role: 'member', groupId: '5', joinedDate: '2024-01-25', status: 'active', notes: 'Apprentice' },
  { id: '58', name: 'Rachel James', email: 'rachel@walsall.org', phone: '+44 1922 789010', role: 'member', groupId: '5', joinedDate: '2024-02-22', status: 'active', notes: 'Dental hygienist' },
  
  // Group 6: Coventry Connect (12 members)
  { id: '59', name: 'Daniel A', email: 'daniel@coventry.org', phone: '+44 2476 123001', role: 'leader', groupId: '6', joinedDate: '2024-01-10', status: 'active', notes: 'University chaplain' },
  { id: '60', name: 'Emily Wright', email: 'emily@coventry.org', phone: '+44 2476 123002', role: 'member', groupId: '6', joinedDate: '2024-02-05', status: 'active', notes: 'Student' },
  { id: '61', name: 'Christopher Adams', email: 'christopher@coventry.org', phone: '+44 2476 123003', role: 'member', groupId: '6', joinedDate: '2024-01-20', status: 'active', notes: 'Engineer' },
  { id: '62', name: 'Amanda Cole', email: 'amanda@coventry.org', phone: '+44 2476 123004', role: 'member', groupId: '6', joinedDate: '2024-02-12', status: 'active', notes: 'Teacher' },
  { id: '63', name: 'Andrew Bennett', email: 'andrew@coventry.org', phone: '+44 2476 123005', role: 'member', groupId: '6', joinedDate: '2024-03-01', status: 'active', notes: 'IT consultant' },
  { id: '64', name: 'Jessica Ford', email: 'jessica@coventry.org', phone: '+44 2476 123006', role: 'member', groupId: '6', joinedDate: '2024-02-18', status: 'active', notes: 'Librarian' },
  { id: '65', name: 'Jonathan Long', email: 'jonathan@coventry.org', phone: '+44 2476 123007', role: 'member', groupId: '6', joinedDate: '2024-03-10', status: 'active', notes: 'PhD student' },
  { id: '66', name: 'Melissa Hayes', email: 'melissa@coventry.org', phone: '+44 2476 123008', role: 'seeker', groupId: '6', joinedDate: '2024-03-18', status: 'active', notes: 'Artist' },
  { id: '67', name: 'Justin Cole', email: 'justin@coventry.org', phone: '+44 2476 123009', role: 'member', groupId: '6', joinedDate: '2024-02-25', status: 'active', notes: 'Musician' },
  { id: '68', name: 'Nicole Young', email: 'nicole@coventry.org', phone: '+44 2476 123010', role: 'member', groupId: '6', joinedDate: '2024-01-28', status: 'active', notes: 'Pharmacist' },
  { id: '69', name: 'Brandon Ross', email: 'brandon@coventry.org', phone: '+44 2476 123011', role: 'member', groupId: '6', joinedDate: '2024-03-05', status: 'active', notes: 'Sports coach' },
  { id: '70', name: 'Rachel Ward', email: 'rachel@coventry.org', phone: '+44 2476 123012', role: 'member', groupId: '6', joinedDate: '2024-02-08', status: 'active', notes: 'Student' },
  
  // Group 7: Sandwell New Life (11 members)
  { id: '71', name: 'Sarah D', email: 'sarah@sandwell.org', phone: '+44 121 888001', role: 'leader', groupId: '7', joinedDate: '2024-01-15', status: 'active', notes: 'Community worker' },
  { id: '72', name: 'Samuel Grant', email: 'samuel@sandwell.org', phone: '+44 121 888002', role: 'member', groupId: '7', joinedDate: '2024-02-01', status: 'active', notes: 'Retired' },
  { id: '73', name: 'Esther Pate', email: 'esther@sandwell.org', phone: '+44 121 888003', role: 'member', groupId: '7', joinedDate: '2024-01-22', status: 'active', notes: 'Prayer leader' },
  { id: '74', name: 'Abraham Mills', email: 'abraham@sandwell.org', phone: '+44 121 888004', role: 'member', groupId: '7', joinedDate: '2024-02-12', status: 'active', notes: 'Accountant' },
  { id: '75', name: 'Deborah Fox', email: 'deborah@sandwell.org', phone: '+44 121 888005', role: 'member', groupId: '7', joinedDate: '2024-03-05', status: 'active', notes: 'Nurse' },
  { id: '76', name: 'Isaac Stone', email: 'isaac@sandwell.org', phone: '+44 121 888006', role: 'member', groupId: '7', joinedDate: '2024-02-18', status: 'active', notes: 'Builder' },
  { id: '77', name: 'Hannah Rowe', email: 'hannah@sandwell.org', phone: '+44 121 888007', role: 'member', groupId: '7', joinedDate: '2024-03-12', status: 'active', notes: 'Café owner' },
  { id: '78', name: 'Jacob Marsh', email: 'jacob@sandwell.org', phone: '+44 121 888008', role: 'seeker', groupId: '7', joinedDate: '2024-03-22', status: 'active', notes: 'New believer' },
  { id: '79', name: 'Leah Knight', email: 'leah@sandwell.org', phone: '+44 121 888009', role: 'member', groupId: '7', joinedDate: '2024-01-30', status: 'active', notes: 'Teacher' },
  { id: '80', name: 'Moses Webb', email: 'moses@sandwell.org', phone: '+44 121 888010', role: 'member', groupId: '7', joinedDate: '2024-02-22', status: 'active', notes: 'Security guard' },
  { id: '81', name: 'Naomi Hart', email: 'naomi@sandwell.org', phone: '+44 121 888011', role: 'member', groupId: '7', joinedDate: '2024-03-08', status: 'active', notes: 'Student' },
];

// Prayer Requests
export const prayerRequests: PrayerRequest[] = [
  { id: '1', memberName: 'Frank A', request: 'Pray for healing for my mother who is in hospital.', date: '2025-03-25', status: 'active', isPrivate: false },
  { id: '2', memberName: 'Sarah D', request: 'Job interview this Thursday. Need wisdom and favour.', date: '2025-03-26', status: 'active', isPrivate: false },
  { id: '3', memberName: 'David Chen', request: 'Seeking truth and direction in life as a new seeker.', date: '2025-03-28', status: 'active', isPrivate: false },
  { id: '4', memberName: 'Michael A', request: 'Pray for Dudley outreach this weekend.', date: '2025-03-27', status: 'active', isPrivate: false },
  { id: '5', memberName: 'Charles A', request: 'Birmingham city mission planning.', date: '2025-03-26', status: 'active', isPrivate: false },
  { id: '6', memberName: 'Anthony A', request: 'Thanks for answered prayers! Baptism this Sunday.', date: '2025-03-20', status: 'answered', answeredDate: '2025-03-28', testimony: 'Three seekers ready for baptism!', isPrivate: false },
];

// Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', memberId: '1', memberName: 'Frank A', date: '2025-03-24', status: 'present' },
  { id: '2', memberId: '2', memberName: 'Felix B', date: '2025-03-24', status: 'present' },
  { id: '3', memberId: '3', memberName: 'Maa Ellen C', date: '2025-03-24', status: 'present' },
  { id: '4', memberId: '4', memberName: 'Sarah D', date: '2025-03-24', status: 'absent', notes: 'Family emergency' },
  { id: '5', memberId: '13', memberName: 'Michael A', date: '2025-03-26', status: 'present' },
  { id: '6', memberId: '24', memberName: 'Charles A', date: '2025-03-25', status: 'present' },
];

// Discipleship Progress
export const discipleshipProgress: DiscipleshipProgress[] = [
  { id: '1', memberId: '1', memberName: 'Frank A', level: 'completed', scripturesMemorized: ['John 3:16', 'Romans 3:23', 'Romans 6:23', 'John 14:1-3'], devotionsCompleted: 85, prayerJournalStarted: true, testimonyWritten: true, mentor: 'Pastor John', startDate: '2024-01-15' },
  { id: '2', memberId: '2', memberName: 'Felix B', level: 'tactics', scripturesMemorized: ['John 3:16', 'Romans 3:23', 'Romans 6:23'], devotionsCompleted: 42, prayerJournalStarted: true, testimonyWritten: true, mentor: 'Frank A', startDate: '2024-02-01' },
  { id: '3', memberId: '5', memberName: 'David Chen', level: 'survival', scripturesMemorized: ['John 3:16'], devotionsCompleted: 8, prayerJournalStarted: false, testimonyWritten: false, mentor: 'Frank A', startDate: '2025-03-20' },
  { id: '4', memberId: '13', memberName: 'Michael A', level: 'basic', scripturesMemorized: ['John 3:16', 'Romans 3:23'], devotionsCompleted: 28, prayerJournalStarted: true, testimonyWritten: false, mentor: 'Pastor John', startDate: '2024-02-15' },
];

// Mission Stages
export const missionStages: MissionStage[] = [
  { id: '1', memberId: '5', memberName: 'David Chen', stage: 'praying', notes: 'Attending Willenhall Victory weekly', date: '2025-03-20' },
  { id: '2', memberId: '18', memberName: 'Sarah Adebayo', stage: 'invited', notes: 'Came to Easter service at Dudley', date: '2025-03-25' },
  { id: '3', memberId: '32', memberName: 'Kevin Brown', stage: 'attending', notes: 'Regular at Birmingham Hope', date: '2025-03-18' },
  { id: '4', memberId: '46', memberName: 'Ashley Turner', stage: 'decided', notes: 'Made decision at Wolverhampton Harvest', date: '2025-03-22' },
  { id: '5', memberId: '56', memberName: 'Nicole Foster', stage: 'praying', notes: 'New to Walsall Steadfast', date: '2025-03-20' },
  { id: '6', memberId: '66', memberName: 'Melissa Hayes', stage: 'invited', notes: 'Coventry Connect visitor', date: '2025-03-18' },
  { id: '7', memberId: '78', memberName: 'Jacob Marsh', stage: 'decided', notes: 'Sandwell New Life', date: '2025-03-22' },
];

// Lessons
export const lessons: Lesson[] = [
  { id: '1', title: 'The Power of Prayer', series: 'Foundations', lessonNumber: 1, keyVerses: ['Matthew 6:9-13', 'Philippians 4:6'], content: 'Prayer is our direct line to God...', code: '03cg01' },
  { id: '2', title: 'Understanding the Bible', series: 'Foundations', lessonNumber: 2, keyVerses: ['2 Timothy 3:16-17', 'Hebrews 4:12'], content: 'The Bible is God\'s Word...', code: '03cg02' },
  { id: '3', title: 'The Sabbath Rest', series: 'Commandments', lessonNumber: 1, keyVerses: ['Exodus 20:8-11', 'Mark 2:27-28'], content: 'The Sabbath is a gift...', code: '03cg03' },
  { id: '4', title: 'The Second Coming', series: 'Prophecy', lessonNumber: 1, keyVerses: ['John 14:1-3', 'Acts 1:11'], content: 'Jesus is coming back...', code: '03cg04' },
  { id: '5', title: 'Baptism', series: 'Foundations', lessonNumber: 3, keyVerses: ['Matthew 28:19', 'Romans 6:3-4'], content: 'The meaning of baptism...', code: '03cg05' },
];
