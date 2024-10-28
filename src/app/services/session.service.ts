import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Session } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private api: ApiService) {}

  getStudentSessions(): Observable<Session[]> {
    return this.api.get<Session[]>('/sessions/student');
  }

  getMentorSessions(): Observable<Session[]> {
    return this.api.get<Session[]>('/sessions/mentor');
  }

  createSession(session: Partial<Session>): Observable<Session> {
    return this.api.post<Session>('/sessions', session);
  }

  updateSessionStatus(sessionId: string, status: string): Observable<Session> {
    return this.api.patch<Session>(`/sessions/${sessionId}/status`, { status });
  }
}