export interface User {
  id?: string;
  email: string;
  password: string;
  role: 'student' | 'mentor';
  name: string;
}

export interface Session {
  id?: string;
  studentId: string;
  mentorId: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected';
  topic: string;
}