import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface GithubActivity {
  totalContributions: number;
  repositories: number;
  lastActive: string;
}

@Component({
  selector: 'app-github-activity',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>GitHub Activity</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading" class="loading-spinner">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
        <div *ngIf="!loading && activity" class="activity-stats">
          <div class="stat-item">
            <h4>Total Contributions</h4>
            <p>{{activity.totalContributions}}</p>
          </div>
          <div class="stat-item">
            <h4>Repositories</h4>
            <p>{{activity.repositories}}</p>
          </div>
          <div class="stat-item">
            <h4>Last Active</h4>
            <p>{{activity.lastActive | date}}</p>
          </div>
        </div>
        <div *ngIf="error" class="error-message">
          {{error}}
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .activity-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      text-align: center;
    }
    .stat-item {
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }
    .error-message {
      color: #f44336;
      text-align: center;
      padding: 1rem;
    }
  `]
})
export class GithubActivityComponent implements OnInit {
  @Input() username: string = '';
  activity: GithubActivity | null = null;
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.username) {
      this.fetchGithubActivity();
    }
  }

  private fetchGithubActivity() {
    this.loading = true;
    this.http.get<any>(`https://api.github.com/users/${this.username}`)
      .subscribe({
        next: (data) => {
          this.activity = {
            totalContributions: data.public_repos * 10, // Simplified metric
            repositories: data.public_repos,
            lastActive: data.updated_at
          };
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load GitHub activity';
          this.loading = false;
        }
      });
  }
}