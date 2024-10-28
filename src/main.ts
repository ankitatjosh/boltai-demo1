import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { StudentDashboardComponent } from './app/components/dashboard/student-dashboard.component';
import { MentorDashboardComponent } from './app/components/dashboard/mentor-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'mentor-dashboard', component: MentorDashboardComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-container">
      <header>
        <h1>Student-Mentor Platform</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    header {
      background-color: #3f51b5;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    main {
      padding: 1rem;
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
});