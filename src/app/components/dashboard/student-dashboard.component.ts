import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MockApiService } from '../../services/mock-api.service';
import { Session } from '../../models/user.model';
import { GithubActivityComponent } from '../github-activity/github-activity.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatDialogModule,
    GithubActivityComponent
  ],
  template: `
    <div class="dashboard-container">
      <app-github-activity [username]="githubUsername"></app-github-activity>

      <mat-card>
        <mat-card-header>
          <mat-card-title>My Sessions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="sessions-list">
            <div *ngFor="let session of sessions" class="session-item">
              <h3>Session with {{session.mentorId}}</h3>
              <p>Topic: {{session.topic}}</p>
              <p>Status: {{session.status}}</p>
              <p>Date: {{session.date | date}}</p>
            </div>
          </div>
          <button mat-raised-button color="primary" (click)="bookSession()">
            Book New Session
          </button>
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
  `]
})
export class StudentDashboardComponent implements OnInit {
  sessions: Session[] = [];
  githubUsername = 'example-user'; // This should come from user profile

  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.mockApiService.getSessions('student').subscribe({
      next: (sessions) => this.sessions = sessions,
      error: (error) => console.error('Error loading sessions:', error)
    });
  }

  bookSession(): void {
    // Implement booking dialog
  }
}