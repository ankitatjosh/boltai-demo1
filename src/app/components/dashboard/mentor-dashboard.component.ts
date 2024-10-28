import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/user.model';

@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  template: `
    <div class="dashboard-container">
      <mat-card class="sessions-card">
        <mat-card-header>
          <mat-card-title>Upcoming Sessions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let session of sessions">
              <div class="session-item">
                <h3>Session with {{session.studentId}}</h3>
                <p>Topic: {{session.topic}}</p>
                <p>Date: {{session.date | date}}</p>
                <div class="session-actions" *ngIf="session.status === 'pending'">
                  <button mat-button color="primary" (click)="updateSessionStatus(session.id!, 'accepted')">
                    Accept
                  </button>
                  <button mat-button color="warn" (click)="updateSessionStatus(session.id!, 'rejected')">
                    Decline
                  </button>
                </div>
                <p *ngIf="session.status !== 'pending'" class="status-label">
                  Status: {{session.status}}
                </p>
              </div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Student Messages</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              <div class="message-item">
                <h3>Message from Student</h3>
                <p>Question about career guidance</p>
                <button mat-button color="primary" (click)="openChat()">Reply</button>
              </div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .sessions-card {
      min-height: 400px;
    }
    .session-item, .message-item {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .session-actions {
      margin-top: 0.5rem;
    }
    .status-label {
      color: #666;
      font-style: italic;
    }
  `]
})
export class MentorDashboardComponent implements OnInit {
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getMentorSessions().subscribe({
      next: (sessions) => this.sessions = sessions,
      error: (error) => console.error('Error loading sessions:', error)
    });
  }

  updateSessionStatus(sessionId: string, status: string): void {
    this.sessionService.updateSessionStatus(sessionId, status).subscribe({
      next: () => this.loadSessions(),
      error: (error) => console.error('Error updating session:', error)
    });
  }

  openChat(): void {
    // Open chat interface (to be implemented)
  }
}