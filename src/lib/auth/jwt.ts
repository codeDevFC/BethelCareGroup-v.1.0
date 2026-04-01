import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'my-super-secret-key-32-chars-long-here';

export interface User {
  id: string;
  name: string;
  username: string;
  role: 'ADMIN' | 'PASTOR' | 'LEADER' | 'MEMBER' | 'SEEKER';
  groupId?: string;
  groupName?: string;
  password?: string; // For validation only
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, name: user.name, username: user.username, role: user.role, groupId: user.groupId, groupName: user.groupName },
    SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, SECRET) as User;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Users with group-specific logins
export const demoUsers: User[] = [
  // Admin - can see everything
  { id: "admin1", name: "Church Administrator", username: "admin", password: "BETHEL@UK777", role: "ADMIN" },
  
  // Group 1: Willenhall Victory
  { id: "g1_leader", name: "Frank A", username: "frank_willenhall", password: "victory@BWcg03", role: "LEADER", groupId: "1", groupName: "Willenhall Victory" },
  { id: "g1_member1", name: "Felix B", username: "felix_willenhall", password: "felix_willenhall", role: "MEMBER", groupId: "1", groupName: "Willenhall Victory" },
  { id: "g1_member2", name: "Maa Ellen C", username: "ellen_willenhall", password: "ellen_willenhall", role: "MEMBER", groupId: "1", groupName: "Willenhall Victory" },
  { id: "g1_seeker", name: "David Chen", username: "david_willenhall", password: "david_willenhall", role: "SEEKER", groupId: "1", groupName: "Willenhall Victory" },
  
  // Group 2: Dudley Faith Builders
  { id: "g2_leader", name: "Michael A", username: "michael_dudley", password: "faith@BWcg03", role: "LEADER", groupId: "2", groupName: "Dudley Faith Builders" },
  { id: "g2_member1", name: "John Member", username: "john_dudley", password: "john_dudley", role: "MEMBER", groupId: "2", groupName: "Dudley Faith Builders" },
  { id: "g2_seeker", name: "Sarah Adebayo", username: "sarah_dudley", password: "sarah_dudley", role: "SEEKER", groupId: "2", groupName: "Dudley Faith Builders" },
  
  // Group 3: Birmingham Hope
  { id: "g3_leader", name: "Charles A", username: "charles_birmingham", password: "hope@BWcg03", role: "LEADER", groupId: "3", groupName: "Birmingham Hope" },
  { id: "g3_member1", name: "Barbara Adams", username: "barbara_birmingham", password: "barbara_birmingham", role: "MEMBER", groupId: "3", groupName: "Birmingham Hope" },
  { id: "g3_seeker", name: "Kevin Brown", username: "kevin_birmingham", password: "kevin_birmingham", role: "SEEKER", groupId: "3", groupName: "Birmingham Hope" },
  
  // Group 4: Wolverhampton Harvest
  { id: "g4_leader", name: "Anthony A", username: "anthony_wolverhampton", password: "harvest@BWcg03", role: "LEADER", groupId: "4", groupName: "Wolverhampton Harvest" },
  { id: "g4_member1", name: "Donna Carter", username: "donna_wolverhampton", password: "donna_wolverhampton", role: "MEMBER", groupId: "4", groupName: "Wolverhampton Harvest" },
  { id: "g4_seeker", name: "Ashley Turner", username: "ashley_wolverhampton", password: "ashley_wolverhampton", role: "SEEKER", groupId: "4", groupName: "Wolverhampton Harvest" },
  
  // Group 5: Walsall Steadfast
  { id: "g5_leader", name: "Jason A", username: "jason_walsall", password: "steadfast@BWcg03", role: "LEADER", groupId: "5", groupName: "Walsall Steadfast" },
  { id: "g5_member1", name: "Rebecca Allen", username: "rebecca_walsall", password: "rebecca_walsall", role: "MEMBER", groupId: "5", groupName: "Walsall Steadfast" },
  { id: "g5_seeker", name: "Nicole Foster", username: "nicole_walsall", password: "nicole_walsall", role: "SEEKER", groupId: "5", groupName: "Walsall Steadfast" },
  
  // Group 6: Coventry Connect
  { id: "g6_leader", name: "Daniel A", username: "daniel_coventry", password: "connect@BWcg03", role: "LEADER", groupId: "6", groupName: "Coventry Connect" },
  { id: "g6_member1", name: "Emily Wright", username: "emily_coventry", password: "emily_coventry", role: "MEMBER", groupId: "6", groupName: "Coventry Connect" },
  { id: "g6_seeker", name: "Melissa Hayes", username: "melissa_coventry", password: "melissa_coventry", role: "SEEKER", groupId: "6", groupName: "Coventry Connect" },
  
  // Group 7: Sandwell New Life
  { id: "g7_leader", name: "Sarah D", username: "sarah_sandwell", password: "newlife@BWcg03", role: "LEADER", groupId: "7", groupName: "Sandwell New Life" },
  { id: "g7_member1", name: "Samuel Grant", username: "samuel_sandwell", password: "samuel_sandwell", role: "MEMBER", groupId: "7", groupName: "Sandwell New Life" },
  { id: "g7_seeker", name: "Jacob Marsh", username: "jacob_sandwell", password: "jacob_sandwell", role: "SEEKER", groupId: "7", groupName: "Sandwell New Life" },
];

export function validateUser(username: string, password: string): User | null {
  const user = demoUsers.find(
    (u) => u.username === username && u.password === password
  );
  
  if (!user) return null;
  
  // Remove password from returned user
  const { password: _, ...safeUser } = user;
  return safeUser as User;
}
