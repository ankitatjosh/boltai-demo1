import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, Session } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockSessions: Session[] = [
    {
      id: '1',
      studentId: 'student1',
      mentorId: 'mentor1',
      date: new Date(),
      status: 'pending',
      topic: 'JavaScript Basics'
    },
    {
      id: '2',
      studentId: 'student1',
      mentorId: 'mentor2',
      date: new Date(),
      status: 'accepted',
      topic: 'React Development'
    }
  ];

  private mockUsers: User[] = [
    {
      id: '1',
      email: 'student@test.com',
      password: 'password123',
      role: 'student',
      name: 'John Student'
    },
    {
      id: '2',
      email: 'mentor@test.com',
      password: 'password123',
      role: 'mentor',
      name: 'Jane Mentor'
    }
  ];

  login(email: string, password: string): Observable<{token: string, user: User}> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return of({ token: 'mock-token', user }).pipe(delay(500));
    }
    throw new Error('Invalid credentials');
  }

  getSessions(role: 'student' | 'mentor'): Observable<Session[]> {
    return of(this.mockSessions).pipe(delay(500));
  }

  updateSessionStatus(sessionId: string, status: string): Observable<Session> {
    const session = this.mockSessions.find(s => s.id === sessionId);
    if (session) {
      session.status = status as 'pending' | 'accepted' | 'rejected';
      return of(session).pipe(delay(500));
    }
    throw new Error('Session not found');
  }
}